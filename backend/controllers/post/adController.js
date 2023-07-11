import asyncHandler from "express-async-handler";
import { AdPost } from "../../models/Post/AdPost.js";
import { Post } from "../../models/Post/Post.js";

// @desc    Create new ad for post
// route    POST /api/post/ad
// @access  Private
export const createAd = asyncHandler(async (req, res) => {
  const { body, file } = req;

  const { altText, link, typeAd, postId, } = body;

  const checkPost = await Post.findOne({
    where: {
      post_id: postId,
    },
  });

  if (!checkPost) {
    res.status(400);
    throw new Error("Post does not exist");
  }

  const existingAd = await AdPost.findOne({
    where: {
      post_id: postId,
    },
  });

  if (existingAd) {
    res.status(400);
    throw new Error(
      "Ad already exists. Please update if you want to change the ad."
    );
  }

  if (altText === null || link === null || typeAd === null) {
    res.status(400);
    throw new Error("Content does not exist");
  }

  const formData = {
    altText,
    link,
    post_id: postId,
    img: `/uploads/${file.filename}`,
  };

  const ad = await AdPost.create(formData);
  res.status(201).json({ message: "Ad Created", ad });
});

// @desc    Get ad by post ID
// route    GET /api/home/ad/:id
// @access  Private
export const getAdByPostId = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const ad = await AdPost.findAll({
    where: {
      post_id: id,
    },
  });
  return res.status(200).json({ ad });
});

// @desc    Get all ad
// route    GET /api/home/ad
// @access  Private
export const getAd = asyncHandler(async (req, res) => {
  const ad = await AdPost.findAll();
  return res.status(200).json({ ad });
});

// @desc    Update ad by id
// route    PUT /api/home/ad/:id
// @access  Private
export const updateAdById = asyncHandler(async (req, res) => {
  const { body, file } = req;
  const { altText, link } = body;

  const { id } = req.params;

  const ad = await AdPost.findByPk(id);

  if (!ad) {
    res.status(400);
    throw new Error("Ad does not exist");
  }

  if (file && !req.file) {
    res.status(400);
    throw new Error(
      "Cannot update ad image. Please delete the ad and create a new one."
    );
  }

  ad.altText = altText || ad.altText;
  ad.link = link || ad.link;
  ad.img = ad.img;

  const updateAd = await ad.save();

  res.status(200).json({
    message: "Ad updated.",
    updateAd,
  });
});

// @desc    Delete ad by id
// route    DELETE /api/home/ad/:id
// @access  Private
export const deleteAdById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const ad = await AdPost.findByPk(id);

  if (!ad) {
    res.status(400);
    throw new Error("Ad not found");
  }

  await ad.destroy();

  return res.status(204).json({
    message: "Ad deleted",
  });
});
