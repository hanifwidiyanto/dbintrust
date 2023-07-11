import asyncHandler from "express-async-handler";
import { HeadlinePost } from "../../models/Page/HeadlinePost.js";
import { Page } from "../../models/Page/Page.js";
// @desc    Create new headline
// route    POST /api/page/headline
// @access  Private
export const postHeadline = asyncHandler(async (req, res) => {
  const { titleHeadline, urlHeadline, typeHeadline, pageId, image } = req.body;
  console.log(req.body)
  const checkPage = await Page.findOne({
    where: {
      page_id: pageId,
    },
  });

  if (!checkPage) {
    res.status(400);
    throw new Error("Page does not exist");
  }

  if (titleHeadline === null || urlHeadline === null || typeHeadline === null) {
    res.status(400);
    throw new Error("Content does not exist");
  }

  if (typeHeadline !== "sub" && typeHeadline !== "main") {
    res.status(400);
    throw new Error("Invalid typeHeadline. Only 'sub' or 'main' is allowed");
  }

  if (typeHeadline === "sub") {
    const checkSubHeadline = await HeadlinePost.findAll({
      where: {
        typeHeadline: "sub",
        page_id: pageId,
      },
    });

    if (checkSubHeadline.length >= 4) {
      res.status(400);
      throw new Error("Maximum 4 sub headlines reached. Please delete one to add a new one.");
    }

    const formData = {
      titleHeadline,
      urlHeadline,
      typeHeadline,
      page_id: pageId,
      image,
    };

    const subHeadline = await HeadlinePost.create(formData);

    res.status(201).json({ message: "Sub Headline Created", subHeadline });
  } else if (typeHeadline === "main") {
    const checkHeadline = await HeadlinePost.findOne({
      where: {
        typeHeadline: "main",
        page_id: pageId,
      },
    });

    if (checkHeadline) {
      checkHeadline.titleHeadline = titleHeadline || checkHeadline.titleHeadline;
      checkHeadline.urlHeadline = urlHeadline || checkHeadline.urlHeadline;
      checkHeadline.image = image || checkHeadline.image;

      const updatedHeadline = await checkHeadline.save();

      res.status(200).json({ message: "Headline Updated", updatedHeadline });
    } else {
      const formData = {
        titleHeadline,
        urlHeadline,
        typeHeadline,
        page_id: pageId,
        image,
      };

      const mainHeadline = await HeadlinePost.create(formData);

      res.status(201).json({ message: "Main Headline Created", mainHeadline });
    }
  }
});



// @desc    Get all heaadline
// route    GET /api/page/headline
// @access  Public
export const getHeadline = asyncHandler(async (req, res) => {
  const headline = await HeadlinePost.findAll();
  return res.status(200).json({ headline });
});

// @desc    Update Headline by id
// route    PUT /api/page/headline/:id
// @access  Private
// export const updateHeadlineById = asyncHandler(async (req, res) => {
//   const { titleHeadline, urlHeadline, typeHeadline, image } = req.body;

//   const { id } = req.params;

//   const headline = await HeadlinePost.findByPk(id);

//   if (headline) {
//     headline.urlHeadline = urlHeadline || headline.urlHeadline;
//     headline.titleHeadline = titleHeadline || headline.titleHeadline;
//     headline.typeHeadline = typeHeadline || headline.typeHeadline;
//     headline.image = image || headline.image;
//   }

//   const updateHeadline = await headline.save();

//   res.status(200).json({
//     message: "Headline updated.",
//     updateHeadline,
//   });
// });

// @desc    Delete headline by id
// route    DELETE /api/page/headline/:id
// @access  Private
export const deleteHeadlineById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const headline = await HeadlinePost.findByPk(id);

  if (!headline) {
    res.status(400);
    throw new Error("Headline not found");
  }

  await headline.destroy();

  return res.status(204).json({
    message: "Headline deleted",
  });
});
