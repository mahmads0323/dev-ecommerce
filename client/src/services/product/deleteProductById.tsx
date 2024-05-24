const DELETE_PRODUCT_BY_ID_API =
  import.meta.env.DELETE_PRODUCT_API || "http://localhost:8000/product";

const deleteProductById = async (productId: string) => {
  const response = await fetch(`${DELETE_PRODUCT_BY_ID_API}/${productId}`, {
    method: "DELETE",
  });
  return response.json();
};

export default deleteProductById;
