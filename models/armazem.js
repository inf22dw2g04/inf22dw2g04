const Sequelize = require('sequelize');
const database = require('../db');
const Rota = require ('./rota')

const Armazem = database.define('armazem', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    
    localizacao: {
        type: Sequelize.STRING,
        allowNull: false
    },

    tipo: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

Armazem.belongsTo(Rota, {
    constraint: true,
    foreignKey: 'idRota'
} )

module.exports = Armazem;