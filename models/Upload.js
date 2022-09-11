import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UploadSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 3,
  },

  description: {
    type: String,
    minlength: 3,
  },

  coverart: {
    type: String,
  },

  song: {
    type: String,
  },
  Genre: {
    type: String,
    minlength: 3,

  },
  artist: {
    type: String,
    minlength: 3,

  },

  verified: {
    type: Boolean,
  },
});

export default mongoose.model("Songs", UploadSchema);
