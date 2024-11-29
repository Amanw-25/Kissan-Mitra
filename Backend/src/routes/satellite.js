// routes.js
import { Router } from 'express';
import passport from 'passport';
import getnewToken from '../middlewares/getnewToken.js';
import { generateSatelliteImage } from '../controllers/satelliteController.js';

const router = Router();

// Define the route for generating satellite images
router.get('/satellite-image/:lat/:lng', 
  getnewToken, 
  passport.authenticate('jwt', { session: false }), 
  generateSatelliteImage
);

export default router;
