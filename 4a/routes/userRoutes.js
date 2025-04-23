const express = require("express");
const router = express();

const {auth} = require("../middleware/auth");
const {getUserProfile} = require("../controllers/userController");

router.get("/",auth,getUserProfile);

module.exports = router ;