import dotenv from "dotenv";
dotenv.config();

export const secret = {
  token: {
    key: process.env.SECRET_ACCESS_TOKEN_KEY ?? "",
    expiresIn: process.env.SECRET_ACCESS_TOKEN_EXPIRE ?? "",
  },
  refreshToken: {
    key: process.env.SECRET_REFRESH_TOKEN_KEY ?? "",
    expiresIn: process.env.SECRET_REFRESH_TOKEN_EXPIRE ?? "",
  },
};
