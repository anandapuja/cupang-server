import { z } from "zod";

export const CustomerSchema = z.object({
  username: z.string().min(5),
  email: z.string().email({ message: "Email Format Incorrect" }),
  password: z.string().min(5),
});
