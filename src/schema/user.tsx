import { z } from "zod";

const userRegister = z
  .object({
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })
  .required();
