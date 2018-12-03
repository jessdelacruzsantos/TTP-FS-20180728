const db = require('../db')
const Sequelize = require('sequelize')

const PurchasedStock = db.define('purchasedstock', {
    quantity:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

module.exports = PurchasedStock