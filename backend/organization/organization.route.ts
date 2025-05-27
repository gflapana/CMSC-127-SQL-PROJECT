import express from "express";
import { addEvent, addFee, addMemberToOrganization, deleteEvent, deleteMember, editDetails, findEligibleMembers, getAlumni, getExecutiveMembers, getFees, getHighestDebtor, getLatePayments, getMembers, getMembersByRole, getPercentage, getTotalFees, getUnpaidMembers, updateFee, updateMemberToOrganization } from "./organization.controller";

const organizationRouter = express.Router();

organizationRouter.get("/getMembers", getMembers);
organizationRouter.get("/findEligibleMembers", findEligibleMembers);
organizationRouter.get("/getUnpaidMembers", getUnpaidMembers);
organizationRouter.get("/getExecutiveMembers", getExecutiveMembers);
organizationRouter.get("/getMembersByRole", getMembersByRole);
organizationRouter.get("/getLatePayments", getLatePayments);
organizationRouter.get("/getPercentage", getPercentage);
organizationRouter.get("/getAlumni", getAlumni);
organizationRouter.get("/getTotalFees", getTotalFees);
organizationRouter.get("/getHighestDebtor", getHighestDebtor);
organizationRouter.get("/getFees", getFees);
organizationRouter.post("/editDetails", editDetails);
organizationRouter.post("/deleteMember", deleteMember);
organizationRouter.post("/addEvent", addEvent);
organizationRouter.post("/deleteEvent", deleteEvent);
organizationRouter.post("/addFee", addFee);
organizationRouter.post("/addMemberToOrganization", addMemberToOrganization);
organizationRouter.post("/updateMemberToOrganization", updateMemberToOrganization);
organizationRouter.put("/updateFee", updateFee);

export default organizationRouter;