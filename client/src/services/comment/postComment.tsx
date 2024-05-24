type PostCommentProps = {
  content: string;
  productId: string;
};
const POST_COMMENT_API =
  import.meta.env.POST_COMMENT_API || "http://localhost:8000/comment";
const postComment = async ({ content, productId }: PostCommentProps) => {
  const comment = {
    content,
    productId,
  };
  const response = await fetch(POST_COMMENT_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ comment }),
    credentials: "include",
  });
  return response.json();
};

export default postComment;
