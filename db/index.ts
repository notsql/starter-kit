import { Prisma, PrismaClient } from "./generated/prisma";
import { PrismaD1HTTP } from "@prisma/adapter-d1";

const adapter = new PrismaD1HTTP({
  CLOUDFLARE_ACCOUNT_ID: process.env.CLOUDFLARE_ACCOUNT_ID!,
  CLOUDFLARE_D1_TOKEN: process.env.CLOUDFLARE_D1_TOKEN!,
  CLOUDFLARE_DATABASE_ID: process.env.CLOUDFLARE_DATABASE_ID!
});

export const db = new PrismaClient({ adapter });
export { Prisma as Models };
