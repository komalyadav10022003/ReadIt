const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/ReadIt")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.log(error);
    console.log("Error occured connecting to mongodb");
  });

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const collection = new mongoose.model("Users", UserSchema);

module.exports = collection;
