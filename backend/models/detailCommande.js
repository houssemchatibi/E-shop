module.exports = (sequelize, DataTypes) => {

    const detailCommande = sequelize.define("detailCommande", {
        
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          order_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
        });
        
        return detailCommande;
}