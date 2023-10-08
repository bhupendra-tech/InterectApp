const form = document.getElementById("loginForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let data = {};
  Array.from(form.elements).forEach((element) => {
    if (element.tagName.toLowerCase() === "input") {
      data[element.name] = element.value;
      element.value = "";
    }
  });
  sendData(data);
});
const sendData = async (data) => {
  const response = await fetch("./api/v1/auth/login", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      //   "Content-Type": "application/x-www-form-urlencoded",
    },
    body: JSON.stringify(data),
  });
  if (response.status !== 200) {
    const newData = await response.json();
    responseMessageHandler(response.status, newData.msg);
  } else {
    if (response.redirected === true) {
      responseMessageHandler(200, "Login successful, redirecting...");
      setTimeout(() => {
        location.replace(response.url);
      }, 1000);
    }
  }
};

// this below code handle success as well as error messages sent toward login page
const userResponseMessage = document.getElementById("userResponseMessage");
const textNode = document.createElement("text");
const responseMessageHandler = (status, message) => {
  if (message === undefined) {
    message = "Something went wrong";
  }
  if (textNode.firstChild !== null) {
    textNode.removeChild(textNode.firstChild);
  }
  textNode.append(message);
  if (status === 200) {
    textNode.classList = "subText successMessage";
  } else {
    textNode.classList = "subText errorMessage";
  }
  userResponseMessage.appendChild(textNode);
};
