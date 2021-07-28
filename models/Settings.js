const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Settings = sequelize.define('settings', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    app_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    app_version: {
        type: Sequelize.STRING,
        allowNull: false
    },
    root_path: {
        type: Sequelize.STRING,
        allowNull: false
    },
    assets_url: {
        type: Sequelize.STRING,
        allowNull: false
    },
    share_app_text: {
        type: Sequelize.STRING,
        allowNull: false
    },
    download_url: {
        type: Sequelize.STRING,
        allowNull: false
    },
    download_ref_url: {
        type: Sequelize.STRING,
        allowNull: false
    },
    share_text: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password_reset_url: {
        type: Sequelize.STRING,
        allowNull: false
    },
    user_account_url: {
        type: Sequelize.STRING,
        allowNull: false
    },
    help_url: {
        type: Sequelize.STRING,
        allowNull: false
    },
    useragent: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Settings;
