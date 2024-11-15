import { sign, verify, decode } from "hono/jwt";
import { env } from "hono/adapter";
import { Context } from "hono";

export const signToken = async (c: Context, payload: {}) => {
  const { JWT_SECRET } = env<{ JWT_SECRET: string }>(c);

  return await sign(payload, JWT_SECRET);
};

export const verifyToken = async (c: Context, token: string) => {
  const { JWT_SECRET } = env<{ JWT_SECRET: string }>(c);
  return await verify(token, JWT_SECRET);
};

export const decodeToken = (token: string) => {
  return decode(token);
};
