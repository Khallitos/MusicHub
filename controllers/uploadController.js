import Upload from "../models/Upload.js";
import BadRequestError from "../errors/bad-request.js";
import sendMail from "../utils/emailSender.js";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import emailvalidator from "email-validator";
import bcrypt from "bcryptjs";
import path from "path";
import { nanoid } from "nanoid";
import getBase64 from "getbase64data";
import sizeCalc from "../utils/fileSizeCalculator.js";

const uploadmusic = async (req, res) => {
  const { title,description,image,Genre,artist} = req.body;
  const imageName = `${title}-${nanoid()}`;
  const mimeType = !!image && (await getBase64.mimeType(image));
  const fileSize = sizeCalc(image);
  console.log(fileSize)
  if(fileSize > 5){
    throw new BadRequestError("Image size should not be than 3mb")
  }
  // const uploadedsong = await Upload.create({title,description,image,Genre,artist})
  // res.status(200).send("success");
};

export { uploadmusic };
