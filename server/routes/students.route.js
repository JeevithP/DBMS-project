import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { getStudentProfile, studentLogin, studentLogout, studentProfileUpdate, studentRegister } from "../controller/students.controller.js";

const router=express.Router();

router.route("/register").post(studentRegister);
router.route("/login").post(studentLogin);
router.route("/logout").get(studentLogout);
router.route("/profile").get(isAuthenticated(["student"]), getStudentProfile);
router.route("/profile/update").put(isAuthenticated(["student"]),studentProfileUpdate);

export default router;
