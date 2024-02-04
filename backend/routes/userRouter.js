// import controllers review, products
const userService = require('../services/userService.js')
//const reviewController = require('../controllers/reviewController')


// router
const router = require('express').Router()


// use routers
router.post('/addUser', userService.addUser)

//router.get('/allUser', userService.getAllUser)
router.get('/allUser', (req, res) => {
    console.log('Route /allUser reached');
    userService.getAllUser(req, res);
});




module.exports = router