import { Request, Response } from "express";
import PRODUCT from "../../models/product";

const GetCartProductsByIds = async (req: Request, res: Response) => {
  if (!req.headers.productids) {
    return res.json({ message: "error: product ids not specified" });
  }
  const modifiedProductIds = req.headers.productids.toString();
  const productIds = modifiedProductIds.split(",");
  try {
    const MatchedProductsPromises = productIds.map(productId => PRODUCT.findById(productId));
    const MatchedProducts = await Promise.all(MatchedProductsPromises)
    console.log("MatchedProducts: ", MatchedProducts)
    // const products = MatchedProducts.map((product, _) => ({
    //   produtId: product._id,
    //   productName: product.productName,
    //   brandName: product.brandName,
    //   productImage: product.productImage,
    //   productPrice: product.productPrice,
    //   productDescription: product.productDescription,
    //   productDicount: product.productDicount,
    //   category: product.category,
    //   rating: product.rating,
    //   reviews: product.reviews,
    // }));
    return res.json({ message: MatchedProducts });
  } catch (err) {
    return res.json({ message: "error: cannot find products " + err });
  }
};

export default GetCartProductsByIds;
