// date picker code
// here all functions related to date picker will be stored

const datePicker = document.getElementById("datePicker");

/// the default value will be today's date
// to set min and max date
datePicker.addEventListener("focus", () => {
  setMinAndMaxDate();
});
// function to return min and max date
const minAndMaxDate = () => {
  const date = new Date();
  const minDate = date.toISOString().substring(0, 10);
  // converting 30 days to milliseconds
  const millisecondsToAdd = 30 * 24 * 60 * 60 * 1000;
  date.setTime(date.getTime() + millisecondsToAdd);
  const maxDate = date.toISOString().substring(0, 10);
  return [minDate, maxDate];
};
const setMinAndMaxDate = () => {
  const [minDate, maxDate] = minAndMaxDate();
  console.log("date are" + minDate + " " + maxDate);
  datePicker.setAttribute("min", minDate);
  datePicker.setAttribute("max", maxDate);
};

datePicker.setAttribute("value", minAndMaxDate()[0]);

// the reason for storingTodayDateValueInLocalStorage function is mentioned in userInfoForm.js
// this function runs everyday
const storingTodayDateValueInLocalStorage = () => {
  localStorage.setItem("roomExpiration", minAndMaxDate()[0]);
};
storingTodayDateValueInLocalStorage();
