import path from "path";
import AuthorizeToGoogleDrive from "../../services/gDrive";
import fs from "fs";
import { Request, Response } from "express";

const drive = AuthorizeToGoogleDrive();

const PostImage = async (req: Request, res: Response) => {
  const file = req.file;
  if (!file) {
    return res.json({ message: "error: requset do not include an image" });
  }
  if (!(file.mimetype.includes("jpg") || file.mimetype.includes("png"))) {
    return res.json({ message: "error: image should be png or jpg" });
  }
  const tempFilePath = path.join(__dirname, `./${file.originalname}`);
  fs.writeFileSync(tempFilePath, file.buffer); // temporarily storing file to server
  const requestBody = {
    name: file.originalname,
    field: "id",
    mimeType: file.mimetype,
  };
  const media = {
    body: fs.createReadStream(tempFilePath),
    mimeType: file.mimetype,
  };
  try {
    const newFile = await drive.files.create({
      requestBody,
      media,
    });
    return res.json({ message: newFile.data.id });
  } catch (err) {
    console.log("error in uploading file to drive" + err);
    return res.json({ message: "error uploading image" });
  } finally {
    fs.unlink(tempFilePath, (err) => {
      if (err) {
        console.log("error in deleting temporary file.");
      }
    });
  }
};

export default PostImage;
