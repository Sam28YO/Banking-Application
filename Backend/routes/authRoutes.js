const express = require("express");
const { registerController } = require("../controllers/authController.js");
const employmentController = require("../controllers/empDetailsController.js");
const router = express.Router();

//routes
router.post("/register", registerController);
router.post("/employmentDetails", employmentController.registerEmployment);

module.exports = router;
