import { NextRequest, NextResponse } from "next/server";

const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS ?? "")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return false;
  if (ALLOWED_ORIGINS.includes(origin)) return true;
  // Allow ngrok subdomains for dev
  if (ALLOWED_ORIGINS.some((ao) => ao.includes("ngrok") && origin.endsWith(".ngrok-free.app")))
    return true;
  return false;
}

export function middleware(req: NextRequest) {
  const origin = req.headers.get("origin");
  const response = NextResponse.next();

  if (isAllowedOrigin(origin)) {
    response.headers.set("Access-Control-Allow-Origin", origin!);
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  }

  // Handle preflight
  if (req.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 204,
      headers: response.headers,
    });
  }

  return response;
}

export const config = {
  matcher: "/api/:path*",
};
