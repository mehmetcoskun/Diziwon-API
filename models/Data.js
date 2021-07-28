const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Data = sequelize.define('datas', {
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
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    original_title: {
        type: Sequelize.STRING,
        allowNull: true
    },
    poster: {
        type: Sequelize.STRING,
        allowNull: false
    },
    backdrop: {
        type: Sequelize.STRING,
        allowNull: false
    },
    backdrop_withtitle: {
        type: Sequelize.STRING,
        allowNull: false
    },
    genres: {
        type: Sequelize.STRING,
        allowNull: false
    },
    summary: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    year: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    imdb_rating: {
        type: Sequelize.STRING,
        allowNull: false
    },
    maturity: {
        type: Sequelize.STRING,
        allowNull: true
    },
    runtime: {
        type: Sequelize.STRING,
        allowNull: true
    },
    added_by: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    counter: {
        type: Sequelize.INTEGER,
        allowNull: true
    }
});

module.exports = Data;
