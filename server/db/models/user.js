const db = require('../db')
const Sequelize = require('sequelize')

const User = db.define('user', {
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        get() {
            return () => this.getDataValue('email')
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
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
User.prototype.updateBalance = async function(cost){
    let remaining = this.balance - cost

    if(remaining >= 0) {
        return await this.update({balance: remaining})
    } else {
        throw new Error()
    }
}

module.exports = User