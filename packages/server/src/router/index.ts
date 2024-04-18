import { trpc } from "../lib/trpc";
import { employeeRouter } from "./employee";
import { hrRouter } from "./hr";
import { insuranceRouter } from "./insurance";
import { userRouter } from "./user";

export const appRouter = trpc.router({
  insurance: insuranceRouter,
  user: userRouter,
  employee: employeeRouter,
  hr: hrRouter,
});

export type AppRouter = typeof appRouter;
