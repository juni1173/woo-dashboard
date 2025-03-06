"use client"; 

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, message } from "antd";

export default function Home() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      message.warning("Session expired. Redirecting to login...");
      router.push("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    message.success("Logged out successfully!");
    router.push("/login");
  };

  if (!isAuthenticated) return null; // Prevent UI flickering before redirect

  return (
    <div style={{ maxWidth: 600, margin: "50px auto", padding: 20 }}>
      <h2>Welcome to Home Page</h2>
      <p>You are successfully logged in.</p>
      <Button type="primary" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}
