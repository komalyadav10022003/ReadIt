// routes/messages.js

const express = require("express");
const router = express.Router();

// Placeholder for message storage (replace with actual database integration)
let messages = [];

// Send message to a channel
router.post("/", (req, res) => {
  const { chatId, message } = req.body;

  // Assuming you have a validation middleware to verify the user's authentication token
  // You can access the user ID from the request object (req.user.id)

  // Save the message to the messages array (or database)
  messages.push({ chatId, message, userId: req.user.id });

  // Emit the message to the relevant WebSocket clients
  io.emit("message", { chatId, message, userId: req.user.id });

  res.sendStatus(200);
});

module.exports = router;
