import { PrivyClient } from "@privy-io/server-auth";

let client: PrivyClient | null = null;

function getClient(): PrivyClient | null {
  if (client) return client;
  const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;
  const appSecret = process.env.PRIVY_APP_SECRET;
  if (!appId || !appSecret) return null;
  client = new PrivyClient(appId, appSecret);
  return client;
}

export async function verifyPrivyToken(
  authHeader: string | null
): Promise<string | null> {
  if (!authHeader?.startsWith("Bearer ")) return null;
  const token = authHeader.slice(7);
  const privy = getClient();
  if (!privy) return null;
  try {
    const { userId } = await privy.verifyAuthToken(token);
    return userId;
  } catch {
    return null;
  }
}
