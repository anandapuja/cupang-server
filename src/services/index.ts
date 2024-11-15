import { Hono } from "hono";
import customerRoutes from "./customers/index";

const app = new Hono();

app.route("/api", customerRoutes);
// app.route("/products", productRoutes);
// app.route("/cart", cartRoutes);

export { default as cartRoutes } from "./carts";
// export { default as customerRoutes } from "./CustomerRoutes";
export { default as productRoutes } from "./products";

export default app;
