import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { studentLogin, studentLogout, studentRegister } from "../controller/students.controller.js";

const router=express.Router();

router.route("/register").post(studentRegister);
router.route("/register").post(studentLogin);
router.route("/register").post(studentLogout);

export default router;
