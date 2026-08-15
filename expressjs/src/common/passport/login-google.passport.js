import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} from "../constants/app.constant.js";

export const initLoginGooglePassport = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3069/api/auth/google/callback",
      },
      function (accessToken, refreshToken, profile, cb) {
        console.log({ accessToken, refreshToken, profile });
        //hợp lệ
        return cb(null, "token");
        //k hợp lệ
        //  return cb(err, null);
      },
    ),
  );
};
