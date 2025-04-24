"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "roles",
      [
        {
          name: "Admin",
          description: "Admin Role",
        },
        {
          name: "Employee",
          description: "Employee Role",
        },
        {
          name: "Client",
          description: "Client Role",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {},
};
