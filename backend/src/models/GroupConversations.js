const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const GroupConversations = sequelize.define("GroupConversations", {
    conversation_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
    },
    group_name: {
        type: DataTypes.STRING,
    },
    group_descriptions: {
        type: DataTypes.TEXT,
    },
    group_icon_url: {
        type: DataTypes.TEXT,
    },
}, {
    tableName: "group_conversations",
    timestamps: false
});


module.exports = GroupConversations