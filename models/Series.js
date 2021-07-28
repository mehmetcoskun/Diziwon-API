const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Series = sequelize.define('series', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    imdb_id: {
        type: Sequelize.STRING,
        allowNull: false
    },
    link_subtitle: {
        type: Sequelize.STRING,
        allowNull: true
    },
    link_dugging: {
        type: Sequelize.STRING,
        allowNull: true
    },
    season: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    episode: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    overview: {
        type: Sequelize.STRING,
        allowNull: true
    },
    still_path: {
        type: Sequelize.STRING,
        allowNull: true
    }
});

module.exports = Series;
