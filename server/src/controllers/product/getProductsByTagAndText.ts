import { Request, Response } from "express";
import PRODUCT from "../../models/product";

const GetProductsByTagAndText = async (req: Request, res: Response) => {
  const headers = req.headers;
  if (
    !(
      headers["x-custom-category"] ||
      headers["x-search-text"] ||
      headers["x-limit"] ||
      headers["x-skip"]
    )
  ) {
    return res.status(401).json({ message: "error: missing request header" });
  }

  console.log("headers: ", headers)
  const limit = headers["x-limit"] != "-1" ? Number(headers["x-limit"]) : 3;
  const skip = headers["x-skip"] != "-1" ? Number(headers["x-skip"]) : 0;

  let filters = {};
  if (headers["x-custom-category"] && headers["x-custom-category"] != "") {
    filters = { category: {$in : headers["x-custom-category"].toString().toLowerCase().split(",") }};
  }
  if (headers["x-search-text"] && headers["x-search-text"] != "") {
    filters = { ...filters, $text: { $search: headers["x-search-text"].toString().toLowerCase() } };
  }
  console.log("filters: ", filters);

  try {
    const products = await PRODUCT.find({ ...filters })
      .sort({ natural: -1 })
      .limit(limit)
      .skip(skip);

    const productsData = products.map((storedProduct) => ({
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
    }));
    return res.json({ message: productsData });
  } catch (err) {
    return res.json({
      message: "error in getting products by tag and text " + err,
    });
  }
};

export default GetProductsByTagAndText;
