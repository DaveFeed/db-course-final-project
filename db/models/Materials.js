const DataTypes = require('sequelize');

const MaterialsOptions = {
  tableName: 'materials',
  timestamps: false,
  freezeTableName: true,
};

const MaterialsSchema = {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  type: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  price: {
    type: DataTypes.DECIMAL,
    allowNull: true,
  },
  measurementUnit: {
    field: 'measurement_unit',
    type: DataTypes.TEXT,
    allowNull: true,
  },
  alternative: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'materials',
      key: 'id',
    },
  },
};

const MaterialsAssociation = (schema) => {
  schema.Materials.hasMany(schema.Specifications, {
    as: 'specifications',
    // todo:: (check) maybe need to be changed to snake case
    foreignKey: 'materialId',
    sourceKey: 'id',
  });
};

module.exports = (seq) => {
  const model = seq.define('Materials', MaterialsSchema, MaterialsOptions);
  model.associate = MaterialsAssociation;
  return model;
};
