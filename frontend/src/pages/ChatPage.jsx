import React, { useState } from "react";

const users = [
  { id: 1, name: "John Doe", image: "https://via.placeholder.com/50", online: true },
  { id: 2, name: "Emma Watson", image: "https://via.placeholder.com/50", online: false },
  { id: 3, name: "Robert Fox", image: "https://via.placeholder.com/50", online: true },
];

const chats = {
  1: [
    { sender: "John Doe", message: "Hey! How are you?" },
    { sender: "You", message: "I'm good! How about you?" },
  ],
  2: [
    { sender: "Emma Watson", message: "Hello! What's up?" },
    { sender: "You", message: "Not much, just coding!" },
  ],
  3: [
    { sender: "Robert Fox", message: "Good Morning!" },
    { sender: "You", message: "Morning! How's your day?" },
  ],
};

const ChatPage = () => {
  const [selectedUser, setSelectedUser] = useState(users[0]);

  return (
    <div className=" w-screen h-screen flex bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Left Sidebar */}
      <div className="w-1/4 bg-white border-r shadow-lg overflow-y-auto">
        <h2 className="text-xl font-bold p-4 border-b border-gray-200 text-gray-800">Chats</h2>
        {users.map((user) => (
          <div
            key={user.id}
            className={`flex items-center p-3 cursor-pointer hover:bg-gray-100 transition duration-200 ${
              selectedUser.id === user.id ? "bg-blue-50 border-l-4 border-blue-500" : ""
            }`}
            onClick={() => setSelectedUser(user)}
          >
            <div className="relative">
              <img
                src={user.image}
                alt={user.name}
                className="w-12 h-12 rounded-full border-2 border-gray-200 mr-3 shadow"
              />
              {user.online && (
                <span className="absolute bottom-0 right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></span>
              )}
            </div>
            <span className="text-gray-800 font-medium">{user.name}</span>
          </div>
        ))}
      </div>

      {/* Chat Section */}
      <div className="flex flex-col flex-grow bg-white shadow-lg">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-200 flex items-center shadow">
          <div className="relative">
            <img
              src={selectedUser.image}
              alt={selectedUser.name}
              className="w-12 h-12 rounded-full border-2 border-gray-200 mr-3 shadow"
            />
            {selectedUser.online && (
              <span className="absolute bottom-0 right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></span>
            )}
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{selectedUser.name}</h2>
            <p className="text-sm text-gray-500">
              {selectedUser.online ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-grow p-4 overflow-y-auto flex flex-col space-y-2">
          {chats[selectedUser.id].map((chat, index) => (
            <div key={index} className={`flex ${chat.sender === "You" ? "justify-end" : "justify-start"}`}>
              <div
                className={`p-3 rounded-lg max-w-xs ${
                  chat.sender === "You"
                    ? "bg-blue-600 text-white shadow"
                    : "bg-gray-100 shadow-sm"
                } transition duration-200`}
              >
                <p className="text-sm">{chat.message}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <div className="p-4 border-t border-gray-200 flex items-center shadow">
          <input
            type="text"
            placeholder="Type a message..."
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <button className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200 shadow">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
