module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.addIndex('equipments', ['name'], { transaction });
      await queryInterface.addIndex('materials', ['type'], { transaction });
      await queryInterface.addIndex('specifications', ['equipment_id', 'material_id'], { transaction });
    });
  },

  async down(queryInterface) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.removeIndex('equipments', ['name'], { transaction });
      await queryInterface.removeIndex('materials', ['type'], { transaction });
      await queryInterface.removeIndex('specifications', ['equipment_id', 'material_id'], { transaction });
    });
  },
};
