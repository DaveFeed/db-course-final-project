const Router = require('express').Router();
const { validate, Joi } = require('express-validation');
const { validationOptions } = require('../../utils/defaults');
const { JsonTest: JsonTestModel, Sequelize } = require('../../../db');

// Basic CRUD
Router.get(
  '/',
  validate(
    {
      query: Joi.object({
        search: Joi.string().trim().required(),
      }),
    },
    validationOptions,
  ),
  async (req, res, next) => {
    // Not secure to allow user input as regex search but :shrug: :)
    const { search } = req.query;

    // Couldn't get to trigger the index on the jsonb column
    const result = await JsonTestModel.sequelize.query(
      'SELECT * FROM json_test WHERE CAST("data" AS TEXT) ~* :search',
      {
        replacements: { search },
        type: Sequelize.QueryTypes.SELECT,
      },
    );

    res.status(200).json({
      message: 'Success',
      result,
    });
  },
);

module.exports = Router;
