import { Hono } from "hono";
import customerController from "../controllers/CustomerController";

const customer = new Hono();

customer.post("/register", (c) => customerController.register(c));
customer.post("/login", (c) => customerController.login(c));
customer.get("/", (c) => customerController.getUser(c));
customer.patch("/", (c) => customerController.patchUser(c));
customer.delete("/", (c) => customerController.deleteUser(c));

export default customer;
