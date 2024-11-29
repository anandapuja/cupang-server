import { Hono } from "hono";
import customer, { signIn, signUp } from "./services/customers";
import search from "./services/products/search";
import cart from "./services/carts";
import checkOut from "./services/carts/checkOut";
import products from "./services/products";
import { cors } from "hono/cors";
import { csrf } from "hono/csrf";
import { logger } from "hono/logger";
import { v2 as cloudinary } from "cloudinary";
import AuthenticationToken from "./middleware/Authentication";
import AuthorizationCustomer from "./middleware/Authorization";
import authentication from "./services/customers/authentication";

const app = new Hono();

app.use("/api/*", cors());
app.use(logger());

// app.use(csrf({ origin: "localhost" }));
app.use("/api/cart/*", AuthenticationToken, AuthorizationCustomer);
app.use("/api/auth", AuthenticationToken, AuthorizationCustomer);

app.use(async (_c, next) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_API_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  await next();
});

app.notFound((c) => {
  return c.json({ message: "Page Not Found" }, 404);
});

// AUTHENTICATION USER
app.route("/api/auth", authentication);

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
