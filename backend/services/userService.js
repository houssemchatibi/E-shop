const db = require('../models/indexdb')
const bcrypt = require('bcrypt');


// create main Model
const user = db.user



const addUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Hasher le mot de passe avec bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        console.log('Mot de passe haché:', hashedPassword);

        // Créer un nouvel utilisateur dans la base de données avec le mot de passe haché
        const newUser = await user.create({
            username,
            password: hashedPassword, // Enregistrez le mot de passe haché
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        console.log('Nouvel utilisateur créé:', newUser);

        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const foundUser = await user.findByPk(userId);

        if (!foundUser) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        res.status(200).json(foundUser);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur interne du serveur');
    }
};





const getAllUser = async (req, res) => {
    try {
        let users = await user.findAll({});
        res.status(200).send(users);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}




module.exports = {

    getAllUser,
    addUser,
    getUserById
    
}