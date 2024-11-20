import { Hono } from "hono";
import { signToken } from "../../utils/jwt";
import { prisma } from "../../utils/prisma";
// import { Customer } from "../../utils/Types";

const app = new Hono();

app.post("/", async (c) => {
  try {
    const data = await c.req.json();

    const password: string = await Bun.password.hash(data.password);

    const customer = await prisma.customer.create({
      data: {
        username: data.username,
        email: data.email,
        password,
      },
      select: {
        id: true,
        username: true,
        email: true,
      },
    });

    const payload = {
      username: customer.username,
      email: customer.email,
    };

    const token = await signToken(c, payload);

    return c.json(
      {
        messsage: `SUCCESS CREATE CUSTOMER WITH USERNAME ${customer.username} && SUCCESS LOGGED IN`,
        data: { customer, token },
      },
      201
    );
  } catch (error) {
    return c.json({ message: "INTERNAL SERVER ERROR" }, 500);
  }
});

export default app;
