import express from "express";
import passport from "passport";
import getnewToken from "../middlewares/getnewToken.js";
import { getProfilePhotos } from "../controllers/firstfiveController.js"; 

const router = express.Router();

router.get(
  "/five/profile-photos",
  getnewToken,
  passport.authenticate("jwt", { session: false }),
  getProfilePhotos
);

export default router;
