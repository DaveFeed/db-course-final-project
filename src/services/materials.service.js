const {
  Materials: MaterialsModel,
  Specifications: SpecificationsModel,
  Sequelize,
} = require('../../db');
const { NotFoundError } = require('../utils/errors');

const {
  Op: { iLike: $iLike },
} = Sequelize;

module.exports = {
  create: async (data, transaction) => {
    const {
      name, type, price, measurementUnit, alternative,
    } = data;

    const created = await MaterialsModel.create(
      {
        name,
        type,
        price,
        measurementUnit,
        alternative,
      },
      { transaction },
    );

    return created;
  },

  edit: async (id, data, transaction) => {
    const {
      name, type, price, measurementUnit, alternative,
    } = data;

    const [edited] = await MaterialsModel.update(
      {
        name,
        type,
        price,
        measurementUnit,
        alternative,
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

    return MaterialsModel.findAndCountAll({
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

  getById: async (id, transaction) => MaterialsModel.findByPk(id, { transaction }),

  delete: async (id, transaction) => {
    await MaterialsModel.destroy({
      where: { id },
      transaction,
    });
  },

  getNotUsed: async (options, transaction) => {
    const {
      pagination: { limit, offset },
      search,
      order: { on, direction },
    } = options;

    return MaterialsModel.findAndCountAll({
      where: {
        ...(search?.on && {
          [search.scope]: { [$iLike]: `%${search.on}%` },
        }),
        // todo:: (test) check if this is correct
        '$specifications.id$': null,
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

  setAlternativeByName: async (type, alternative, transaction) => {
    const alternativeMaterial = await MaterialsModel.findOne({
      where: { name: alternative },
      transaction,
    });

    if (!alternativeMaterial) {
      throw new NotFoundError('Alternative material not found');
    }

    await MaterialsModel.update(
      {
        alternative: alternativeMaterial.id,
      },
      {
        where: {
          id: { [Sequelize.Op.ne]: alternativeMaterial.id },
          alternative: null,
          type,
        },
        transaction,
      },
    );
  },
};
