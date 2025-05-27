import express from "express";
import { editDetails } from "./member.controller";


const memberRouter = express.Router();

memberRouter.put("/editDetails", editDetails);

export default memberRouter;