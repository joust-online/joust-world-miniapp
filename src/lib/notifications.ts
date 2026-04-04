import type { PrismaClient, NotificationType } from "@/generated/prisma";

const APP_ID = process.env.WORLD_APP_ID ?? process.env.NEXT_PUBLIC_APP_ID!;
const API_KEY = process.env.WORLD_API_KEY;

interface SendNotificationParams {
  walletAddresses: string[];
  title: string;
  message: string;
  miniAppPath?: string;
}

export async function sendPushNotification({
  walletAddresses,
  title,
  message,
  miniAppPath,
}: SendNotificationParams) {
  if (!API_KEY) {
    console.warn("WORLD_API_KEY not set — push notifications disabled");
    return false;
  }

  try {
    const response = await fetch(
      "https://developer.worldcoin.org/api/v2/minikit/send-notification",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          app_id: APP_ID,
          wallet_addresses: walletAddresses,
          title,
          message,
          mini_app_path: miniAppPath,
        }),
      },
    );
    return response.ok;
  } catch (error) {
    console.error("Push notification failed:", error);
    return false;
  }
}

// Helper to create and push a notification to a user
export async function notifyUser(
  prisma: PrismaClient,
  userId: number,
  type: NotificationType,
  title: string,
  body: string,
  poolId?: string,
  walletAddress?: string,
  miniAppPath?: string,
) {
  // Create DB notification
  await prisma.notification.create({
    data: {
      userId,
      type,
      title,
      body,
      poolId,
    },
  });

  // Send push notification if we have the wallet address
  if (walletAddress) {
    await sendPushNotification({
      walletAddresses: [walletAddress],
      title,
      message: body,
      miniAppPath,
    });
  }
}
