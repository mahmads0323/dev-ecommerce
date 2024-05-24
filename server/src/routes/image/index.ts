import express from "express"
import multer from "multer"
import { GetImage, PostImage } from "../../controllers/image";

const router = express.Router();
const upload = multer();

router.get("/:imageId", GetImage);
router.post("/", upload.single("productImage") ,PostImage);

export default router;