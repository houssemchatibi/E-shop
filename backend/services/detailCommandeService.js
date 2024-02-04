const db = require('../models/indexdb')



// create main Model
const detailCommande = db.detailCommande


// main work

// 1. create product

const addDetailCommande = async (req, res) => {
    try {
      
      const { order_id, product_id, quantity } = req.body;
  
      
      const newDetail = await detailCommande.create({
        order_id,
        product_id,
        quantity,
      });
  
      
      res.status(201).json(newDetail);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };



// 2. get all products

const getAllDetailCommande = async (req, res) => {

    let detailCommande = await detailCommande.findAll({})
    res.status(200).send(detailCommande)

}




module.exports = {

    getAllDetailCommande,
    addDetailCommande

    
}