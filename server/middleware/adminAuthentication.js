import jwt from 'jsonwebtoken';
import AdminLoginUser from '../models/adminLoginModel.js';

const adminAuthentication = async (req, res, next) => {
  try {
    const token = req.cookies.adminToken;
    if (!token) {
      return res.status(401).json({ authenticated: false, message: 'No token provided' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ authenticated: false, message: 'Invalid token' });
  }
};

export default adminAuthentication;