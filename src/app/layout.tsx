"use client"; // Ensure it's a client component

import { ConfigProvider } from "antd";
import React from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider theme={{ token: {} }} wave={{ disabled: true }}>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ConfigProvider>
  );
}
