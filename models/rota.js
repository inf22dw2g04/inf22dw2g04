const Sequelize = require('sequelize');
const database = require('../db');


const Rota = database.define('rota', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    
    pontoPartida: {
        type: Sequelize.STRING,
        allowNull: false
    },

    pontoChegada: {
        type: Sequelize.STRING,
        allowNull: false
    }
})



module.exports = Rota;