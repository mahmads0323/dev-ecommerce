import { Request, Response } from "express";
import COMMENT from "../../models/comment";

const GetComments = async (req: Request, res: Response) => {
  const productId = req.headers.productid;
  if (!productId) {
    return res.json({ message: "error: product id not found" });
  }
  try {
    const comments = await COMMENT.find({ productId: productId });
    const commentsData = comments.map((comment, _) => ({
      content: comment.content,
      createdAt: `${comment.createdAt.getUTCDate()}-${comment.createdAt.getUTCMonth()+1}-${
        comment.createdAt.getUTCFullYear()
      }`,
      userName: comment.userName,
    }));
    return res.json({ message: commentsData });
  } catch (err) {
    return res.json({ message: "Error in getting comments " + err });
  }
};

export default GetComments;
