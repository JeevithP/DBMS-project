import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { clubLogin, clubLogout, clubRegister } from "../controller/club.controller.js";

const router=express.Router();

router.route("/register").post(clubRegister);
router.route("/login").post(clubLogin);
router.route("/logout").get(clubLogout);

export default router;
