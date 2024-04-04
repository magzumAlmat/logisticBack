const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");
const Warehouse = require("./Warehouse");
const ProposalBasketStockStatus = require("./ProposalBasketStockStatus");
const ProposalBasketLocalExpenses = require("./ProposalBasketLocalExpenses");
const Proposal = require("./Proposal");
const CompanyCarNumber = require("../CompanyCarNumber");
const BasketCarNumber = require("./BasketCarNumber");

const ProposalBasket = sequelize.define("SpecProposalBasket", {
  proposal_ids: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: false,
  },
  total_quantity: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    decimals: true,
  },
  total_dshv: {
    type: DataTypes.STRING,
    allowNull: true,
    
  },
  total_weight: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    decimals: true,
  },
  warehouse_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Warehouse,
      key: "id",
    },
  },
  arrival_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  usd_exchange_rate: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    decimals: true,
  },
  total_rate_usd: {
    type: DataTypes.DECIMAL(20, 2),
    allowNull: true,
    decimals: true,
  },
  total_rate_kzt: {
    type: DataTypes.DECIMAL(20, 2),
    allowNull: true,
    decimals: true,
  },
  internal_order_number: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  kpp: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

ProposalBasket.hasMany(Proposal, {
  foreignKey: "proposal_basket_id",
  as: "proposals",
});

Proposal.belongsTo(ProposalBasket, {
  foreignKey: "proposal_basket_id",
  as: "proposal_basket",
});

ProposalBasket.belongsTo(Warehouse, {
  foreignKey: "warehouse_id",
  as: "warehouse",
});

ProposalBasket.hasMany(ProposalBasketStockStatus, {
  foreignKey: "proposal_basket_id",
  as: "stock_statuses",
});

ProposalBasketStockStatus.belongsTo(ProposalBasket, {
  foreignKey: "proposal_basket_id",
  as: "proposal_basket",
});

ProposalBasket.hasMany(ProposalBasketLocalExpenses, {
  foreignKey: "proposal_basket_id",
  as: "local_expenses",
});

ProposalBasketLocalExpenses.belongsTo(ProposalBasket, {
  foreignKey: "proposal_basket_id",
  as: "proposal_basket",
});

ProposalBasket.hasMany(BasketCarNumber, {
  foreignKey: "proposal_basket_id",
  as: "cars",
  onDelete: "CASCADE",
});

BasketCarNumber.belongsTo(ProposalBasket, {
  foreignKey: "proposal_basket_id",
  as: "proposal_basket",
  onDelete: "CASCADE",
});

module.exports = ProposalBasket;
