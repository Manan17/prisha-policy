import { prisma } from "../lib/prismaClient";
import { trpc } from "../lib/trpc";
import { z } from "zod";
import bcrypt from "bcrypt";
export const hrRouter = trpc.router({
  getAllEmployee: trpc.procedure.query(async ({ ctx }) => {
    if (ctx?.user?.role !== "hr") {
      return {
        employees: [],
        message: "Unauthorized Access",
        success: false,
      };
    }
    const employees = await prisma.user.findMany({
      where: { role: "employee" },
    });
    return {
      employees,
      message: "Fetch Success",
      success: true,
    };
  }),
  addEmployee: trpc.procedure
    .input(
      z.object({
        name: z.string(),
        email: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const passHash = await bcrypt.hash(input.password, 10);
      const employee = await prisma.user.create({
        data: {
          name: input.name,
          email: input.email,
          password: passHash,
        },
      });
      return {
        employee,
        message: "Employee created",
        success: true,
      };
    }),
});
