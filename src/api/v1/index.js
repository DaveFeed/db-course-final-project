const router = require('express').Router();

const equipments = require('./equipments.router');
const materials = require('./materials.router');
const specifications = require('./specifications.router');

router.use('/equipments', equipments);
router.use('/materials', materials);
router.use('/specifications', specifications);

module.exports = router;
