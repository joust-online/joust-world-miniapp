import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { r2Client } from "@/lib/r2";
import { requireSession } from "@/lib/session";

const uploadTokenSchema = z.object({
  filename: z.string().min(1),
  contentType: z.string().min(1),
});

// All uploads go to joust-worldcoin bucket
const BUCKET = "joust-worldcoin";

export async function POST(req: NextRequest) {
  try {
    await requireSession();

    const body = await req.json();
    const parsed = uploadTokenSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const { filename, contentType } = parsed.data;

    const command = new PutObjectCommand({
      Bucket: BUCKET,
      Key: filename,
      ContentType: contentType,
    });

    const uploadUrl = await getSignedUrl(r2Client, command, { expiresIn: 3600 });

    return NextResponse.json({ uploadUrl });
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Upload token error:", error);
    return NextResponse.json({ error: "Failed to generate upload token" }, { status: 500 });
  }
}
