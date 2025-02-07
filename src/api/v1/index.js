const router = require('express').Router();

const equipments = require('./equipments.router');
const materials = require('./materials.router');
const specifications = require('./specifications.router');
const testJsonb = require('./test-jsonb.router');

router.use('/equipments', equipments);
router.use('/materials', materials);
router.use('/specifications', specifications);
router.use('/test', testJsonb);

module.exports = router;
