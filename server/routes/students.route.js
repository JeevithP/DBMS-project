import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { getAllEvents, getStudentProfile, registerForEvent, studentLogin, studentLogout, studentProfileUpdate, studentRegister } from "../controller/students.controller.js";

const router=express.Router();

router.route("/register").post(studentRegister);
router.route("/login").post(studentLogin);
router.route("/logout").get(studentLogout);
router.route("/profile").get(isAuthenticated(["student"]), getStudentProfile);
router.route("/profile/update").put(isAuthenticated(["student"]),studentProfileUpdate);
router.route("/get-events").get(isAuthenticated(["student"]), getAllEvents);
router.route("/register-event").post(isAuthenticated(["student"]), registerForEvent);


export default router;
