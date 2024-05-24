import { Response, NextFunction } from "express";
import VerifyToken from "../utils/authentication/verifyToken";
import CustomeRequestForUser from "../types/customRequestForUser";

const AuthenticateUser = (
  req: CustomeRequestForUser,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ message: "error: user not logged in. please login" });
  }
  const payLoad = VerifyToken(token);
  if (!payLoad) {
    return res.json({ message: "error: invalid token. please login again" });
  }
  req.user = payLoad;
  next();
};

export default AuthenticateUser;
