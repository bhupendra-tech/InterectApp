const isValidLink = (link) => {
  const ans =
    /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|live\/|v\/)?)([\w\-]+)(\S+)?$/.test(
      link
    );
  if (ans) {
    return true;
  } else {
    return false;
  }
};

const generateFormEle = document.getElementById("generatorForm");
generateFormEle.addEventListener("submit", (e) => {
  e.preventDefault();
  const link = generateFormEle.elements[0].value;
  generateFormEle.elements[0].value = "";
  if (isValidLink(link)) {
    userResponseMessageHandler(
      "Please wait, while we are generating room",
      "success",
      1
    );
    generateRoom(link);
  } else {
    userResponseMessageHandler(
      "Link Invalid, Please check the link",
      "fail",
      1
    );
  }
});

const generateRandomRoomName = () => {
  let roomName = `user${Date.now()}`;
  return roomName;
};
const userInfoFormEle = document.getElementById("userInfoForm");
// sets the value of roomName in roomName input
const setRoomNameInputValue = () => {
  let roomName = localStorage.getItem("roomName");
  if (roomName === null || roomName === "") {
    roomName = generateRandomRoomName();
    localStorage.setItem("roomName", roomName);
  }
  userInfoFormEle.elements[0].value = roomName;
};
setRoomNameInputValue();

// below functions saves the data from userInfoForm to localStorage
const localStorageSaver = () => {
  let roomName = userInfoFormEle.elements[0].value;
  const roomAccess = userInfoFormEle.elements[1].value;
  const roomExpiration = userInfoFormEle.elements[2].value;
  if (roomName === "") {
    roomName = localStorage.getItem("roomName");
    if (roomName === null || roomName === "") {
      roomName = generateRandomRoomName();
    }
  }
  localStorage.clear();
  localStorage.setItem("roomName", roomName);
  localStorage.setItem("roomAccess", roomAccess);
  localStorage.setItem("roomExpiration", roomExpiration);
};

userInfoFormEle.addEventListener("submit", (e) => {
  e.preventDefault();
  localStorageSaver();
});

const generateRoom = (link) => {
  localStorageSaver();
  localStorage.setItem("isCreator", "true");
  localStorage.setItem("url", link);
  location.href = "./player";
  // in player.js inside of a function will fetch the link and will embed it inside the player
};

const joinRoomFormEle = document.getElementById("roomJoinerForm");
joinRoomFormEle.addEventListener("submit", (e) => {
  e.preventDefault();
  emptyResultBlockEle();
  const value = joinRoomFormEle.elements[0].value;
  if (value.startsWith("https")) {
    if (isValidLink(value)) {
      fetchList({ link: value });
      userResponseMessageHandler(
        "Please wait, while we search for rooms",
        "success",
        2
      );
    } else {
      userResponseMessageHandler(
        "Link Invalid, Please check the link",
        "fail",
        2
      );
    }
  } else {
    console.log("id box 1");
    if (value.length === 24) {
      fetchList({ roomId: value });
    }
  }
});

const textNode = document.createElement("text");
const userResponseMessageHandler = (message, status, number) => {
  const userResponseMessage = document.getElementById(
    `userResponseMessage${number}`
  );
  if (textNode.firstChild !== null) {
    textNode.removeChild(textNode.firstChild);
  }
  if (status === "fail") {
    textNode.classList = "subText errorMessage";
  } else {
    textNode.classList = "subText successMessage";
  }
  textNode.append(message);
  userResponseMessage.appendChild(textNode);
  setTimeout(() => {
    userResponseMessage.removeChild(textNode);
  }, 2000);
};

const fetchList = async (value) => {
  console.log("id box 2");
  console.log(value);
  const response = await fetch("./fetchList", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(value),
  });
  const list = await response.json();
  console.log(list);
  if (list.msg === "There exist no room") {
    resultBlockChild("", 0);
  } else {
    list.newList.map((listItem) => {
      resultBlockChild(listItem, 1);
    });
  }
};
const resultBlockEle = document.getElementById("resultBlock");
resultBlockEle.style.display = "none";
// returns and element that will get appended to resultBlock
const resultBlockChild = (data, result) => {
  if (!result) {
    resultBlockEle.style.display = "flex";
    const node = document.createElement("h3");
    node.textContent = "There exist no room";
    node.style.color = "var(--black)";
    resultBlockEle.append(node);
    return;
  }
  const { roomAccess, roomExpiration, createdBy, _id: Id, link } = data;
  resultBlockEle.style.display = "flex";
  const resultBlockInsideEle = document.createElement("div");
  resultBlockInsideEle.innerHTML = `
  <div class="resultInnerBlock">
  <p>Id : <span>${Id}</span></p>
  <a href="${link}"></a>
  <p>Created By : <span>${createdBy}</span></p>
  <p>Access : <span>${roomAccess}</span></p>
  <p>Expiry : <span>${roomExpiration}</span></p>
  <button class="gradient btn joinRoomButtonResultBlock">
    <p>Join Room</p>
  </button>
</div>
  `;
  resultBlockEle.appendChild(resultBlockInsideEle);
  addingListenersToJoinRoomButtonResultBlock();
};
var emptyResultBlockEle = () => {
  resultBlockEle.textContent = "";
};

const addingListenersToJoinRoomButtonResultBlock = () => {
  const joinRoomButtonResultBlockEle = document.querySelectorAll(
    ".joinRoomButtonResultBlock"
  );
  joinRoomButtonResultBlockEle.forEach((element) => {
    element.addEventListener("click", () => {
      const id =
        element.parentElement.firstElementChild.firstElementChild.textContent;
      localStorage.setItem("roomId", id);
      localStorage.setItem("isCreator", "false");
      const link =
        element.parentElement.firstElementChild.nextElementSibling.href;
      localStorage.setItem("url", link);
      location.href = "./player";
    });
  });
};
