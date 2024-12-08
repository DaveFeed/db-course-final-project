const DataTypes = require('sequelize');
const moment = require('moment');

const EquipmentsOptions = {
  tableName: 'equipments',
  timestamps: false,
  freezeTableName: true,
};

const EquipmentsSchema = {
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
  manufacturer: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  startDate: {
    field: 'start_date',
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: true,
    get() {
      return moment.utc(this.getDataValue('startDate')).format('YYYY-MM-DD HH:mm:ss');
    },
  },
  expDate: {
    field: 'exp_date',
    type: DataTypes.DATE,
    allowNull: true,
    get() {
      return moment.utc(this.getDataValue('expDate')).format('YYYY-MM-DD HH:mm:ss');
    },
  },
};

const EquipmentsAssociation = (schema) => {
  schema.Equipments.hasMany(schema.Specifications, {
    as: 'specifications',
    // todo:: (check) maybe need to be changed to snake case
    foreignKey: 'equipmentId',
    sourceKey: 'id',
  });
};

module.exports = (seq) => {
  const model = seq.define('Equipments', EquipmentsSchema, EquipmentsOptions);
  model.associate = EquipmentsAssociation;
  return model;
};
