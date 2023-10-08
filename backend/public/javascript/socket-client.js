import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
const socket = io("localhost:3000", {});
// we are doing this as roomId takes time to get loaded from localStorage this will keep the execution halt for sometime until
await new Promise((resolve) => {
  setTimeout(resolve, 100);
});
let roomId = localStorage.getItem("roomId");
const roomName = localStorage.getItem("roomName");
socket.on("connect", () => {
  console.log("Connected to server");
  if (roomId != undefined || roomId != null) {
    socket.emit("room-id", roomId, roomName);
  }
});

const chatBoxEle = document.getElementById("chatBox");

const MessageEle = (senderName, message) => {
  const messageBoxEle = document.createElement("div");
  const topBoxEle = document.createElement("div");
  const senderNameEle = document.createElement("div");
  const sendingDateEle = document.createElement("div");
  const messageEle = document.createElement("p");
  topBoxEle.classList = "topBox";
  senderNameEle.classList = "senderName";
  sendingDateEle.classList = "sendingDate";
  messageEle.classList = "message";
  topBoxEle.appendChild(senderNameEle);
  topBoxEle.appendChild(sendingDateEle);
  messageBoxEle.appendChild(topBoxEle);
  messageBoxEle.appendChild(messageEle);
  messageBoxEle.classList = "messageBox";
  senderNameEle.textContent = senderName;
  messageEle.textContent = message;
  const date = new Date();
  sendingDateEle.textContent = date.toISOString().substring(0, 10);
  return messageBoxEle;
};

// below is leave room code
const leaveRoomEle = document.getElementById("leaveRoom");
leaveRoomEle.addEventListener("click", () => {
  console.log("Hello");
  console.log(roomName);
  socket.emit("leave-room", roomId, roomName);
  location.replace("./dashboard");
});
socket.on("leave-room", (roomName) => {
  const node = MessageEle(roomName, " disconnected");
  chatBoxEle.appendChild(node);
});
socket.on("room-joined", (roomName) => {
  console.log(`${roomName} joined`);
  const node = MessageEle(roomName, " joined the room");
  chatBoxEle.appendChild(node);
});
const messageInputEle = document.getElementById("messageInput");
const sendBtnEle = document.getElementById("sendButton");

sendBtnEle.addEventListener("click", () => {
  const message = messageInputEle.value;
  if (message != "") {
    socket.emit("message-sent", roomId, roomName, message);
    console.log(roomName, message);
    const node = MessageEle("You", message);
    chatBoxEle.appendChild(node);
  }
  messageInputEle.value = "";
});
socket.on("message-received", (senderName, message) => {
  const node = MessageEle(senderName, message);
  chatBoxEle.appendChild(node);
});

// const messageForm = document.getElementById("messageForm");
// console.log(messageForm);
// messageForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const message = messageForm.message.value;
//   if (message != null) {
//     console.log("message is " + message);
//     socket.emit("message-sent", message);
//   }
//   messageForm.message.value = "";
// });
// socket.on("message-received", (message) => {
//   console.log("user sent" + message);
// });
videoEle.addEventListener("play-pause", (e) => {
  const eventValue = e.detail.value;
  if (eventValue === 2) {
    socket.emit("pause", roomId, roomName);
  } else if (eventValue === 3) {
    socket.emit("play", roomId);
  }
});

let customEvent = new CustomEvent("play-pause-video", {
  detail: {
    value: 2,
  },
});
socket.on("play", () => {
  customEvent.detail.value = 3;
  videoEle.dispatchEvent(customEvent);
});
socket.on("pause", (roomName) => {
  customEvent.detail.value = 2;
  videoEle.dispatchEvent(customEvent);
  const node = MessageEle(roomName, "Paused the video");
  chatBoxEle.appendChild(node);
});

const roomIdEle = document.getElementById("roomId");
roomIdEle.innerText = ` Room id is ${roomId}, Share this to connect with others`;
