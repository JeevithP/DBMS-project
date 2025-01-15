import express from "express";
import { getDepartment } from "../controller/department.controller.js";

const router=express.Router();

router.route("/").get(getDepartment);
export default router;