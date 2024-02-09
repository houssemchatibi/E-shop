const db = require('../models/indexdb')



// create main Model
const commande = db.commande
const detailCommande = db.detailCommande

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



const deleteCommande = async (req, res) => {
    try {
        const commandeId = req.params.id;

        // Supprimer la commande de la base de données
        const deletedCommande = await commande.destroy({
            where: {
                id: commandeId
            }
        });

        if (deletedCommande === 0) {
            return res.status(404).json({ message: "Commande non trouvée" });
        }

        res.status(200).json({ message: "Commande supprimée avec succès" });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

const getCommandeById = async (req, res) => {
    try {
        const commandeId = req.params.id;

        // Rechercher la commande par son identifiant
        const foundCommande = await commande.findByPk(commandeId);

        if (!foundCommande) {
            return res.status(404).json({ message: "Commande non trouvée" });
        }

        res.status(200).json(foundCommande);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

const getAllCommandes = async (req, res) => {
    try {
        
        const commands = await commande.findAll({}); 
        res.status(200).send(commands);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }

}

const getdetailcommandes = async (req, res) => {
    try {
      const { commandeId } = req.params;
      // Requête pour récupérer tous les détails des commandes où order_id correspond à commandeId
      const detailCommandes = await detailCommande.findAll({ where: { order_id: commandeId } });
      res.status(200).json(detailCommandes);
    } catch (error) {
      console.error('Error fetching detail commandes:', error);
      res.status(500).send('Internal Server Error');
    }
  };

module.exports = {

    addCommande,
    deleteCommande,
    getCommandeById,
    getAllCommandes,
    getdetailcommandes
    
}