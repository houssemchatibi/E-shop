// import controllers review, products
const produitService = require('../services/produitService.js')
//const reviewController = require('../controllers/reviewController')


// router
const router = require('express').Router()


// use routers
router.post('/addProduct', produitService.addProduct)
router.get('/allProducts', produitService.getAllProducts);
router.get('/:id', produitService.getProductById);





module.exports = router