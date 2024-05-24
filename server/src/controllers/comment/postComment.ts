import { Response } from "express";
import CustomeRequestForUser from "../../types/customRequestForUser";
import COMMENT from "../../models/comment";

type CommentDataType = {
  content: string;
  productId: string;
};

const PostComment = async (req: CustomeRequestForUser, res: Response) => {
  const commentData: CommentDataType = req.body.comment;
  if (!commentData) {
    return res.json({ message: "no comment data" });
  }
  const user = req.user;
  try {
    const createdComment = await COMMENT.create({
      content: commentData.content,
      productId: commentData.productId,
      userId: user.userId,
      userName: user.name,
    });
    if (!createdComment) {
      return res.json({ message: "error in posting comment" });
    }
    return res.json({ message: "comment created" });
  } catch (err) {
    res.json({ message: "error: unable to post comment " + err });
  }
};

export default PostComment;
