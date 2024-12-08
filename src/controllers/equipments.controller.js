const EquipmentsService = require('../services/equipments.service');

module.exports = {
  create: async (req, res, next) => {
    const {
      name, manufacturer, startDate, expDate,
    } = req.body;

    const created = await EquipmentsService.create({
      name,
      manufacturer,
      startDate,
      expDate,
    });

    res.status(200).json({
      message: 'Success',
      result: created,
    });
  },

  edit: async (req, res, next) => {
    const { id } = req.params;
    const {
      name, manufacturer, startDate, expDate,
    } = req.body;

    const edited = await EquipmentsService.edit(id, {
      name,
      manufacturer,
      startDate,
      expDate,
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

    const all = await EquipmentsService.getAll({
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

    const equipment = await EquipmentsService.getById(id);

    res.status(200).json({
      message: 'Success',
      result: equipment,
    });
  },

  delete: async (req, res, next) => {
    const { id } = req.params;

    await EquipmentsService.delete(id);

    res.status(200).json({
      message: 'Success',
    });
  },
};
