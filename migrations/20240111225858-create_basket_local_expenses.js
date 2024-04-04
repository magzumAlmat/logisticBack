module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("ProposalBasketLocalExpenses", {
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
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      currency: {
        type: Sequelize.STRING,
        allowNull: false,
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

    await queryInterface.addConstraint("ProposalBasketLocalExpenses", {
      fields: ["proposal_basket_id"],
      type: "foreign key",
      name: "fk_proposal_basket_local_expense",
      references: {
        table: "ProposalBaskets", // Replace with the actual table name for ProposalBaskets
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("ProposalBasketLocalExpenses");
  },
};
