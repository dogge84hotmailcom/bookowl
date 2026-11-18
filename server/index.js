import "dotenv/config";
import aiRouter from "./routes/ai.js";
import express from "express";
import booksRouter from "./routes/books.js";
import cors from "cors";
import savedBooksRouter from "./routes/savedBooks.js";

const app = express();
app.use(express.json());
app.use(cors());

const port = 3000;

app.use("/api/saved", savedBooksRouter);

app.use("/api/books", booksRouter);

app.use("/api/ai", aiRouter);

app.get("/", (req, res) => {
  res.send("Bookowl server is running");
});

app.listen(port, async () => {
  console.log("Server running on port 3000");
});
