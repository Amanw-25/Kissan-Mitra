import { Router } from "express";
import passport from "passport";
import getnewToken from "../middlewares/getnewToken.js";
import { getCropsByCoordinates } from '../controllers/cropDataController.js';
import { getAllCrops  } from '../controllers/croplistController.js';


const router = Router();

router.get(
  "/crop-data/:latitude/:longitude",
  getnewToken,
  passport.authenticate("jwt", { session: false }),
  getCropsByCoordinates
  
);

router.get(
  "/all-crop",
  getnewToken,
  passport.authenticate("jwt", { session: false }),
  getAllCrops
  
);


export default router;

