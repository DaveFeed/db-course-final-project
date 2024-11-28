const Router = require('express').Router();
const MaterialsController = require('../../controllers/materials.controller');

// Basic CRUD
Router.post('/', MaterialsController.create);
Router.put('/:id', MaterialsController.edit);
Router.get('/', MaterialsController.getAll);
Router.get('/:id', MaterialsController.getById);
Router.delete('/:id', MaterialsController.delete);

module.exports = Router;
