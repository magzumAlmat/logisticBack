module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("SpecProposals", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      client_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Companies",
          key: "id",
        },
      },
      company_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Companies",
          key: "id",
        },
      },
      broker_id: {
        // Из отдельной таблицы с компаниями
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Companies",
          key: "id",
        },
      },
      proposal_number: {
        type: Sequelize.STRING, // Если есть буквы в числе
        allowNull: false,
      },
      location_from: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      location_to: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      declared_rate_usd: {
        type: Sequelize.DECIMAL(20, 2),
        allowNull: false,
        decimals: true,
      },
      actual_rate_usd: {
        type: Sequelize.DECIMAL(20, 2),
        allowNull: true,
        decimals: true,
      },
      invoices_count: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
        decimals: true,
      },
      rate_kzt: {
        type: Sequelize.DECIMAL(20, 2),
        allowNull: true,
        decimals: true,
      },
      prepayment: {
        type: Sequelize.DECIMAL(20, 2),
        allowNull: true,
        decimals: true,
      },
      prepayment_rate: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      payment_percent: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
        decimals: true,
      },
      account_number: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      account_number_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      avr_number: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      avr_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      accountant_note: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      accountant_note_color: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      invoice: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      invoice_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      arrival_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      loading_list_number: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      sales_manager_id: {
        // FIX: Добавить модель USER и указать связь
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      proposal_status: {
        // 1 - В работе, 2 - Согласовано
        type: Sequelize.STRING,
        allowNull: false,
      },
      cargo_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cargo_type: {
        // Габарит Не Габарит (Требует уточнения)
        type: Sequelize.STRING,
        allowNull: true,
      },
      cargo_value: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
        decimals: true,
      },
      cargo_value_currency: {
        type: Sequelize.STRING,
        decimals: true,
      },
      declared_quantity: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        decimals: true,
      },
      actual_quantity: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
        decimals: true,
      },
      declared_weight: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        decimals: true,
      },
      actual_weight: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
        decimals: true,
      },
      declared_dshv: {
        type: Sequelize.STRING,
        allowNull: false,
      
      },
      actual_dshv: {
        type: Sequelize.STRING,
        allowNull: true,
       
      },
      car_registration_number: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      proposal_basket_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      pickup_date: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable("SpecProposals");
  },
};
