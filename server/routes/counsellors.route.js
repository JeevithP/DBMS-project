import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { counsellorLogin, counsellorLogout, counsellorRegister } from "../controller/counsellor.controller.js";

const router=express.Router();


router.route("/register").post(counsellorRegister);
router.route("/register").post(counsellorLogin);
router.route("/register").post(counsellorLogout);

export default router;