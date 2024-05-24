import { google } from "googleapis";

const CLIENT_ID =
  "549687918504-hc89uevfeu8giaqqclsfvd9qfk2k4qof.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URL = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN =
  "1//0465cMMkG2NgKCgYIARAAGAQSNwF-L9Iryxe2jJT_R0GvG1fqpYHx7i5BCdM7YebgFLLe_--2nWPF51kqL_0dgzkwT0gIiEKRJGU";
const SCOPE = "https://www.googleapis.com/auth/drive";

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