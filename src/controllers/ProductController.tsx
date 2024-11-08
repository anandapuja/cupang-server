import { Context } from "hono";

class ProductController {
  async register(c: Context) {
    return c.json({ message: "REGISTER" }, 200);
  }

  async login(c: Context) {
    return c.json({ message: "LOGIN" }, 200);
  }
}

const userController = new ProductController();

export default ProductController;
