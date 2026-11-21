import User from '../models/User.js'


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

