"use client";
import { PrivyProvider } from "@privy-io/react-auth";
import React from "react";

class PrivyErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return this.props.children;
    return this.props.children;
  }
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrivyErrorBoundary>
      <PrivyProvider
        appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
        config={{
          appearance: {
            theme: "dark",
            accentColor: "#4F46E5",
            logo: "/icon.svg",
          },
          loginMethods: ["email", "wallet"],
        }}
      >
        {children}
      </PrivyProvider>
    </PrivyErrorBoundary>
  );
}
