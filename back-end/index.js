import express from "express";


const app = express();
const port = 8080;


app.listen(port, () => {
    console.log("Listening on port: ", port);
})

app.get("/name", (req, res) => {
    res.send("hello there");
})