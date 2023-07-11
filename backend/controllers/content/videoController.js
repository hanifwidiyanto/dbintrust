import asyncHandler from "express-async-handler";
import { Video } from "../../models/Content/Video.js";

// @desc    Post new Video
// route    POST /api/content/video
// @access  Private
export const postVideo = asyncHandler(async (req, res) => {
  const { idYoutube, title, desc } = req.body;

  if (idYoutube === null || title === null || desc === null) {
    res.status(400);
    throw new Error("Content not exist");
  } else {
    const video = await Video.create({
      idYoutube,
      title,
      desc,
    });
    res.status(201).json({ message: "Opinion Posted", video });
  }
});

// @desc    Get all videos
// route    GET /api/content/video
// @access  Public
export const getVideo = asyncHandler(async (req, res) => {
  const video = await Video.findAll();
  return res.status(200).json({ video });
});

// @desc    Get video by id
// route    GET /api/content/video/:id
// @access  Public
export const getVideoById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const video = await Video.findByPk(id);
  return res.status(200).json({ video });
});

// @desc    Update video by id
// route    PUT /api/content/video/:id
// @access  Private
export const updateVideoById = asyncHandler(async (req, res) => {
  const { idYoutube, title, desc } = req.body;
  const { id } = req.params;

  const video = await Video.findByPk(id);

  if (video) {
    video.idYoutube = idYoutube || video.idYoutube;
    video.title = title || video.title;
    video.desc = desc || video.desc;
  }

  const updateVideo = await video.save();

  res.status(200).json({
    message: "Video updated.",
    updateVideo,
  });
});

// @desc    Delete video by id
// route    DELETE /api/content/video/:id
// @access  Private
export const deleteVideoById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const video = await Video.findByPk(id);

  if (!video) {
    res.status(400);
    throw new Error("Video not found");
  }

  await video.destroy();

  return res.status(204).json({
    message: "Video deleted",
  });
});
