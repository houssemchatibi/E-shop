const dbConfig = require('../db.js');

const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle

        }
    }
)

sequelize.authenticate()
.then(() => {
    console.log('connected..')
})
.catch(err => {
    console.log('Error'+ err)
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.produit = require('./produit.js')(sequelize, DataTypes);
db.categoriess = require('./categories.js')(sequelize, DataTypes)
db.commande = require('./commande.js')(sequelize, DataTypes)
db.detailCommande = require('./detailCommande.js')(sequelize, DataTypes)
db.user = require('./user.js')(sequelize, DataTypes)

db.sequelize.sync({ force: false })
.then(() => {
    console.log('yes re-sync done!')
})


db.produit.belongsTo(db.categoriess, { foreignKey: 'category_id', as: 'categoriess' });  
db.commande.belongsTo(db.user, { foreignKey: 'user_id', as: 'user' });
db.detailCommande.belongsTo(db.commande, { foreignKey: 'order_id', as: 'commande' });
db.detailCommande.belongsTo(db.produit, { foreignKey: 'product_id', as: 'produit' });





module.exports = db