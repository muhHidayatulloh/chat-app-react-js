const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Users = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password_hash: {
        type: DataTypes.STRING
    },
    display_name: {
        type: DataTypes.STRING
    },
    profile_picture_url: {
        type: DataTypes.STRING
    },
    status_message: {
        type: DataTypes.STRING
    },
    is_online: {
        type: DataTypes.BOOLEAN
    },
    last_seen: {
        type: DataTypes.DATE
    },
    created_at: {
        type: DataTypes.DATE
    },
    updated_at: {
        type: DataTypes.DATE
    }
}, {
    tableName: "users",
    timestamps: false
});

module.exports = Users;
