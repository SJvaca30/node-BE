const authController = {};
const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

authController.authenticate = async (req, res, next) => {
  try {
    const tokenString = req.headers.authorization;
    if (!tokenString) {
      return res.status(401).json({ status: 'fail', message: 'invalid token' });
    }
    const token = tokenString.replace('Bearer ', '');
    jwt.verify(token, JWT_SECRET_KEY, (error, payload) => {
      if (error) {
        return res
          .status(401)
          .json({ status: 'fail', message: 'invalid token' });
      }
      req.userId = payload._id;
    });

    next();
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message });
  }
};

module.exports = authController;