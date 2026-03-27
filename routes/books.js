import express from "express";
import db from "../db/db.js";

const router = express.Router();

// 👉 HOME (Read books)
router.get("/", async (req, res) => {
  const result = await db.query("SELECT * FROM books");
  res.render("index", { books: result.rows });
});

// 👉 SHOW ADD PAGE
router.get("/add", (req, res) => {
  res.render("add");
});

// 👉 ADD BOOK (CREATE)
router.post("/add", async (req, res) => {
  const { title, author, rating, notes, cover_id } = req.body;

  await db.query(
    "INSERT INTO books (title, author, rating, notes, cover_id, date_read) VALUES ($1,$2,$3,$4,$5,NOW())",
    [title, author, rating, notes, cover_id]
  );

  res.redirect("/");
});
// 👉 SHOW EDIT PAGE
router.get("/edit/:id", async (req, res) => {
  const result = await db.query("SELECT * FROM books WHERE id=$1", [req.params.id]);
  res.render("edit", { book: result.rows[0] });
});

// 👉 UPDATE BOOK
router.post("/edit/:id", async (req, res) => {
  const { title, author, rating, notes } = req.body;

  await db.query(
    "UPDATE books SET title=$1, author=$2, rating=$3, notes=$4 WHERE id=$5",
    [title, author, rating, notes, req.params.id]
  );

  res.redirect("/");
});
router.get("/delete/:id", async (req, res) => {
  await db.query("DELETE FROM books WHERE id=$1", [req.params.id]);
  res.redirect("/");
});
router.get("/sort/:type", async (req, res) => {
  let query = "";

  if (req.params.type === "rating") {
    query = "ORDER BY rating DESC";
  } else if (req.params.type === "recent") {
    query = "ORDER BY date_read DESC";
  } else {
    query = "ORDER BY title ASC";
  }

  const result = await db.query(`SELECT * FROM books ${query}`);
  res.render("index", { books: result.rows });
});
export default router;