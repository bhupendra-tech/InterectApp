// TODO: create a socket client side-server
// add video youtube video player
// dashboard data -> backend -> controllers -> player

const sendingDataToBackend = async (data) => {
  const response = await fetch("./player", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const list = await response.json();
    console.log(list);
    const id = list.id;
    if (id != null) {
      localStorage.setItem("roomId", id);
      // var tag = document.createElement("script");

      // tag.src = "/javascript/socket-client.js";
      // tag.type = "module";
      // var lastScriptTag = document.getElementsByTagName("script")[2];
      // lastScriptTag.parentNode.insertBefore(tag, lastScriptTag);
    }
    if (list.msg === "Room joined") {
      localStorage.setItem("load", "true");
    }
  } catch (err) {
    sendingDataToBackend(data);
    console.log(err);
  }
};

const getDataFromLocalStorage = () => {
  const isCreator = localStorage.getItem("isCreator");
  if (!isCreator) {
    return;
  }
  const roomName = localStorage.getItem("roomName");
  const roomAccess = localStorage.getItem("roomAccess");
  const roomExpiration = localStorage.getItem("roomExpiration");
  const url = localStorage.getItem("url");
  const load = localStorage.getItem("load");
  if (load === null) {
    // this url should replace the url inside of the video player
    // this roomName should be used as userName for chatting
    sendingDataToBackend({
      createdBy: roomName,
      roomAccess,
      roomExpiration,
      link: url,
    });
  }
};
getDataFromLocalStorage();

