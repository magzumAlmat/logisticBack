const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

// FIX: Нужно будет переписать и указать какие поля будут обязательными/какие можно оставить пустыми

const Company = sequelize.define("Company", {
  company_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  company_bin: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  contact_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isExecutor: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  isClient: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  contract: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  contract_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  contract_color: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Company;
