const { categoriess } = require("./categories");


module.exports = (sequelize, DataTypes) => {

    const produit = sequelize.define("produit", {
        
            id: {
              type: DataTypes.INTEGER,
              primaryKey: true,
              autoIncrement: true,
            },
            category_id: {
              type: DataTypes.INTEGER,
              allowNull: false,
            },
            name: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            price: {
              type: DataTypes.FLOAT,
              allowNull: false,
            },
            description: {
              type: DataTypes.TEXT,
              allowNull: true,
            },
            createdAt: {
              type: DataTypes.DATE,
              defaultValue: DataTypes.NOW,
            },
            updatedAt: {
              type: DataTypes.DATE,
              defaultValue: DataTypes.NOW,
            },

            

          });
             
    return produit
  
}