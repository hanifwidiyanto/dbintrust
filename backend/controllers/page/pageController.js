import asyncHandler from "express-async-handler";
import { Page } from "../../models/Page/Page.js";
import { AdPage } from "../../models/Page/AdPage.js";
import { TrendPost } from "../../models/Page/TrendPage.js";
import { QuickLink } from "../../models/Page/QuickLink.js";
import { HeadlinePost } from "../../models/Page/HeadlinePost.js";
import { Post } from "../../models/Post/Post.js";

// @desc    Create New Page
// route    POST /api/page/page
// @access  Private
export const createPage = asyncHandler(async (req, res) => {
  const { pageName } = req.body;

  const page = await Page.create({
    pageName,
  });

  res.status(201).json({ message: "Page Created", page });
});

// @desc    Get page detail by ID
// route    GET /api/page/page/:id
// @access  Private
export const getPageById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const page = await Page.findOne({
    where: {
      page_id: id,
    },
    include: [
      {
        model: AdPage,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      {
        model: HeadlinePost,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      {
        model: QuickLink,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      {
        model: TrendPost,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    ],
  });

  return res.status(200).json({ page });
});


// @desc    Get all page
// route    GET /api/page/page/:id
// @access  Private
export const getAllPage = asyncHandler(async (req, res) => {
  const page = await Page.findAll({
    include: [
      {
        model: AdPage,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      {
        model: HeadlinePost,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      {
        model: QuickLink,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      {
        model: TrendPost,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
        {
        model: Post,
        attributes: {
          exclude: ["createdAt", "updatedAt", "content"],
        },
      },
    ],
  });
  return res.status(200).json({ page });
});

// @desc    Update page by Id
// route    PUT /api/page/page/:id
// @access  Private
export const updatePageById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const page = await Page.findOne({
    where: {
      page_id: id,
    },
  });
  if (page) {
    page.pageName = pageName || page.pageName;
  }

  const updatePage = await page.save();

  res.status(200).json({
    message: "Page updated.",
    updatePage,
  });
});

// @desc    Delete page by id
// route    DELETE /api/page/page/:id
// @access  Private
export const deletePageById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const page = await Page.findByPk(id);
  
    if (!page) {
      res.status(400);
      throw new Error("Page not found");
    }
  
    await page.destroy();
  
    return res.status(204).json({
      message: "Page deleted",
    });
  });
  