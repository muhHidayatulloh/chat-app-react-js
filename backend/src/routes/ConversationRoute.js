const express = require('express');
const router = express.Router();
const ConversationController = require('../controllers/ConversationController');

router.post('/add', ConversationController.addConversation);

router.get('/:user_id/:member_id', ConversationController.getConversationsByUserIdAndMemberId);

module.exports = router;