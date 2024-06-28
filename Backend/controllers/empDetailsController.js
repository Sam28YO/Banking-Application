const Employment = require("../models/employmentSchema");

const employmentController = {
  registerEmployment: async (req, res) => {
    const { employmentStatus, industry, occupation, annualIncome } = req.body;

    try {
      const employment = new Employment({
        employmentStatus,
        industry,
        occupation,
        annualIncome,
      });

      await employment.save();

      return res.status(201).send({
        success: true,
        message: "Employment details registered successfully",
        employment,
      });
    } catch (error) {
      console.error("Error in Register Employment API:", error);
      return res.status(500).send({
        success: false,
        message: "Error in Register Employment API",
        error: error.message,
      });
    }
  },
};

module.exports = employmentController;
