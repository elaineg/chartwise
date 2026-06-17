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

/** Stored payload for a single natal chart share */
export interface SingleChartPayload {
  type: "natal";
  birth: BirthData;
}

/** Stored payload for a synastry (two-person) share */
export interface SynastryPayload {
  type: "synastry";
  a: BirthData;
  b: BirthData;
}

export type SharePayload = SingleChartPayload | SynastryPayload;

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
  // Store as typed payload for forward compat
  const payload: SingleChartPayload = { type: "natal", birth };
  await db.execute({
    sql: "INSERT INTO charts (token, birth_data, created_at) VALUES (?, ?, ?)",
    args: [token, JSON.stringify(payload), now],
  });
  return token;
}

export async function saveSynastry(a: BirthData, b: BirthData): Promise<string> {
  const db = await getDb();
  const token = generateToken();
  const now = Date.now();
  const payload: SynastryPayload = { type: "synastry", a, b };
  await db.execute({
    sql: "INSERT INTO charts (token, birth_data, created_at) VALUES (?, ?, ?)",
    args: [token, JSON.stringify(payload), now],
  });
  return token;
}

export async function getSharePayload(
  token: string
): Promise<SharePayload | null> {
  const db = await getDb();
  const result = await db.execute({
    sql: "SELECT birth_data FROM charts WHERE token = ?",
    args: [token],
  });
  if (result.rows.length === 0) return null;
  try {
    const raw = JSON.parse(result.rows[0].birth_data as string);
    // Support legacy rows that stored bare BirthData (no `type` field)
    if (raw && typeof raw === "object" && !raw.type && raw.year) {
      return { type: "natal", birth: raw as BirthData };
    }
    return raw as SharePayload;
  } catch {
    return null;
  }
}

/** @deprecated Use getSharePayload; kept for existing shared natal links */
export async function getChartByToken(
  token: string
): Promise<BirthData | null> {
  const payload = await getSharePayload(token);
  if (!payload) return null;
  if (payload.type === "natal") return payload.birth;
  return null;
}
