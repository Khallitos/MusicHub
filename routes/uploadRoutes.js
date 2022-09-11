import express from "express"
const router = express.Router()

import {uploadmusic} from "../controllers/uploadController.js"

router.route("/uploadmusic").post(uploadmusic)



export default router