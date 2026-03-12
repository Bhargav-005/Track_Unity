const { ImapFlow } = require('imapflow');
const { simpleParser } = require('mailparser');
const cron = require('node-cron');

const RawMessage = require('../models/RawMessage');
const Opportunity = require('../models/Opportunity');
const { extractOpportunityWithNlp } = require('./nlpClientService');
const { validateOpportunityLink } = require('./linkValidator');

const parseUnreadEmails = async () => {
  const host = process.env.EMAIL_IMAP_HOST;
  const port = Number(process.env.EMAIL_IMAP_PORT || 993);
  const user = process.env.EMAIL_IMAP_USER;
  const pass = process.env.EMAIL_IMAP_PASS;

  if (!host || !user || !pass) {
    return { processed: 0, skipped: true, reason: 'imap-config-missing' };
  }

  const client = new ImapFlow({
    host,
    port,
    secure: true,
    auth: { user, pass },
  });

  let processed = 0;

  try {
    await client.connect();
    await client.mailboxOpen('INBOX');

    for await (const message of client.fetch('1:*', { uid: true, source: true, flags: true })) {
      if (message.flags?.has('\\Seen')) {
        continue;
      }

      const parsedMail = await simpleParser(message.source);
      const textContent = (parsedMail.text || parsedMail.html || '').toString().trim();
      if (!textContent) {
        await client.messageFlagsAdd(message.uid, ['\\Seen']);
        continue;
      }

      const rawMessage = await RawMessage.create({
        source: 'email',
        messageText: textContent,
        processed: false,
      });

      const extracted = await extractOpportunityWithNlp(textContent);
      const linkCheck = await validateOpportunityLink(extracted.applicationLink);

      await Opportunity.create({
        title: extracted.title || 'Opportunity',
        company: extracted.company || 'Unknown Company',
        role: extracted.role || null,
        eligibility: extracted.eligibility || null,
        deadline: extracted.deadline ? new Date(extracted.deadline) : null,
        skills: extracted.skills || [],
        applicationLink: linkCheck.normalizedUrl || extracted.applicationLink || null,
        linkStatus: linkCheck.linkStatus,
        confidenceScore: extracted.confidenceScore || 0,
        description: extracted.description || textContent,
        sourceMessageId: rawMessage._id,
      });

      rawMessage.processed = true;
      await rawMessage.save();
      await client.messageFlagsAdd(message.uid, ['\\Seen']);
      processed += 1;
    }

    return { processed, skipped: false };
  } finally {
    try {
      await client.logout();
    } catch (error) {
      // Connection may already be closed.
    }
  }
};

const startEmailPollingCron = () => {
  const schedule = process.env.EMAIL_POLL_CRON || '*/30 * * * *';
  cron.schedule(schedule, async () => {
    try {
      const result = await parseUnreadEmails();
      if (!result.skipped) {
        console.log(`[EmailParser] Processed unread emails: ${result.processed}`);
      }
    } catch (error) {
      console.error('[EmailParser] Failed to parse unread emails', error.message);
    }
  });
};

module.exports = {
  parseUnreadEmails,
  startEmailPollingCron,
};
