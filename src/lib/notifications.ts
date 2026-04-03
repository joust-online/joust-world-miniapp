const APP_ID = process.env.NEXT_PUBLIC_APP_ID!;

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
  try {
    const response = await fetch(
      `https://developer.worldcoin.org/api/v2/minikit/${APP_ID}/send-notification`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          wallet_addresses: walletAddresses,
          title,
          message,
          ...(miniAppPath ? { mini_app_path: miniAppPath } : {}),
        }),
      }
    );
    return response.ok;
  } catch (error) {
    console.error("Push notification failed:", error);
    return false;
  }
}

// Helper to create and push a notification to a user
export async function notifyUser(
  prisma: any,
  userId: number,
  type: string,
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
