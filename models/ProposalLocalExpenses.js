const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const ProposalLocalExpenses = sequelize.define("ProposalLocalExpenses", {
  proposal_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  currency: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = ProposalLocalExpenses;
