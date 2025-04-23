const express = require("express");
const router = express.Router();

const {
  getCreateListingsForm,
  createListings,
  getListings,
  viewListings,
  getEditListingsForm,
  editListings,
  deleteListings,
} = require("../controllers/listingsController");

const { auth } = require("../middleware/auth");

router.get("/new", auth, getCreateListingsForm);
router.post("/", auth, createListings);
router.get("/", auth, getListings);
router.get("/:id", auth, viewListings);
router.get("/:id/edit", auth, getEditListingsForm);
router.put("/:id", auth, editListings);
router.delete("/:id", auth, deleteListings);

module.exports = router ;
