const User = require("../models/authSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signUp = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user" });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ username }, "secret-key", {
      expiresIn: "1h",
    });

    res.json({ message: "Login Successfull", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging in" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { username, newUser, newPass } = req.body;

    const user = await User.findOne({ username });

    if (!user) return res.status(404).json({ message: "User not found" });

    if (newUser) user.username = newUser;
    if (newPass) {
      const hashedPassword = await bcrypt.hash(newPass, 10);
      user.password = hashedPassword;
    }
    await user.save();

    res.json({ message: "User updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating user" });
  }
};

exports.searchUser = async (req, res) => {
  try {
    const { searchQuery } = req.query;

    const user = await User.find({
      username: { $regex: searchQuery, $options: "i" },
    });

    res.json({ message: "User is found", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error searching user" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const result = await User.deleteOne({ _id: userId });

    if (result.deletedCount === 0)
      return res.status(404).json({ message: "User not found" });

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting user" });
  }
};
