const { body, validationResult } = require("express-validator");

const validateUser = [
  body("email").isEmail().withMessage("Invalid Email Address"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: errors.array()[0].msg,
      });
    }

    next();
  },
];

module.exports = validateUser;
