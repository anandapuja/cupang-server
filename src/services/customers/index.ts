import { Hono } from "hono";
import { prisma } from "../../utils/prisma";
import { getCookie } from "hono/cookie";
import AuthenticationToken from "../../middleware/Authentication";

const app = new Hono();

app.get("/:id", AuthenticationToken, async (c) => {
  try {
    const customerId = c.req.param("id");
    const customer = await prisma.customer.findUnique({
      where: {
        id: customerId,
      },
      select: {
        username: true,
        email: true,
        cart: true,
      },
    });

    return c.json(
      {
        message: "SUCCESS GET DATA CUSTOMER BY ID",
        data: customer,
      },
      200
    );
  } catch (errors) {
    return c.json({ message: "INTERNAL SERVER ERROR" }, 500);
  }
});

export { default as signUp } from "./signUp";
export { default as signIn } from "./signIn";

export default app;
