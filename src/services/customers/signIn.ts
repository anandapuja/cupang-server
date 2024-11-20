import { Hono } from "hono";
import { signToken } from "../../utils/jwt";
import { prisma } from "../../utils/prisma";
import { setCookie } from "hono/cookie";
const app = new Hono();

app.post("/", async (c) => {
  const customer = await c.req.json();
  try {
    const isCustomerExist = await prisma.customer.findUnique({
      where: {
        username: customer.username,
      },
      include: {
        cart: {
          where: {
            cartStatus: "UNPAID",
          },
        },
      },
    });

    if (!isCustomerExist)
      return c.json(
        {
          message: `CUSTOMER WITH USERNAME ${customer.username} DOES NOT EXIST`,
        },
        400
      );

    const isCustomerPasswordMatch = await Bun.password.verify(
      customer.password,
      isCustomerExist.password
    );

    if (isCustomerPasswordMatch) {
      const payload = {
        username: isCustomerExist.username,
        email: isCustomerExist.email,
      };

      const token = await signToken(c, payload);

      return c.json(
        {
          message: "USER LOGGED IN",
          data: { customer: isCustomerExist, token: token },
        },
        200
      );
    }
  } catch (error) {
    return c.json({ message: "INTERNAL SERVER ERROR" }, 500);
  }
});

export default app;
