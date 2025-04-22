import ms from "ms";
import { appconfig } from "../config/appconfig.js";

const setTokenscookies = (res, accessToken, refreshToken) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none", // 👈 Required for cross-origin cookies
    maxAge: ms(appconfig.ACCESS_TOKEN_EXP),
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none", // 👈 Required for cross-origin cookies
    maxAge: ms(appconfig.REFRESH_TOKEN_EXP),
  });
};

export default setTokenscookies;
