const { ValidationError } = require('express-validation');

module.exports = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    res.status(err?.status || 422).send({ message: err?.details[0] || '' });
    return;
  }

  return res
    .status(err.status || 409)
    .send({ message: err.message || '', errorName: err.statusName });
};
