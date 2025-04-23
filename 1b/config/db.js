const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log(`MongoDb connected: ${mongoose.connection.host}`);
    })
    .catch((err) => {
      console.log("Connection Failed!");
      console.error(err);
      process.exit(1);
    });
};


module.exports = connectDB ;