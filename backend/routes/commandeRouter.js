// import controllers review, products
const commandeService = require('../services/commandeService.js')
//const reviewController = require('../controllers/reviewController')


// router
const router = require('express').Router()


// use routers
router.post('/addCommande', commandeService.addCommande);
router.get('/getAllCommandes', commandeService.getAllCommandes); 
router.delete('/:id', commandeService.deleteCommande);
router.get('/:commandeId/detailcommandes', commandeService.getdetailcommandes);




module.exports = router