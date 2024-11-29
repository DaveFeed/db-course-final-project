const MaterialsService = require('../services/materials.service');

module.exports = {
  create: async (req, res, next) => {
    const {
      name, type, price, measurementUnit, alternative,
    } = req.body;

    const created = await MaterialsService.create({
      name,
      type,
      price,
      measurementUnit,
      alternative,
    });

    res.status(200).json({
      message: 'Success',
      result: created,
    });
  },

  edit: async (req, res, next) => {
    const { id } = req.params;
    const {
      name, type, price, measurementUnit, alternative,
    } = req.body;

    const edited = await MaterialsService.edit(id, {
      name,
      type,
      price,
      measurementUnit,
      alternative,
    });

    res.status(200).json({
      message: 'Success',
      result: edited,
    });
  },

  getAll: async (req, res, next) => {
    const {
      limit, offset, search, searchScope, order, orderDirection,
    } = req.query;

    const all = await MaterialsService.getAll({
      pagination: {
        limit,
        offset,
      },
      ...(search && {
        search: {
          on: search,
          searchScope,
        },
      }),
      order: {
        on: order,
        direction: orderDirection,
      },
    });

    res.status(200).json({
      message: 'Success',
      result: all,
    });
  },

  getById: async (req, res, next) => {
    const { id } = req.params;

    const material = await MaterialsService.getById(id);

    res.status(200).json({
      message: 'Success',
      result: material,
    });
  },

  delete: async (req, res, next) => {
    const { id } = req.params;

    await MaterialsService.delete(id);

    res.status(200).json({
      message: 'Success',
    });
  },
};
