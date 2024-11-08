import { Hono } from "hono";
import UserRoutes from "./routes/UserRoutes";

const app = new Hono({ strict: false });

app.notFound((c) => {
  return c.json({ message: "Page Not Found" }, 404);
});

app.route("/api/user", UserRoutes);

export default app;
