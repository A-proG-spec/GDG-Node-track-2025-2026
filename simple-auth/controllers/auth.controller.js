import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';


const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );
};

export const signup = async (req, res) => {
  try {
    const { full_name, email, password } = req.body;

    if (!full_name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters'
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      });
    }

    const user = await User.create({
      full_name,
      email,
      password
    });

    const token = generateToken(user._id);


    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000 
    });

    
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: {
        id: user._id,
        full_name: user.full_name,
        email: user.email
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

  
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const token = generateToken(user._id);


    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000 
    });

    res.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user._id,
        full_name: user.full_name,
        email: user.email
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


export const getMe = async (req, res) => {
  res.json({
    success: true,
    user: req.user
  });
};

export const logout = async (req, res) => {
  res.cookie('token', 'none', {
    httpOnly: true,
    expires: new Date(Date.now() + 10 * 1000) 
  });

  res.json({
    success: true,
    message: 'Logged out successfully'
  });
};