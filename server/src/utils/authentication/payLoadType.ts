import { JwtPayload } from "jsonwebtoken";

interface PayLoadType extends JwtPayload  {
  name: string;
  userId: string;
  role: string[];
};

export default PayLoadType;
