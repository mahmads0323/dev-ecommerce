const GET_Cart_PRODUCTS_BY_IDS_API =
  import.meta.env.GET_Cart_PRODUCTS_BY_IDS_API ||
  "http://localhost:8000/product/cart";

const getCartProductsByIds = async (productIds: string[]) => {
  const modifiedProdctIds = productIds.join();
  console.log(modifiedProdctIds);
  const response = await fetch(GET_Cart_PRODUCTS_BY_IDS_API, {
    method: "GET",
    headers: {
      productIds: modifiedProdctIds,
    },
  });
  return response.json();
};

export default getCartProductsByIds;
