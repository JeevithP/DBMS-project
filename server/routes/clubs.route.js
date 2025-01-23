import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { addEvent, clubLogin, clubLogout, clubRegister, getClubProfile,getStudents,verifyStudents } from "../controller/club.controller.js";

const router=express.Router();

router.route("/register").post(clubRegister);
router.route("/login").post(clubLogin);
router.route("/logout").get(clubLogout);
router.route("/profile").get(isAuthenticated(["club"]), getClubProfile);
router.route("/add-event").post(isAuthenticated(["club"]), addEvent);
// router.route("/del-event").delete(isAuthenticated(["club"]), delEvent);
router.route("/get-students").post(isAuthenticated(["club"]), getStudents);
router.route("/verify-students").post(isAuthenticated(["club"]), verifyStudents);
export default router;
