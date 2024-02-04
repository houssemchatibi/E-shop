// import controllers review, products
const categoriesService = require('../services/categoriesService.js')
//const reviewController = require('../controllers/reviewController')


// router
const router = require('express').Router()


// use routers
router.post('/addCategorie', categoriesService.addCategorie)
router.get('/:id', categoriesService.getCategoryById)
router.get('/allCategories', categoriesService.getAllCategories)





module.exports = router