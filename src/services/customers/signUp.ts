import { Hono } from "hono";
import { signToken } from "../../utils/jwt";
import { prisma } from "../../utils/prisma";
import { Customer } from "../../utils/types";
import { CustomerSchema } from "../../utils/zodSchema";

const app = new Hono();

app.post("/", async (c) => {
  try {
    const data: Customer = await c.req.json();

    // const CustomerSchema =

    const password = await Bun.password.hash(data.password);
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
    console.log(error);
    return c.json({ message: "INTERNAL SERVER ERROR" }, 500);
  }
});

export default app;
