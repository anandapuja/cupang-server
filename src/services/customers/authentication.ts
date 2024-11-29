import { Hono } from "hono";
import { prisma } from "../../utils/prisma";
import { verifyToken } from "../../utils/jwt";

const authentication = new Hono();

authentication.get("/", async (c) => {
  try {
    const customerToken = c.req.header("Authorization") || "";

    const { id } = await verifyToken(c, customerToken.split(" ")[1]);

    const customer = await prisma.customer.findUnique({
      where: {
        id: id,
      },
      include: {
        cart: {
          where: {
            cartStatus: "UNPAID",
          },
          include: {
            products: true,
          },
        },
      },
    });

    const cart =
      customer?.cart.length === 0 ? 0 : customer?.cart[0].products.length;

    const customerDataReturn = {
      id: customer?.id,
      username: customer?.username,
      email: customer?.email,
      cartItem: cart,
    };

    console.log(customerDataReturn);
    return c.json({ data: customerDataReturn }, 200);
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
});

export default authentication;
