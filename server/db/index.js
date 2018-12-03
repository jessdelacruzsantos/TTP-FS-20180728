const db = require('./db');
// const {User, Stock,PurchasedStock, Transaction} = require('./models')

module.exports = { db, ...require('./models') };
