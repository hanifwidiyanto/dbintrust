import asyncHandler from "express-async-handler";
import { PageHome } from "../../models/Home/PageHome.js";
import { AdHome } from "../../models/Home/AdHome.js";
import { HeadlineHome } from "../../models/Home/HeadlineHome.js";
import { QuickLink } from "../../models/Home/QuickLink.js";
import { TrendHome } from "../../models/Home/TrendHome.js";

// @desc    Create New Page
// route    POST /api/home/page
// @access  Private
export const createPage = asyncHandler(async (req, res) => {
  const { pageName } = req.body;

  if (pageName == "Home") {
    res.status(400);
    throw new Error("Page already creted");
 } // non aktifkan kalo baru bikin

  const page = await PageHome.create({
    pageName,
  });

  res.status(201).json({ message: "Page Created", page });
});

// @desc    Get page detail by ID
// route    GET /api/home/page/
// @access  Private
// export const getPageById = asyncHandler(async (req, res) => {
//   const { id } = req.params;

//   const page = await PageHome.findOne({
//     where: {
//       page_id: id,
//     },
//     include: [
//       {
//         model: AdHome,
//         attributes: {
//           exclude: ["createdAt", "updatedAt"],
//         },
//       },
//       {
//         model: HeadlineHome,
//         attributes: {
//           exclude: ["createdAt", "updatedAt"],
//         },
//       },
//       {
//         model: QuickLink,
//         attributes: {
//           exclude: ["createdAt", "updatedAt"],
//         },
//       },
//       {
//         model: TrendHome,
//         attributes: {
//           exclude: ["createdAt", "updatedAt"],
//         },
//       },
//     ],
//   });

//   return res.status(200).json({ page });
// });

// @desc    Get all page
// route    GET /api/home/page/
// @access  Private
export const getPage = asyncHandler(async (req, res) => {
  const page = await PageHome.findAll({
    where: {
      pageName: "Home",
    },
    include: [
      {
        model: AdHome,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      {
        model: HeadlineHome,
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
        model: TrendHome,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    ],
  });

  if (!page) {
    res.status(400);
    throw new Error("Page does not exist, please create first");
  }
  return res.status(200).json({ page });
});

// @desc    Update page by Id
// route    PUT /api/home/page/:id
// @access  Private
export const updatePageById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const page = await PageHome.findOne({
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
// route    DELETE /api/home/page/:id
// @access  Private
export const deletePageById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const page = await PageHome.findByPk(id);

  if (!page) {
    res.status(400);
    throw new Error("Page not found");
  }

  await page.destroy();

  return res.status(204).json({
    message: "Page deleted",
  });
});
