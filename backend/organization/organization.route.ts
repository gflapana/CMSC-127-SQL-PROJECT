import express from "express";
import { getExecutiveMembers, getMembers, getUnpaidMembers } from "./organization.controller";

const organizationRouter = express.Router();

organizationRouter.get("/getMembers", getMembers);
organizationRouter.get("/getUnpaidMembers", getUnpaidMembers);
organizationRouter.get("/getExecutiveMembers",getExecutiveMembers);

export default organizationRouter;