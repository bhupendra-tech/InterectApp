const path = require("path");
const dashboard = (req, res) => {
  console.log("Inside of dashboard controller ");
  res.sendFile(path.resolve(__dirname, "../templates/dashboard.html"));
};
module.exports = dashboard;
