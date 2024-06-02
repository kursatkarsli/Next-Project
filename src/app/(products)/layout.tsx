// app/layout.tsx
"use client";
import "@/app/globals.css";
import { Col, Row } from "antd";
import { useRouter } from "next/navigation";
import { Header } from "antd/es/layout/layout";
import Image from "next/image";
import { UserOutlined } from "@ant-design/icons";

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
      <Header style={{ background: "#FFFFFF" }}>
        <Row justify="space-between">
          <Col
            onClick={() => {
              router.push("/packages");
            }}
            style={{
              cursor: "pointer",
            }}
          >
            <Image
              src={"/Frame.svg"}
              alt={"Company Logo"}
              width="248"
              height="28"
            />
          </Col>
          <Row>
            <Col style={{ marginRight: "0.5rem" }}>
              <div>
                <UserOutlined />
              </div>
            </Col>
            <Col>
              <div>{localStorage.getItem("email")}</div>
            </Col>
          </Row>
        </Row>
      </Header>
      {children}
    </>
  );
}
