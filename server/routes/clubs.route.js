import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { clubLogin, clubLogout, clubRegister } from "../controller/club.controller.js";

const router=express.Router();

router.route("/register").post(clubRegister);
router.route("/register").post(clubLogin);
router.route("/register").post(clubLogout);

export default router;
