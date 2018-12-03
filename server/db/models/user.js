const db = require('../db')
const Sequelize = require('sequelize')

const User = db.define('user', {
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        // Hides the password and makes .password act like function
        get() {
            return () => this.getDataValue('password')
        }
    },
    balance: {
        type: Sequelize.INTEGER,
        defaultValue: 500000,
    },
})

User.prototype.correctPassword = function (userSubmission) {
    return userSubmission === this.password()
}
User.prototype.getBalance = function () {
    return this.balance / 100
}

module.exports = User