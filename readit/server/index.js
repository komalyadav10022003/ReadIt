const express = require("express");
const cors = require("cors");
const fs = require("fs");
const [collection, book, genre, userChannels, Channels] = require("./mongodb");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const multer = require("multer");
const path = require("path");

const messagesRouter = require("./routes/messages");

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./uploads"); // directory where files will be uploaded
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage,
});

// Check File Type
function checkFileType(file, cb) {
  // Allowed extensions
  const filetypes = /pdf|jpeg|jpg|png/;
  // Check extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime type
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Only PDF, JPEG, JPG, and PNG files are allowed!", false);
  }
}

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

// Upload Route for creating a book
app.post(
  "/create",
  upload.fields([
    { name: "bookFile", maxCount: 1 },
    { name: "bookCover", maxCount: 1 },
  ]),
  async (req, res) => {
    // console.log(req.files);
    if (Object.keys(req.files).length === 0) {
      res.status(400).json({ message: "Error: No files selected!" });
    } else {
      try {
        const { title, author, genre } = req.body;
        const bookFile = req.files.bookFile[0];
        const bookCover = req.files.bookCover[0];
        console.log("Savnig book file");
        // Save file paths in the database
        const newBook = new book({
          title,
          author,
          genre,
          bookCover: bookFile.path,
          bookFile: bookCover.path,
        });

        await newBook.save();

        res
          .status(200)
          .json({ message: "Files uploaded and saved successfully!" });
      } catch (error) {
        console.error(error);
        res
          .status(500)
          .json({ message: "Error saving file locations in database" });
      }
    }
  }
);

//upload route for existing book
app.post(
  "/existing",
  upload.fields([{ name: "bookFile", maxCount: 1 }]),
  async (req, res) => {
    // console.log(req.files);
    if (Object.keys(req.files).length === 0) {
      res.status(400).json({ message: "Error: No files selected!" });
    } else {
      try {
        const { title, author, genre } = req.body;
        const bookFile = req.files.bookFile[0];
        const bookCover = req.files.bookCover[0];
        console.log("Savnig book file");
        // Save file paths in the database
        const newBook = new book({
          title,
          author,
          genre,
          bookCover: bookFile.path,
          bookFile: bookCover.path,
        });

        await newBook.save();

        res
          .status(200)
          .json({ message: "Files uploaded and saved successfully!" });
      } catch (error) {
        console.error(error);
        res
          .status(500)
          .json({ message: "Error saving file locations in database" });
      }
    }
  }
);

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//download route
// Download Route
app.get("/download", async (req, res) => {
  const filename = req.query.filename;
  const type = req.query.type;
  console.log(filename);

  try {
    // let newBook;

    // if (type === "cover") {
    //   newBook = await book.findOne({ bookCover: filename });
    // } else {
    //   newBook = await book.findOne({ bookFile: filename });
    // }

    // if (!newBook) {
    //   return res.status(404).json({ message: "File not found" });
    // }

    const filePath = path.join(__dirname, "uploads", filename);
    const stat = fs.statSync(filePath);

    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        return res.status(500).send("Internal Server Error");
      }

      // Set response headers
      res.setHeader("Content-Type", "application/octet-stream");
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=" + path.basename(filePath)
      );

      // Send the file data as a blob
      console.log(data);
      res.send(data);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
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

//logout functionality
app.get("/logout", (req, res) => {
  // Clear the authentication-related cookies
  res.clearCookie("token");
  res.clearCookie("Login");
  // Send a response to the client
  res.status(200).json({ message: "Logout successful!", error: false });
  // ... existing logout route logic ...
});

//handle messages
app.get("/messages", messagesRouter);

//get channels
app.get("/channels", async (req, res) => {
  // Fetch channels data from the database based on the current user's identity
  const userId = req.user.id; // Assuming user ID is stored in the request object
  // Query the database to retrieve channels data for the user
  const userChannel = await userChannels.find({ username: userId });
  const newChannels = userChannel.forEach(async (element) => {
    await Channels.find({ _id: element.channel_id });
  });
  // Send channels data to the client
  res.json({ channels: newChannels });
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});
