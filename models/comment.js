const Sequelize = require('sequelize');

const sequelize = require("../database");


const Comment = sequelize.define("comment", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    userId: {
        type: Sequelize.STRING,
        allowNull: false
    },

    text: {
        type: Sequelize.STRING,
        allowNull: false
    },
});







module.exports = Comment;