import { Router } from "express";
import passport from "passport";
import getnewToken from "../middlewares/getnewToken.js";
import { sendEmailController } from "../controllers/EmailController.js";

const router = Router();

router.post(
  "/send-message",
  getnewToken,
  passport.authenticate("jwt", { session: false }),
  sendEmailController
);

export default router;
