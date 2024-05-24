const GET_PRODUCT_BY_ID_API =
  import.meta.env.GET_PRODUCT_API || "http://localhost:8000/product";

const getProductById = async (productId: string) => {
    const response = await fetch(`${GET_PRODUCT_BY_ID_API}/${productId}`, {
        method: "GET",
    })
    return response.json();
};

export default getProductById;
