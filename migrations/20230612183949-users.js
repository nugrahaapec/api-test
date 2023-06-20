"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "user",
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        nama: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        nik: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        username: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      },
      {
        tableName: "user",
        timestamps: true,
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("user");
  },
};
