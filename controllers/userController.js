import User from '../models/User.js'
import { signToken } from '../utils/auth.js';


//GET /api/users
export async function getUsers(req, res) {
  try {
    const users = await User.find();

    res.status(201).json(users);
  } catch (err) {
    res.status(400).json({ message: "Error getting users", error: err.message });
  }
}



//POST /api/users/register
export async function registerUser(req, res) {
  try {
    const { username, email, password } = req.body;

    // Check if a user with the given email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "A user with that email already exists" });
    }

    const user = await User.create({ username, email, password });

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (err) {
    res.status(400).json({ message: "Error creating user", error: err.message });
  }
}

// POST /api/users/login
export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });//user in the database with the matching email

    // if user is not found that means the email is invalid
    //or
    //if user is found and password is incorrect
    if (!user || !(await user.isCorrectPassword(password))) {
      return res.status(401).json({ message: "Incorrect email or password" });
    }

    const token = signToken(user);

    res.json({
      message: "Login successful",
      user: { _id: user._id, username: user.username, email: user.email },
      token,
    });
  } catch (err) {
    res.status(500).json({ message: "Error logging in", error: err.message });
  }
}