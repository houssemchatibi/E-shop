// import controllers review, products
const authService = require('../services/authService.js')
//const reviewController = require('../controllers/reviewController')


// router
const router = require('express').Router()


// use routers
router.post('/login', authService.login)
router.post('/register', authService.register)
router.get('/logout', authService.logout)







module.exports = router