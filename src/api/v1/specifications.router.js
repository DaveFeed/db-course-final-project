const Router = require('express').Router();
const { validate, Joi } = require('express-validation');
const SpecificationsController = require('../../controllers/specifications.controller');

// Basic CRUD
Router.post(
  '/',
  validate({
    body: Joi.object({
      equipmentId: Joi.number().integer().positive().required(),
      materialId: Joi.number().integer().positive().required(),
      quantity: Joi.number().min(0).required(),
      name: Joi.string().trim().required(),
      duration: Joi.number().min(0).allow(null).optional(),
    }),
  }),
  SpecificationsController.create,
);

Router.put(
  '/:id',
  validate({
    params: Joi.object({
      id: Joi.number().integer().positive().required(),
    }),
    body: Joi.object({
      equipmentId: Joi.number().integer().positive().optional(),
      materialId: Joi.number().integer().positive().optional(),
      quantity: Joi.number().integer().min(0).optional(),
      name: Joi.string().trim().optional(),
      duration: Joi.number().min(0).allow(null).optional(),
    }).min(1),
  }),
  SpecificationsController.edit,
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
        .valid('name')
        .default('name'),
      // todo:: (change) could be moved into enum
      order: Joi.string()
        .trim()
        .valid('name', 'quantity', 'duration')
        .default('name'),
      orderDirection: Joi.string()
        .lowercase()
        .trim()
        .valid('asc', 'desc')
        .default('asc'),
    }),
  }),
  SpecificationsController.getAll,
);

Router.get(
  '/:id',
  validate({
    params: Joi.object({
      id: Joi.number().integer().positive().required(),
    }),
  }),
  SpecificationsController.getById,
);

Router.delete(
  '/:id',
  validate({
    params: {
      id: Joi.number().integer().positive().required(),
    },
  }),
  SpecificationsController.delete,
);

module.exports = Router;
