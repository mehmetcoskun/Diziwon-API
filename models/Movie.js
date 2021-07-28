const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Movie = sequelize.define('movies', {
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
    }
});

module.exports = Movie;
