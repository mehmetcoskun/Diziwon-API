const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Avatar = sequelize.define('avatars', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    uri: {
        type: Sequelize.STRING,
        allowNull: false
    },
    avatar_group: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Avatar;
