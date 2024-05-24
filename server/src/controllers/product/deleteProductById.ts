import { Request, Response } from "express";
import PRODUCT from "../../models/product";
import DeleteImage from "../image/deleteImage";
import COMMENT from "../../models/comment";

const MONGODB_OBJECT_LENGTH = 24;
const DeleteProductById = async (req: Request, res: Response) => {
  const productId = req.params.productId;
  if (!productId) {
    return res.json({ message: "error: no product id" });
  }
  if (productId.length !== MONGODB_OBJECT_LENGTH) {
    return res.json({ message: "error: inavlid product id" });
  }
  try {
    const product = await PRODUCT.findByIdAndDelete(productId);
    if (!product) {
      return res.json({ message: "error: unable to find product" });
    }
    const productImage = product?.productImage;
    // delete image
    try {
      const imageDeleteResult = await DeleteImage(productImage);
      console.log("imageDeleteResult: ", imageDeleteResult);
    } catch (err) {
      // do nothing
    }
    // delete comments
    try {
      const commentsDeleteResult = await COMMENT.deleteMany({
        productId: productId,
      });
      console.log("commentsDeleteResult: ", commentsDeleteResult);
    } catch (err) {
      // do nothing
    }
  } catch (err) {
    return res.json({ message: "error: unable to delete product " + err });
  }
  return res.json({ message: "ok" });
};

export default DeleteProductById;
