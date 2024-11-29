import { Router } from "express";
import passport from "passport";
import getnewToken from "../middlewares/getnewToken.js";
import { getAllCommunityMessages ,getLikedMessages , getSavedMessages } from "../controllers/getAllcommunityMessageController.js";

const communitymsgRoutes = Router();

communitymsgRoutes
  .route("/messages")
  .get(
    getnewToken,
    passport.authenticate("jwt", { session: false }),
    getAllCommunityMessages
  );

communitymsgRoutes
  .route("/messages/liked")
  .get(
    getnewToken,
    passport.authenticate("jwt", { session: false }),
    getLikedMessages
  );

communitymsgRoutes
  .route("/messages/saved")
  .get(
    getnewToken,
    passport.authenticate("jwt", { session: false }),
    getSavedMessages
  );

export default communitymsgRoutes;
