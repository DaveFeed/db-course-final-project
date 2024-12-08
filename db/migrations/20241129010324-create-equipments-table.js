module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('equipments', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      manufacturer: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      start_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: true,
      },
      exp_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  down(queryInterface) {
    return queryInterface.dropTable('equipments');
  },
};
