import { prisma } from "../lib/prismaClient";
import { trpc } from "../lib/trpc";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const userRouter = trpc.router({
  signUp: trpc.procedure
    .input(
      z.object({
        name: z.string(),
        email: z.string(),
        password: z.string(),
        role: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const hashPass = await bcrypt.hash(input.password, 10);
      return prisma.user.create({
        data: {
          name: input.name,
          email: input.email,
          password: hashPass,
          role: input.role,
        },
      });
    }),

  login: trpc.procedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const user = await prisma.user.findFirst({
        where: { email: input.email },
      });
      let token: string = "";
      if (!user) {
        return {
          success: false,
          message: "User does not exist",
          token: token,
          role: "",
        };
      }
      const password = await bcrypt.compare(input.password, user.password);
      if (!password) {
        return {
          success: false,
          message: "Invalid Password",
          token: token,
          role: "",
        };
      }

      token = jwt.sign(
        { user_id: user.id, email: user.email, role: user.role },
        "MY_SECRET",
        {
          expiresIn: "23h",
        }
      );
      return {
        success: true,
        message: "Login Successfull",
        token: token,
        role: user.role,
      };
    }),
});
