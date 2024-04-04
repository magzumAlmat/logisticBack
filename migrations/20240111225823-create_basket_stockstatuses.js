module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("ProposalBasketStockStatuses", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      proposal_basket_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "ProposalBaskets", // Replace with the actual table name for ProposalBaskets
          key: "id",
        },
      },
      stage: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      description: {
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

    await queryInterface.addConstraint("ProposalBasketStockStatuses", {
      fields: ["proposal_basket_id"],
      type: "foreign key",
      name: "fk_proposal_basket_stock_status",
      references: {
        table: "ProposalBaskets", // Replace with the actual table name for ProposalBaskets
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("ProposalBasketStockStatuses");
  },
};
