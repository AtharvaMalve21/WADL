const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
dotenv.config();
const {userSchema} = require("./data");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs",{
    users:userSchema
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
