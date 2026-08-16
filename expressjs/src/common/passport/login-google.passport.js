import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} from "../constants/app.constant.js";
import { prisma } from "../prisma/connect.prisma.js";
import { tokenService } from "../../services/token.service.js";
export const initLoginGooglePassport = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3069/api/auth/google/callback",
      },
      async function (accessTokenGG, refreshTokenGG, profile, cb) {
        // console.dir(accessTokenGG, refreshTokenGG, profile)
        const fullName = profile.displayName;
        const googleId = profile.id;
        const email = profile.emails[0].value;
        const avatar = profile.photos[0].value;
        const isEmailVerified = profile.emails[0].verified;

        console.log({ fullName, googleId, email, avatar, isEmailVerified });

        if (!isEmailVerified) {
          return cb(new Error("email chưa verify"), null);
        }

        //kiểm tra user đã tồn tại chưa
        let userExist = await prisma.users.findFirst({
          where: {
            email: email,
          },
        });
        //chưa -> tạo mới
        if (!userExist) {
          userExist = await prisma.users.create({
            data: {
              fullName: fullName,
              googleId: googleId,
              email: email,
              avatar: avatar,
            },
          });
        }

        const accessToken = tokenService.createAccessToken(userExist.id);
        const refreshToken = tokenService.createRefreshToken(userExist.id);

        //hợp lệ
        return cb(null, { accessToken, refreshToken });
      },
    ),
  );
};
