import AuthorizeToGoogleDrive from "../../services/gDrive";
import { Request, Response } from "express";

const imageIdLength = 33;
const drive = AuthorizeToGoogleDrive();

const GetImage = async (req: Request, res: Response) => {
  const imageId = req.params.imageId;
  if (imageId.length !== imageIdLength) {
    return res.json({ messsage: "invalid image id" });
  }
  const fileId = imageId;
try{
  const response = await drive.files.get(
    {
      fileId: fileId,
      alt: "media",
    },
    { responseType: "stream" }
  );
  response.data
    .on("close", () => {
      console.log("Image get successfully");
    })
    .on("error", (err) => {
      return res.json({ message: "Error in getting iamge " + err });
    })
    .pipe(res);
}catch(err){
  res.json({message: "error in getting image " + err})
}
};

export default GetImage;
