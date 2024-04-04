module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("ProposalBaskets", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      proposal_ids: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: false,
      },
      total_quantity: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      total_volume: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      total_weight: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      warehouse_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Warehouses", // Make sure to use the actual table name for Warehouses
          key: "id",
        },
      },
      arrival_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      usd_exchange_rate: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
        decimals: true,
      },
      total_rate_usd: {
        type: Sequelize.DECIMAL(20, 2),
        allowNull: false,
        decimals: true,
      },
      total_rate_kzt: {
        type: Sequelize.DECIMAL(20, 2),
        allowNull: false,
        decimals: true,
      },
      internal_order_number: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      kpp: {
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

    await queryInterface.addConstraint("ProposalBaskets", {
      fields: ["warehouse_id"],
      type: "foreign key",
      name: "fk_proposal_basket_warehouse",
      references: {
        table: "Warehouses", // Make sure to use the actual table name for Warehouses
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("ProposalBaskets");
  },
};
