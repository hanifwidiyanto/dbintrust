import asyncHandler from "express-async-handler";
import { Opinion } from "../../models/Content/Opinion.js";

// @desc    Post new opinions
// route    POST /api/content/opinion
// @access  Private
export const postOpinion = asyncHandler(async (req, res) => {
  const { content, profile } = req.body;
  const formData = {
    content,
    profile,
    imgProfile: `/uploads/${req.file.filename}`,
  };
  if (content === null) {
    res.status(400);
    throw new Error("Content not exist");
  } else {
    const opinion = await Opinion.create(formData);
    res.status(201).json({ message: "Opinion Posted", opinion });
  }
});

// @desc    Get all opinions
// route    GET /api/content/opinion
// @access  Public
export const getOpinion = asyncHandler(async (req, res) => {
  const opinion = await Opinion.findAll();
  return res.status(200).json({ opinion });
});

// @desc    Update opinion by id
// route    PUT /api/content/opinion/:id
// @access  Private
export const updateOpinionById = asyncHandler(async (req, res) => {
  const { body, file } = req;
  const { id } = req.params;

  const opinion = await Opinion.findByPk(id);

  if (opinion) {
    opinion.content = body.content || opinion.content;
  }
  if (opinion.profile) {
    opinion.profile = body.profile;
  }

  if (opinion.imgProfile) {
    opinion.imgProfile = `/uploads/${file.filename}`;
  }

  const updatedOpinion = await opinion.save();

  res.status(200).json({
    message: "Opinion updated.",
    updatedOpinion,
  });
});

// @desc    Delete opinion by id
// route    DELETE /api/content/opinion/:id
// @access  Private
export const deleteOpinionById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const opinion = await Opinion.findByPk(id);

  if (!opinion) {
    res.status(400);
    throw new Error("Opinion not found");
  }

  await opinion.destroy();

  return res.status(204).json({
    message: "Opinion deleted",
  });
});
