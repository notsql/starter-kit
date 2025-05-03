import { fastifyTRPCPlugin, FastifyTRPCPluginOptions } from "@trpc/server/adapters/fastify";
import fastify from "fastify";

import cors from "@fastify/cors";

import { createContext } from "./context";
import { appRouter, type AppRouter } from "./routes";

const server = fastify();

server.register(cors, {
  // origin: "https://brtpal.pages.dev",
  origin: "http://localhost:5173",
  credentials: true,
});

server.register(fastifyTRPCPlugin, {
  trpcOptions: {
    router: appRouter,
    createContext,
    onError({ path, error }) {
      console.error(`Error in tRPC handler on path "${path}":`, error);
    },
  } satisfies FastifyTRPCPluginOptions<AppRouter>["trpcOptions"]
});

server.listen({ port: 3000 }, (err, address) => {
  console.log(`Server listening at ${address}`);
});
