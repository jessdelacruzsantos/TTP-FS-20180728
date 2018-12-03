const router = require('express').Router();
const {User}= require('../db')

module.exports = router;

router.post('/login', async (req,res,next) => {
    try {
        let user = await User.findOne({
            where: {
                email:req.body.email
            }
        })

        if(user && user.correctPassword(req.body.password) ) {
            res.send(user)
        } else {
            res.status(404).send('Wrong email or password!')
        }

    } catch(error) {
        res.status(500).send(error)
    }
})

router.post('/signup', async (req,res,next) => {
    try {
        let newUser = await User.create(req.body)

        res.status(200).json(newUser)

    } catch (error) {
        res.status(500).send({message:'Something went wrong', error})

    }
})


