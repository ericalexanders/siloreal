// LIBS
import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
import { secret } from "@config/index";
// TYPES
import { User } from "src/typing/index";

export default {
  signAccessToken(payload: Object) {
    return new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        secret.token.key,
        { expiresIn: secret.token.expiresIn },
        (err, token) => {
          if (err) {
            console.log("signAccessToken Error: ", err);
            reject(createHttpError.InternalServerError());
          }
          resolve(token);
        },
      );
    });
  },
  generateRefreshToken(user: any, jti: string) {
    return new Promise((resolve, reject) => {
      jwt.sign(
        {
          user_email: user.email,
          jti,
        },
        secret.refreshToken.key,
        { expiresIn: secret.refreshToken.expiresIn },
        (err, token) => {
          if (err) {
            console.log("generateRefreshToken Error: ", err);
            reject(createHttpError.InternalServerError());
          }
          resolve(token);
        },
      );
    });
  },
  verifyAccessToken(token: any, secret: string):Promise<User> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secret, (err: any, payload: any) => {
        if (err) {
          const message = err.name == "JsonWebTokenError" ? "Unauthorized" : err.message;
          return reject(createHttpError.Unauthorized(message));
        }
        resolve(payload);
      });
    });
  },
};
