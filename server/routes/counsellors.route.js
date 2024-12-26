import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { counsellorLogin, counsellorLogout, counsellorRegister } from "../controller/counsellor.controller.js";

const router=express.Router();


router.route("/register").post(counsellorRegister);
router.route("/login").post(counsellorLogin);
router.route("/logout").post(counsellorLogout);

export default router;