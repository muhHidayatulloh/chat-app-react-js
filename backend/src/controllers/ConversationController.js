const { Conversations, ConversationMembers, GroupConversations } = require('../models');
const { sequelize } = require('../config/db');

const addConversation = async (req, res) => {
  const { conversation_type, created_by, user_id } = req.body;
  const created_at = new Date();
  const updated_at = new Date();
  const groupConversation = {};
  const t = await sequelize.transaction();

  try {
    const newConversation = await Conversations.create({
      conversation_type,
      created_by,
      created_at,
      updated_at
    }, { transaction: t });

    if(conversation_type === 'group') {
      const { group_name, group_descriptions, group_icon_url } = req.body;
      groupConversation = await GroupConversations.create({
        conversation_id: newConversation.id,
        group_name,
        group_descriptions,
        group_icon_url
      }, { transaction: t });
    }

    const conversationMembers = await ConversationMembers.create(
    {
        conversation_id: newConversation.id,
        user_id: user_id,
        joined_at: created_at
    }, { transaction: t });

    await t.commit();

    console.log(newConversation, conversationMembers, 'test');
    res.status(200).json({ conversation: newConversation, members: conversationMembers, groupConversation: groupConversation });
  } catch (error) {
    await t.rollback();
    console.error(error);
    res.status(500).json({ message: 'Error creating conversation', error: error.message });
  }
};

const getConversationsByUserId = async (req, res) => {
  const { user_id } = req.params;

  try {
    const conversations = await Conversations.findOne({
      where: { created_by: user_id },
      include: [
        {
          model: ConversationMembers,
          as: 'members'
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
  getConversationsByUserId
};