const cron = require('node-cron');

const Opportunity = require('../models/Opportunity');
const Notification = require('../models/Notification');
const UserProfile = require('../models/UserProfile');

const daysToMs = (days) => days * 24 * 60 * 60 * 1000;

const buildReminderMessage = (opportunity, daysLeft) => (
  `${opportunity.title} application deadline is in ${daysLeft} day${daysLeft > 1 ? 's' : ''}`
);

const generateDeadlineReminders = async () => {
  const now = new Date();
  const windows = [1, 3, 7];

  const users = await UserProfile.find({}).select('userId').lean();
  if (!users.length) return;

  for (const daysLeft of windows) {
    const from = new Date(now.getTime() + daysToMs(daysLeft));
    const to = new Date(now.getTime() + daysToMs(daysLeft + 1));

    const opportunities = await Opportunity.find({
      deadline: { $gte: from, $lt: to },
    }).select('_id title deadline').lean();

    for (const opportunity of opportunities) {
      for (const user of users) {
        const message = buildReminderMessage(opportunity, daysLeft);

        await Notification.updateOne(
          {
            userId: user.userId,
            opportunityId: opportunity._id,
            message,
          },
          {
            $setOnInsert: {
              seen: false,
              createdAt: new Date(),
            },
          },
          { upsert: true }
        );
      }
    }
  }
};

const startReminderCron = () => {
  const schedule = process.env.REMINDER_CRON || '0 9 * * *';
  cron.schedule(schedule, async () => {
    try {
      await generateDeadlineReminders();
      console.log('[ReminderService] Reminders generated');
    } catch (error) {
      console.error('[ReminderService] Failed to generate reminders', error.message);
    }
  });
};

module.exports = {
  generateDeadlineReminders,
  startReminderCron,
};
