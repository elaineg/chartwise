/**
 * Lazily-instantiated libsql/Turso client for chartwise share links.
 *
 * - Does NOT connect at import/module-evaluation time — safe for next build
 *   even without env vars present.
 * - The chart MUST fully work with NO network/DB — Turso is touched ONLY
 *   when creating or opening a share link.
 *
 * Env vars:
 *   TURSO_DATABASE_URL  — e.g. libsql://<db>.turso.io  (prod: set by deployer)
 *   TURSO_AUTH_TOKEN    — Turso auth token              (prod only)
 *
 * LOCAL DEV FALLBACK: if TURSO_DATABASE_URL is not set, falls back to
 *   file:./local.db (a SQLite file in the app root, no token needed).
 */

import { createClient, type Client } from "@libsql/client";
import type { BirthData } from "./chartCompute";

let _client: Client | null = null;
let _initialized = false;

function getClient(): Client {
  if (!_client) {
    const url = process.env.TURSO_DATABASE_URL ?? "file:./local.db";
    const authToken = process.env.TURSO_AUTH_TOKEN;
    _client = createClient({ url, authToken });
  }
  return _client;
}

export async function getDb(): Promise<Client> {
  const client = getClient();
  if (!_initialized) {
    await client.execute(`
      CREATE TABLE IF NOT EXISTS charts (
        token TEXT PRIMARY KEY,
        birth_data TEXT NOT NULL,
        created_at INTEGER NOT NULL
      )
    `);
    _initialized = true;
  }
  return client;
}

export function generateToken(): string {
  // 24-char URL-safe random token
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";
  // Use Math.random for simplicity (crypto unavailable in all server envs easily)
  for (let i = 0; i < 24; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}

export async function saveChart(birth: BirthData): Promise<string> {
  const db = await getDb();
  const token = generateToken();
  const now = Date.now();
  await db.execute({
    sql: "INSERT INTO charts (token, birth_data, created_at) VALUES (?, ?, ?)",
    args: [token, JSON.stringify(birth), now],
  });
  return token;
}

export async function getChartByToken(
  token: string
): Promise<BirthData | null> {
  const db = await getDb();
  const result = await db.execute({
    sql: "SELECT birth_data FROM charts WHERE token = ?",
    args: [token],
  });
  if (result.rows.length === 0) return null;
  try {
    return JSON.parse(result.rows[0].birth_data as string) as BirthData;
  } catch {
    return null;
  }
}
