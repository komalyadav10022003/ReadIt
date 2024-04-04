import React, { useState, useEffect } from "react";
import { Socket } from "socket.io-client";
import { List, ListItem, Input } from "@material-tailwind/react";
import { Channel, MessageList, SendMessageForm } from "./MiscComp"; // Import your custom components
import StickyNavbar from "../Navbar/StickyNavbar";

const Chatroom = () => {
  const [channels, setChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Fetch channels from backend
    const fetchChannels = async () => {
      // Fetch your channels data from backend here
      // const response = await fetch('API_ENDPOINT/channels');
      // const data = await response.json();
      // setChannels(data.channels);
      // For demonstration purpose, let's use mock data
      const mockChannels = [
        { id: 1, name: "General" },
        { id: 2, name: "Random" },
      ];
      setChannels(mockChannels);
    };

    fetchChannels();
  }, []);

  useEffect(() => {
    if (selectedChannel) {
      // Connect to socket.io
      const newSocket = new Socket(); // Initialize socket.io connection
      newSocket.on("connect", () => {
        console.log("Connected to socket server");
      });

      // Listen for incoming messages
      newSocket.on("message", (message) => {
        setMessages([...messages, message]);
      });

      setSocket(newSocket);
    }
  }, [selectedChannel]);

  const handleChannelSelect = (channel) => {
    setSelectedChannel(channel);
    // Fetch messages for the selected channel from backend
    // const fetchMessages = async () => {
    //   const response = await fetch(`API_ENDPOINT/messages/${channel.id}`);
    //   const data = await response.json();
    //   setMessages(data.messages);
    // };
    // fetchMessages();
    // For demonstration purpose, let's use mock data
    const mockMessages = [
      { id: 1, sender: "user1", content: "Hello" },
      { id: 2, sender: "user2", content: "Hi there!" },
    ];
    setMessages(mockMessages);
  };

  const handleSendMessage = (message) => {
    // Send message to backend via socket.io
    socket.emit("message", { channelId: selectedChannel.id, message });
  };

  return (
    <div className="flex flex-col h-screen">
      <StickyNavbar />
      <div className="flex flex-row grow">
        <div className="w-1/4 bg-gray-200 border-r border-gray-300">
          <List>
            {channels.map((channel) => (
              <ListItem
                key={channel.id}
                onClick={() => handleChannelSelect(channel)}
                ripple="light"
                className={`cursor-pointer ${
                  selectedChannel && selectedChannel.id === channel.id
                    ? "bg-blue-100"
                    : ""
                }`}>
                {channel.name}
              </ListItem>
            ))}
          </List>
        </div>
        <div className="w-full grow-0 bg-white">
          <MessageList messages={messages} />
          <SendMessageForm onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
};

export default Chatroom;
