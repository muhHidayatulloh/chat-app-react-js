const { sequelize } = require('../config/db');

// Import models
const User = require('./Users');
const Conversations = require('./Conversations');
const ConversationMembers = require('./ConversationMembers');



// Panggil asosiasi antar model
const models = { User, Conversations, ConversationMembers };

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

// Sync all models with the database
const syncModels = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Error syncing models:', error);
  }
};



// Export models and sequelize instance
module.exports = {
  sequelize,
  User,
  Conversations,
  ConversationMembers,
  syncModels,
};
