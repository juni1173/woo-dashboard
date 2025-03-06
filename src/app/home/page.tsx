"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Card, Row, Col, Spin, Button, message } from "antd";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("/api/products");
      setProducts(response.data);
    } catch (error) {
      message.error("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>WooCommerce Products</h1>
        <Button type="primary" danger onClick={handleLogout}>
          Logout
        </Button>
      </div>

      {loading ? (
        <Spin size="large" style={{ display: "block", margin: "50px auto" }} />
      ) : (
        <Row gutter={[16, 16]}>
          {products.length > 0 ? (
            products.map((product: any) => (
              <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
                <Card
                  hoverable
                  title={product.name}
                  cover={<img alt={product.name} src={product.images[0]?.src} />}
                >
                  <p><strong>Price:</strong> ${product.price}</p>
                </Card>
              </Col>
            ))
          ) : (
            <p>No products available.</p>
          )}
        </Row>
      )}
    </div>
  );
}
