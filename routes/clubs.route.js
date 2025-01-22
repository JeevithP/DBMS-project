import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { addEvent, clubLogin, clubLogout, clubRegister, delEvent, getClubProfile, getStudents, updateEvent, verifyStudent } from "../controller/club.controller.js";

const router=express.Router();

router.route("/register").post(clubRegister);
router.route("/login").post(clubLogin);
router.route("/logout").get(clubLogout);
router.route("/profile").get(isAuthenticated(["club"]), getClubProfile);
router.route("/add-event").post(isAuthenticated(["club"]), addEvent);
router.route("/del-event").delete(isAuthenticated(["club"]), delEvent);
router.route("/update-event").delete(isAuthenticated(["club"]), updateEvent);
router.route("/profile/get-students").get(isAuthenticated(["club"]), getStudents);
router.route("/profile/get-students/verify").put(isAuthenticated(["club"]), verifyStudent);

export default router;
