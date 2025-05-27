import express from "express";
import { signIn, signUpAsMember } from "./auth.controller";

const authRouter = express.Router();

authRouter.post("/login", signIn);
authRouter.post("/signUpAsMember", signUpAsMember);
export default authRouter;