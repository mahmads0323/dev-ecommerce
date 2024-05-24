import { google } from "googleapis";
import { exit } from "process";
require("dotenv").config()

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET =process.env.CLIENT_SECRET;
const REDIRECT_URL = process.env.REDIRECT_URL;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const SCOPE = process.env.SCOPE;

if(!CLIENT_ID || !CLIENT_SECRET || !REDIRECT_URL || !REFRESH_TOKEN || !SCOPE){
  console.log("Invalid google drive credentials")
  exit();
}

const AuthorizeToGoogleDrive = () => {
  const oAuthClient2 = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URL
  );
  oAuthClient2.setCredentials({ refresh_token: REFRESH_TOKEN });
  const drive = google.drive({ version: "v3", auth: oAuthClient2 });
  return drive;
};

export default AuthorizeToGoogleDrive;