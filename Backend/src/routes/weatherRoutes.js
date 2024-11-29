import { Router } from "express";
import passport from "passport";
import getnewToken from "../middlewares/getnewToken.js";
import { getWeatherdataController } from "../controllers/index.js";

const weatherRoutes = Router();

weatherRoutes
  .route("/:latitude/:longitude")
  .get(
    getnewToken,
    passport.authenticate("jwt", { session: false }),
    getWeatherdataController
  );

  export default weatherRoutes;