import { NextResponse } from "next/server";
import superjson from "superjson";

/**
 * Create a JSON response with SuperJSON serialization.
 * Handles Date, BigInt, undefined, etc.
 */
export function createApiResponse<T>(data: T, status = 200): NextResponse {
  const serialized = superjson.stringify(data);
  return new NextResponse(serialized, {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

/**
 * Create an error response.
 */
export function createErrorResponse(error: string, status = 500): NextResponse {
  return createApiResponse({ error }, status);
}

/**
 * Parse request body with SuperJSON.
 * Falls back to plain JSON for backwards compatibility.
 */
export async function parseRequestBody<T = unknown>(request: Request): Promise<T> {
  const text = await request.text();
  try {
    return superjson.parse<T>(text);
  } catch {
    // Fall back to plain JSON for backwards compatibility
    return JSON.parse(text) as T;
  }
}
