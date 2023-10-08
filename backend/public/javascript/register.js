const form = document.getElementById("registerForm");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let data = {};
  Array.from(form.elements).forEach((element) => {
    if (element.tagName.toLowerCase() === "input") {
      data[element.name] = element.value;
      //   element.value = "";
    }
  });
  sendData(data);
});
const sendData = async (data) => {
  console.log("request send");
  const response = await fetch("./api/v1/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  console.log(response.status);
  if (response.status !== 200) {
    const newData = await response.json();
    responseMessageHandler(response.status, newData.msg);
  } else {
    console.log(response.status);
    if (response.redirected === true) {
      console.log("hello");
      responseMessageHandler(200, "Account Created successful, redirecting...");
      setTimeout(() => {
        location.replace(response.url);
      }, 1000);
    }
  }
};
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
