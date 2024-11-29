import { Hono } from "hono";
import { signToken } from "../../utils/jwt";
import { prisma } from "../../utils/prisma";
import type { CustomerRegister } from "../../utils/Types";
import { CustomerRegisterSchema } from "../../utils/zodSchema";
import { z } from "zod";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const app = new Hono();

app.post("/", async (c) => {
  try {
    const { username, email, password }: CustomerRegister = await c.req.json();

    CustomerRegisterSchema.parse({ username, email, password });

    await prisma.customer.findUnique({
      where: {
        username,
        email,
      },
    });

    const hashPassword: string = await Bun.password.hash(password);

    const customer = await prisma.customer.create({
      data: {
        username: username,
        email: email,
        password: hashPassword,
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
      id: customer.id,
    };

    const token = await signToken(c, payload);

    return c.json(
      {
        messsage: `SUCCESS CREATE CUSTOMER WITH USERNAME ${customer.username} && SUCCESS LOGGED IN`,
        data: { customer, token },
      },
      201
    );
  } catch (errors) {
    if (errors instanceof z.ZodError) {
      const errorMessage = errors.issues.map((error) => {
        return error.message;
      });
      return c.json({ message: errorMessage.join(", ") }, 400);
    }

    if (errors instanceof PrismaClientKnownRequestError) {
      switch (errors.code) {
        case "P2002":
          return c.json(
            { message: "username/ email is registered, please login" },
            400
          );
        default:
          return c.json({ message: "Bad Request" }, 400);
      }
    }

    return c.json({ message: "INTERNAL SERVER ERROR" }, 500);
  }
});

export default app;
