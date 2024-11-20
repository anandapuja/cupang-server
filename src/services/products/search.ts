import { Hono } from "hono";
import { prisma } from "../../utils/prisma";

const product = new Hono();

product.get("/", async (c) => {
  try {
    const name = c.req.query("name");
    if (name === undefined) {
      return c.json({ message: "BAD REQUEST FOR PRODUCT SEARCH" }, 400);
    }
    const products = await prisma.product.findMany({
      where: {
        name: {
          contains: name,
          mode: "insensitive",
        },
      },
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
          take: 1,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!products) return c.json({ message: "PRODUCTS NOT FOUND" }, 404);

    const searchResult = products.map((product) => {
      return {
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        stock: product.stock,
        image:
          product.images.length >= 1
            ? product.images[0]["imageUrl"]
            : "https://www.shutterstock.com/shutterstock/photos/2152785549/display_1500/stock-vector-colorful-betta-fish-vector-illustration-siam-fighting-fish-betta-splendens-half-moon-betta-fish-2152785549.jpg",
      };
    });

    return c.json({ message: "SUCCESS GET PRODUCTS", data: searchResult }, 200);
  } catch (error) {
    return c.json(
      {
        message: "INTERNAL SERVER ERROR",
      },
      500
    );
  }
});

export default product;
