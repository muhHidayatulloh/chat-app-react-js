const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Conversations = sequelize.define("Conversation", {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    conversation_type: {
        type: DataTypes.ENUM('private', 'group')
    },
    created_by: {
        type: DataTypes.BIGINT
    },
    created_at: {
        type: DataTypes.DATE
    },
    updated_at: {
        type: DataTypes.DATE
    }
}, {
    tableName: "conversations",
    timestamps: false
});

Conversations.associate = (models) => {
    Conversations.hasMany(models.ConversationMembers, {
        foreignKey: 'conversation_id',
        as: 'members'
    });
};

module.exports = Conversations