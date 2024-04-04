const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const ProposalBasketLocalExpenses = sequelize.define(
  "ProposalBasketLocalExpenses",
  {
    proposal_basket_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }
);

module.exports = ProposalBasketLocalExpenses;
