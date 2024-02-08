const jwt = require("jsonwebtoken");
require('dotenv').config();
const db = require('../models/indexdb')

const user = db.user;

module.exports.CheckUser = async (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {
               
                res.locals.user = null;
                res.cookie("jwt", "", { maxAge: 1 });
                next();
            } else {
                
                let User = await user.findByPk(decodedToken.id);
                res.locals.user = User;
               
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
};


module.exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
        if (err) {
          
          res.status(401).json({ error: 'Unauthorized' });
        } else {
         
          next();
        }
      });
    } else {
      
      res.status(401).json({ error: 'Unauthorized' });
    }
};
