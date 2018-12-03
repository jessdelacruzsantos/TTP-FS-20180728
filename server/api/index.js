const router = require('express').Router();
const {User} = require('../db')
const axios  = require('axios')
 
router.post('/user/:id/purchase', async (req,res,next) => {
    let {quantity, ticker} = req.body
    try{
        let user = await User.findById(Number(req.params.id))
        let {quote}= axios.get(` https://api.iextrading.com/1.0/stock/${ticker}/batch?types=quote`)
        let cost = quote.latestPrice * quantity
        if(user && user.balance() >= cost) {
            console.log('able to buy it')

        } else {
            res.status(500).send('Unable to complete transaction')
        }

    } catch(error){
        res.status(500).send(error)
    }
})

module.exports = router;
