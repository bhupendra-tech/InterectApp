// here we will do CRUD operations related to videos like creation, updating number of members, deleting a room after expiration date
const { StatusCodes } = require("http-status-codes");
const Video = require("../models/videos");

const createVideo = async (req, res) => {
  const video = await Video.create(req.body);
  const id = (video._id).valueOf();
  res.status(StatusCodes.CREATED).json({ msg: "Room joined",id:id });
};

module.exports = { createVideo };
