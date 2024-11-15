import { Hono } from "hono";
import { prisma } from "../../utils/prisma";

const product = new Hono();

product.get("/", async (c) => {
  try {
    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        price: true,
        stock: true,
        images: {
          select: {
            imageUrl: true,
          },
        },
      },
    });
    return c.json({ message: "SUCCESS", data: products });
  } catch (error) {
    console.log(error);
    return c.json({ message: "ERROR" });
  }
});

product.get("/:id", async (c) => {
  const id = c.req.param("id");
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        slug: true,
        price: true,
        description: true,
        stock: true,
        sold: true,
        images: {
          select: { id: true, imageUrl: true },
        },
      },
    });
    return c.json({ message: "SUCCESS", data: product });
  } catch (error) {
    console.log(error);
    return c.json({ message: "ERROR" });
  }
});

export default product;
