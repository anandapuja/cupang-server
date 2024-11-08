import { Hono } from "hono";
import customerRoutes from "./routes/CustomerRoutes";
import productRoutes from "./routes/ProductRoutes";
import cartRoutes from "./routes/CartRoutes";
import { cors } from "hono/cors";

const app = new Hono();

app.notFound((c) => {
  return c.json({ message: "Page Not Found" }, 404);
});

app.route("/api/customer", customerRoutes);
app.route("/api/product", productRoutes);
app.route("/api/cart", cartRoutes);

export default app;
