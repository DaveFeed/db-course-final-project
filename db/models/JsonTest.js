const DataTypes = require('sequelize');

const JsonTestSchema = {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  data: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
};

module.exports = (seq) => {
  const model = seq.define('JsonTest', JsonTestSchema, {
    tableName: 'json_test',
    timestamps: false,
    freezeTableName: true,
  });

  model.associate = (models) => {
    //
  };

  return model;
};
