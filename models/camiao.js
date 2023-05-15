const Sequelize = require('sequelize');
const database = require('../db');
const Camionista = require ('./camionista')
const Rota = require ('./rota')

const Camiao = database.define('camiao', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    
    marca: {
        type: Sequelize.STRING,
        allowNull: false
    },

    matricula: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

Camiao.belongsTo(Camionista, {
    constraint: true,
    foreignKey: 'idCamionista'
} )

Rota.hasMany(Camiao, {
    foreignKey: 'idRota'
})

module.exports = Camiao;