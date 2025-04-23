const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log(
        `MongoDb connected: ${mongoose.connection.name} ${mongoose.connection.host}`
      );
    })
    .catch((error) => {
      console.log(`Connection Failed: ${error.message}`);
      process.exit(1);
    });
};

module.exports = connectDB ;
