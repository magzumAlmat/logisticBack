const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");
const Company = require("../Company");
const ProposalWarehouseStatus = require("./ProposalWarehouseStatus");
const ProposalLocalExpenses = require("./ProposalLocalExpenses");
const User = require("../User");

const Proposal = sequelize.define("SpecProposal", {
  // Получатель
  client_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Company,
      key: "id",
    },
  },
  // Отправитель
  company_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Company,
      key: "id",
    },
  },
  // Посредник
  broker_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Company,
      key: "id",
    },
  },
  proposal_number: {
    type: DataTypes.STRING, // Если есть буквы в числе
    allowNull: false,
  },
  location_from: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location_to: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  actual_rate_usd: {
    type: DataTypes.DECIMAL(20, 2),
    allowNull: true,
    decimals: true,
  },
  declared_rate_usd: {
    type: DataTypes.DECIMAL(20, 2),
    allowNull: true,
    decimals: true,
  },
  prepayment: {
    type: DataTypes.DECIMAL(20, 2),
    allowNull: true,
    decimals: true,
  },
  prepayment_rate: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  payment_percent: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    decimals: true,
  },
  invoices_count: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    decimals: true,
  },
  rate_kzt: {
    type: DataTypes.DECIMAL(20, 2),
    allowNull: true,
    decimals: true,
  },
  account_number: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  account_number_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  avr_number: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  avr_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  accountant_note: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  accountant_note_color: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  invoice: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  invoice_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  pickup_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  arrival_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  loading_list_number: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  sales_manager_id: {
    // FIX: Добавить модель USER и указать связь
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  proposal_status: {
    // 1 - В работе, 2 - Согласовано, 3- Внимание
    type: DataTypes.STRING,
    allowNull: false,
  },
  cargo_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cargo_type: {
    // Габарит Не Габарит (Требует уточнения)
    type: DataTypes.STRING,
    allowNull: true,
  },
  cargo_value: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    decimals: true,
  },
  cargo_value_currency: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  declared_quantity: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    decimals: true,
  },
  actual_quantity: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    decimals: true,
  },
  declared_weight: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    decimals: true,
  },
  actual_weight: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    decimals: true,
  },
  declared_dshv: {
    type: DataTypes.STRING,
    allowNull: false,
  
  },
  actual_dshv: {
    type: DataTypes.STRING,
    allowNull: true,
   
  },
  proposal_basket_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  car_registration_number: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

Proposal.belongsTo(Company, { foreignKey: "client_id", as: "client" });
Proposal.belongsTo(Company, { foreignKey: "company_id", as: "company" });
Proposal.belongsTo(Company, { foreignKey: "broker_id", as: "broker" });

Proposal.hasMany(ProposalWarehouseStatus, {
  foreignKey: "proposal_id",
  as: "warehouse_statuses",
});

ProposalWarehouseStatus.belongsTo(Proposal, {
  foreignKey: "proposal_id",
  as: "proposal",
});

Proposal.hasMany(ProposalLocalExpenses, {
  foreignKey: "proposal_id",
  as: "local_expenses",
  onDelete: "CASCADE",
});

ProposalLocalExpenses.belongsTo(Proposal, {
  foreignKey: "proposal_id",
});

Proposal.belongsTo(User, {
  foreignKey: "sales_manager_id",
  as: "sales_manager",
});

module.exports = Proposal;
