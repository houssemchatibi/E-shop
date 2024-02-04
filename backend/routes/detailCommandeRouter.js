// import controllers review, products
const detailCommandeService = require('../services/detailCommandeService.js')
//const reviewController = require('../controllers/reviewController')


// router
const router = require('express').Router()


// use routers
router.post('/addDetailCommande', detailCommandeService.addDetailCommande)

router.get('/AllDetailCommande', detailCommandeService.getAllDetailCommande)





module.exports = router