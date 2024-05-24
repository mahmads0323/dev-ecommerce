import express from "express"
import DatabaseConnection from "./src/services/database/index"
import ImageRouter from "./src/routes/image";
import ProductRouter from "./src/routes/product"
import UserRouter from "./src/routes/user";
import CommentRouter from "./src/routes/comment"
import cookieParser from "cookie-parser"
import cors from "cors";
require("dotenv").config()

/** ---------- Initialization -------- */
const App = express();
const PORT = process.env.PORT || 8000; 
const CONNECTION_STRING = process.env.CONNECTION_STRING || "mongodb://localhost:27017/ecommerce"
const CLIENT = process.env.CLIENT || "http://localhost:5173";

/** ---------- Connection ------------ */
DatabaseConnection(CONNECTION_STRING)

/** ---------- Middlewares ----------- */
App.use(express.json());
App.use(express.urlencoded({extended: false}));
App.use(cors({
    origin: CLIENT,
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE"]
}))
App.use(cookieParser())

/** ---------- Routes ---------------- */
App.use("/image", ImageRouter)
App.use("/product", ProductRouter)
App.use("/user", UserRouter);
App.use("/comment", CommentRouter)

/** ---------- Start Server ---------- */
App.listen(PORT, ()=> console.log(`Server is running at port: ${PORT}`))