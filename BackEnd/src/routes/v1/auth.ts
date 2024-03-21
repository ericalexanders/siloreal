import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import createHttpError from "http-errors";

import {
  findRefreshTokenById,
  deleteRefreshToken,
  addRefreshTokenToWhiteList,
} from "@services/auth.services";

import { UserServices } from "@services/user.services";

import { hashToken } from "@utils/hashTokens";
import jwt from "@utils/jwt";

import { registerUser, signInUser } from "@controllers/auth.controllers"

const router = Router();
const UserProvider = new UserServices()

const secretRefresh = process.env.SECRET_REFRESH_TOKEN_KEY as string;

router.post("/refreshToken", async (req, res, next) => {
  try {
    const { refresh_token } = req.body;
    if (!refresh_token) {
      res.status(400);
      throw createHttpError.BadRequest("Missing refresh token");
    }
    const payload = jwt.verifyAccessToken(refresh_token, secretRefresh) as any;
    const savedRefreshToken = (await findRefreshTokenById(payload.jti)) as any;

    if (!savedRefreshToken || savedRefreshToken.revoked === true) {
      console.log("Revoked or not saved")
      res.status(401);
      throw createHttpError.Unauthorized("Unauthorized");
    }

    const hashedToken = hashToken(refresh_token);
    if (hashedToken !== savedRefreshToken.hashed_token) {
      console.log("Tokens aren't equals")
      res.status(401);
      throw createHttpError.Unauthorized("Unauthorized");
    }

    const user = await UserProvider.getUserById(payload.user_id);
    if (!user) {
      res.status(401);
      throw createHttpError.Unauthorized("Unauthorized");
    }

    await deleteRefreshToken(savedRefreshToken.id);
    const jti = uuidv4();
    const access_token = await jwt.signAccessToken(user);
    const new_refresh_token = await jwt.generateRefreshToken(user, jti);

    await addRefreshTokenToWhiteList({
      jti,
      refresh_token: new_refresh_token,
      user_id: user.id,
    });

    res.send({
      access_token,
      refresh_token: new_refresh_token,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/createAdmin", registerUser)
router.post("/register", registerUser)
router.post('/login', signInUser)

const isProtected = false;
export { router, isProtected };
