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
};
