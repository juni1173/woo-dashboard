"use client"; // 👈 Required for Client Components

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Input, Form, message } from "antd";
import axios from "axios";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // ✅ Works in App Router

  const handleLogin = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      const res = await axios.post<{ token: string }>(
        "https://blogpepper.com/login.php",
        values
      );

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        message.success("Login successful!");
        router.push("/home"); // ✅ Redirect to home
      } else {
        message.error("Invalid credentials.");
      }
    } catch (err) {
      message.error("Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "100px auto", padding: 20 }}>
      <h2>Login</h2>
      <Form onFinish={handleLogin}>
        <Form.Item name="email" rules={[{ required: true, message: "Email is required" }]}>
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: "Password is required" }]}>
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block>
          Login
        </Button>
      </Form>
    </div>
  );
}
