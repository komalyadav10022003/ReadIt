import React from "react";

// Channel component
const Channel = ({ channel, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`p-4 cursor-pointer ${
        isSelected ? "text-white bg-cyan-500" : ""
      }`}>
      {channel.name}
    </div>
  );
};

// MessageList component
const MessageList = ({ messages }) => {
  return (
    <div className="grow overflow-y-auto">
      {messages.map((message) => (
        <div key={message.id} className="p-2">
          <div className="font-semibold">{message.sender}</div>
          <div>{message.content}</div>
        </div>
      ))}
    </div>
  );
};

// SendMessageForm component
const SendMessageForm = ({ onSendMessage }) => {
  const [message, setMessage] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    onSendMessage(message);
    setMessage("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="absolute bottom-0 mb-2 grow w-2/3 flex items-center px-4">
      <input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 mr-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
        Send
      </button>
    </form>
  );
};

export { Channel, MessageList, SendMessageForm };
