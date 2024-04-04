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
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  genres: {
    type: Array,
    default: [""],
    required: true,
  },
  bookCover: {
    type: String,
  },
  bookFile: {
    type: String,
    required: true,
  },
});

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const userChannelsSchems = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  channel_id: {
    type: Object,
    required: true,
  },
});

const channelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const genre = mongoose.model("genre", genreSchema);

const book = mongoose.model("book", bookSchema);

const collection = new mongoose.model("Users", UserSchema);

module.exports = [collection, book, genre];
