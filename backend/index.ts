import "dotenv/config";
import express from "express";
import cors from "cors";

const app: express.Express = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server listening to port ${PORT}...`);
});
