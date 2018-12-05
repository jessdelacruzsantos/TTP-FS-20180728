const router = require('express').Router();
const {User, Transaction,}= require('../db')

module.exports = router;

router.post('/login', async (req,res,next) => {
    try {
        let user = await User.findOne({
            where: {
                email:req.body.email
            }
        })

        if(user && user.correctPassword(req.body.password) ) {
            req.login(user, err => (err ? next(err) : res.json(user)))
        } else {
            res.status(401).send('Wrong User Name or PassWord!')
        }

    } catch(error) {
        res.status(500).send(error)
    }
})

router.post('/signup', async (req,res,next) => {
    try {
        let user = await User.create(req.body)
        req.login(user, err => (err ? next(err) : res.json(user)))

    } catch (error) {
        res.status(500).send({message:'Something went wrong', error})

    }
})

router.get('/me', async (req,res,next) => {
    try{
        let user = await User.findById(req.user.id)
        res.json(user)
    } catch(error) {
        console.log(error)
    }
})

router.post('/logout', (req,res) => {
    req.logout()
    req.session.destroy()
    res.redirect('/')
})


