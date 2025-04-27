import React from "react";
import "./globals.css";

export const metadata = {
  title: "TRAVANA - Travel AI",
  description: "Your personal AI travel assistant",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/travana-icon.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
