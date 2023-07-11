import asyncHandler from "express-async-handler";
import { QuickLink } from "../../models/Page/QuickLink.js";
import { Page } from "../../models/Page/Page.js";

// @desc    Create new quicklink 
// route    POST /api/page/quick-link
// @access  Private
export const postQuickLink = asyncHandler(async (req, res) => {
  const { link, title, keyword, pageId } = req.body;

  const checkPage = await Page.findOne({
    where: {
      page_id: pageId,
    },
  });

  if (!checkPage) {
    res.status(400);
    throw new Error("Page does not exist");
  }
  
  if (link === null || title === null || keyword === null) {
    res.status(400);
    throw new Error("Content not exist");
  } else {
    const formData = {
      link,
      title,
      keyword,
      page_id: pageId,
    };

    const quickLink = await QuickLink.create(formData);
    res.status(201).json({ message: "Quicklink Created", quickLink });
  }
});

// @desc    Get all quicklink 
// route    GET /api/page/quick-link
// @access  Public
export const getQuickLink = asyncHandler(async (req, res) => {
  const quickLink = await QuickLink.findAll();
  return res.status(200).json({ quickLink });
});

// @desc    Update Quicklink by id
// route    PUT /api/page/quicklink/:id
// @access  Private
export const updateQuickLinkById = asyncHandler(async (req, res) => {
  const { link, title, keyword } = req.body;

  const { id } = req.params;

  const quickLink = await QuickLink.findByPk(id);

  if (quickLink) {
    quickLink.title = title || quickLink.title;
    quickLink.link = link || quickLink.link;
    quickLink.keyword = keyword || quickLink.keyword;
  }

  const updateQuickLink = await quickLink.save();

  res.status(200).json({
    message: "QuickLInk updated.",
    updateQuickLink,
  });
});

// @desc    Delete quicklink by id
// route    DELETE /api/page/quicklink/:id
// @access  Private
export const deleteQuickLinkById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const quickLink = await QuickLink.findByPk(id);

  if (!quickLink) {
    res.status(400);
    throw new Error("QuickLink not found");
  }

  await quickLink.destroy();

  return res.status(204).json({
    message: "QuickLink deleted",
  });
});
