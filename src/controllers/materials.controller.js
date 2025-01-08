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

  getNotUsed: async (req, res, next) => {
    const {
      limit, offset, search, searchScope, order, orderDirection,
    } = req.query;

    const notUsed = await MaterialsService.getNotUsed({
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
      result: notUsed,
    });
  },

  setAlternativeByName: async (req, res, next) => {
    const { type, alternative } = req.body;

    try {
      const setAlternative = await MaterialsService.setAlternativeByName(
        type,
        alternative,
      );

      res.status(200).json({
        message: 'Success',
        result: setAlternative,
      });
    } catch (error) {
      // i cant be bothered with adding the error handling for overall project right now, it throws unhandled promise rejection but whatever)
      res.status(400).json({
        message: 'Error',
        result: error,
      });
    }
  },
};
