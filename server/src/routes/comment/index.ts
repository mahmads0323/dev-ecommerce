import express from "express";
import { GetComments, PostComment } from "../../controllers/comment";
import AuthenticateUser from "../../middleware/authenticateUser";

const router = express.Router();

router.post("/", AuthenticateUser, PostComment)
router.get("/", GetComments);

export default router;
