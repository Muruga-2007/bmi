import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  console.warn(
    "⚠️  DATABASE_URL is not set. The app will work without database functionality.",
  );
  // Create a dummy connection for development
  const dummyUrl = 'postgresql://localhost/bmi_dev';
  var pool = new Pool({ connectionString: dummyUrl });
  var db = drizzle({ client: pool, schema });
} else {
  var pool = new Pool({ connectionString: process.env.DATABASE_URL });
  var db = drizzle({ client: pool, schema });
}

export { pool, db };
