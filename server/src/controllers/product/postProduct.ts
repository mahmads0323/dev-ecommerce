import PRODUCT from "../../models/product";
import { Request, Response } from "express";

const PostProduct = async (req: Request, res: Response) => {
  const body = req.body;
  if (!body) {
    return res.json({ message: "error: request do not include body" });
  }
  const bodyProduct = body.product;
  const productTags = ["new"];
  if(bodyProduct.productDicount > 0 ){
    productTags.push("dicounted")
  }
  const productToBeInserted = {
    productName: bodyProduct.productName,
    brandName: bodyProduct.brandName,
    productImage: bodyProduct.productImage,
    productPrice: bodyProduct.productPrice,
    productDescription: bodyProduct.productDescription,
    productDicount: bodyProduct.productDicount,
    category: bodyProduct.category,
    tags: productTags,
  };
  // console.log(productToBeInserted);
     try{
      const createdProduct = await PRODUCT.create(productToBeInserted)
      if(!createdProduct._id){
        return res.json({message: "error: cannot get product id"})
      }
      return res.json({message: createdProduct._id})
     }catch(err){
        return res.json({message: "error in creating product" + err})
     }
};

export default PostProduct;
