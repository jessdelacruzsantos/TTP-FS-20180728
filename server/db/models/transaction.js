const db = require('../db')
const Sequelize = require('sequelize')

const Transaction = db.define('transaction', {
    type:{
        type: Sequelize.ENUM('Purchase', 'Sale'),
        allowNull: false,
    },
    quantity:{
        type: Sequelize.INTEGER,
        allowNull: false,
    }
})

module.exports = Transaction