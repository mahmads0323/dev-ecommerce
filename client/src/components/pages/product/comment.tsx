import React, { useEffect, useState } from "react";
import User_Image from "/user-solid.svg";
import Button from "../../reusable/button";
import postComment from "../../../services/comment/postComment";
import useContextStore from "../../context/cartContext";
import getComments from "../../../services/comment/getComments";

type commentProps = {
  productIdForComments: string;
};

type commentType = {
  content: string;
  userName: string;
  createdAt: string;
};

const Comments = ({ productIdForComments }: commentProps) => {
  // const [productId, setProductId] = useState(productIdForComments);
  const [comments, setComments] = useState<commentType[] | null>(null);
  const [userComment, setUserComment] = useState("");
  const [commentsNeedToUpdate, setCommentsNeedtoUpdate] = useState(true);

  const contextStore = useContextStore();
  useEffect(() => {
    if (commentsNeedToUpdate) {
      requestDataThroughApi();
    }
    setCommentsNeedtoUpdate(false);
  }, [commentsNeedToUpdate]);

  const handleChangeUserComment = (e) => {
    setUserComment(e.target.value);
  };

  const requestDataThroughApi = async () => {
    if (!productIdForComments) {
      return;
    }
    const responseData = await getComments(productIdForComments);
    setComments(responseData.message);
  };

  const submitComment = async () => {
    const commentData = {
      productId: productIdForComments,
      content: userComment,
    };
    const responseData = await postComment(commentData);
    if (responseData.message.includes("error")) {
      contextStore.setAlertMessages((prev) => [
        ...prev,
        { message: responseData.message, boxType: "failure" },
      ]);
      return;
    }
    setCommentsNeedtoUpdate(true);
    setUserComment("");
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    submitComment();
  };
  return (
    <section className="p-4 flex justify-center">
      <div className="w-min md:[w-90%] lg:w-[70%]">
        <div>
          <p className="text-lg font-semibold text-bunker">Comments</p>
        </div>
        {/* current user comment */}
        <div className="flex flex-col items-start py-4">
          <div className="flex space-x-2">
            <div className="border border-black rounded-full p-1 flex items-center">
              <img src={User_Image} alt="User_Image" className="h-4 w-4" />
            </div>
            <p>You</p>
          </div>
          <form
            onSubmit={handleSubmitComment}
            className="flex justify-center items-center gap-x-4 "
          >
            <input
              type="text"
              value={userComment}
              placeholder="write comment"
              onChange={handleChangeUserComment}
              className="bg-transparent py-1 px-2 focus:outline-none border-b border-lightBunker focus-within:mb-1"
            />
            <Button type="submit" content="comment" />
          </form>
        </div>
        {/* All comments */}
        <div className="flex flex-col py-1">
          {comments !== null && comments.length > 0 ? (
            comments?.map((comment, index) => (
              <div key={index} className="flex flex-col justify-center py-2">
                <div className="flex items-center space-x-2">
                  <div className="border border-black rounded-full p-1 flex items-center">
                    <img src={User_Image} alt="userImage" className="h-4 w-4" />
                  </div>
                  <p className="font-semibold">{comment.userName}</p>
                </div>

                <div className="ml-10">
                  <p>{comment.content}</p>
                  <p className="text-sm font-medium">
                    Dated: {comment.createdAt}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>No comments</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Comments;
