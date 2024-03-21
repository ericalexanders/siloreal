import jwt from "@utils/jwt";
import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";

const secretTokenKey = process.env.SECRET_ACCESS_TOKEN_KEY as string;

const auth = async (req: Request, _res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    return next(createHttpError.Unauthorized("Access token is required"));
  }

  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return next(createHttpError.Unauthorized());
  }

  try {
    const user = await jwt.verifyAccessToken(token, secretTokenKey);
    req.user = user;
    next();
  } catch (error: any) {
    next(createHttpError.Unauthorized(error.message));
  }
};

export default auth;
