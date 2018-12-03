const router = require('express').Router();
const {User, Stock, PurchasedStock, Transaction} = require('../db')
const axios  = require('axios')
 
router.post('/user/:id/purchase', async (req,res,next) => {
    let {quantity, ticker} = req.body

    try{
        let [exchangeInfo,user] = await Promise.all([
            axios.get(` https://api.iextrading.com/1.0/stock/${ticker}/batch?types=quote&filter=latestPrice`),
            User.findById(Number(req.params.id)),
            // Stock.findOrCreate({where: {ticker: ticker}})
        ])
        console.log(exchangeInfo.data.quote.latestPrice)
        let cost = exchangeInfo.data.quote.latestPrice * 100 * quantity 
        

        if(user.dataValues && user.balance >= cost) {
            // let record = await PurchasedStock.findOrCreate({where:{userId:Number(req.params.id), stockId:stock[0].id}})

            // let purchase = record[0].update({quantity: record[0].quantity + quantity})
            let updatedBalance = await user.updateBalance(cost)
            // await Promise.all([purchase,updatedBalance])

            res.send(await Transaction.create({type:'Purchase', quantity, userId: Number(req.params.id),ticker,stockPrice:exchangeInfo.data.quote.latestPrice}))
            
        } else {
            res.status(500).send('Unable to complete transaction')
        }

    } catch(error){
        res.status(500).send('hi')
    }
})

module.exports = router;
