const moment = require('moment');
const {
  Equipments: EquipmentsModel,
  Specifications: SpecificationsModel,
  Sequelize,
} = require('../../db');

const {
  Op: { iLike: $iLike },
} = Sequelize;

module.exports = {
  create: async (data, transaction) => {
    const {
      name, manufacturer, startDate, expDate,
    } = data;

    const created = await EquipmentsModel.create(
      {
        name,
        manufacturer,
        startDate: moment.utc(startDate),
        expDate: moment.utc(expDate),
      },
      { transaction },
    );

    return created;
  },

  edit: async (id, data, transaction) => {
    const {
      name, manufacturer, startDate, expDate,
    } = data;

    const [edited] = await EquipmentsModel.update(
      {
        name,
        manufacturer,
        startDate: moment.utc(startDate),
        expDate: moment.utc(expDate),
      },
      {
        where: { id },
        transaction,
      },
    ).returning('*');

    return edited;
  },

  getAll: async (options, transaction) => {
    const {
      pagination: { limit, offset },
      search,
      order: { on, direction },
    } = options;

    return EquipmentsModel.findAndCountAll({
      where: {
        ...(search?.on && {
          [search.scope]: { [$iLike]: `%${search.on}%` },
        }),
      },
      include: [
        {
          model: SpecificationsModel,
          as: 'specifications',
          required: false,
        },
      ],
      order: [[on, direction]],
      limit,
      offset,
      transaction,
    });
  },

  getById: async (id, transaction) => EquipmentsModel.findByPk(id, { transaction }),

  delete: async (id, transaction) => {
    await EquipmentsModel.destroy({
      where: { id },
      transaction,
    });
  },

  getInUse: async (options, transaction) => {
    const {
      pagination: { limit, offset },
      search,
      order: { on, direction },
    } = options;

    return EquipmentsModel.findAndCountAll({
      where: {
        [Sequelize.Op.or]: [
          { expDate: { [Sequelize.Op.gt]: moment.utc() } },
          { expDate: null },
        ],
        startDate: { [Sequelize.Op.lt]: moment.utc() },
        ...(search?.on && {
          [search.scope]: { [$iLike]: `%${search.on}%` },
        }),
      },
      include: [
        {
          model: SpecificationsModel,
          as: 'specifications',
          required: false,
        },
      ],
      order: [[on, direction]],
      limit,
      offset,
      transaction,
    });
  },
};
