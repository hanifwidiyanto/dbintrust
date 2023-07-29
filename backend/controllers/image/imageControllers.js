import asyncHandler from "express-async-handler";
import {Image} from "../../models/Image/Image.js";
import {User} from "../../models/Auth/User.js";

// @desc     Upload new images
// route     POST /api/image/upload
// @access   Private

export const postImage= asyncHandler(async (req, res) => {
  const { file, body } = req;
  const { imageDesc, date, userId } = body;

console.log(file,body)
  if (imageDesc=== null || date === null || userId === null) {
    res.status(400);
    throw new Error("Content does not exist");
  } else {
    const formData = {
      imageDesc,
      date,
      image: `/uploads/${file.filename}`,
      user_id: userId,
    };
    const post = await Image.create(formData);
    res.status(201).json({ message: "Image Uploaded", post });
  }
});


// @desc     Upload new images
// route     POST /api/image/get
// @access   Public

export const getImage= asyncHandler(async (req, res) => {
const data = await Image.findAll({
include:{
model:User
}
})
res.status(200).json({data})
});


// @desc    Delete image by id
// route    DELETE /api/image/delete/:id
// @access  Private
export const deleteImageById = asyncHandler(async (req, res) => {

  const id = req.params.id;
  const image = await Image.findByPk(id);

  if (!image) {
    res.status(400);
    throw new Error("Image not found");
  }

  await image.destroy();

  return res.status(204).json({
    message: "Image deleted",
  });
});
