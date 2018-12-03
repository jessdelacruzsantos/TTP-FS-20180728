const db = require('../db')
const Sequelize = require('sequelize')

const Transaction = db.define('transaction', {
    type:{
        type: Sequelize.ENUM('Purchase', 'Sale')
    },
    quantity:{
        type: Sequelize.INTEGER,
    }
})

module.exports = Transaction