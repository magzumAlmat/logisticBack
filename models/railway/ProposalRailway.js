const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");
const Company = require("../Company");
const User = require("../User");

const ProposalRailway = sequelize.define("ProposalRailway", {
  // Получатель
  client_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Company,
      key: "id",
    },
  },
  // Агент КНР
  agent_knr_id: {
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
  // Отправитель
  sender: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  proposal_number: {
    type: DataTypes.STRING, // Если есть буквы в числе
    allowNull: false,
  },
  route: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rate_rk_dollars: {
    type: DataTypes.DECIMAL(20, 2),
    allowNull: true,
    decimals: true,
  },
  rate_knr_dollars: {
    type: DataTypes.DECIMAL(20, 2),
    allowNull: true,
    decimals: true,
  },
  price_kzt: {
    type: DataTypes.DECIMAL(20, 2),
    allowNull: true,
    decimals: true,
  },
  status_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  status_date_description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  sales_manager_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cargo_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  container_type: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  container_number: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  quantity: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    decimals: true,
  },
  weight: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    decimals: true,
  },
  volume: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    decimals: true,
  },
  insurance: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  insurance_value: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  prepayment_knr: {
    type: DataTypes.DECIMAL(20, 2),
    allowNull: true,
    decimals: true,
  },
  prepayment_rk: {
    type: DataTypes.DECIMAL(20, 2),
    allowNull: true,
    decimals: true,
  },
  payment_percent_rk: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  payment_percent_knr: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  extra_services: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  usd_exchange_rate: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    decimals: true,
  },
  price_knr: {
    type: DataTypes.DECIMAL(20, 2),
    allowNull: true,
    decimals: true,
  },
  proposal_status: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  account_number: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

ProposalRailway.belongsTo(Company, { foreignKey: "client_id", as: "client" });
ProposalRailway.belongsTo(Company, {
  foreignKey: "agent_knr_id",
  as: "agent_knr",
});
ProposalRailway.belongsTo(Company, { foreignKey: "broker_id", as: "broker" });

ProposalRailway.belongsTo(User, {
  foreignKey: "sales_manager_id",
  as: "sales_manager",
});

module.exports = ProposalRailway;
