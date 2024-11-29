import { z } from "zod";

export const CustomerRegisterSchema = z.object({
  username: z
    .string()
    .min(5, { message: "username minimal 5 characters" })
    .toLowerCase(),
  email: z.string().email({ message: "Incorrect email format" }).toLowerCase(),
  password: z.string().min(5, { message: "password minimal 5 characters" }),
});

export const CustomerLoginSchema = z.object({
  username: z
    .string()
    .min(5, { message: "username minimal 5 characters" })
    .toLowerCase(),
  password: z.string().min(5, { message: "password minimal 5 characters" }),
});

export const ProductCreate = z.object({
  name: z.string().min(5, { message: "Cupang name, minimal 5 characters" }),
  price: z.number(),
  description: z.string(),
  stock: z.number(),
});
