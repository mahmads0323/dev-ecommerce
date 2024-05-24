import { Request, Response } from "express";
import PRODUCT from "../../models/product";

const MONGODB_OBJECT_LENGTH = 24;
const PatchEditProductById = async (req: Request, res: Response) => {
  const productId = req.params.productId;
  const body = req.body;
  if (!productId) {
    return res.json({ message: "error: no product id" });
  }
  if (productId.length !== MONGODB_OBJECT_LENGTH) {
    return res.json({ message: "error: inavlid product id" });
  }
  if (!body) {
    return res.json({ message: "error: request do not include body" });
  }
  const bodyProduct = body.product;
  // verification purpose only
  const productToBeInserted = {
    productName: bodyProduct.productName,
    brandName: bodyProduct.brandName,
    productImage: bodyProduct.productImage,
    productPrice: bodyProduct.productPrice,
    productDescription: bodyProduct.productDescription,
    productDicount: bodyProduct.productDicount,
    category: bodyProduct.category,
  };
  try {
    const updatedResult = await PRODUCT.updateOne(
      { _id: productId },
      { ...productToBeInserted }
    );
    if (updatedResult.matchedCount != 1) {
      return res.json({ message: "error: no product matched" });
    }
    if (updatedResult.modifiedCount != 1) {
      return res.json({ message: "error: unable to update product" });
    }
    return res.json({ message: productId });
  } catch (err) {
    return res.json({ message: "error: cannot updated product " + err });
  }
  console.log(bodyProduct);
  return res.json({ messag: "ok" });
};

export default PatchEditProductById;
