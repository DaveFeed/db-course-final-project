const Router = require('express').Router();
const EquipmentsController = require('../../controllers/equipments.controller');

// Basic CRUD
Router.post('/', EquipmentsController.create);
Router.put('/:id', EquipmentsController.edit);
Router.get('/', EquipmentsController.getAll);
Router.get('/:id', EquipmentsController.getById);
Router.delete('/:id', EquipmentsController.delete);

module.exports = Router;
