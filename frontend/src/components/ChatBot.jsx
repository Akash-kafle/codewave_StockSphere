import React, { useState } from "react";
import { FaRegComments } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai"; 
import axios from "axios";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleClose = () => setIsOpen(false);

  const handleMessageChange = (e) => setMessage(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add the new message to the local state
    setMessages([...messages, { text: message, type: "user" }]);

    // Send the message to the backend
    try {
      await axios.post("/api/chat", { message });
      // Optionally, handle response or add to chat history
    } catch (error) {
      console.error("Error posting message:", error);
    }

    setMessage("");
  };

  return (
    <div
      className={`fixed bottom-4 right-4 ${
        isOpen
          ? "w-80  bg-white border border-gray-300 rounded-lg shadow-lg "
          : "w-14 bg-transparent"
      } max-w-screen-sm transition-width duration-300 ease-in-outoverflow-hidden`}
    >
      {isOpen ? (
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-2 border-b border-gray-300">
            <h2 className="text-lg font-semibold">Ask any Queries</h2>
            <button
              onClick={handleClose}
              className="p-1 text-gray-600 hover:text-gray-900"
            >
              <AiOutlineClose size={20} />
            </button>
          </div>
          <div className="flex-1 overflow-auto p-2">
            {/* Render chat messages here */}
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 ${
                  msg.type === "user" ? "text-right" : "text-left"
                }`}
              >
                <p
                  className={`inline-block p-2 rounded-lg ${
                    msg.type === "user" ? "bg-blue-100" : "bg-gray-100"
                  }`}
                >
                  {msg.text}
                </p>
              </div>
            ))}
          </div>
          <form
            onSubmit={handleSubmit}
            className="p-2 border-t border-gray-300 flex"
          >
            <input
              type="text"
              value={message}
              onChange={handleMessageChange}
              placeholder="Type a message..."
              className="flex-1 p-2 border border-gray-300 rounded-lg mr-2"
            />
            <button
              type="submit"
              className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Send
            </button>
          </form>
        </div>
      ) : (
        <button
          onClick={handleToggle}
          className="p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600"
        >
          <FaRegComments size={24} />
        </button>
      )}
    </div>
  );
};

export default Chatbot;
