const DataTypes = require('sequelize');
const moment = require('moment');

const SpecificationsOptions = {
  tableName: 'specifications',
  timestamps: false,
  freezeTableName: true,
};

const SpecificationsSchema = {
  equipmentId: {
    field: 'equipment_id',
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    references: {
      model: 'equipments',
      key: 'id',
    },
    onDelete: 'cascade',
  },
  materialId: {
    field: 'material_id',
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    references: {
      model: 'materials',
      key: 'id',
    },
    onDelete: 'cascade',
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  duration: {
    type: DataTypes.DECIMAL,
    allowNull: true,
  },
};

const SpecificationsAssociations = (schema) => {
  schema.Specifications.belongsTo(schema.Equipments, {
    as: 'equipment',
    // todo:: (check) maybe need to be changed to snake case
    foreignKey: 'equipmentId',
    sourceKey: 'id',
  });

  schema.Specifications.belongsTo(schema.Materials, {
    as: 'material',
    // todo:: (check) maybe need to be changed to snake case
    foreignKey: 'materialId',
    sourceKey: 'id',
  });
};

module.exports = (seq) => {
  const model = seq.define('Specifications', SpecificationsSchema, SpecificationsOptions);

  // Remove attribute is needed because no primary key is defined in the table (defaults to id by sequelize)
  model.removeAttribute('id');

  model.associate = SpecificationsAssociations;
  return model;
};
