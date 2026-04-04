const PFPS_BUCKET_URL = process.env.NEXT_PUBLIC_R2_PFPS_BUCKET_URL;

export function getPfpUrl(filePath: string | undefined | null): string | null {
  if (!filePath) return null;
  // If it's already a full URL or data URL (legacy), return as-is
  if (filePath.startsWith("http") || filePath.startsWith("data:")) return filePath;
  return `${PFPS_BUCKET_URL}/${filePath}`;
}
