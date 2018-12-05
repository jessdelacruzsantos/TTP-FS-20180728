const router = require('express').Router();
const {User, Transaction} = require('../db')
const axios  = require('axios')
 
router.post('/transactions', async (req,res,next) => {
    let {quantity, ticker} = req.body
    try{
        let [exchangeInfo, user] = await Promise.all([
            axios.get(` https://api.iextrading.com/1.0/stock/${ticker}/batch?types=quote&filter=latestPrice`),
            User.findById(Number(req.user.id)),
        ])

        let cost = Math.round(exchangeInfo.data.quote.latestPrice * 100 * quantity) 
        
        if(user.dataValues && user.balance >= cost) {
            let balance = (await user.updateBalance(cost)).balance
            let transaction = await Transaction.create({
                type:'Purchase', 
                quantity, 
                userId: req.user.id,
                ticker,
                stockPrice:exchangeInfo.data.quote.latestPrice})

            res.json({balance,transaction})
            
        } else {
            res.status(500).send('Unable to find user')
        }

    } catch(error){
        res.status(500).send('Unable to Complete Transaction')
    }
})

router.get('/transactions', async (req,res) => {
    try{
        let transactions = await Transaction.findAll({
            where:{
                userId: req.user.id
            }
        })
        res.json(transactions)
    }catch(error){
        res.send(error)
    }
})

module.exports = router;

