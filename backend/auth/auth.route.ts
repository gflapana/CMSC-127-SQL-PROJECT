import express from "express";
import { signIn } from "./auth.controller";

const authRouter = express.Router();

authRouter.post("/login", signIn);

export default authRouter;