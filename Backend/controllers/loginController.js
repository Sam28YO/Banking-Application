const User = require("../models/logindetailsSchema");
const bcrypt = require("bcrypt");

const userController = {

  loginUser: async (req, res) => {
    const { username, password } = req.body;

    try {
      // Find the user by username
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
