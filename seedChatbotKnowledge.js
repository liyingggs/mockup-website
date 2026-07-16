const { sequelize, ChatbotKnowledge } = require('./db');
const chatbotKnowledgeData = require('./chatbotKnowledgeData');

const wait = (ms) => new Promise((resolve) => {
  setTimeout(resolve, ms);
});

const isSqliteBusyError = (error) => {
  const message = error?.message || '';
  return (
    error?.name === 'SequelizeTimeoutError'
    || error?.original?.code === 'SQLITE_BUSY'
    || message.includes('SQLITE_BUSY')
  );
};

async function withBusyRetry(task, retries = 8, baseDelayMs = 250) {
  let attempt = 0;

  while (attempt <= retries) {
    try {
      return await task();
    } catch (error) {
      if (!isSqliteBusyError(error) || attempt === retries) {
        throw error;
      }

      const delay = baseDelayMs * (attempt + 1);
      await wait(delay);
      attempt += 1;
    }
  }

  return null;
}

async function seedChatbotKnowledge({ reset = true } = {}) {
  await sequelize.sync();
  await sequelize.query('PRAGMA busy_timeout = 8000');

  if (reset) {
    await withBusyRetry(() => ChatbotKnowledge.destroy({ where: {} }));
  }

  await withBusyRetry(() => ChatbotKnowledge.bulkCreate(chatbotKnowledgeData));
  const total = await ChatbotKnowledge.count();
  return total;
}

if (require.main === module) {
  const reset = !process.argv.includes('--keep-existing');

  seedChatbotKnowledge({ reset })
    .then((total) => {
      console.log(`Chatbot knowledge seeded. Total entries: ${total}`);
      return sequelize.close();
    })
    .catch((error) => {
      console.error('Failed to seed chatbot knowledge:', error);
      process.exitCode = 1;
    });
}

module.exports = {
  seedChatbotKnowledge,
};
