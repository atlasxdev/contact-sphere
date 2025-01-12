import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import "dotenv/config";
const DATABASE_URL = process.env.DATABASE_URL as string;

const sql = neon(DATABASE_URL!);
export const db = drizzle({ client: sql });
