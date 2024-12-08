const Router = require('express').Router();
const { validate, Joi } = require('express-validation');
const MaterialsController = require('../../controllers/materials.controller');
const { validationOptions } = require('../../utils/defaults');

// Basic CRUD
Router.post(
  '/',
  validate(
    {
      body: Joi.object({
        name: Joi.string().trim().required(),
        type: Joi.string().trim().required(),
        price: Joi.number().min(0).allow(null).optional(),
        measurementUnit: Joi.string().trim().allow(null).optional(),
        alternative: Joi.number().integer().positive().allow(null)
          .optional(),
      }),
    },
    validationOptions,
  ),
  MaterialsController.create,
);

Router.put(
  '/:id',
  validate(
    {
      params: Joi.object({
        id: Joi.number().integer().positive().required(),
      }),
      body: Joi.object({
        name: Joi.string().trim().optional(),
        type: Joi.string().trim().optional(),
        price: Joi.number().min(0).allow(null).optional(),
        measurementUnit: Joi.string().trim().allow(null).optional(),
        alternative: Joi.number().integer().positive().allow(null)
          .optional(),
      }).min(1),
    },
    validationOptions,
  ),
  MaterialsController.edit,
);

Router.get(
  '/',
  validate(
    {
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
          .valid('name', 'type', 'price', 'measurementUnit')
          .default('name'),
        orderDirection: Joi.string()
          .lowercase()
          .trim()
          .valid('asc', 'desc')
          .default('asc'),
      }).default({
        limit: 50,
        offset: 0,
        search: null,
        searchScope: 'all',
        order: 'startDate',
        orderDirection: 'asc',
      }),
    },
    validationOptions,
  ),
  MaterialsController.getAll,
);

Router.get(
  '/:id',
  validate(
    {
      params: Joi.object({
        id: Joi.number().integer().positive().required(),
      }),
    },
    validationOptions,
  ),
  MaterialsController.getById,
);

Router.delete(
  '/:id',
  validate(
    {
      params: Joi.object({
        id: Joi.number().integer().positive().required(),
      }),
    },
    validationOptions,
  ),
  MaterialsController.delete,
);

module.exports = Router;
