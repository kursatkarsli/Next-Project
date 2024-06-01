// app/login/page.tsx
"use client";
import { Form, Input, Button } from "antd";
import "./loginForm.css";
import { MailOutlined, UserOutlined } from "@ant-design/icons";
import { useFinish } from "./submitFunction";

const Login = () => {
  return (
    <div className="login_form">
      <Form name="login" onFinish={useFinish}>
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
};

export default Login;
