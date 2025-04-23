const express = require("express");
const router = express.Router();

const {
  getDetails,
  createCustomer,
  getCustomers,
  viewCustomer,
  updateCustomer,
  deleteCustomer,
  getNewCustomer,
} = require("../controller/customer");

// router.get("/", getDetails);
router.get("/add", getNewCustomer);
router.post("/", createCustomer);
router.get("/", getCustomers);
router.get("/:id", viewCustomer);
router.put("/:id", updateCustomer);
router.delete("/:id", deleteCustomer);

module.exports = router;
