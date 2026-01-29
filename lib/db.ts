import { getCloudflareContext } from '@opennextjs/cloudflare';

export interface Env {
    DB: D1Database;
}

/**
 * Get the D1 database instance from the Cloudflare request context.
 * This must be called within a request handler (API route).
 */
export async function getDB(): Promise<D1Database> {
    const { env } = await getCloudflareContext();
    return (env as unknown as Env).DB;
}

/**
 * Helper type for D1 query results
 */
export type D1Result<T> = {
    results: T[];
    success: boolean;
    meta: {
        duration: number;
        changes: number;
        last_row_id: number;
    };
};

export default getDB;
