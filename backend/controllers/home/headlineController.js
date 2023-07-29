import asyncHandler from "express-async-handler";
import { HeadlineHome } from "../../models/Home/HeadlineHome.js";
import { PageHome } from "../../models/Home/PageHome.js";

// @desc    Create new headline for home page
// route    POST /api/home/headline
// @access  Private
export const postHeadline = asyncHandler(async (req, res) => {
  const { body } = req;
  const { titleHeadline, urlHeadline, typeHeadline, image } = body;

  const pageHome = await PageHome.findOne({
    where: {
      pageName: "Home",
    },
  });
  const pageId = pageHome.page_id;

  const checkSubHeadline = await HeadlineHome.findAll({
    where: {
      typeHeadline: "sub",
    },
  });
  if (checkSubHeadline.length === 2) {
    res.status(400);
    throw new Error("Sub Headline Already 2, Please delete one of them");
  }

  if (titleHeadline === null || urlHeadline === null || typeHeadline === null) {
    res.status(400);
    throw new Error("Content not exist");
  } else {
    const formData = {
      titleHeadline,
      urlHeadline,
      typeHeadline,
      page_id: pageId,
      image,
    };

    const headline = await HeadlineHome.create(formData);
    res.status(201).json({ message: "Headline Created", headline });
  }
});

// @desc    Get all heaadline home page
// route    GET /api/home/headline
// @access  Public
export const getHeadline = asyncHandler(async (req, res) => {
  const headline = await HeadlineHome.findAll();
  return res.status(200).json({ headline });
});

// @desc    Update Headline by id
// route    PUT /api/home/headline/:id
// @access  Private
export const updateHeadlineById = asyncHandler(async (req, res) => {
   const { titleHeadline, urlHeadline, typeHeadline, image } = req.body;

  const { id } = req.params;

  const headline = await HeadlineHome.findByPk(id);

  if (headline) {
    headline.urlHeadline = urlHeadline || headline.urlHeadline;
    headline.titleHeadline = titleHeadline || headline.titleHeadline;
    headline.typeHeadline = typeHeadline || headline.typeHeadline;
headline.image = image || headline.image;
  }

  const updateHeadline = await headline.save();

  res.status(200).json({
    message: "Headline updated.",
    updateHeadline,
  });
});

// @desc    Delete headline by id
// route    DELETE /api/home/headline/:id
// @access  Private
export const deleteHeadlineById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const headline = await HeadlineHome.findByPk(id);

  if (!headline) {
    res.status(400);
    throw new Error("Headline not found");
  }

  await headline.destroy();

  return res.status(204).json({
    message: "Headline deleted",
  });
});
