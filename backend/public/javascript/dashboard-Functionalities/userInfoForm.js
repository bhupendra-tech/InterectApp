// whenever user clicks button info stored in the  local storage and he will be sent to ./player.html

// here we will send userInfoForm data to localStorage

// when user clicks on generate room the data stored in localStorage will be sent to backend with link

// when user clicks join room only link will be send and in response will get either json (list of chats with id and video thumbnail ) or we might also get empty json or error

// below function will be sed when user does not set a roomName for the first time after it sets the roomName he no longer need this function
const generateRandomRoomNameAndSetItInLocalStorage = () => {
    let roomName = `user${Date.now()}`;
    return roomName;
  };
  
  const userInfoFormEle = document.getElementById("userInfoForm");
  // whenever user enters in dashboard this function will be called and will change the value in room name value attribute
  // it will fetch value from localStorage if value exist it will take that value or else it will generate a random value
  // here we are retrieving roomName value from localStorage and putting it in roomName element input
  const setRoomNameDefaultValue = () => {
    const roomNameEle = document.getElementById("roomName");
    roomNameEle.value =
      localStorage.getItem("roomName") ||
      generateRandomRoomNameAndSetItInLocalStorage();
  };
  setRoomNameDefaultValue();
  
  // userInfoForm will update roomName when user saves the form
  // this function will be called to save roomName value that user entered in his form this value will be stored in localStorage
  const updateRoomNameValueInLocalStorage = (roomName) => {
    localStorage.setItem("roomName", roomName);
  };
  
  userInfoFormEle.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("form submitted");
    Array.from(userInfoFormEle.elements).forEach((element) => {
      if (
        element.tagName.toLowerCase() === "input" ||
        element.tagName.toLowerCase() === "select"
      ) {
        console.log(element.name + " " + element.value);
        if (element.name == "roomName") {
          updateRoomNameValueInLocalStorage(element.value);
          setRoomNameDefaultValue();
        }
      }
    });
  });
  
  // user opens the dashboard for the first time there is nothing that will be stored in the localStorage
  
  // in case of roomExpiration we need to update it everyday in localStorage because suppose a user opens dashboard and sees everything is fine i.e roomName roomAccess and roomExpiration so he clicks on generate room dues to this the date that is stored in localStorage will be send with other items and link which is bad as the date might be old one due to this we created as function "storingTodayDateValueInLocalStorage" inside of datepicker
  
  // so we need to store some default values in local storage as they will be send to backend along with the generateRoomUrl
  
  // this function will run only for first time user opens dashboard
  const storingDefaultValues = () => {
    let roomName = generateRandomRoomNameAndSetItInLocalStorage();
    localStorage.setItem("roomName", roomName);
    localStorage.setItem("roomAccess", "private");
  };
  
  
  // user registers opens dashboard paste link generate videos ( there is nothing in local storage )
  // random name automatically saves in localStorage the first time user opens dashboard 
  // everyday date is saved in local storage 
  