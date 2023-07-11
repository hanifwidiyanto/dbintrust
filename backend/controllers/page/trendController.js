import asyncHandler from "express-async-handler";
import { TrendPost } from "../../models/Page/TrendPage.js";


// @desc    Create new trend 
// route    POST /api/page/trend
// @access  Private
export const postTrend = asyncHandler(async (req, res) => {
  const { link, title, rank, pageId } = req.body;

  if (link === null || title === null || rank === null) {
    res.status(400);
    throw new Error("Content does not exist");
  }

  const parsedRank = parseInt(rank);
  if (parsedRank > 5) {
    res.status(400);
    throw new Error("Rank exceeds the maximum limit of 5");
  }

  const existingTrend = await TrendPost.findOne({
    where: {
      rank: parsedRank,
      page_id: pageId,
    },
  });

  if (existingTrend) {
    existingTrend.link = link || existingTrend.link;
    existingTrend.title = title || existingTrend.title;

    const updatedTrend = await existingTrend.save();

    res.status(200).json({ message: "Trend Updated", updatedTrend });
  } else {
    const formData = {
      link,
      title,
      rank: parsedRank,
      page_id: pageId,
    };

    const newTrend = await TrendPost.create(formData);

    res.status(201).json({ message: "Trend Created", newTrend });
  }
});


// @desc    Get all trend page page
// route    GET /api/page/trend
// @access  Public
export const getTrend = asyncHandler(async (req, res) => {
  const trend = await TrendPost.findAll();
  return res.status(200).json({ trend });
});

// @desc    Update Trend by id
// route    PUT /api/page/trend/:id
// @access  Private
// export const updateTrendById = asyncHandler(async (req, res) => {
//   const { link, title, rank } = req.body;

//   const { id } = req.params;

//   const trend = await TrendPost.findByPk(id);

//   if (trend) {
//     trend.title = title || trend.title;
//     trend.link = link || trend.link;
//     trend.rank = rank || trend.rank;
//   }

//   const updateTrend = await TrendPost.save();

//   res.status(200).json({
//     message: "Trend updated.",
//     updateTrend,
//   });
// });

// @desc    Delete trend by id
// route    DELETE /api/page/trend/:id
// @access  Private
export const deleteTrendById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const trend = await TrendPost.findByPk(id);

  if (!trend) {
    res.status(400);
    throw new Error("Trend not found");
  }

  await trend.destroy();

  return res.status(204).json({
    message: "Trend deleted",
  });
});
