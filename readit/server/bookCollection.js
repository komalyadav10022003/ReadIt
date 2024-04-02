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



module.exports = book;
