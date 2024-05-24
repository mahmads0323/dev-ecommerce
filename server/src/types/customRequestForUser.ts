import { Request } from "express";

interface CustomeRequestForUser extends Request {
  user?: any;
}

export default CustomeRequestForUser