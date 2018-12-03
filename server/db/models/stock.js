const db = require('../db')
const Sequelize = require('sequelize')

const Stock = db.define('stock', {
    ticker: {
        type: Sequelize.STRING,
        allowNull: false,
    }
})

module.exports = Stock