import { NextResponse } from "next/server";

/**
 * Drop-in replacement for NextResponse.json() that handles BigInt serialization.
 * Use this until all routes are migrated to createApiResponse (SuperJSON).
 */
export function jsonResponse<T>(data: T, init?: { status?: number }): NextResponse {
  const body = JSON.stringify(data, (_key, value) =>
    typeof value === "bigint" ? value.toString() : value,
  );
  return new NextResponse(body, {
    status: init?.status ?? 200,
    headers: { "Content-Type": "application/json" },
  });
}
