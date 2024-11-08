import { Context } from "hono";

class UserController {
  async register(c: Context) {
    return c.json({ message: "REGISTER" }, 200);
  }

  async login(c: Context) {
    return c.json({ message: "LOGIN" }, 200);
  }
}

const userController = new UserController();

export default userController;
