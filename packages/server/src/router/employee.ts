import { prisma } from "../lib/prismaClient";
import { trpc } from "../lib/trpc";
import { z } from "zod";

export const employeeRouter = trpc.router({
  getDependents: trpc.procedure.query(async ({ ctx }) => {
    const dependents = await prisma.dependents.findMany({
      where: { employee_id: ctx.user.user_id },
    });
    return {
      dependents,
      message: "Dependents Fetched",
    };
  }),
  addDependent: trpc.procedure
    .input(z.object({ name: z.string(), relation: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const dependent = await prisma.dependents.create({
          data: {
            name: input.name,
            relation: input.relation,
            employee_id: ctx.user?.user_id,
          },
        });
        return {
          dependent,
          message: "Success",
          success: true,
        };
      } catch (e) {
        return {
          dependent: [],
          message: "Fail",
          success: false,
        };
      }
    }),
});
