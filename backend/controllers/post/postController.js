import asyncHandler from "express-async-handler";
import { Post } from "../../models/Post/Post.js";
import { Writer } from "../../models/Post/Writer.js";
import { AdPost } from "../../models/Post/AdPost.js";
import { Page } from "../../models/Page/Page.js";

// @desc    Create new news
// route    POST /api/post/news
// @access  Private
export const postNews = asyncHandler(async (req, res) => {
  const { file, body } = req;
  const { titlePost, linkPost, content, date, pageId, writerId, type } = body;
  const checkPage = await Page.findOne({
    where: {
      page_id: parseInt(pageId),
    },
  });

  if (!checkPage) {
    res.status(401);
    throw new Error("Page does not exist");
  }

  const checkWriter = await Writer.findOne({
    where: {
      writer_id: writerId,
    },
  });

  if (!checkWriter) {
    res.status(400);
    throw new Error("Writer does not exist");
  }

  if (linkPost === null || titlePost === null || content === null) {
    res.status(400);
    throw new Error("Content does not exist");
  } else {
    const formData = {
      titlePost,
      type,
      linkPost,
      content,
      date: parseInt(date),
      thumbnail: `/uploads/${file.filename}`,
      page_id: parseInt(pageId),
      writer_id: writerId,
    };
    const post = await Post.create(formData);
    res.status(201).json({ message: "Post Created", post });
  }
});

// @desc    Get all post
// route    GET /api/post/news
// @access  Public
export const getPost = asyncHandler(async (req, res) => {
  const post = await Post.findAll();
  return res.status(200).json({ post });
});

// @desc    Update post by id
// route    PUT /api/post/news/:id
// @access  Private
export const updatePostById = asyncHandler(async (req, res) => {
  const { titlePost, linkPost, content, date, thumbnail } = req.body;

  const { id } = req.params;

  const post = await Post.findByPk(id);

  if (post) {
    post.titlePost = titlePost || post.titlePost;
    post.linkPost = linkPost || post.linkPost;
    post.content = content || post.content;
    post.date = date || post.date;
    post.thumbnail = thumbnail || post.thumbnail;
  }

  const updatePost = await post.save();

  res.status(200).json({
    message: "Post updated.",
    updatePost,
  });
});

// @desc    Delete post by id
// route    DELETE /api/post/news/:id
// @access  Private
export const deletePostById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const post = await Post.findByPk(id);

  if (!post) {
    res.status(400);
    throw new Error("Post not found");
  }

  await post.destroy();

  return res.status(204).json({
    message: "Post deleted",
  });
});

// @desc    Get post by id
// route    GET /api/post/news/:id
// @access  Public
export const getPostById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const post = await Post.findAll({
    where: {
      post_id: id,
    },
    include: {
      model: AdPost,
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    },
  });

  const writer = await Writer.findOne({
    where: {
      writer_id: post.writer_id,
    },
  });
  return res.status(200).json({ post, writer });
});
