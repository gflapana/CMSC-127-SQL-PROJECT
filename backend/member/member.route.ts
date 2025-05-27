import express from "express";
import { editDetails, getOrganizations } from "./member.controller";


const memberRouter = express.Router();

memberRouter.put("/editDetails", editDetails);
memberRouter.get("/getOrganizations",getOrganizations);

export default memberRouter;