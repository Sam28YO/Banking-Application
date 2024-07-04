const mongoose = require("mongoose");
const { Schema } = mongoose;

const employmentSchema = new Schema({
  employmentStatus: {
    type: String,
    required: [true, "Employment status is required"],
    enum: [
      "Full-time employed",
      "Part-time employed",
      "Self-employed",
      "Retired",
      "Student",
      "Not in employment",
    ],
  },
  industry: {
    type: String,
    required: [true, "Industry is required"],
  },
  occupation: {
    type: String,
    required: [true, "Occupation is required"],
  },
  annualIncome: {
    type: String,
    required: [true, "Annual income is required"],
    enum: [
      "£0-£24,999",
      "£25,000-£49,999",
      "£50,000-£99,000",
      "£100,000-£149,999",
      "£150,000+",
    ],
  },
});

const Employment = mongoose.model("Employment", employmentSchema);

module.exports = Employment;
