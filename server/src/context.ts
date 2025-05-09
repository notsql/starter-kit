import type { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';

import type { AuthClient } from './models';

import { verifyIdToken } from "./modules/auth/auth.service";

export async function createContext({ req, res }: CreateFastifyContextOptions) {
  let client: AuthClient | undefined;
  const token = req.headers.authorization?.split("Bearer ")[1];

  const r = await verifyIdToken(token);

  if (r) {
    client = {
      id: r.uid,
      email: r.email!,
      name: r.name,
    }
  }

  return { req, res, client };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
