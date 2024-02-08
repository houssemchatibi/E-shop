
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { signUpErrors, signInErrors } = require('../utils/errors.utils');
require('dotenv').config();
const db = require('../models/indexdb')



// create main Model
const user = db.user;


const maxAge = 100 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
    
  return jwt.sign({id}, process.env.TOKEN_SECRET, {
    expiresIn: maxAge
  })
};


//REGISTER
const register = async (req, res) => {
    try {
      
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
   
        const newUser = new user({
        username: req.body.username,
        password: hashedPassword
      });
     
      const savedUser = await newUser.save();
  
      res.status(200).json(savedUser);
    } catch (err) {
      console.error("Une erreur est survenue lors de l'inscription :", err);
      const errors = signUpErrors(err);
      res.status(200).send({ errors });
    }
  };
  
  const login = async (req, res) => {
    try {
        const User = await user.findOne({ username: req.body.username });
        
        // Vérifiez si l'utilisateur n'existe pas
        if (!User) {
          throw Error('username inconnu');
        }
    
        // Vérifiez si le mot de passe est incorrect
        const validPassword = await bcrypt.compare(req.body.password, User.password);
        if (!validPassword) {
          throw Error('mot de passe incorrect');
        }
    
        const token = createToken(User.id);
        res.cookie("jwt", token, { httpOnly: true, maxAge });
        res.status(200).json(User);
      } catch (err) {
        console.error("Une erreur est survenue lors de la connexion :", err);
        const errors = signInErrors(err);
        res.status(200).json({ errors });
      }
};

  



 const logout = async (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.status(200).json({ message: "Logout successful" });
  };



  module.exports = {

    register,
    login,
    logout
    
}