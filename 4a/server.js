const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const methodOverride = require('method-override')
const path = require("path");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const listingsRoutes = require("./routes/listingsRoutes");
const { auth } = require("./middleware/auth");
const User = require("./models/userModel");
const Listings = require("./models/listingsModel");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.set("view engine", "ejs");

//middlewares
app.use(express.static("public"));

// Serve static files from uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride('_method'))

//connect to db
connectDB();

//route handlers
app.use("/", authRoutes);
app.use("/profile", userRoutes);
app.use("/listings", listingsRoutes);

app.get("/", auth, async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId);
  if (!user) {
    return res.render("pages/login.ejs", {
      error: "No User found. Login Again.",
    });
  }

  const listings = await Listings.find({}).populate("owner");

  return res.render("home.ejs", {
    user: user,
    listings: listings,
  });
});

//contact-us page
app.get("/contact", auth, async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId);
  if (!user) {
    return res.render("pages/login.ejs", {
      error: "No User found. Login Again.",
    });
  }
  res.render("pages/contact.ejs", {
    user: user,
  });
});

//about-us page
app.get("/about", auth, async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId);
  if (!user) {
    return res.render("pages/login.ejs", {
      error: "No User found. Login Again.",
    });
  }
  res.render("pages/about.ejs", {
    user: user,
  });
});

app.listen(PORT, () => {
  console.log(`Server listening to port ${PORT}`);
});
