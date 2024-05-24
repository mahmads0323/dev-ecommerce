import express from "express";
import {
  PostProduct,
  GetProductById,
  GetEditProductById,
  PatchEditProductById,
  GetCartProductsByIds,
  GetProductsByTagAndText,
  DeleteProductById,
} from "../../controllers/product";

const router = express.Router();

router.get("/cart", GetCartProductsByIds);
router.get("/by-tags-and-text", GetProductsByTagAndText);

router.route("/").post(PostProduct);
router.route("/:productId").get(GetProductById).delete(DeleteProductById);

router
  .route("/edit/:productId")
  .get(GetEditProductById)
  .patch(PatchEditProductById);

export default router;
