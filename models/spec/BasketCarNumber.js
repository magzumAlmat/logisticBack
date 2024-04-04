const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");
const CompanyCarNumber = require("../CompanyCarNumber");

const BasketCarNumber = sequelize.define("SpecBasketCarNumber", {
  company_car: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "CompanyCarNumbers",
      key: "id",
    },
  },
  proposal_basket_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "ProposalBaskets",
      key: "id",
    },
  },
  frakht: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    decimals: true,
  },
  frakht_currency: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

BasketCarNumber.belongsTo(CompanyCarNumber, {
  foreignKey: "company_car",
  as: "company_car_number",
});

CompanyCarNumber.hasMany(BasketCarNumber, {
  foreignKey: "company_car",
  as: "spec_basket_car_numbers",
});

module.exports = BasketCarNumber;
