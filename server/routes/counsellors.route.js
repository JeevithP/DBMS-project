import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { counsellorLogin, counsellorLogout, counsellorRegister, getCounsellorProfile, getCounsellors,getStudent } from "../controller/counsellor.controller.js";

const router=express.Router();

router.route("/get-all-counsellors").get(getCounsellors);
router.route("/register").post(counsellorRegister);
router.route("/login").post(counsellorLogin);
router.route("/logout").get(counsellorLogout);
router.route("/profile").get(isAuthenticated(["counsellor"]), getCounsellorProfile);
router.route("/student").post(isAuthenticated(["counsellor"]),getStudent);
export default router;