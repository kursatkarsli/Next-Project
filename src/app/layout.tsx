// app/layout.tsx
"use client";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import "@/app/globals.css";
import { ConfigProvider } from "antd";
import { useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <ConfigProvider>{children}</ConfigProvider>
        </Provider>
      </body>
    </html>
  );
}
