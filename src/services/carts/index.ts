import { Hono } from "hono";
import { prisma } from "../../utils/prisma";

const cart = new Hono();

cart.get("/:id", async (c) => {
  try {
    const customerId: string = await c.req.param("id");

    const cart = await prisma.cart.findFirst({
      where: {
        cartStatus: "UNPAID",
        customerId: customerId,
      },
      include: {
        products: true,
      },
    });

    return c.json({ message: "SUCCESS GET CART", data: cart }, 200);
  } catch (error) {
    return c.json(
      {
        message: "INTERNAL SERVER ERROR",
      },
      500
    );
  }
});

cart.post("/", async (c) => {
  try {
    const { slug, quantity, customerId } = await c.req.json();

    // check if product is exist in database

    const product = await prisma.product.findUnique({
      where: {
        slug,
      },
    });

    // return product not found if product does not exist in database

    if (!product) return c.json({ message: "PRODUCT NOT FOUND" }, 404);

    // check if cart is exist in database

    const cart = await prisma.cart.findFirst({
      where: {
        cartStatus: "UNPAID",
      },
    });

    // CREATE CART & CART ITEM IF UNPAID CART IS DOES NOT EXIST

    if (!cart) {
      // create cart and cart item because cart does not exist in database
      const createCart = await prisma.cart.create({
        data: {
          quantity,
          totalPrice: product.price * quantity,
          cartStatus: "UNPAID",
          customerId,
          products: {
            create: [
              {
                quantity: quantity,
                price: product.price,
                subTotalPrice: product.price * quantity,
                productId: product.id,
              },
            ],
          },
        },
        include: {
          products: true,
        },
      });

      return c.json({ message: "SUCCESS CREATE CART", data: createCart }, 201);
    }

    // CREATE CART ITEM & UPDATE CART IF UNPAID CART IS EXIST

    // Check if any relation between cart and product in cart item
    const cartItem = await prisma.cartItem.findFirst({
      where: {
        productId: product.id,
        cartId: cart.id,
      },
    });

    // CREATE CART ITEM & UPDATE CART

    if (!cartItem) {
      // create cart item and update cart because cart item is does not exist in database
      const createCartItem = await prisma.cartItem.create({
        data: {
          productId: product.id,
          cartId: cart.id,
          quantity: quantity,
          price: product.price,
          subTotalPrice: product.price * quantity,
        },
      });

      await prisma.cart.update({
        where: {
          id: cart.id,
        },
        data: {
          quantity: cart.quantity + quantity,
          totalPrice: cart.totalPrice + createCartItem.subTotalPrice,
        },
      });

      const newCart = await prisma.cart.findUnique({
        where: {
          id: cart.id,
        },
        include: {
          products: true,
        },
      });
      return c.json({ message: "SUCCESS UPDATE CART", data: newCart }, 200);
    } else {
      // update cart and cart item because cart item is exist in database
      const cartQuantity = cart.quantity + quantity;
      const cartItemQuantity = cartItem.quantity + quantity;
      const subTotalPrice = cartItem.price * cartItemQuantity;
      const totalPrice = cart.totalPrice + cartItem.price * quantity;

      const updateCartAndCartItem = await prisma.cart.update({
        where: {
          id: cart.id,
        },
        data: {
          quantity: cartQuantity,
          totalPrice: totalPrice,
          products: {
            update: {
              where: {
                productId_cartId: {
                  productId: product.id,
                  cartId: cart.id,
                },
              },
              data: {
                quantity: cartItemQuantity,
                subTotalPrice: subTotalPrice,
              },
            },
          },
        },
        include: {
          products: true,
        },
      });
      return c.json(
        { message: "SUCCESS UPDATE CART", data: updateCartAndCartItem },
        200
      );
    }
  } catch (error) {
    return c.json({ message: "INTERNAL SERVER ERROR" }, 500);
  }
});

export default cart;
