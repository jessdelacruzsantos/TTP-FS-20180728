const User = require('./user')
const Transaction = require('./transaction')
const Stock = require('./stock')
const PurchasedStock = require('./purchasedStock')

User.hasMany(Transaction)
Transaction.belongsTo(User)

User.belongsToMany(Stock, {through:'purchasedstock'})
Stock.belongsToMany(User, {through:'purchasedstock'})

module.exports ={
    User,
    Transaction,
    Stock,
}