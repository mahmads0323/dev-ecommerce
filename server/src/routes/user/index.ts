import express from "express"
import { PostUser, PostUserDetailsToLogin, PostVerifyToken } from "../../controllers/user";

const router = express.Router();

router.post("/verify", PostVerifyToken)
router.post("/login", PostUserDetailsToLogin)
router.route("/").post(PostUser)

export default router;