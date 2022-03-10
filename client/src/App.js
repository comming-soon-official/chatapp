import React, { useState } from "react";
import io from "socket.io-client";
import Chat from "./Chat";
import "./index.css";

const socket = io.connect("http://192.168.201.86:3001");
const App = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinroom = () => {
    if (name !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true)
    }
  };
  return (
    <>
      <div className="App">
        {!showChat ? (
          <div className="joinChatContainer">
            <h2>Chat App </h2>

            <label>User's Name</label>
            <input
              onChange={(event) => {
                setName(event.target.value);
              }}
              placeholder="Enter Name"
            />
            <label>Room's ID</label>
            <input
              onChange={(event) => {
                setRoom(event.target.value);
              }}
              placeholder="Enter Room ID"
            />
            <button onClick={joinroom}>Join Room</button>
          </div>
        ) : (
          <Chat name={name} socket={socket} room={room} />
        )}
      </div>
    </>
  );
};

export default App;
