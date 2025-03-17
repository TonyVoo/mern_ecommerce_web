import User from '../models/user.model.js';
import Order from '../models/order.model.js';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.YOUR_GOOGLE_CLIENT_ID);

const generateToken = (userId, isAdmin) => {
    return jwt.sign({ id: userId, isAdmin }, process.env.JWT_SECRET, { expiresIn: "1d" });
  };

export const register = async(req, res) =>{
    try {
        const { name, email, password } = req.body;
        
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: "User already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({ name, email, password: hashedPassword });
    
        const token = generateToken(user.id, user.isAdmin);
    
        res.status(201).json({ token, user: { _id: user.id, name: user.name, email: user.email } });
      } catch (error) {
        res.status(500).json({ message: "Error registering user", error: error.message });
      }
};

export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
  
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      const token = generateToken(user.id, user.isAdmin);
  
      res.json({ token, user: { _id: user.id, name: user.name, email: user.email, isAdmin: user.isAdmin } });
    } catch (error) {
      res.status(500).json({ message: "Error logging in", error: error.message });
    }
};

export const login_google = async (req, res) => {
    try{
      const { idToken } = req.body;
      if (!idToken) return res.status(400).json({ message: "Token ID is required" });
      const ticket = await client.verifyIdToken({ idToken, audience: process.env.YOUR_GOOGLE_CLIENT_ID });
      const { email, name, sub: googleId } = ticket.getPayload();

      let user = await User.findOne({ email });
      if (!user) {
        user = await User.create({ name, email, googleId, isAdmin: false });
      }
  
      const token = generateToken(user.id, user.isAdmin);
      res.json({ token, user: { _id: user.id, name: user.name, email: user.email } });
    } catch (error) {
      res.status(500).json({ message: "Google login failed", error: error.message });
    }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};

export const getUser = (req, res) => {
  res.json({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      isAdmin: req.user.isAdmin,
  });
}

export const getUserOrders = async (req, res) => {
  try {
      console.log("User in request:", req.user);

      const orders = await Order.find({ userId: req.user._id }); 

      console.log("Orders found:", orders);

      if (!orders || orders.length === 0) {
          return res.status(404).json({ message: "No orders found for this user" });
      }

      res.json(orders);
  } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ message: "Error fetching orders", error: error.message });
  }
};
