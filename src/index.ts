import { Hono } from "hono";
import customer, { signIn, signUp } from "./services/customers";
import search from "./services/products/search";
import cart from "./services/carts";
import checkOut from "./services/carts/checkOut";
import products from "./services/products";
import { cors } from "hono/cors";
import { csrf } from "hono/csrf";
import { logger } from "hono/logger";

const app = new Hono();

app.use("/api/*", cors());
app.use(logger());
app.use(csrf());

// app.use();

app.notFound((c) => {
  return c.json({ message: "Page Not Found" }, 404);
});

// PRODUCTS ROUTES
app.route("/api/products/search", search);
app.route("/api/products", products);

// CART ROUTES
app.route("/api/cart/check-out", checkOut);
app.route("/api/cart", cart);

// CUSTOMERS ROUTES
app.route("/api/customers", customer);
app.route("/api/customers/signup", signUp);
app.route("/api/customers/signin", signIn);

export default app;
