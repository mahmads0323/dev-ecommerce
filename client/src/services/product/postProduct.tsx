import ProductType from "../../types/general/product";

const POST_PRODUCT_API =
  import.meta.env.POST_PRODUCT_API || "http://localhost:8000/product";

const postProduct = async (productToPost: ProductType) => {
  const product: ProductType = {
    productName: productToPost.productName,
    brandName: productToPost.brandName,
    productImage: productToPost.productImage,
    productPrice: productToPost.productPrice,
    productDescription: productToPost.productDescription,
    productDicount: productToPost.productDicount,
    category: productToPost.category,
  };
  const response = await fetch(POST_PRODUCT_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({product: product}),
    credentials: "include",
  });
  return response.json();
};

export default postProduct;