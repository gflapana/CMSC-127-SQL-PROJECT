import express from "express";
import { addEvent, addFee, deleteEvent, deleteMember, editDetails, findEligibleMember, getAlumni, getExecutiveMembers, getHighestDebtor, getLatePayments, getMembers, getMembersByRole, getPercentage, getTotalFees, getUnpaidMembers } from "./organization.controller";

const organizationRouter = express.Router();

organizationRouter.get("/getMembers", getMembers);
organizationRouter.get("/findEligibleMembers", findEligibleMember);
organizationRouter.get("/getUnpaidMembers", getUnpaidMembers);
organizationRouter.get("/getExecutiveMembers", getExecutiveMembers);
organizationRouter.get("/getMembersByRole", getMembersByRole);
organizationRouter.get("/getLatePayments", getLatePayments);
organizationRouter.get("/getPercentage", getPercentage);
organizationRouter.get("/getAlumni", getAlumni);
organizationRouter.get("/getTotalFees", getTotalFees);
organizationRouter.get("/getHighestDebtor", getHighestDebtor);
organizationRouter.post("/editDetails", editDetails);
organizationRouter.post("/deleteMember", deleteMember);
organizationRouter.post("/addEvent", addEvent);
organizationRouter.post("/deleteEvent", deleteEvent);
organizationRouter.post("/addFee", addFee);

export default organizationRouter;