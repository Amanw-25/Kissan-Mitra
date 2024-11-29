import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "./config/passportjwtconfig.js";
import { passport } from "./config/passportjwtconfig.js";
import { appconfig } from "./config/appconfig.js";
import { Authroutes } from "./routes/userRoute.js";
import firstfiveRoutes from "./routes/firstfiveRoutes.js";

export const app = express();

app.use(express.json());
app.use(passport.initialize());
app.use(cookieParser());
app.use(
  cors({
    origin: appconfig.REACT_APP_BASE_URL,
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
import weatherRoutes from "./routes/weatherRoutes.js";
import marketRoutes from "./routes/marketRoutes.js";
import cropAdviceRoutes from "./routes/mistralRoute.js";
import predictionRoutes from "./routes/consultationRoutes.js";
import satelliteRoute from "./routes/satellite.js";
import communitymsgRoutes from "./routes/communitymsgRoutes.js";
import emailRoute from "./routes/EmailRoutes.js";
import cropRoutes from "./routes/cropRoutes.js";

app.use("/api/v1/kissan-mitra/weather", weatherRoutes);
app.use("/api/v1/kissan-mitra/auth", Authroutes);
app.use("/api/v1/kissan-mitra/market", marketRoutes);
app.use("/api/v1/kissan-mitra/crop", cropAdviceRoutes);
app.use("/api/v1/kissan-mitra/predict", predictionRoutes);
app.use("/api/v1/kissan-mitra/farm", satelliteRoute);
app.use("/api/v1/kissan-mitra/community", communitymsgRoutes);
app.use("/api/v1/kissan-mitra/mail", emailRoute);
app.use("/api/v1/kissan-mitra/crop", cropRoutes);
app.use('/api/v1/kissan-mitra/user', firstfiveRoutes);
