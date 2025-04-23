const Customer = require("../models/Customer");
const bcrypt = require("bcrypt");

//new customer
exports.getNewCustomer = (req, res) => {
  res.render("pages/new.ejs");
};

//POST a new Customer
exports.createCustomer = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!",
      });
    }

    //hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newCustomer = await Customer.create({
      name,
      email,
      password: hashedPassword,
    });

    console.log(newCustomer);
    res.redirect("/");
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

//GET all Customers
exports.getCustomers = async (req, res) => {
  try {
    const response = await Customer.find({});

    res.render("index.ejs", { data: response });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

//GET a Customer by id
exports.viewCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Customer.findById(id);
    return res.status(200).json({
      success: true,
      data: response,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

//UPDATE a Customer
exports.updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const response = await Customer.findByIdAndUpdate(
      { _id: id },
      [name, email, password],
      { new: true }
    );

    return res.status(200).json({
      success: true,
      data: response,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

//DELETE a customer
exports.deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    await Customer.findByIdAndDelete(id);

    return res.status(200).json({
      success: false,
      message: "Customer deleted!",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
