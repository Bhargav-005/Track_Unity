const axios = require('axios');
const fs = require('fs');
const os = require('os');
const path = require('path');
const TelegramBot = require('node-telegram-bot-api');

let botInstance = null;

const telegramApiRequest = async (token, method, payload = {}) => axios.post(
  `https://api.telegram.org/bot${token}/${method}`,
  payload,
  {
    timeout: Number(process.env.TELEGRAM_API_TIMEOUT_MS) || 10000,
  }
);

const sendTelegramMessage = async (chatId, text) => {
  const token = process.env.TELEGRAM_TOKEN || process.env.TELEGRAM_BOT_TOKEN;

  if (!token || !chatId || !text) {
    return;
  }

  await telegramApiRequest(token, 'sendMessage', {
    chat_id: chatId,
    text,
  });
};

const normalizeTelegramWebhookPayload = (payload = {}) => {
  const message = payload.message || payload.edited_message || {};

  return {
    messageText: message.text || message.caption || '',
    telegramUserId: message.from?.id ? String(message.from.id) : null,
    telegramChatId: message.chat?.id ? String(message.chat.id) : null,
    telegramMessageId: message.message_id ? String(message.message_id) : null,
  };
};

const isTelegramWebhookAuthorized = (req) => {
  if (!process.env.TELEGRAM_WEBHOOK_SECRET) {
    return true;
  }

  return req.headers['x-telegram-bot-api-secret-token'] === process.env.TELEGRAM_WEBHOOK_SECRET;
};

const initializeTelegramBot = async () => {
  const { TELEGRAM_BOT_TOKEN, TELEGRAM_TOKEN, TELEGRAM_WEBHOOK_URL, TELEGRAM_WEBHOOK_SECRET } = process.env;
  const token = TELEGRAM_TOKEN || TELEGRAM_BOT_TOKEN;

  if (!token) {
    console.log('Telegram bot initialization skipped: missing TELEGRAM_TOKEN');
    return;
  }

  if (botInstance) {
    return;
  }

  const ingestionUrl = process.env.TELEGRAM_INGEST_URL || 'http://localhost:5000/api/ingest/telegram';

  if (TELEGRAM_WEBHOOK_URL) {
    try {
      await telegramApiRequest(token, 'setWebhook', {
        url: TELEGRAM_WEBHOOK_URL,
        secret_token: TELEGRAM_WEBHOOK_SECRET || undefined,
      });
      console.log('Telegram webhook configured successfully');
      console.log('Telegram bot webhook mode enabled');
      return;
    } catch (error) {
      console.error(`Telegram webhook setup failed: ${error.message}`);
      return;
    }
  }

  try {
    await telegramApiRequest(token, 'deleteWebhook', { drop_pending_updates: false });
  } catch (error) {
    console.error(`Telegram webhook cleanup failed: ${error.message}`);
  }

  botInstance = new TelegramBot(token, { polling: true });

  botInstance.on('message', async (msg) => {
    const chatId = msg.chat?.id ? String(msg.chat.id) : null;
    const telegramUserId = msg.from?.id;

    // /start and /myid commands
    if (msg.text === '/start' || msg.text === '/myid') {
      const idMsg = `Your Telegram User ID is: <b>${telegramUserId}</b>`;
      try {
        await botInstance.sendMessage(chatId, idMsg, { parse_mode: 'HTML' });
      } catch (_) {}
      return;
    }


    // Plain text or caption on a photo
    let messageText = msg.text || msg.caption || null;
    let tempImagePath = null;

    // Handle photo (array of resolutions) or image sent as a document
    const hasPhoto = Array.isArray(msg.photo) && msg.photo.length > 0;
    const hasImageDoc = msg.document?.mime_type?.startsWith('image/');

    if (!messageText && (hasPhoto || hasImageDoc)) {
      try {
        // Pick the highest-resolution variant for photos
        const fileId = hasPhoto
          ? msg.photo[msg.photo.length - 1].file_id
          : msg.document.file_id;

        const fileLink = await botInstance.getFileLink(fileId);

        // Download to a temp file
        const tmpPath = path.join(os.tmpdir(), `tg-img-${Date.now()}.jpg`);
        const dlResponse = await axios({ url: fileLink, method: 'GET', responseType: 'stream' });
        await new Promise((resolve, reject) => {
          const writer = fs.createWriteStream(tmpPath);
          dlResponse.data.pipe(writer);
          writer.on('finish', resolve);
          writer.on('error', reject);
        });
        tempImagePath = tmpPath;

        // Run OCR
        const { extractTextFromImage } = require('./ocrService');
        const ocrText = await extractTextFromImage(tmpPath);
        if (ocrText && ocrText.trim()) {
          messageText = ocrText.trim();
        } else {
          if (chatId) await botInstance.sendMessage(chatId, 'Could not extract text from that image. Please try a clearer photo or paste the text directly.').catch(() => {});
          return;
        }
      } catch (error) {
        console.error(`Telegram image OCR failed: ${error.message}`);
        if (chatId) await botInstance.sendMessage(chatId, 'Failed to process image. Please paste the job posting as text instead.').catch(() => {});
        return;
      } finally {
        if (tempImagePath && fs.existsSync(tempImagePath)) {
          try { fs.unlinkSync(tempImagePath); } catch (_) { /* ignore */ }
        }
      }
    }

    if (!messageText) {
      if (chatId) await botInstance.sendMessage(chatId, 'Please send a text message or a photo of a job posting.').catch(() => {});
      return;
    }

    try {
      const response = await axios.post(ingestionUrl, {
        source: 'telegram',
        messageText,
        telegramUserId,
        telegramChatId: chatId,
      }, {
        timeout: Number(process.env.TELEGRAM_FORWARD_TIMEOUT_MS) || 15000,
      });

      const replyText = response.data?.duplicate
        ? 'This opportunity is already saved in your dashboard!'
        : 'Opportunity received and added to your dashboard!';

      if (chatId) await botInstance.sendMessage(chatId, replyText).catch(() => {});
    } catch (error) {
      console.error(`Telegram forward failed: ${error.message}`);
      if (chatId) await botInstance.sendMessage(chatId, 'Something went wrong while saving. Please try again.').catch(() => {});
    }
  });

  botInstance.on('polling_error', (error) => {
    console.error(`Telegram polling error: ${error.message}`);
  });

  console.log('Telegram bot polling started');
};

module.exports = {
  normalizeTelegramWebhookPayload,
  isTelegramWebhookAuthorized,
  initializeTelegramBot,
  sendTelegramMessage,
};
