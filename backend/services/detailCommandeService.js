const db = require('../models/indexdb')



// create main Model
const detailCommande = db.detailCommande




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


  const getDetailCommandeById = async (req, res) => {
    try {
        const detailId = req.params.id;
        const detail = await detailCommande.findByPk(detailId);

        if (!detail) {
            return res.status(404).json({ message: "Detail not found" });
        }

        res.status(200).json(detail);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

const getAllDetailCommandes = async (req, res) => {
    try {
        const details = await detailCommande.findAll({});
        res.status(200).json(details);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

const deleteDetailCommande = async (req, res) => {
    try {
        const detailId = req.params.id;
        const detail = await detailCommande.findByPk(detailId);

        if (!detail) {
            return res.status(404).json({ message: "Detail not found" });
        }

        await detail.destroy();

        res.status(200).json({ message: "Detail deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    addDetailCommande,
    getDetailCommandeById,
    getAllDetailCommandes,
    deleteDetailCommande
};