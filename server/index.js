import "dotenv/config"
import express from "express";
import booksRouter from "./routes/books.js"


const app = express();

const port = 3000;

app.use("/api/books", booksRouter)

app.get("/", (req, res) => {
    res.send("Bookowl server is running")
})

app.listen(port, async () => {
    console.log("Server running on port 3000")
})

