module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("BasketCarNumbers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      company_car: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "CompanyCarNumbers",
          key: "id",
        },
      },
      proposal_basket_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "ProposalBaskets",
          key: "id",
        },
      },
      frakht: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      frakht_currency: {
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
  down: async (queryInterface) => {
    await queryInterface.dropTable("BasketCarNumbers");
  },
};
