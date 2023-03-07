const { validationResult } = require('express-validator');

const validateResulto = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  } else {
    res.status(403);
    res.send({ errors: errors.array() });
  }
};

module.exports = { validateResulto };