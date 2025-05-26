import express from "express";
import { getAlumni, getExecutiveMembers, getHighestDebtor, getLatePayments, getMembers, getMembersByRole, getPercentage, getTotalFees, getUnpaidMembers } from "./organization.controller";

const organizationRouter = express.Router();

organizationRouter.get("/getMembers", getMembers);
organizationRouter.get("/getUnpaidMembers", getUnpaidMembers);
organizationRouter.get("/getExecutiveMembers",getExecutiveMembers);
organizationRouter.get("/getMembersByRole", getMembersByRole);
organizationRouter.get("/getLatePayments", getLatePayments);
organizationRouter.get("/getPercentage", getPercentage);
organizationRouter.get("/getAlumni",getAlumni);
organizationRouter.get("/getTotalFees", getTotalFees);
organizationRouter.get("/getHighestDebtor",getHighestDebtor);

export default organizationRouter;