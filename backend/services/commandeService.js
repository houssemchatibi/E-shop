const db = require('../models/indexdb')



// create main Model
const commande = db.commande


// main work

// 1. create product

const addCommande= async (req, res) => {

    try {
        const { user_id,total_price} = req.body;

        // Créez un nouveau produit dans la base de données avec la clé étrangère category_id
        const newcommande = await commande.create({
            user_id,
            total_price,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        res.status(201).json(newcommande);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}



// 2. get all products

const getAllCommande = async (req, res) => {

    let commande = await commande.findAll({})
    res.status(200).send(commande)

}




module.exports = {

    getAllCommande,
    addCommande
    
}