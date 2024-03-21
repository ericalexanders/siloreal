import { db } from "@utils/dbClient";
import { hashToken } from "@utils/hashTokens";

// Refresh Token Table renamed to RT
const { refresh_tokens: RT } = db;

async function addRefreshTokenToWhiteList({ jti, refresh_token, user_id }: any) {
  return RT.create({
    data: {
      id: jti,
      hashed_token: hashToken(refresh_token),
      user_id,
    },
  });
}

function findRefreshTokenById(id: string) {
  return RT.findFirst({ where: { id: id } });
}

function deleteRefreshToken(id: string) {
  return RT.update({
    where: { id },
    data: { revoked: true },
  });
}

function revokeTokens(user_id: number) {
  return RT.updateMany({
    where: { user_id },
    data: { revoked: true },
  });
}

export {
  addRefreshTokenToWhiteList,
  findRefreshTokenById,
  deleteRefreshToken,
  revokeTokens,
};
