import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

function App() {
  const [message, setMessage] = useState("");
  const [socketId, setSocketId] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const socket = io("http://localhost:3100");

    socket.on("connect", () => {
      const newSocketId = socket.id;
      setSocketId(newSocketId);
      console.log("Connected with socket ID:", newSocketId);
    });

    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, [messages]);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const sendMessage = () => {
    const socket = io("http://localhost:3100");
    socket.emit("message", message);
    setMessage("");
  };

  return (
    <div className="App">
      <header className="App-header">
        <input placeholder='Enter the Message' value={message} onChange={handleMessageChange} />
        <button onClick={sendMessage}>Send</button>
        <p>Socket ID: {socketId}</p>
        <p>Messages:</p>
        <div>
          {messages.map((msg, index) => (
            <p key={index}>{msg}</p>
          ))}
        </div>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
