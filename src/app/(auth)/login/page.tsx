// app/login/page.tsx
"use client";
import { Form, Input, Button, message } from "antd";
import "./loginForm.css";
import { MailOutlined, UserOutlined } from "@ant-design/icons";
import { useLoginMutation } from "@/redux/slices/apiSlice";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import { useEffect } from "react";
export default function Login() {
  const [login, { isLoading }] = useLoginMutation();

  const router = useRouter();

  async function isFinish(values: any) {
    try {
      const { token } = await login(values).unwrap();
      localStorage.setItem("token", token);
      localStorage.setItem("email", values.email);
      setCookie("token", token);
      router.push("/packages");
    } catch (err) {
      message.error("Login failed. Please check your credentials.");
    }
  }
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) router.push("/packages");
  }, []);
  return (
    <div className="login_form">
      <Form name="login" onFinish={isFinish}>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Please enter a valid email!",
            },
          ]}
        >
          <Input placeholder="Email" prefix={<MailOutlined />} />
        </Form.Item>
        <Form.Item
          name="code"
          rules={[{ required: true, message: "Please enter your code!" }]}
        >
          <Input placeholder="Code" prefix={<UserOutlined />} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Devam Et
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
