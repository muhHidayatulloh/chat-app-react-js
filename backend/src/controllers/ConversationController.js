const { Conversations, ConversationMembers } = require('../models');
const { sequelize } = require('../config/db');

const addConversation = async (req, res) => {
  const { conversation_type, created_by, member_id } = req.body;

  const created_at = new Date();
  const updated_at = new Date();

  const t = await sequelize.transaction();

  try {
    const newConversation = await Conversations.create({
      conversation_type,
      created_by,
      created_at,
      updated_at
    }, { transaction: t });

    const conversationMembers = await ConversationMembers.create(
    {
        conversation_id: newConversation.id,
        user_id: member_id,
        joined_at: created_at
    }, { transaction: t });

    await t.commit();

    console.log(newConversation, conversationMembers, 'test');
    res.status(201).json({ conversation: newConversation, members: conversationMembers });
  } catch (error) {
    await t.rollback();
    console.error(error);
    res.status(500).json({ message: 'Error creating conversation' });
  }
};

const getConversationsByUserIdAndMemberId = async (req, res) => {
  const { user_id, member_id } = req.params;

  try {
    const conversations = await Conversations.findOne({
      where: { created_by: user_id },
      include: [
        {
          model: ConversationMembers,
          as: 'members',
          where: { user_id: member_id }
        }
      ]
    });

    res.json(conversations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving conversations', error: error.message });
  }
};

module.exports = {
  addConversation,
  getConversationsByUserIdAndMemberId
};