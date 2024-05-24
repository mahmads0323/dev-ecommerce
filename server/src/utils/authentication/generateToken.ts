import jwt from "jsonwebtoken";
import PayLoadType from "./payLoadType";


const SECERET_KEY = process.env.JWT_SECRET_KEY || "123";
const GenerateToken = ({ name, userId, role }: PayLoadType) => {
  const payLoad = JSON.stringify({
    name,
    userId,
    role
  });
  const token = jwt.sign(payLoad, SECERET_KEY);
  return token;
};

export default GenerateToken;
