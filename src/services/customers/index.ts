import { Hono } from "hono";
import { prisma } from "../../utils/prisma";

const app = new Hono();

app.get("/", async (c) => {
  try {
    const customers = await prisma.customer.findMany();
    return c.json({
      data: customers,
    });
  } catch (error) {
    return c.json({ message: "INTERNAL SERVER ERROR" }, 500);
  }
});

export { default as signUp } from "./signUp";
export { default as signIn } from "./signIn";

export default app;
