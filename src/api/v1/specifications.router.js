const Router = require('express').Router();
const SpecificationsController = require('../../controllers/specifications.controller');

// Basic CRUD
Router.post('/', SpecificationsController.create);
Router.put('/:id', SpecificationsController.edit);
Router.get('/', SpecificationsController.getAll);
Router.get('/:id', SpecificationsController.getById);
Router.delete('/:id', SpecificationsController.delete);

module.exports = Router;
