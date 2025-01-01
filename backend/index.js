import express from "express";
import userRoute from "./routes/user.routes.js"
import adminRoute from "./routes/admin.routes.js"
import bookRoute from "./routes/book.routes.js"
import "./config/db.js";


const app = express();
const port = 8080;

app.use(express.json());
app.use("*", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header(
        "Access-Control-Allow-Methods",
        "GET, PUT, POST, DELETE, OPTIONS"
      );
    next();
})


app.listen(port, () => {
    console.log("Listening on port: ", port);
})


app.use("/user", userRoute);
app.use("/admin", adminRoute);
app.use("/book", bookRoute);

