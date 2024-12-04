import { Context, Next } from "hono";
import { createMiddleware } from "hono/factory";
import { verifyToken } from "../utils/jwt";
import { prisma } from "../utils/prisma";

const AuthorizationCustomer = createMiddleware(
  async (c: Context, next: Next) => {
    try {
      const customerToken = c.req.header("Authorization") || "";
      //   const customer = await verifyToken(c, customerToken.split(" ")[1]);

      const { id } = await verifyToken(c, customerToken.split(" ")[1]);

      const userId = id as string;

      await prisma.customer.findUnique({
        where: {
          //   id: customer.id,
          id: userId,
        },
        select: {
          id: true,
          username: true,
          email: true,
        },
      });
    } catch (errors) {
      return c.json(
        {
          data: {
            message: "Unauthorized to This Request",
          },
        },
        401
      );
    }

    await next();
  }
);

export default AuthorizationCustomer;
