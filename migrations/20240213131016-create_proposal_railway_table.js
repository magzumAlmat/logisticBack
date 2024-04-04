"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("ProposalRailways", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      client_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Companies",
          key: "id",
        },
      },
      agent_knr_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Companies",
          key: "id",
        },
      },
      broker_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Companies",
          key: "id",
        },
      },
      sender: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      proposal_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      route: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      rate_rk_dollars: {
        type: Sequelize.DECIMAL(20, 2),
        allowNull: true,
      },
      rate_knr_dollars: {
        type: Sequelize.DECIMAL(20, 2),
        allowNull: true,
      },
      price_kzt: {
        type: Sequelize.DECIMAL(20, 2),
        allowNull: true,
      },
      status_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      status_date_description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      sales_manager_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      cargo_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      container_type: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      container_number: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      quantity: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      weight: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      volume: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      insurance: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      insurance_value: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      prepayment_knr: {
        type: Sequelize.DECIMAL(20, 2),
        allowNull: true,
      },
      prepayment_rk: {
        type: Sequelize.DECIMAL(20, 2),
        allowNull: true,
      },
      payment_percent_rk: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      payment_percent_knr: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      extra_services: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      usd_exchange_rate: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      price_knr: {
        type: Sequelize.DECIMAL(20, 2),
        allowNull: true,
      },
      proposal_status: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      account_number: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("ProposalRailways");
  },
};
