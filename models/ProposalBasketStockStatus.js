const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const ProposalBasketStockStatus = sequelize.define(
  "ProposalBasketStockStatus",
  {
    proposal_basket_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    stage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }
);

module.exports = ProposalBasketStockStatus;
