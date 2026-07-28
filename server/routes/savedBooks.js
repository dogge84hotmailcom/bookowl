import { Router } from "express"
import pool from "../db.js"


const router = Router()

router.get("/", async (req, res)=> {
    try {
        const result = await pool.query("GET * FROM saved_books")
        res.json(result.rows)
        
    }

    catch (err){
        res.status(500).json({ error: err.message })
    }
    
})

router.post("/", async (req,res) => {
    try{
        const {google_books_id, title, author, thumbnail} = req.body
        const result = await pool.query("INSERT INTO saved_books(google_books_id, title, author, thumbnail) VALUES ($1, $2, $3, $4)", [google_books_id, title, author, thumbnail])

        if(result.rowCount === 1){
            res.json({message: "Book was added"})
        }
    }
    catch(err){
         res.status(500).json({ error: err.message })
    }
})

router.delete("/:google_books_id", async (req, res)=> {
    try {
        const result = await pool.query("DELETE FROM saved_books WHERE google_books_id = $1", [req.params.google_books_id])

        if(result.rowCount === 0){
            res.status(404).json({error: "Book not found"})
        }
        else {
            res.json({message: "Item deleted"})
        }
        
    }

    catch(err){
        res.status(500).json({ error: err.message })
    }
})

export default router