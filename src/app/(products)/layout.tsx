// app/layout.tsx
"use client";
import { Provider } from "react-redux";
import "@/app/globals.css";
import { Col, ConfigProvider, Row } from "antd";
import { useRouter } from "next/navigation";
import { Header } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import { store } from "@/redux/store";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = localStorage.getItem("token");
  const router = useRouter();
  if (!token) router.push("/login");

  return (

            <>
                <Header>
                  <Row justify="space-between">
                    <Col>
                      <div>Company Logo</div>
                    </Col>
                    <Col>
                      <div>User Email</div>
                    </Col>
                  </Row>
                </Header>
                {children}
            </>
     
  );
}
