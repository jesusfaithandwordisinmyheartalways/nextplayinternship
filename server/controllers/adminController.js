import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import AdminLoginUser from '../models/adminLoginModel.js';

dotenv.config();

const AdminLoginFunction = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const usernameRegex = /^(?=.*[A-Z])(?=.*[\W_])[A-Za-z\d\W_]{8,15}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[\W_])[A-Za-z\d\W_]{8,15}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|net|org|edu|gov|io|co)$/i;

    if (!usernameRegex.test(username)) {
      const response = { success: false, message: 'Username must have at least one uppercase letter, one special character, and length between 8-15.', authenticated: false };
      return res.status(400).json(response);
    }

    if (!passwordRegex.test(password)) {
      const response = { success: false, message: 'Password must have at least one uppercase letter, one special character, and length between 8-15.', authenticated: false };
      return res.status(400).json(response);
    }

    if (!emailRegex.test(email)) {
      const response = { success: false, message: 'Invalid Email', authenticated: false };
      return res.status(400).json(response);
    }

    if (username === password) {
      const response = { success: false, message: 'Admin Username & Password cannot be the same.', authenticated: false };
      return res.status(400).json(response);
    }

    
    const admin = await AdminLoginUser.findOne({ username, email });

    if (!admin) {
      const response = { success: false, message: 'Admin not found with provided username and email.', authenticated: false };
      return res.status(403).json(response);
    }

    
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      const response = { success: false, message: 'Invalid password.', authenticated: false };
      return res.status(401).json(response);
    }

    const token = jwt.sign({ id: admin._id, username: admin.username, email: admin.email },process.env.JWT_SECRET,{ expiresIn: '1d' });

    res.cookie('adminToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 1000 * 60 * 60 * 24,
    });



    const successResponse = { success: true, message: 'Admin Login Successfully', authenticated: true };


    return res.status(200).json(successResponse);

  } catch (error) {
    console.error('Admin login error:', error);
    const errorResponse = { success: false, message: 'Admin Server Error', authenticated: false };
    return res.status(500).json(errorResponse);
  }
};




export default AdminLoginFunction;