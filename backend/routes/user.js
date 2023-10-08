// here we are handling dashboard and player route
const express = require("express");
const router = express.Router();
const path = require("path");
const player = require("../controllers/player");
const dashboard = require("../controllers/dashboard");
const fetchList = require("../controllers/fetchList");
const { createVideo } = require("../controllers/video");
router.post("/fetchList", fetchList);
router.get("/player", player);
router.get("/client-side-server", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../sockets/client-side-server.js"));
});
router.post("/player", createVideo);
router.get("/dashboard", dashboard);
module.exports = router;
