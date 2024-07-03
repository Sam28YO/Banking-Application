const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone number is required"],
    match: /^\d{10}$/, // Example: 10-digit phone number validation
  },
  address: {
    street: {
      type: String,
      required: [true, "Street address is required"],
      trim: true,
    },
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
    },
    state: {
      type: String,
      required: [true, "State is required"],
      trim: true,
    },
    zipCode: {
      type: String,
      required: [true, "ZIP code is required"],
      trim: true,
      match: /^\d{5}(-\d{4})?$/, // ZIP code format validation
    },
    country: {
      type: String,
      required: [true, "Country is required"],
      trim: true,
    },
  },
  dateOfBirth: {
    type: Date,
    required: [true, "Date of birth is required"],
  },

  password: {
    type: String,
    required: [true, "password is required"],
  },
});

module.exports = mongoose.model("Customer", customerSchema);
