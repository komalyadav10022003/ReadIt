const express = require("express");
const cors = require("cors");
const collection = require("./mongodb");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const PORT = process.env.PORT || 3001;

const app = express();
app.use(
  cors({
    origin: "http://127.0.0.1:3000/",
    credentials: true,
  })
);
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.get("/api", (req, res) => {
  console.log(req);
  res.json({ message: "Hello! There" });
});

app.post("/login", async (req, res) => {
  const data = {
    username: req.body.username,
    password: req.body.password,
  };

  const user = await collection.findOne({ username: data.username });

  if (!user) {
    res.status(402).json({ message: "Username invalid" });
    return;
  } else {
    const isPasswordValid = bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      res.status(402).json({ message: "Password invalid" });
    } else {
      //login successful
      const token = jwt.sign(
        { email: user.username, userId: user._id },
        "your-secret-key",
        { expiresIn: "1h" }
      );
      res.cookie("Login", token, {
        httpOnly: false,
        secure: true,
        maxAge: 3600000,
      });
      res.json({
        uid: user._id,
        message: "Login Successful",
      });
      return;
    }
  }

  console.log(data);

  const result = await collection.find({
    username: data.username,
    password: data.password,
  });

  res.json({ message: result });
});

app.post("/signup", async (req, res) => {
  const data = {
    username: req.body.username,
    password: req.body.password,
  };

  console.log(data);

  const result = await collection.insertMany([data]);

  res.json({ message: result });
});
