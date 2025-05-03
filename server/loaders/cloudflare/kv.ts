import { ResultAsync } from "neverthrow";
import type { CloudflareError } from "cloudflare";

import { getCloudflare } from "./";

export const kv = {
  read: async <T>(key: string): Promise<T | null> => {
    const res = await ResultAsync.fromPromise(
      getCloudflare.kv.namespaces.values.get(
        process.env.CLOUDFLARE_KV_NAMESPACE_ID!,
        key,
        {
          account_id: process.env.CLOUDFLARE_ACCOUNT_ID!
        }
      ).then(async r => await r.json()),
      error => error as CloudflareError
    );

    if (res.isErr()) {
      if (res.error.message.includes("key not found")) {
        return null;
      }
      throw new Error(`[KV] ${res.error}`);
    }

    return JSON.parse(res.value.value) as T;
  },

  write: async (key: string, value: object, ttl?: number): Promise<void> => {
    const res = await ResultAsync.fromPromise(
      getCloudflare.kv.namespaces.values.update(
        process.env.CLOUDFLARE_KV_NAMESPACE_ID!,
        key,
        {
          account_id: process.env.CLOUDFLARE_ACCOUNT_ID!,
          value: JSON.stringify(value),
          metadata: "",
          expiration_ttl: ttl
        }
      ),
      error => error as CloudflareError
    );

    if (res.isErr()) {
      console.error("[KV] Error from Cloudflare");
      throw new Error(`[KV] ${res.error}`);
    }
  },

  delete: async (key: string): Promise<void> => {
    const res = await ResultAsync.fromPromise(
      getCloudflare.kv.namespaces.values.delete(
        process.env.CLOUDFLARE_KV_NAMESPACE_ID!,
        key,
        {
          account_id: process.env.CLOUDFLARE_ACCOUNT_ID!
        }),
      error => error as CloudflareError
    );

    if (res.isErr()) {
      console.error("[KV] Error from Cloudflare");
      throw new Error(`[KV] ${res.error}`);
    }
  }
};

export type KVType = typeof kv;
