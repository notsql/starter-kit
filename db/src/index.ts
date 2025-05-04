import Cloudflare from "cloudflare";

import { destr } from "destr";
import { drizzle } from "drizzle-orm/sqlite-proxy";

import * as schema from "./schema";



interface DatabaseResult {
  rows: string[][] | string[];
}

export const db = drizzle(
  async (sql, params, method) => {
    const cf = new Cloudflare({
      apiToken: process.env.CLOUDFLARE_API_TOKEN
    });

    let res;
    try {
      res = await cf.d1.database.raw(
        process.env.CLOUDFLARE_DATABASE_ID!,
        {
          account_id: process.env.CLOUDFLARE_ACCOUNT_ID!,
          sql,
          params
        });
    } catch (e: any) {
      console.error(e);
      return { rows: [] }
    }

    let rows = res?.result[0]?.results?.rows ?? [];

    if (method == "get") {
      return {
        rows: rows[0].map((cell) => destr(cell))
      } as DatabaseResult;
    } else {
      return {
        rows: rows.map((row) => row.map((cell) => destr(cell)))
      } as DatabaseResult;
    }
  },
  { schema }
);

export * from "./schema";
