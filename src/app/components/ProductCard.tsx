import Link from "next/link";
import Image from "next/image";
import { Card, Typography, Button } from "antd";

const { Title, Text } = Typography;

interface Product {
  id: number;
  name: string;
  price: string;
  images: { src: string }[];
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
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
        title={<Title level={5}>{product.name}</Title>}
        description={<Text strong>€{product.price}</Text>}
      />
      <Link href={`/product/${product.id}`} passHref>
        <Button type="primary" className="mt-2 w-full">View Details</Button>
      </Link>
    </Card>
  );
};

export default ProductCard;
