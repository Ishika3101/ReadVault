import pg from "pg";

const db=new pg.Client({
    user:"postgres",
    host:"localhost",
    database: "readVault",
    password: "Ishika3101*",
    port: 5432,
});

db.connect();

export default db;