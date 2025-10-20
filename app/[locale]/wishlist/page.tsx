"use client";

import { Row, Col, Empty, Button } from "antd";
import ProductCard from "@/components/productsPage/ProductCard";
import { products } from "../products/page";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState(products);
  const t = useTranslations("wishlist");

  const clearWishlist = () => {
    setWishlist([]);
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] transition-all duration-300">
      <div className="container mx-auto px-6 md:px-10 lg:px-16 py-10 md:py-14">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
          <div>
            <h1 className="text-4xl font-extrabold mb-3 text-[var(--color-primary)]">
              {t("title")}
            </h1>
            <p className="text-lg md:text-xl font-medium text-text opacity-80">
              {t("subtitle")}
            </p>
          </div>

          {wishlist.length > 0 && (
            <Button
              type="primary"
              onClick={clearWishlist}
              className="!bg-[var(--color-primary)] hover:!bg-[var(--color-accent)] 
                        !border-none mt-6 md:mt-0 px-7 py-3 rounded-lg font-semibold 
                        text-white transition-all duration-300"
            >
              {t("clear")}
            </Button>
          )}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {wishlist.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <Empty
                description={
                  <span className="text-lg text-text opacity-70">
                    {t("empty")}
                  </span>
                }
                className="mt-24"
              />
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Row gutter={[24, 24]}>
                {wishlist.map((product) => (
                  <Col key={product._id} xs={24} sm={12} md={8} lg={6}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  </Col>
                ))}
              </Row>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
