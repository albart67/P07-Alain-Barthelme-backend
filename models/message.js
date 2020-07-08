const Sequelize = require('sequelize');

const sequelize = require("../database");

const Message = sequelize.define("message", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    title: {
        type: Sequelize.STRING,
        allowNull: false
    },

    text: {
        type: Sequelize.STRING,
        allowNull: false
    },
});



// Message.associate = models => {
//     Message.belongTo(models.User);
// }


module.exports = Message;