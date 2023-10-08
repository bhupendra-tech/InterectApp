const mongoose = require("mongoose");
// link will be of the video
// we will use id to create socket room
// number of members
const VideoSchema = new mongoose.Schema({
  link: {
    type: String,
    required: [true, "Video name must be provide"],
  },
  createdBy: {
    type: String,
    require: [true, "Please provide room creator name"],
  },
  roomAccess: {
    type: String,
    default: "public",
    value: ["Public", "Private"],
    message: `{VALUE} is not supported ie. room access is not public or private`,
  },
  roomExpiration: {
    type: Date,
    required: [true, "Please provide room Expiration"],
    index: { expires: "1d" },
  },
});

module.exports = mongoose.model("Video", VideoSchema);
