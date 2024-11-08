import { Context } from "hono";

class CustomerController {
  async register(c: Context) {
    // check is user exist with username or email?
    // create is doesn't exist
    return c.json({ message: "REGISTER" }, 200);
  }

  async login(c: Context) {
    return c.json({ message: "LOGIN" }, 200);
  }

  async getUser(c: Context) {}

  async patchUser(c: Context) {}

  async deleteUser(c: Context) {}
}

const customerController = new CustomerController();

export default customerController;
