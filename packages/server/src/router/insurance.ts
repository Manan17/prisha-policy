import { prisma } from "../lib/prismaClient";
import { trpc } from "../lib/trpc";
import { z } from "zod";
export const insuranceRouter = trpc.router({
  getAll: trpc.procedure.query(() => {
    return prisma.insurance.findMany();
  }),
  create: trpc.procedure
    .input(z.object({ name: z.string(), desc: z.string() }))
    .mutation(({ input }) => {
      return prisma.insurance.create({
        data: {
          name: input.name,
          desc: input.desc,
          sumInsured: 10000,
        },
      });
    }),
});
