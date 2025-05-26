import express from "express";
import { getMembers, getUnpaidMembers } from "./organization.controller";

const organizationRouter = express.Router();

organizationRouter.get("/getMembers", getMembers);
organizationRouter.get("/getUnpaidMembers", getUnpaidMembers);

export default organizationRouter;