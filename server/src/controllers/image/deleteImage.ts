// import { Request,Response } from "express";

import AuthorizeToGoogleDrive from "../../services/gDrive";

const drive = AuthorizeToGoogleDrive();
const DeleteImage = async (
  fileId: string = "1RzUSl-7Wq3ObzGvKX-EJlIhpuL6rJqq_"
) => {
  const deleteResult = await drive.files.delete({ fileId: fileId });
  return deleteResult;
};

export default DeleteImage;
