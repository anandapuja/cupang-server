import { Hono } from "hono";
import { prisma } from "../../utils/prisma";

const cart = new Hono();

cart.patch("/:id", async (c) => {
  try {
    const cartId = c.req.param("id");

    const cart = await prisma.cart.findUnique({
      where: {
        id: cartId,
        cartStatus: "UNPAID",
      },
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cart) return c.json({ message: "CART TIDAK DITEMUKAN" }, 404);

    prisma.$transaction(async () => {
      await prisma.cart.update({
        where: {
          id: cartId,
        },
        data: {
          cartStatus: "PAID",
        },
      });

      cart?.products.forEach(async function (product) {
        await prisma.product.update({
          where: {
            id: product.productId,
          },
          data: {
            stock: product.product.stock - product.quantity,
          },
        });
      });
    });

    return c.json({ message: "SUCCESS CHECK OUT PRODUCTS" }, 200);
  } catch (error) {
    return c.json({ message: "INTERNAL SERVER ERROR" }, 500);
  }
});

export default cart;
