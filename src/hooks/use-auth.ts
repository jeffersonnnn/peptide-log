"use client";
import { usePrivy } from "@privy-io/react-auth";

export function useAuth() {
  const { user, authenticated, ready, login, logout, getAccessToken } =
    usePrivy();

  const userId = user?.id ?? null;

  const walletAddr = user?.wallet?.address;
  const displayName = user?.email?.address
    ?? (walletAddr ? walletAddr.slice(0, 6) + "..." + walletAddr.slice(-4) : null);

  return {
    user,
    userId,
    displayName,
    isAuthenticated: authenticated,
    ready,
    login,
    logout,
    getAccessToken,
  };
}
