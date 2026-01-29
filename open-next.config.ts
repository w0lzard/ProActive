// open-next.config.ts file for @opennextjs/cloudflare
import { defineCloudflareConfig } from "@opennextjs/cloudflare/config";

export default defineCloudflareConfig({
  // KV cache disabled - add kvIncrementalCache when KV namespace is configured in wrangler.toml
  // To enable:
  // 1. Create KV namespace: npx wrangler kv namespace create NEXT_CACHE_WORKERS_KV
  // 2. Add binding to wrangler.toml:
  //    [[kv_namespaces]]
  //    binding = "NEXT_CACHE_WORKERS_KV"
  //    id = "your-namespace-id"
  // 3. Import and use: import kvIncrementalCache from "@opennextjs/cloudflare/kv-cache";
  //    incrementalCache: kvIncrementalCache,
});
