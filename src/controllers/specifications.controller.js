const SpecificationsService = require('../services/specifications.service');

module.exports = {
  create: async (req, res, next) => {
    const {
      equipmentId, materialId, quantity, name, duration,
    } = req.body;

    const created = await SpecificationsService.create({
      equipmentId,
      materialId,
      quantity,
      name,
      duration,
    });

    res.status(200).json({
      message: 'Success',
      result: created,
    });
  },

  edit: async (req, res, next) => {
    const { id } = req.params;
    const {
      equipmentId, materialId, quantity, name, duration,
    } = req.body;

    const edited = await SpecificationsService.edit(id, {
      equipmentId,
      materialId,
      quantity,
      name,
      duration,
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

    const all = await SpecificationsService.getAll({
      pagination: {
        limit,
        offset,
      },
      ...(search && {
        search: {
          on: search,
          scope: searchScope,
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

    const specification = await SpecificationsService.getById(id);

    res.status(200).json({
      message: 'Success',
      result: specification,
    });
  },

  delete: async (req, res, next) => {
    const { id } = req.params;

    await SpecificationsService.delete(id);

    res.status(200).json({
      message: 'Success',
    });
  },

  getQuantityUsed: async (req, res, next) => {
    const { limit, offset, search } = req.query;

    const all = await SpecificationsService.getQuantityUsed({
      pagination: {
        limit,
        offset,
      },
      ...(search && {
        search: {
          on: search,
          scope: 'name',
        },
      }),
    });

    res.status(200).json({
      message: 'Success',
      result: all,
    });
  },

  getMetalSpecifications: async (req, res, next) => {
    const { limit, offset, search } = req.query;

    const all = await SpecificationsService.getMetalSpecifications({
      pagination: {
        limit,
        offset,
      },
      ...(search && {
        search: {
          on: search,
          scope: 'name',
        },
      }),
    });

    res.status(200).json({
      message: 'Success',
      result: all,
    });
  },
};
