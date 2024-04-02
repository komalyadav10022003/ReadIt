const express = require("express");
const cors = require("cors");
const [collection, book, genre] = require("./mongodb");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const multer = require("multer");

const PORT = process.env.PORT || 3001;

const app = express();
const server = createServer(app);

const io = new Server(server);

app.use(
  cors({
    origin: "http://127.0.0.1:3000/",
    credentials: true,
  })
);
app.use(express.json());

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.get("/api", (req, res) => {
  console.log(req);
  res.json({ message: "Hello! There" });
});

app.post("/login", async (req, res) => {
  try {
    const data = {
      username: req.body.username,
      password: req.body.password,
    };
    console.log(data);
    const user = await collection.findOne({ username: data.username });

    console.log(user);
    if (!user) {
      res.status(402).json({ message: "Username invalid" });
      return;
    } else {
      const isPassValid = await bcrypt.compare(user.password, data.password);

      console.log(isPassValid);

      if (data.password !== user.password) {
        res.status(402).json({ message: "Password invalid" });
      } else {
        //login successful
        const token = jwt.sign(
          { username: user.username, userId: user._id },
          "your-secret-key",
          { expiresIn: "1h" }
        );
        res.cookie("Login", token, {
          httpOnly: false,
          secure: true,
          maxAge: 3600000,
        });
        res.json({
          username: user.username,
          message: "Login Successful",
          error: false,
        });
        console.log("Login successful");
      }
    }
  } catch (error) {
    console.log("Internal server error");
    res
      .status(500)
      .json({ message: "Internal server error occured", error: true });
  }

  // console.log(data);

  // const result = await collection.find({
  //   username: data.username,
  //   password: data.password,
  // });

  // res.json({ message: result });
});

app.post("/signup", async (req, res) => {
  try {
    const data = {
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    };

    const checkExisting = await collection.findOne({ username: data.username });

    if (!checkExisting) {
      console.log(data);

      const result = await collection.insertMany([data]);

      res.status(200).json({ message: result, error: false });
    } else {
      res.status(402).json({ error: true, message: "Username already exists" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: true });
  }
});

// Search Route
app.get("/search", async (req, res) => {
  console.log(req.query);
  const query = req.query.q; // Get search query from request query params
  const type = req.query.type; // get the type of query from params

  try {
    if (type === "books") {
      const books = await book.find({
        $or: [
          { title: new RegExp(query, "i") },
          { author: new RegExp(query, "i") },
        ],
      });

      console.log(books);
      res.status(200).json(books);
    }

    if (type === "genre") {
      const genres = await genre.find({ name: new RegExp(query, "i") });

      console.log(genres);
      res.status(200).json(genres);
    }
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});
