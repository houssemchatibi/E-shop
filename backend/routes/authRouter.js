// import controllers review, products
const authService = require('../services/authService.js')
//const reviewController = require('../controllers/reviewController')

const middleware = require('../middleware/auth.middleware.js')

// router
const router = require('express').Router()


// use routers
router.post('/login', authService.login)
router.post('/register', authService.register)
router.get('/logout', authService.logout)
router.get('*', middleware.CheckUser)






module.exports = router