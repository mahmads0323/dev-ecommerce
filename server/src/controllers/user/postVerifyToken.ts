import { Request, Response } from "express";
import VerifyToken from "../../utils/authentication/verifyToken";
import PayLoadType from "../../utils/authentication/payLoadType";
import { JwtPayload } from "jsonwebtoken";

const PostVerifyToken = async (req: Request, res: Response) => {
  const token = req.body.token;
  if (!token) {
    return res.json({ message: false });
  }
  const payLoad = VerifyToken(token) as PayLoadType | null;
  if (!payLoad) {
    return res.json({ message: false });
  }
  console.log("payload: ", payLoad)
  let role = [""];
  if(payLoad.role){
    role = payLoad.role;
  }
  return res.json({ message: {tokenVerified: true, role: role} });
};

export default PostVerifyToken;
