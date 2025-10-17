"use client";

import { Row, Col, Empty, Button } from "antd";
import ProductCard from "@/components/productsPage/ProductCard";
import { products } from "../../products/page";
import { useState } from "react";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState(products);

  const clearWishlist = () => {
    setWishlist([]);
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)]      p-8 
                                             md:px-12 transition-all duration-300">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-[var(--color-primary)]">
            My Wishlist
          </h1>
          <p className="font-medium text-lg opacity-80">
            Your saved items are waiting for you.
          </p>
        </div>

        {wishlist.length > 0 && (
          <Button
            type="primary"
            onClick={clearWishlist}
            className="!bg-[var(--color-primary)] hover:!bg-[var(--color-accent)] !border-none mt-4 md:mt-0 px-6 py-2 rounded-lg font-medium"
          >
            Clear Wishlist
          </Button>
        )}
      </div>

      {wishlist.length === 0 ? (
        <Empty
          description="Your wishlist is empty"
          className="mt-20"
        />
      ) : (
        <Row gutter={[24, 24]}>
          {wishlist.map((product) => (
            <Col key={product._id} xs={24} sm={12} md={8} lg={6}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}
