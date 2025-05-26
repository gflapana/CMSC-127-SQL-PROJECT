import express from "express";
import { getExecutiveMembers, getLatePayments, getMembers, getMembersByRole, getPercentage, getUnpaidMembers } from "./organization.controller";

const organizationRouter = express.Router();

organizationRouter.get("/getMembers", getMembers);
organizationRouter.get("/getUnpaidMembers", getUnpaidMembers);
organizationRouter.get("/getExecutiveMembers",getExecutiveMembers);
organizationRouter.get("/getMembersByRole", getMembersByRole);
organizationRouter.get("/getLatePayments", getLatePayments);
organizationRouter.get("/getPercentage", getPercentage);

export default organizationRouter;