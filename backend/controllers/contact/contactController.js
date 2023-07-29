import asyncHandler from "express-async-handler";
import { ContactUs } from "../../models/Contact/ContactUs.js";

// @desc    Post new contact message
// route    POST /api/contact/
// @access  Public
export const postContactUs = asyncHandler(async (req, res) => {
  const { name, email, phoneNumber, subject, message } = req.body;
  const formData = {
    name,
    email,
    phoneNumber,
    subject,
    message,
    date:Date.now()
  };
  if (name === null) {
    res.status(400);
    throw new Error("Content not exist");
  } else {
    const contact = await ContactUs.create(formData);
    res.status(201).json({ message: "Form Sent", contact });
  }
});

// @desc    Get all contact message
// route    GET /api/contact
// @access  Private
export const getContactUs = asyncHandler(async (req, res) => {
  const contact = await ContactUs.findAll();
  return res.status(200).json({ contact });
});

// @desc    Delete contact mesage by id
// route    DELETE /api/contact/:id
// @access  Private
export const deleteContactUs = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const contact = await ContactUs.findByPk(id);

  if (!contact) {
    res.status(400);
    throw new Error("Detail not found");
  }

  await contact.destroy();

  return res.status(204).json({
    message: "Message deleted",
  });
});