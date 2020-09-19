import jwt, {
  SignOptions,
} from "jsonwebtoken";
import {
  getRepository
} from "typeorm";
import {
  Account,
  AccessPayload,
  AccessToken,
} from "src/core";

const generateAccessToken = async (
  account: Account,
) => {
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 24);
  const option: SignOptions = {
    algorithm: "HS512",
    expiresIn: (expiresAt.getTime() - Date.now()) / 1000,
    issuer: "hatereal.io",
    subject: "access_token",
  };
  const payload: AccessPayload = {
    idx: account.idx,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, option);
  const repository = getRepository(AccessToken);
  const accessToken = new AccessToken();
  accessToken.token = token;
  accessToken.expiredAt = expiresAt;
  accessToken.payload = payload;
  accessToken.account = account;
  await repository.manager.save(accessToken);
  return {
    token,
    expiresAt,
  };
};

const verifyToken = (
  token: string,
) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
};

const decodeToken = (
  token: string,
) => {
  return jwt.decode(token);
}

const discardRefreshToken = (
  token: string,
  account: Account,
) => {
  const repository = getRepository(AccessToken);
  return repository.delete({
    account: account,
    token: token,
  });
};

export const TokenService = {
  generateAccessToken,
  verifyToken,
  discardRefreshToken,
  decodeToken,
};
