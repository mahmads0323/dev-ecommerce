import mongoose from "mongoose";

const DatabaseConnection = async (connectionString: any) => {
  mongoose
    .connect(connectionString)
    .then((data:any) => {
      console.log("database connected");
    })
    .catch((err:any) => console.log("error connecting database: ", err));
    return;
};

export default DatabaseConnection;