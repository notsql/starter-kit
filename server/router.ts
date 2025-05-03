import { router } from "./";

import { userRouter } from "./modules/user/user.router";

export const appRouter = router({
  user: userRouter
});

export type AppRouter = typeof appRouter;
