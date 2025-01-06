const { faker } = require('@faker-js/faker');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.sequelize.query(
        'CREATE EXTENSION IF NOT EXISTS pg_trgm;',
        {
          transaction,
        },
      );

      await queryInterface.createTable(
        'json_test',
        {
          id: {
            type: Sequelize.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          data: {
            type: Sequelize.DataTypes.JSONB,
          },
        },
        { transaction },
      );
      await queryInterface.addIndex('json_test', ['data'], {
        using: 'gin',
        operator: 'jsonb_path_ops',
        transaction,
      });

      // seed a lot of data with faker
      const data = Array.from({ length: 50000 }).map(() => ({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        city: faker.location.streetAddress(),
        country: faker.location.country(),
        zipCode: faker.location.zipCode(),
      }));

      try {
        await queryInterface.bulkInsert(
          'json_test',
          data.map((d) => ({ data: JSON.stringify(d) })),
          { transaction },
        );
      } catch (e) {
        console.log(e);
        throw e;
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.dropTable('json_test', { transaction });
      await queryInterface.sequelize.query(
        'DROP EXTENSION IF EXISTS pg_trgm;',
        {
          transaction,
        },
      );
    });
  },
};
