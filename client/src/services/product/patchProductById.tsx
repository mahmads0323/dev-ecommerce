import ProductType from "../../types/general/product";

const PATCH_PRODUCT_BY_ID_API =
  import.meta.env.PATCH_EDIT_PRODUCT_BY_ID_API || "http://localhost:8000/product/edit";

const patchProductById = async (productToPost: ProductType, productId?: string, ) => {
  const product: ProductType = {
    productName: productToPost.productName,
    brandName: productToPost.brandName,
    productImage: productToPost.productImage,
    productPrice: productToPost.productPrice,
    productDescription: productToPost.productDescription,
    productDicount: productToPost.productDicount,
    category: productToPost.category,
  };
  console.log('productId: ', productId)
//   console.log("request product: ", product)
  const response = await fetch(`${PATCH_PRODUCT_BY_ID_API}/${productId}`, {
    method: "PATCH",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({product: product}),
    credentials: "include"
  });
  return response.json();
};

export default patchProductById;
