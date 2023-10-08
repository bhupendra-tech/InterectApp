const path = require("path");
const home = (req, res) => {
  res.sendFile(path.resolve(__dirname, "../public/home.html"));
};
module.exports = home;
