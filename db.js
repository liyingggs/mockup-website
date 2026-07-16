const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite',
  logging: false,
});

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
});

const Announcement = sequelize.define('Announcement', {
  title: { type: DataTypes.STRING, allowNull: false },
  body: { type: DataTypes.TEXT, allowNull: false },
  publishedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

const Document = sequelize.define('Document', {
  name: { type: DataTypes.STRING, allowNull: false },
  path: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
});

const Contact = sequelize.define('Contact', {
  name: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING },
  department: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING },
  phone: { type: DataTypes.STRING },
});

const FAQ = sequelize.define('FAQ', {
  question: { type: DataTypes.TEXT, allowNull: false },
  answer: { type: DataTypes.TEXT },
});

const ChatbotKnowledge = sequelize.define('ChatbotKnowledge', {
  topic: { type: DataTypes.STRING, allowNull: false },
  keywords: { type: DataTypes.TEXT, allowNull: false },
  answer: { type: DataTypes.TEXT, allowNull: false },
  priority: { type: DataTypes.INTEGER, defaultValue: 1 },
});

const Inquiry = sequelize.define('Inquiry', {
  name: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING },
  subject: { type: DataTypes.STRING },
  message: { type: DataTypes.TEXT },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

const LeasingInfo = sequelize.define('LeasingInfo', {
  title: { type: DataTypes.STRING },
  content: { type: DataTypes.TEXT },
});

module.exports = {
  sequelize,
  User,
  Announcement,
  Document,
  Contact,
  FAQ,
  ChatbotKnowledge,
  Inquiry,
  LeasingInfo,
};
