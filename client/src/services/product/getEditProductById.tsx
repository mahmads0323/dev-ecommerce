const GET_EDIT_PRODUCT_BY_ID_API =
  import.meta.env.GET_EDIT_PRODUCT_BY_ID_API ||
  "http://localhost:8000/product/edit";
const getEditProductById = async (productId: string) => {
  const response = await fetch(`${GET_EDIT_PRODUCT_BY_ID_API}/${productId}`, {
    method: "get",
  });
  return response.json();
};

export default getEditProductById;
