import { Request, Response } from "express";
import PRODUCT from "../../models/product";

const MONGODB_OBJECT_LENGTH = 24;
const GetProductById = async (req: Request, res: Response) => {
  const params = req.params;
  const productId = params.productId;
  if (!productId) {
    return res.json({ message: "error: no product id" });
  }
  if (productId.length !== MONGODB_OBJECT_LENGTH) {
    return res.json({ message: "error: inavlid product id" });
  }
  try {
    const storedProduct = await PRODUCT.findById(productId);
    if (!storedProduct) {
      return res.json({ message: "error: no product found!" });
    }
    const product = {
      productId: storedProduct._id,
      productName: storedProduct.productName,
      brandName: storedProduct.brandName,
      productImage: storedProduct.productImage,
      productPrice: storedProduct.productPrice,
      productDescription: storedProduct.productDescription,
      productDicount: storedProduct.productDicount,
      category: storedProduct.category,
      rating: storedProduct.rating,
      reviews: storedProduct.reviews,
    };
    return res.json({ product: product });
  } catch (err) {
    return res.json({ message: "error in getting product: ", err });
  }
};

export default GetProductById