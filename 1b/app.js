const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const expressLayout = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const customers = require("./server/routes/customers");

const app = express();
const PORT = process.env.PORT || 7000;

//use middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

//templating engine
app.use(expressLayout);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

//connect to database
connectDB();

//route handlers
app.use("/",customers);

//Handle 404
// app.get("*",(req,res) => {
//     res.render("404.ejs");
// })



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
