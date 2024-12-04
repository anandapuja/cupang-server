import { Hono } from "hono";
import { prisma } from "../../utils/prisma";
import { verifyToken } from "../../utils/jwt";

const authentication = new Hono();

authentication.get("/", async (c) => {
  try {
    const customerToken = c.req.header("Authorization") || "";

    const { id } = await verifyToken(c, customerToken.split(" ")[1]);

    const userId = id as string;

    const customer = await prisma.customer.findUnique({
      where: {
        id: userId,
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

    const cartItem = customer?.cart[0]?.products;

    const customerDataReturn = {
      id: customer?.id,
      username: customer?.username,
      email: customer?.email,
      cartItem: cartItem,
    };

    console.log("CUSTOMER", customer);

    return c.json({ data: customerDataReturn }, 200);
  } catch (errors) {
    console.log("CUSTOMER", errors);
    return c.json(
      {
        data: {
          message: "Unauthorized to This Request",
        },
      },
      401
    );
  }
});

export default authentication;
