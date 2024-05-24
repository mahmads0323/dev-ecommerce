import { Request, Response } from "express";
import USER from "../../models/user";
import GenerateToken from "../../utils/authentication/generateToken";
import VerifyHash from "../../utils/password/verifyHash";

const PostUserDetailsToLogin = async (req: Request, res: Response) => {
  const userDetails = req.body.userDetails;
  if (!userDetails) {
    return res.json({ message: "error: body do not contain userDetails" });
  }
  try {
    const createdUser = await USER.findOne({
      email: userDetails.email,
    });
    if(!createdUser){
        return res.json({message: "error: user do not exits"});
    }
    const hash = createdUser.hash;
    const salt = createdUser.salt;

    const verifyUser = VerifyHash(userDetails.password, hash, salt);
    if(!verifyUser){
        return res.json({message: "error: invlaid password"});
    }
    const token = GenerateToken({
      name: createdUser.name,
      userId: createdUser._id.toString(),
      role: createdUser.role,
    });
    return res.json({ message: token });
  } catch (err) {
    return res.json({ message: "error: in creating user " + err });
  }
};

export default PostUserDetailsToLogin;
