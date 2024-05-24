import jwt from "jsonwebtoken";

const SECERET_KEY = process.env.JWT_SECRET_KEY || "123";

const VerifyToken = (token: string) => {
  try {
    const payLoad = jwt.verify(token, SECERET_KEY);
    return payLoad;
  } catch (err) {
    return null;
  }
};

export default VerifyToken;
