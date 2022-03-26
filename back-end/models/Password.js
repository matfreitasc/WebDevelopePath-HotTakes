const passwordValidator = require('password-validator');

let passwordSchema = new passwordValidator();
passwordSchema
  .is()
  .min(8, ' Password must be at least 8 characters')
  .is()
  .max(100, ' Password must be at max 100 characters')
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits() // Must have digits
  .has()
  .not()
  .spaces() // Should not have spaces
  .is()
  .not()
  .oneOf([
    'Passw0rd',
    'Password123',
    '123456',
    '123456789',
    'qwerty',
    'password',
    '12345',
    'qwerty123',
    '1q2w3e',
    '12345678',
    '111111',
    '1234567890',
  ]); // Blacklist these values

module.exports = passwordSchema;
