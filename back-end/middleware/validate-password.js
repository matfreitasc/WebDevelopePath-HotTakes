const passwordSchema = require('../models/Password');

module.exports = (req, res, next) => {
  if (req.body.password) {
    const password = req.body.password;
    if (!passwordSchema.validate(password)) {
      return res
        .status(401)
        .json({
          error: new Error('Password must be at least 8 characters long'),
        });
    }
  }
  next();
};
