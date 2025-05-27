import express from "express";
import { signIn, signUpAsMember, signUpAsOrganization } from "./auth.controller";

const authRouter = express.Router();

authRouter.post("/login", signIn);
authRouter.post("/signUpAsMember", signUpAsMember);
authRouter.post("/signUpAsOrganization", signUpAsOrganization);
export default authRouter;