import { Router } from "express";
import "dotenv/config";

const router = Router();

router.get("/search", async (req, res) => {
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${req.query.q}&startIndex=${req.query.startIndex}&key=${process.env.GOOGLE_BOOKS_API_KEY}`,
  );

  const data = await response.json();

  res.json(data);
});

router.get("/:id", async (req, res) => {
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes/${req.params.id}?key=${process.env.GOOGLE_BOOKS_API_KEY}`,
  );

  const data = await response.json();

  res.json(data);
});

export default router;
