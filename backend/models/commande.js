module.exports = (sequelize, DataTypes) => {

    const commande = sequelize.define("commande", {
        
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          total_price: {
            type: DataTypes.FLOAT,
            allowNull: false,
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
        
        return commande;
}