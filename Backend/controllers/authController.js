const customerSchema = require("../models/customerSchema");

const registerController = async (req, res) => {
  try {
    const existingCustomer = await customerSchema.findOne({
      email: req.body.email,
    });
    //validation
    if (existingCustomer) {
      return res.status(200).send({
        success: false,
        message: "User already Exists",
      });
    }

    //Saving Customer Data
    const customer = new customerSchema(req.body);
    await customer.save();
    return res.status(201).send({
      success: true,
      message: "Customer registered successfully",
      customer,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Register API",
      error,
    });
  }
};

module.exports = { registerController };