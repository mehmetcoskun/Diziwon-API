const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const KeepWatchingList = sequelize.define('keep_watching_lists', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    _id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    season: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    episode: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
    },
});

module.exports = KeepWatchingList;
