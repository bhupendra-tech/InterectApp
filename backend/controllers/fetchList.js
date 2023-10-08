const Video = require("../models/videos");
const fetchList = async (req, res) => {
  const { link, roomId } = req.body;
  if (link !== undefined) {
    const videos = await Video.find({ link: link });
    const newList = videos.filter((video) => video.roomAccess !== "Private");
    if (newList.length === 0) {
      return res.json({ msg: "There exist no room" });
    }
    res.json({ newList });
  } else if (roomId !== undefined) {
    console.log(roomId);
    const videos = await Video.find({ _id: roomId });
    const newList = videos.map((video) => video);
    if (newList === undefined) {
      return res.json({ msg: "There exist no room" });
    }
    res.json({ newList });
  }
};

module.exports = fetchList;
