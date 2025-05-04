import { router } from "./";

import { helloRouter } from "./modules/hello/hello.router";
import { userRouter } from "./modules/user/user.router";

export const appRouter = router({
  hello: helloRouter,
  user: userRouter
});

export type AppRouter = typeof appRouter;
