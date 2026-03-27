import express from "express";
import db from "./db/db.js";
import booksRoutes from "./routes/books.js";

const app=express();
const port=3000;

app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use("/", booksRoutes);

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
});