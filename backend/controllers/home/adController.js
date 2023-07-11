import asyncHandler from "express-async-handler";
import { AdHome } from "../../models/Home/AdHome.js";
import { PageHome } from "../../models/Home/PageHome.js";

// @desc    Create new ad for home page
// route    POST /api/home/ad
// @access  Private
export const createAd = asyncHandler(async (req, res) => {
  const { body, file } = req;
  console.log(req.body, req.file);
  const { altText, link, typeAd } = body;

  const pageHome = await PageHome.findOne({
    where: {
      pageName: "Home",
    },
  });
  const pageId = pageHome.page_id;

  const checkAd = await AdHome.findAll({
    where: {
      typeAd: typeAd,
    },
  });

  if (checkAd.length > 0) {
    // Simpan nilai img sebelum menghapus entitas
    const previousImg = checkAd[0].img;

    for (let i = 0; i < checkAd.length; i++) {
      await checkAd[i].destroy();
    }

    if (altText === null || link === null || typeAd === null) {
      res.status(400);
      throw new Error("Content does not exist");
    } else {
      const formData = {
        altText,
        link,
        page_id: pageId,
        typeAd,
        img: previousImg, // Gunakan nilai img sebelumnya
      };

      const ad = await AdHome.create(formData);
      res.status(201).json({ message: "Ad Created", ad });
    }
  } else {
    if (!file) {
      res.status(400);
      throw new Error("Image does not exist");
    }
    if (
      typeAd === "main-ad" ||
      typeAd === "second-ad" ||
      typeAd === "third-ad"
    ) {
      if (altText === null || link === null || typeAd === null) {
        res.status(400);
        throw new Error("Content does not exist");
      } else {
        const formData = {
          altText,
          link,
          page_id: pageId,
          typeAd,
          img: file ? `/uploads/${file.filename}` : null,
        };

        const ad = await AdHome.create(formData);
        res.status(201).json({ message: "Ad Created", ad });
      }
    } else {
      res.status(400);
      throw new Error("Not permission to create other ad type");
    }
  }
});

// @desc    Get all ad home page
// route    GET /api/home/ad
// @access  Private
export const getAd = asyncHandler(async (req, res) => {
  const ad = await AdHome.findAll();

  return res.status(200).json({ ad });
});

// @desc    Update ad by id
// route    PUT /api/home/ad/:id
// @access  Private
// export const updateAdById = asyncHandler(async (req, res) => {
//   const { body, file } = req;
//   const { altText, link, typeAd } = body;

//   const { id } = req.params;
//   const ad = await AdHome.findByPk(id);
//   console.log(req)
//   if (ad) {
//     ad.altText = altText || ad.altText;
//     ad.link = link || ad.link;
//     ad.typeAd = typeAd || ad.typeAd;

//     if (file) {
//       ad.img = `/uploads/${file.filename}`;
//     }

//     await ad.save();

//     res.status(200).json({
//       message: "Ad updated.",
//       updateAd: ad,
//     });
//   } else {
//     res.status(404).json({
//       message: "Ad not found.",
//     });
//   }
// });

// @desc    Delete ad by id
// route    DELETE /api/home/ad/:id
// @access  Private
export const deleteAdById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const ad = await AdHome.findByPk(id);

  if (!ad) {
    res.status(400);
    throw new Error("Ad not found");
  }

  await ad.destroy();

  return res.status(204).json({
    message: "Ad deleted",
  });
});
