import { createMiddleware } from "hono/factory";
import { verifyToken } from "../utils/jwt";

const AuthenticationToken = createMiddleware(async (c, next) => {
  try {
    const customerToken = c.req.header("Authorization") || "";
    // CEK JIKA TOKEN GA ADA
    await verifyToken(c, customerToken.split(" ")[1]);
    await next();
  } catch (errors) {
    return c.json(
      {
        data: {
          message: "Invalid Token Provided",
        },
      },
      401
    );
  }
});

export default AuthenticationToken;
