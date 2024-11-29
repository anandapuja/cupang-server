import { Hono } from "hono";
import { prisma } from "../../utils/prisma";
import { decodeToken, verifyToken } from "../../utils/jwt";

const cart = new Hono();

cart.get("/", async (c) => {
  const userToken = c.req.header("Authorization") || "";
  const customerToken: string = userToken.split(" ")[1];
  const { payload } = decodeToken(customerToken);

  try {
    const customerId: {} = payload.id || "";

    const cart = await prisma.cart.findFirst({
      where: {
        cartStatus: "UNPAID",
        customerId: customerId,
      },
      include: {
        products: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                images: {
                  take: 1,
                },
              },
            },
          },
        },
      },
    });

    console.log("CART", cart);

    const cartItem: {
      id: string;
      name: string;
      price: number;
      quantity: number;
      total: number;
      image: string;
    }[] = [];

    cart?.products.map((cart) => {
      cartItem.push({
        id: cart.product.id,
        name: cart.product.name,
        price: cart.price,
        quantity: cart.quantity,
        total: cart.subTotalPrice,
        image:
          cart.product.images[0]?.imageUrl ||
          "https://down-id.img.susercontent.com/file/id-11134207-7qul2-lhiq3sxvgoa8ec@resize_w900_nl.webp",
      });
    });

    return c.json(
      {
        message: "SUCCESS GET CART",
        data: cartItem,
        totalPrice: cart?.totalPrice,
      },
      200
    );
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

    // IS PRODUCT EXIST?

    const product = await prisma.product.findUnique({
      where: {
        slug,
      },
    });

    // IF PRODUCT NOT EXIST RETURN 404

    if (!product) return c.json({ message: "PRODUCT NOT FOUND" }, 404);

    // IS UNPAID CUSTOMER CART EXIST?

    const cart = await prisma.cart.findFirst({
      where: {
        cartStatus: "UNPAID",
        customerId,
      },
    });

    // IF CUSTOMER CART DOEST NOT EXIST : CREATE CART & CREATE CART ITEM

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

    // IF CUSTOMER CART EXIST, IS PRODUCT IS IN CART ITEM?

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        productId: product.id,
        cartId: cart.id,
      },
    });

    // IF PRODUCT DOES NOT EXIST IN CART ITEM, SO CREATE CART ITEM

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
      // IF PRODUCT EXIST IN CART ITEM, SO UPDATE CART AND CART ITEM

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

cart.delete("/:id", async (c) => {
  try {
    const cartId = c.req.param("id");
    const { productId } = await c.req.json();

    const deleteCartItem = await prisma.cartItem.delete({
      where: {
        productId_cartId: {
          productId: productId,
          cartId: cartId,
        },
      },
    });

    console.log("DELETE ITEM", deleteCartItem);

    return c.json(
      { message: "SUCCESS DELETE CART ITEM", data: deleteCartItem },
      200
    );
  } catch (errors) {
    console.log(errors);
    return c.json(
      {
        message: "INTERNAL SERVER ERROR",
      },
      500
    );
  }
});

export default cart;
