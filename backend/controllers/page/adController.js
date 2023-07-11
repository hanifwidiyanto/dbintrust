import asyncHandler from "express-async-handler";
import { AdPage } from "../../models/Page/AdPage.js";
import { Page } from "../../models/Page/Page.js";

// @desc    Create new ad for channel page
// route    POST /api/page/ad
// @access  Private
export const createAd = asyncHandler(async (req, res) => {
  const { body, file } = req;
  const { altText, link, typeAd, pageId } = body;

  const checkPage = await Page.findOne({
    where: {
      page_id: pageId,
    },
  });

  if (!checkPage) {
    res.status(400);
    throw new Error("Page does not exist");
  }

  const existingAd = await AdPage.findOne({
    where: {
      typeAd: typeAd,
      page_id: pageId,
    },
  });

  if (existingAd) {
    existingAd.altText = altText || existingAd.altText;
    existingAd.link = link || existingAd.link;
    existingAd.img = existingAd.img || `/uploads/${file.filename}`;

    await existingAd.save();

    res.status(200).json({
      message: "Ad updated",
      ad: existingAd,
    });
  } else {
    if (!file) {
      res.status(400);
      throw new Error("Image does not exist");
    }

    if (typeAd === 'main-ad' || typeAd === 'second-ad') {
      const formData = {
        altText,
        link,
        typeAd,
        page_id: pageId,
        img: `/uploads/${file.filename}`,
      };

      const newAd = await AdPage.create(formData);

      res.status(201).json({
        message: "Ad Created",
        ad: newAd,
      });
    } else {
      res.status(400);
      throw new Error("Not allowed to create ad with this type");
    }
  }
});


// @desc    Get all ad
// route    GET /api/page/ad
// @access  Private
export const getAd = asyncHandler(async (req, res) => {
  const ad = await AdPage.findAll();
  return res.status(200).json({ ad });
});

// @desc    Update ad by id
// route    PUT /api/page/ad/:id
// @access  Private
export const updateAdById = asyncHandler(async (req, res) => {
  const { body, file } = req;
  const { altText, link, typeAd } = body;

  const { id } = req.params;

  const ad = await AdPage.findByPk(id);

  if (ad) {
    ad.altText = altText || ad.altText;
    ad.link = link || ad.link;
    ad.typeAd = typeAd || ad.typeAd;
    ad.img = `/uploads/${file.filename}` || ad.img;
  }

  const updateAd = await ad.save();

  res.status(200).json({
    message: "Ad updated.",
    updateAd,
  });
});

// @desc    Delete ad by id
// route    DELETE /api/page/ad/:id
// @access  Private
export const deleteAdById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const ad = await AdPage.findByPk(id);

  if (!ad) {
    res.status(400);
    throw new Error("Ad not found");
  }

  await ad.destroy();

  return res.status(204).json({
    message: "Ad deleted",
  });
});
