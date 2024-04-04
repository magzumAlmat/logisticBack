const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const Warehouse = sequelize.define("SpecWarehouse", {
  warehouse_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  warehouse_address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Warehouse;
