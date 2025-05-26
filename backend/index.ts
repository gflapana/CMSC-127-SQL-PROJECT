import "dotenv/config";
import express from "express";
import cors from "cors";
import organizationRouter from "./organization/organization.route";
import authRouter from "./auth/auth.route";

const app: express.Express = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json()); // for JSON bodies
app.use(express.urlencoded({ extended: true })); // for form submissions

app.use("/auth", authRouter);
app.use("/organization", organizationRouter);


const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server listening to port ${PORT}...`);
});
