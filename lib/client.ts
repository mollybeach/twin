//path: lib/client.ts
import { createClient } from 'edgedb';

export const edgeDBCloudClient = createClient({
    instanceName: 'mollybeach/twinfundb',
    secretKey: process.env.EDGE_DB_SECRET_KEY_TWIN,
});
