import { Hono } from "hono";
import { signToken } from "../../utils/jwt";
import { prisma } from "../../utils/prisma";
import { CustomerLoginSchema } from "../../utils/zodSchema";
import { z } from "zod";
const app = new Hono();

app.post("/", async (c) => {
  try {
    const { username, password } = await c.req.json();

    CustomerLoginSchema.parse({ username, password });

    const isCustomerExist = await prisma.customer.findUnique({
      where: {
        username: username,
      },
      include: {
        cart: {
          where: {
            cartStatus: "UNPAID",
          },
          include: {
            products: {
              select: {
                productId: true,
              },
            },
          },
        },
      },
    });

    // console.log(isCustomerExist);

    if (!isCustomerExist)
      return c.json(
        {
          message: `Customer with username : ${username} does not exist, please register first`,
        },
        400
      );

    const isCustomerPasswordMatch = await Bun.password.verify(
      password,
      isCustomerExist.password
    );

    if (isCustomerPasswordMatch) {
      const payload = {
        username: isCustomerExist.username,
        email: isCustomerExist.email,
        id: isCustomerExist.id,
      };

      const token = await signToken(c, payload);

      const cartItem = isCustomerExist?.cart[0]?.products;

      const customerDataReturn = {
        id: isCustomerExist?.id,
        username: isCustomerExist?.username,
        email: isCustomerExist?.email,
        cartId: isCustomerExist?.cart[0]["id"],
        cartItem: cartItem,
      };

      return c.json(
        {
          message: "USER LOGGED IN",
          data: { customer: customerDataReturn, token: token },
        },
        200
      );
    }
  } catch (errors) {
    if (errors instanceof z.ZodError) {
      const errorMessage = errors.issues.map((error) => {
        return error.message;
      });
      return c.json({ message: errorMessage.join(", ") }, 400);
    }
    console.log(errors);
    return c.json({ message: "INTERNAL SERVER ERROR" }, 500);
  }
});

export default app;
