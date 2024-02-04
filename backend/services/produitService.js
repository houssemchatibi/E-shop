const db = require('../models/indexdb')



// create main Model
const produit = db.produit


// main work

// 1. create product

const addProduct = async (req, res) => {
    try {
        const { name, price, description, category_id } = req.body;

        
        const newProduct = await produit.create({
            name,
            price,
            description,
            category_id,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        res.status(201).json(newProduct);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}




const getAllProducts = async (req, res) => {

    try {
        
        const produits = await produit.findAll({}); 
        res.status(200).send(produits);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }

}

const getProductById = async (req, res) => {
    const productId = req.params.id; 
    try {
        const product = await produit.findByPk(productId); 
        if (!product) {
            return res.status(404).send('Product not found');
        }

        res.status(200).send(product);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}


module.exports = {
    addProduct,
    getAllProducts,
    getProductById
    
}