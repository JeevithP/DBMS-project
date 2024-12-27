import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { counsellorLogin, counsellorLogout, counsellorRegister, getCounsellorProfile } from "../controller/counsellor.controller.js";

const router=express.Router();


router.route("/register").post(counsellorRegister);
router.route("/login").post(counsellorLogin);
router.route("/logout").get(counsellorLogout);
router.route("/profile").get(isAuthenticated(["counsellor"]), getCounsellorProfile);
export default router;