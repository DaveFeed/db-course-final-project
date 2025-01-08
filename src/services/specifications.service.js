const {
  Materials: MaterialsModel,
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
      equipmentId, materialId, quantity, name, duration,
    } = data;

    const created = await SpecificationsModel.create(
      {
        equipmentId,
        materialId,
        quantity,
        name,
        duration,
      },
      { transaction },
    );

    return created;
  },

  edit: async (id, data, transaction) => {
    const {
      equipmentId, materialId, quantity, name, duration,
    } = data;

    const [edited] = await SpecificationsModel.update(
      {
        equipmentId,
        materialId,
        quantity,
        name,
        duration,
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

    return SpecificationsModel.findAndCountAll({
      where: {
        ...(search?.on && {
          [search.scope]: { [$iLike]: `%${search.on}%` },
        }),
      },
      include: [
        {
          model: EquipmentsModel,
          as: 'equipment',
          required: true,
        },
        {
          model: MaterialsModel,
          as: 'material',
          required: true,
        },
      ],
      order: [[on, direction]],
      limit,
      offset,
      transaction,
    });
  },

  getById: async (id, transaction) => SpecificationsModel.findByPk(id, { transaction }),

  delete: async (id, transaction) => {
    await SpecificationsModel.destroy({
      where: { id },
      transaction,
    });
  },

  getQuantityUsed: async (options, transaction) => {
    const {
      pagination: { limit, offset },
      search,
    } = options;

    const count = await SpecificationsModel.count({
      where: {
        ...(search?.on && {
          [search.scope]: { [$iLike]: `%${search.on}%` },
        }),
      },
      transaction,
      distinct: true,
      col: 'name',
    });

    const rows = await SpecificationsModel.findAll({
      attributes: [
        'name',
        [Sequelize.fn('sum', Sequelize.col('quantity')), 'quantity'],
      ],
      group: ['name'],
      where: {
        ...(search?.on && {
          [search.scope]: { [$iLike]: `%${search.on}%` },
        }),
      },
      limit,
      offset,
      transaction,
    });

    return { count, rows };
  },

  getMetalSpecifications: async (options, transaction) => {
    const {
      pagination: { limit, offset },
      search,
    } = options;

    return SpecificationsModel.findAndCountAll({
      where: {
        ...(search?.on && {
          [search.scope]: { [$iLike]: `%${search.on}%` },
        }),
      },
      include: [
        {
          model: MaterialsModel,
          as: 'material',
          required: true,
          where: {
            type: 'Metal',
          },
        },
      ],
      limit,
      offset,
      transaction,
    });
  },
};
