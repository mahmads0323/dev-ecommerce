type GetProductsByTagAndTextType = {
    category?: string | string[];
  searchText?: string;
  limit?: number;
  skip?: number;
};

const GET_PRODUCTS_BY_TAGS_AND_TEXT_API =
  import.meta.env.GET_PRODUCTS_BY_TAGS_AND_TEXT ||
  "http://localhost:8000/product//by-tags-and-text";

const getProductsByTagAndText = async ({
  category = [""],
  searchText = "",
  limit = -1,
  skip = -1,
}: GetProductsByTagAndTextType) => {

  console.log("category: ", category)
  const searchCategory = category?.join(",");
  const response = await fetch(GET_PRODUCTS_BY_TAGS_AND_TEXT_API, {
    method: "GET",
    headers: {
      "X-Custom-Category": `${searchCategory}`,
      "X-Search-Text": `${searchText}`,
      "X-Limit": `${limit}`,
      "X-Skip": `${skip}`,
    },
  });
  return response.json();
};
export default getProductsByTagAndText;
