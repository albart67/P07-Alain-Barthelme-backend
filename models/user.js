const Sequelize = require('sequelize');

const sequelize = require("../database");

const User = sequelize.define("user", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    name: {
        type: Sequelize.STRING,
        allowNull: false
    },

    password: {
        type: Sequelize.STRING,
        allowNull: false
    },

    isAdmin: {
        type: Sequelize.STRING,
        allowNull: false
    }


});

/*
User.associate = models => {
    User.hasMany(models.Message, {
        onDelete: "cascade"
    })
};
*/

module.exports = User;