const {
  Materials: MaterialsModel,
  Specifications: SpecificationsModel,
  Sequelize,
  sequelize,
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
    // orm failed doing left exclusion join

    const query = `
      SELECT m.*
      FROM materials m
      LEFT JOIN specifications s ON m.id = s.material_id
      WHERE s.material_id IS NULL
      ${search?.on ? `AND m."${search.scope}" ILIKE :search` : ''}
      ORDER BY m."${on}" ${direction}
      LIMIT :limit OFFSET :offset
    `;

    const countQuery = `
      SELECT COUNT(*) AS total_count
      FROM materials m
      LEFT JOIN specifications s ON m.id = s.material_id
      WHERE s.material_id IS NULL
      ${search?.on ? `AND m."${search.scope}" ILIKE :search` : ''}
    `;

    const replacements = {
      limit,
      offset,
      ...(search?.on && { search: `%${search.on}%` }),
    };

    const [results] = await sequelize.query(query, {
      replacements,
      transaction,
    });

    const [countResult] = await sequelize.query(countQuery, {
      replacements,
      transaction,
    });

    return {
      rows: results,
      count: parseInt(countResult[0].total_count, 10),
    };
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
