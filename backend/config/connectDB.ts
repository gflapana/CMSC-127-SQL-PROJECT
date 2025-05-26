import "dotenv/config"
import mariadb from "mariadb";

export const pool = mariadb.createPool({
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    connectionLimit: 5
});