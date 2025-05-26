import express from "express";
import { getMembers } from "./organization.controller";

const organizationRouter = express.Router();

organizationRouter.get("/getMembers", getMembers);

export default organizationRouter;