import asyncHandler from "express-async-handler";
import { TrendHome } from "../../models/Home/TrendHome.js";
import { PageHome } from "../../models/Home/PageHome.js";

// @desc    Create new trend for home page
// route    POST /api/home/trend
// @access  Private
export const postTrend = asyncHandler(async (req, res) => {
  const { link, title, rank } = req.body;

  if (parseInt(rank) > 5) {
    res.status(400);
    throw new Error("Rank max value is 5");
  }

  const pageHome = await PageHome.findOne({
    where: {
      pageName: "Home",
    },
  });
  const pageId = pageHome.page_id;

  const checkTrend = await TrendHome.findAll({
    where: {
      rank: rank,
    },
  });

  if (checkTrend.length > 0) {
    for (let i = 0; i < checkTrend.length; i++) {
      await checkTrend[i].destroy();
    }
  }

  if (link === null || title === null || rank === null) {
    res.status(400);
    throw new Error("Content does not exist");
  } else {
    const formData = {
      link,
      title,
      rank,
      page_id: pageId,
    };

    const trend = await TrendHome.create(formData);
    res.status(201).json({ message: "Trend Created", trend });
  }
});

// @desc    Get all trend home page
// route    GET /api/home/trend
// @access  Public
export const getTrend = asyncHandler(async (req, res) => {
  const trend = await TrendHome.findAll();
  return res.status(200).json({ trend });
});

// @desc    Update Trend by id
// route    PUT /api/home/trend/:id
// @access  Private
// export const updateTrendById = asyncHandler(async (req, res) => {
//   const { link, title, rank } = req.body;

//   const { id } = req.params;

//   const trend = await TrendHome.findByPk(id);

//   if (trend) {
//     trend.title = title || trend.title;
//     trend.link = link || trend.link;
//     trend.rank = rank || trend.rank;
//   }

//   const updateTrend = await TrendHome.save();

//   res.status(200).json({
//     message: "Trend updated.",
//     updateTrend,
//   });
// });

// @desc    Delete trend by id
// route    DELETE /api/home/trend/:id
// @access  Private
export const deleteTrendById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const trend = await TrendHome.findByPk(id);
  console.log(id);
  if (!trend) {
    res.status(400);
    throw new Error("Trend not found");
  }

  await trend.destroy();

  return res.status(204).json({
    message: "Trend deleted",
  });
});
