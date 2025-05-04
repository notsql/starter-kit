import { TRPCError } from "@trpc/server";

import { authProcedure } from "../../middleware/auth";
import { getUserById } from "./user.service";

export default {
  self: authProcedure.query(async ({ ctx }) => {
    const userId = ctx.client.id;

    const res = await getUserById(userId);

    if (res.isErr()) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An unknown error occurred.",
        cause: res.error
      });
    }

    return res.value;
  })
}
