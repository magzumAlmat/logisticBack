const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");
const Warehouse = require("./Warehouse");

// FIX: Нужно будет переписать и указать какие поля будут обязательными/какие можно оставить пустыми

const ProposalWarehouseStatus = sequelize.define(
  "SpecProposalWarehouseStatus",
  {
    proposal_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    warehouse_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Warehouse,
        key: "id",
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }
);

ProposalWarehouseStatus.belongsTo(Warehouse, {
  foreignKey: "warehouse_id",
  as: "warehouse",
});

module.exports = ProposalWarehouseStatus;
