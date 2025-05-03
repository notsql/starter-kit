import { TRPCError } from "@trpc/server";

import { publicProcedure } from "../index";
import { getUserById } from "../service/user";

export const authProcedure = publicProcedure.use(async ({ ctx, next }) => {
  if (!ctx.client) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    ctx: {
      client: ctx.client
    }
  });
});

export const userProcedure = authProcedure.use(async ({ ctx, next }) => {
  const res = await getUserById(ctx.client.id);

  if (res.isErr()) {
    throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Unable to get user", cause: res.error });
  }

  const user = res.value;

  if (!user) {
    throw new TRPCError({ code: "BAD_REQUEST", message: "User does not exist" });
  }

  return next({
    ctx: {
      client: {
        ...ctx.client,
        ...user
      }
    }
  });
});

export const adminProcedure = userProcedure.use(async ({ ctx, next }) => {
  if (!ctx.client.isAdmin) {
    throw new TRPCError({ code: "PRECONDITION_FAILED", message: "User requires elevated rights" });
  }

  return next();
});
