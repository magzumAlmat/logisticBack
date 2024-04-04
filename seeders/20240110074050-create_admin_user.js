"use strict";

const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash("admin_pandora", 10);

    await queryInterface.bulkInsert(
      "Users",
      [
        {
          full_name: "Администратор",
          email: "admin@pandora",
          password: hashedPassword,
          role: "admin",
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      "Users",
      { email: "admin@example.com" },
      {}
    );
  },
};
