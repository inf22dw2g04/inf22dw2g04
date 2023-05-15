const Sequelize = require('sequelize');
const database = require('../db');


const Camionista = database.define('camionista', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },

    cc: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})


module.exports = Camionista;