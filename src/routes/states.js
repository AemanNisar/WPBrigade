import { getStates } from "../controllers/statesController.js";

import express from "express";
const router=new express.Router();
router.get("/",getStates);


export default router;