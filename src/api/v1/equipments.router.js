const Router = require('express').Router();
const { validate, Joi } = require('express-validation');
const EquipmentsController = require('../../controllers/equipments.controller');

// Basic CRUD
Router.post(
  '/',
  validate({
    body: Joi.object({
      name: Joi.string().trim().required(),
      manufacturer: Joi.string().trim().allow(null).optional(),
      startDate: Joi.date().iso().allow(null).optional(),
      expDate: Joi.date().iso().allow(null).optional(),
    }),
  }),
  EquipmentsController.create,
);

Router.put(
  '/:id',
  validate({
    params: Joi.object({
      id: Joi.number().integer().positive().required(),
    }),
    body: Joi.object({
      name: Joi.string().trim().optional(),
      manufacturer: Joi.string().trim().allow(null).optional(),
      startDate: Joi.date().iso().allow(null).optional(),
      expDate: Joi.date().iso().allow(null).optional(),
    }).min(1),
  }),
  EquipmentsController.edit,
);

Router.get(
  '/',
  validate({
    query: Joi.object({
      limit: Joi.number().integer().positive().max(100)
        .default(50),
      offset: Joi.number().integer().min(0).default(0),
      search: Joi.string().allow(null, '').optional(),
      // todo:: (change) could be moved into enum
      searchScope: Joi.string()
        .lowercase()
        .trim()
        .valid('name', 'manufacturer', 'all')
        .default('all'),
      // todo:: (change) could be moved into enum
      order: Joi.string()
        .trim()
        .valid('name', 'manufacturer', 'startDate', 'expDate')
        .default('startDate'),
      orderDirection: Joi.string()
        .lowercase()
        .trim()
        .valid('asc', 'desc')
        .default('asc'),
    }),
  }),
  EquipmentsController.getAll,
);

Router.get(
  '/:id',
  validate({
    params: Joi.object({
      id: Joi.number().integer().positive().required(),
    }),
  }),
  EquipmentsController.getById,
);

Router.delete(
  '/:id',
  validate({
    params: {
      id: Joi.number().integer().positive().required(),
    },
  }),
  EquipmentsController.delete,
);

module.exports = Router;
