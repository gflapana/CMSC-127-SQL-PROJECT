import express from "express";
import { getExecutiveMembers, getMembers, getMembersByRole, getUnpaidMembers } from "./organization.controller";

const organizationRouter = express.Router();

organizationRouter.get("/getMembers", getMembers);
organizationRouter.get("/getUnpaidMembers", getUnpaidMembers);
organizationRouter.get("/getExecutiveMembers",getExecutiveMembers);
organizationRouter.get("/getMembersByRole", getMembersByRole);

export default organizationRouter;