import asyncHandler from "express-async-handler";
import { Writer } from "../../models/Post/Writer.js";
import jwt from "jsonwebtoken";
import { User } from "../../models/Auth/User.js";
import { Post } from "../../models/Post/Post.js";
// @desc    Create new writer for post
// route    POST /api/post/writer
// @access  Private
export const createWriter = asyncHandler(async (req, res) => {
  const { body, file } = req;
  console.log(file, body);
  const { name } = body;

  const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
  console.log(decoded);
  if (name === null) {
    res.status(400);
    throw new Error("Content not exist");
  } else {
    const formData = {
      name,
      user_id: decoded.id,
      profilePicture: `/uploads/${file.filename}`,
    };

    const writer = await Writer.create(formData);
    res.status(201).json({ message: "Writer Created", writer });
  }
});

// @desc    Get all writers
// route    GET /api/post/writer
// @access  Public
export const getWriter = asyncHandler(async (req, res) => {
  const writer = await Writer.findAll({
    include: {
      model: Post,
      attributes: { exclude: ['content'] }, // Exclude the 'content' attribute
    },
  });
  return res.status(200).json({ writer });
});


// @desc    Get writer by id
// route    GET /api/post/writer/:id
// @access  Public
export const getWriterById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const writer = await Writer.findOne({
    include: {
      model: User,
      attributes: {
        exclude: ["password"],
      },
    },
    where: {
      writer_id: id,
    },
  });
  return res.status(200).json({ writer });
});

// @desc    Update writer by id
// route    PUT /api/post/writer/:id
// @access  Private
export const updateWriterById = asyncHandler(async (req, res) => {
  const { body, file } = req;
  const { name } = body;

  const { id } = req.params;

  const writer = await Writer.findByPk(id);

  if (writer) {
    writer.name = name || writer.name;
    writer.profilePicture =
      `/uploads/${file.filename}` || writer.profilePicture;
  }

  const updateWriter = await writer.save();

  res.status(200).json({
    message: "Writer updated.",
    updateWriter,
  });
});

// @desc    Delete writer by id
// route    DELETE /api/post/writer/:id
// @access  Private
export const deleteWriterById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const writer = await Writer.findByPk(id);

  if (!writer) {
    res.status(400);
    throw new Error("Writer not found");
  }

  await writer.destroy();

  return res.status(204).json({
    message: "Writer deleted",
  });
});
