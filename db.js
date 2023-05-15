const Sequelize = require('sequelize');
const sequelize = new Sequelize('transportadora', 'root', '12345678', {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306
})

module.exports = sequelize;

