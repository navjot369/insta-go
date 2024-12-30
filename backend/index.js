import express from "express";
import userRoute from "./routes/user.routes.js"
import "./config/db.js";


const app = express();
const port = 8080;

app.use(express.json());
app.use("*", (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
})


app.listen(port, () => {
    console.log("Listening on port: ", port);
})


app.use("/user", userRoute);


