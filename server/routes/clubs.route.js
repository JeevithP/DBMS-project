import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { addEvent, clubLogin, clubLogout, clubRegister, delEvent, getClubProfile } from "../controller/club.controller.js";

const router=express.Router();

router.route("/register").post(clubRegister);
router.route("/login").post(clubLogin);
router.route("/logout").get(clubLogout);
router.route("/profile").get(isAuthenticated(["club"]), getClubProfile);
router.route("/add-event").post(isAuthenticated(["club"]), addEvent);
router.route("/del-event").delete(isAuthenticated(["club"]), delEvent);
export default router;
