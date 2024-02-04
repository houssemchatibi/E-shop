const db = require('../models/indexdb')



// create main Model
const categoriess = db.categoriess


// main work

// 1. create product

const addCategorie= async (req, res) => {

    try {
        const { name } = req.body;

        // Créez un nouveau produit dans la base de données avec la clé étrangère category_id
        const newcategoriess = await categoriess.create({
            name,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        res.status(201).json(newcategoriess);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}



// 2. get all products

const getAllCategories = async (req, res) => {

    let categoriess = await categoriess.findAll({})
    res.status(200).send(categoriess)

}

const getCategoryById = async (req, res) => {
    const categoryId = req.params.id;

    try {
        const category = await categoriess.findByPk(categoryId);

        if (!category) {
            return res.status(404).send('Category not found');
        }

        res.status(200).send(category);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};


module.exports = {

    getAllCategories,
    addCategorie,
    getCategoryById
    
}