const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const User = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    avatar: {
        type: Sequelize.STRING
    },
    full_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    authority: {
        type: Sequelize.DataTypes.ENUM('admin', 'moderator', 'user')
    },
    status: {
        type: Sequelize.DataTypes.ENUM('active', 'inactive', 'pending')
    },
    last_active: {
        type: Sequelize.STRING
    },
    device_brand: {
        type: Sequelize.STRING,
        allowNull: true
    },
    device_model: {
        type: Sequelize.STRING,
        allowNull: true
    },
    device_os_version: {
        type: Sequelize.STRING,
        allowNull: true
    },
    app_version: {
        type: Sequelize.STRING,
        allowNull: true
    },
    ref_download: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
});

module.exports = User;
