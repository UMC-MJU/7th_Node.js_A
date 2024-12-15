import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as NaverStrategy } from "passport-naver";
import { prisma } from "./db.config.js";

dotenv.config();

// 구글 로그인 전략
export const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.PASSPORT_GOOGLE_CLIENT_ID,
    clientSecret: process.env.PASSPORT_GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/oauth2/callback/google",
    scope: ["email", "profile"],
    state: true,
  },
  async (accessToken, refreshToken, profile, cb) => {
    try {
      console.log("Google Profile:", profile); // 프로필 데이터 로그
      const user = await googleVerify(profile);
      return cb(null, user);
    } catch (err) {
      console.error("Google Strategy Error:", err); // 에러 로그
      return cb(err);
    }
  }
);

const googleVerify = async (profile) => {
  const email = profile.emails?.[0]?.value;
  if (!email) throw new Error("Google profile.email was not found");

  const member = await prisma.member.findFirst({ where: { email } });
  if (member) return { id: member.id, email: member.email, name: member.name };

  const created = await prisma.member.create({
    data: {
      email,
      name: profile.displayName || "Unknown",
      gender: "추후 수정",
      birth: new Date(1970, 0, 1),
      address: "추후 수정",
      detailAddress: "추후 수정",
      phoneNumber: "추후 수정",
    },
  });
  return { id: created.id, email: created.email, name: created.name };
};

// 네이버 로그인 전략
export const naverStrategy = new NaverStrategy(
  {
    clientID: process.env.PASSPORT_NAVER_CLIENT_ID,
    clientSecret: process.env.PASSPORT_NAVER_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/naver/callback",
    scope: ["name", "email", "gender", "birthday", "birthyear", "mobile"],
    state: true,
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      console.log("Naver Profile:", profile._json); // 네이버 프로필 데이터 로그
      const user = await naverVerify(profile);
      return done(null, user);
    } catch (err) {
      console.error("Naver Strategy Error:", err); // 에러 로그
      return done(err);
    }
  }
);

const naverVerify = async (profile) => {
  const email = profile._json?.email;
  if (!email) throw new Error("Naver profile.email was not found");

  const user = await prisma.member.findFirst({ where: { email } });
  if (user) return { id: user.id, email: user.email, name: user.name };

  const created = await prisma.member.create({
    data: {
      email,
      name: profile._json?.name || "Unknown",
      gender: profile._json?.gender || "추후 수정",
      birth: profile._json?.birthyear && profile._json?.birthday
        ? new Date(`${profile._json?.birthyear}-${profile._json?.birthday}`)
        : new Date(1970, 0, 1),
      address: "추후 수정",
      detailAddress: "추후 수정",
      phoneNumber: profile._json?.mobile || "추후 수정",
    },
  });
  return { id: created.id, email: created.email, name: created.name };
};