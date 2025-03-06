"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Product {
  id: number;
  name: string;
  permalink: string;
  price: string;
  images: { src: string }[];
  status: string;
  categories: { id: number; name: string }[];
}

export default function Home() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [categorizedProducts, setCategorizedProducts] = useState<Record<string, Product[]>>({});

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
      const categorized = activeProducts.reduce((acc, product) => {
        product.categories.forEach((category) => {
          if (category.name.toLowerCase() !== "uncategorized") {
            if (!acc[category.name]) {
              acc[category.name] = [];
            }
            acc[category.name].push(product);
          }
        });
        return acc;
      }, {} as Record<string, Product[]>);
      setCategorizedProducts(categorized);
    } catch (err) {
      console.error("Error fetching products", err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      {Object.entries(categorizedProducts).map(([category, products]) => (
        <div key={category} className="mb-8">
          <h2 className="text-xl font-semibold mb-2">{category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {products.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`} passHref>
                <div className="border p-4 rounded-md shadow-md cursor-pointer hover:shadow-lg">
                  <Image
                    src={product.images[0]?.src || "/placeholder.jpg"}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="w-full h-auto"
                  />
                  <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
                  <p className="text-gray-700">€{product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
