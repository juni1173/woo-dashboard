"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button, message } from "antd";
import axios from "axios";

export default function Home() {
  const [user, setUser] = useState<{ username: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const res = await axios.get<{ message: string; user?: { username: string } }>(
          "https://blogpepper.com/verify.php",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (res.data.message === "Valid token" && res.data.user) {
          setUser(res.data.user);
        } else {
          localStorage.removeItem("token");
          router.push("/login");
        }
      } catch {
        localStorage.removeItem("token");
        router.push("/login");
      }
    };

    checkAuth();
  }, [router]);

  return user ? (
    <div style={{ maxWidth: 400, margin: "100px auto", textAlign: "center" }}>
      <h1>Welcome, {user.username}!</h1>
      <Button
        type="primary"
        danger
        onClick={() => {
          localStorage.removeItem("token");
          router.push("/login");
        }}
      >
        Logout
      </Button>
    </div>
  ) : (
    <p>Loading...</p>
  );
}
