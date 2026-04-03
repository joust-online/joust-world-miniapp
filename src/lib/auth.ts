import { SessionOptions } from "iron-session";

export interface SessionData {
  userId: number;
  address: string;
  username: string;
  worldIdVerified: boolean;
  worldIdLevel: string | null;
}

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET!,
  cookieName: "joust-session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax" as const,
  },
};
