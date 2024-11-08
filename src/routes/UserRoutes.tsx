import { Context, Hono } from "hono";
import userController from "../controllers/UserController";

const user = new Hono();

user.post("/register", userController.register(c));
user.post("/login", userController.login(c));

export default user;
