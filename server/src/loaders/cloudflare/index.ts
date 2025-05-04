import Cloudflare from "cloudflare";

export const getCloudflare = new Cloudflare({
  apiToken: process.env.CLOUDFLARE_API_TOKEN
});
