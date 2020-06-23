/**
 * author: Denis Kravchenko
 */
import React, { useState, useEffect } from "react";
import queryString from "query-string";

import io from "socket.io-client";

import ChatWindow from "./ChatWindow/ChatWindow";

let socket;

const Main = ({ location }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const [userName, setUserName] = useState("");
  const [userRoom, setUserRoom] = useState("");

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io("http://localhost:3500/");

    setUserName(name);
    setUserRoom(room);

    socket.emit("join", { name, room });

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [location.search]);

  useEffect(() => {
    socket.on("message", (data) => {
      setMessages((messages) => [...messages, data]);
    });
  }, []);

  const sendMessage = (e) => {
    // e.preventDefault();

    console.log(message);

    if (message) {
      socket.emit("newMessage", message, () => setMessage(""));
    }
    setMessage("");
  };

  const [imgChunks, setImgChunks] = useState([]);
  const [streamSource, setStreamSource] = useState("");
  useEffect(() => {
    socket.on("img-chunk", (chunk) => {
      setImgChunks((oldArray) => [...oldArray, chunk]);
      setStreamSource("data:image/png;base64," + window.btoa(imgChunks));
    });
  }, [imgChunks]);

  console.log(messages);
  console.log(message);
  const videoElem = document.getElementById("video");
  async function startCapture() {
    // logElem.innerHTML = "";

    var displayMediaOptions = {
      video: {
        cursor: "always",
      },
      audio: false,
    };

    try {
      videoElem.srcObject = await navigator.mediaDevices.getDisplayMedia(
        displayMediaOptions
      );
      // dumpOptionsInfo();
    } catch (err) {
      console.error("Error: " + err);
    }
  }

  return (
    <div>
      <video id="video" autoplay></video>
      <button onClick={startCapture}>Start screen</button>
      <img src={streamSource} alt="some" />
      {/* <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => (e.key === "Enter" ? sendMessage(e) : null)}
      /> */}
      <ChatWindow
        userName={userName}
        message={message}
        messageOnChange={(e) => setMessage(e.target.value)}
        messages={messages}
        sendMessage={(e) => sendMessage(e)}
      />
    </div>
  );
};

export default Main;
