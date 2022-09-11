import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import "express-async-errors";
import connectDb from "./db/connectDb.js";
import  authRouter  from "./routes/authRoutes.js";
import  uploadRouter from "./routes/uploadRoutes.js"
import errorHandlerMiddleware from "./middleware/error-handler.js"
import fileUpload from "express-fileupload"
import multer from "multer"
import { nanoid } from "nanoid";
import path from "path"
import bodyParser from 'body-parser';


const app = express();
// const storage = multer.diskStorage({
//   destination:(req,file,cb)=>{
//     cb(null,'uploads')
//   },
//  filename:(req,file,cb)=>{
//   cb(null,"kanmusic-" + nanoid())
//  }
// })
//  const upload = multer({storage:storage})

app.use(express.json({limit: "10mb", extended: true}))
app.use(express.urlencoded({limit: "10mb", extended: true, parameterLimit: 50000}))
dotenv.config();
const PORT = process.env.PORT_NO || 6000;
if(process.env.NODE_ENV !=="production"){
  app.use(morgan("dev"));
}

app.use(express.static('./public'));
app.use(express.json());
app.use(fileUpload())
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/upload", uploadRouter);

app.use(errorHandlerMiddleware);

app.listen(PORT, () => console.log(`server is running ${PORT}`));

const start = async () => {
  try {
    const connect = await connectDb(process.env.MONGO_URI);
  } catch (error) {
    console.log(error);
  }
};
start();
