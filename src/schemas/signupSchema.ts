import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(3, "Username must of minimun 3 characters")
  .max(20, "Username must not be more than 20 characters")
  .regex(/^[a-z0-9]+$/, "Username can contain only small case letters and numbers.")


export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({message: "Invalid email"}),
    password: z.string().min(6, {message: "Password must be of atleast 6 characters"})
})
