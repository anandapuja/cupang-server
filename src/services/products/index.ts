import { Hono } from "hono";
import { prisma } from "../../utils/prisma";
// import { getCookie } from "hono/cookie";
// import { ProductNewArrival } from "../../utils/Types";

const product = new Hono();

product.get("/new-arrival", async (c) => {
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
          take: 1,
        },
      },
      take: 12,
      orderBy: {
        createdAt: "desc",
      },
    });

    const newArrival = products.map((product) => {
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

    return c.json(
      { message: "SUCCESS GET DATA PRODUCTS", data: newArrival },
      200
    );
  } catch (error) {
    return c.json({ message: "INTERNAL SERVER ERROR" }, 500);
  }
});

product.get("/best-seller", async (c) => {
  try {
    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        price: true,
        sold: true,
        stock: true,
        images: {
          select: {
            imageUrl: true,
          },
          take: 1,
        },
      },
      take: 6,
      orderBy: {
        sold: "desc",
      },
    });

    const bestSeller = products.map((product) => {
      return {
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        sold: product.sold,
        stock: product.stock,
        image:
          product.images.length >= 1
            ? product.images[0]["imageUrl"]
            : "https://www.shutterstock.com/shutterstock/photos/2152785549/display_1500/stock-vector-colorful-betta-fish-vector-illustration-siam-fighting-fish-betta-splendens-half-moon-betta-fish-2152785549.jpg",
      };
    });

    return c.json(
      { message: "SUCCESS GET DATA PRODUCTS", data: bestSeller },
      200
    );
  } catch (error) {
    return c.json({ message: "INTERNAL SERVER ERROR" }, 500);
  }
});

product.get("/:slug", async (c) => {
  const slug = c.req.param("slug");
  try {
    const product = await prisma.product.findUnique({
      where: { slug },
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

    if (!product) return c.json({ message: "PRODUCT NOT FOUND" }, 404);
    return c.json(
      { message: "SUCCESS GET DATA PRODUCT BY ID", data: product },
      200
    );
  } catch (error) {
    return c.json({ message: "INTERNAL SERVER ERROR" }, 500);
  }
});

export default product;
