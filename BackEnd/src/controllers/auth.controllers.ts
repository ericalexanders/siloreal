import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import { v4 as uuidv4 } from "uuid";
import jwt from "@utils/jwt";

import { UserServices } from "@services/user.services";
import { addRefreshTokenToWhiteList } from "@services/auth.services";

const UserProvider = new UserServices()

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  const lastSegment = req.path.split('/').pop();
  try {
    const foundUser = await UserProvider.getUserByEmail(req.body.email);
    
    if (foundUser) {
      throw createHttpError(409, 'User already exists')
    }

    const isAdmin = (lastSegment == "createAdmin") ? 'admin' : null
    const user = await UserProvider.createUser(req.body, isAdmin);
    const jti = uuidv4();
    const access_token = await jwt.signAccessToken(user);
    const refresh_token = await jwt.generateRefreshToken(user, jti);
    await addRefreshTokenToWhiteList({
      jti,
      refresh_token,
      user_id: user.id,
    });
    res.send({ ...user, access_token, refresh_token });
  } catch (error) {
    next(error);
  }
};

export const signInUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await UserProvider.loginUser(req.body);
    const jti = uuidv4();
    const access_token = await jwt.signAccessToken(user);
    const refresh_token = await jwt.generateRefreshToken(user, jti);
    await addRefreshTokenToWhiteList({
      jti,
      refresh_token,
      user_id: user.id,
    });

    res.send({ ...user, access_token, refresh_token });
  } catch (error) {
    next(error);
  }
};