const GET_COMMENTS_API =
  import.meta.env.GET_COMMENTS_API || "http://localhost:8000/comment";

const getComments = async (productId: string) => {
  const response = await fetch(GET_COMMENTS_API, {
    method: "GET",
    headers: {
      productId: productId,
    },
  });
  return response.json();
};

export default getComments;
