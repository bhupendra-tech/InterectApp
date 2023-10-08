const path = require("path");
const player = async (req, res) => {
  console.log("player request");
  res.sendFile(path.resolve(__dirname, "../templates/player.html"));
};

module.exports = player;
