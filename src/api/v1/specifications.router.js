const Router = require('express').Router();
const { validate, Joi } = require('express-validation');
const SpecificationsController = require('../../controllers/specifications.controller');
const { validationOptions } = require('../../utils/defaults');

// 4: GROUP BY
Router.get(
  '/quantity',
  validate(
    {
      query: Joi.object({
        limit: Joi.number().integer().positive().max(100)
          .default(50),
        offset: Joi.number().integer().min(0).default(0),
        search: Joi.string().allow(null, '').optional(),
      }).default({
        limit: 50,
        offset: 0,
        search: null,
      }),
    },
    validationOptions,
  ),
  SpecificationsController.getQuantityUsed,
);

// 5: SELECT with JOIN
Router.get(
  '/metal-based',
  validate(
    {
      query: Joi.object({
        limit: Joi.number().integer().positive().max(100)
          .default(50),
        offset: Joi.number().integer().min(0).default(0),
        search: Joi.string().allow(null, '').optional(),
      }).default({
        limit: 50,
        offset: 0,
        search: null,
      }),
    },
    validationOptions,
  ),
  SpecificationsController.getMetalSpecifications,
);

// Basic CRUD
Router.post(
  '/',
  validate(
    {
      body: Joi.object({
        equipmentId: Joi.number().integer().positive().required(),
        materialId: Joi.number().integer().positive().required(),
        quantity: Joi.number().min(0).required(),
        name: Joi.string().trim().required(),
        duration: Joi.number().min(0).allow(null).optional(),
      }),
    },
    validationOptions,
  ),
  SpecificationsController.create,
);

Router.put(
  '/:id',
  validate(
    {
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
    },
    validationOptions,
  ),
  SpecificationsController.edit,
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
          .valid('name', 'quantity', 'duration')
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
  SpecificationsController.getAll,
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
  SpecificationsController.getById,
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
  SpecificationsController.delete,
);

module.exports = Router;
