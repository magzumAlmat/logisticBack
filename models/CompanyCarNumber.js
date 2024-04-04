const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Company = require("./Company");

const CompanyCarNumber = sequelize.define("CompanyCarNumber", {
  car_registration_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  company_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Companies",
      key: "id",
    },
  },
});

CompanyCarNumber.belongsTo(Company, {
  foreignKey: "company_id",
  as: "company",
});

Company.hasMany(CompanyCarNumber, {
  foreignKey: "company_id",
  as: "cars",
  constraints: false,
});

module.exports = CompanyCarNumber;
