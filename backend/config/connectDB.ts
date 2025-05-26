import "dotenv/config"
import mariadb from "mariadb";

const pool = mariadb.createPool({
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
});

export default pool;