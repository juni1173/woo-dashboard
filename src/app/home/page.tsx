"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Card, Typography, Row, Col, Button } from "antd";

const { Title, Text } = Typography;

interface Product {
  id: number;
  name: string;
  permalink: string;
  price: string;
  images: { src: string }[];
  status: string;
}

export default function Home() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      fetchProducts();
    }
  }, [router]);

  const fetchProducts = async () => {
    try {
      const res = await fetch("https://woo-dashboard-liart.vercel.app/api/products");
      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }
      const data: Product[] = await res.json();
      const activeProducts = data.filter((product) => product.status === "publish");
      setProducts(activeProducts);
    } catch (err) {
      console.error("Error fetching products", err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Title level={2} className="mb-4">Products</Title>
      <Row gutter={[16, 16]}>
        {products.map((product) => (
          <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              cover={
                <Image
                  src={product.images[0]?.src || "/placeholder.jpg"}
                  alt={product.name}
                  width={200}
                  height={200}
                  className="w-full h-auto"
                />
              }
            >
              <Card.Meta
                title={product.name}
                description={<Text strong>€{product.price}</Text>}
              />
              <Link href={`/product/${product.id}`} passHref>
                <Button type="primary" className="mt-2 w-full">View Details</Button>
              </Link>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
