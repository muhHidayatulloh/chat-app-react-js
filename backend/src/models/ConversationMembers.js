const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const ConversationMembers = sequelize.define("ConversationMembers", {
    conversation_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
    },
    joined_at: {
        type: DataTypes.DATE
    }
}, {
    tableName: "conversation_members",
    timestamps: false
});

// ConversationMembers.associate = (models) => {
//     ConversationMembers.belongsTo(models.Conversations, {
//         foreignKey: 'conversation_id',
//         as: 'conversation'
//     });
// };

module.exports = ConversationMembers