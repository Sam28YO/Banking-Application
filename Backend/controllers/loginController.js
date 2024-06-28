const User = require("../models/userSchema");
const bcrypt = require("bcrypt");

const userController = {
  registerUser: async (req, res) => {
    const { username, password, confirmPassword } = req.body;

    try {
      let existingUser = await User.findOne({ username });

      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Username already exists",
        });
      }

      const newUser = new User({
        username,
        password,
        confirmPassword,
      });

      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(password, salt);

      await newUser.save();

      return res.status(201).json({
        success: true,
        message: "User registered successfully",
        user: {
          _id: newUser._id,
          username: newUser.username,
        },
      });
    } catch (error) {
      console.error("Error in Register User API:", error);
      return res.status(500).json({
        success: false,
        message: "Error in Register User API",
        error: error.message,
      });
    }
  },

  loginUser: async (req, res) => {
    const { username, password } = req.body;

    try {
      let user = await User.findOne({ username });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: "Invalid credentials",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Login successful",
        user: {
          _id: user._id,
          username: user.username,
        },
      });
    } catch (error) {
      console.error("Error in Login User API:", error);
      return res.status(500).json({
        success: false,
        message: "Error in Login User API",
        error: error.message,
      });
    }
  },
};

module.exports = userController;
