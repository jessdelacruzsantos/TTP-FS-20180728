const router = require('express').Router();
const {User}= require('../db')

module.exports = router;
router.get('/', () => {
    console.log('Get works@@@@@@')
})
router.post('/login', async (req,res,next) => {
    try {
        let user = await User.findOne({
            where: {
                email:req.body.email
            }
        })

        if(!user) {
            res.status(404).send('Wrong email or password!')
        } else {
            res.send(user)
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


