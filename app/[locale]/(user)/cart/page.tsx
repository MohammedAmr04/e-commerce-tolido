"use client";

import { useState } from "react";
import { Row, Col, Empty, Card, Button } from "antd";
import CartItem from "@/components/cart/CartItem";
import ShippingDrawer from "@/components/cart/ShippingDrawer";
import { useTranslations } from "next-intl";

const initialProducts = [
  {
    _id: "1",
    title: "Premium Tomato Soup",
    category: "Canned Soups",
    image: "/products/toolidooo  sliced mushroom blue.silver .png",
    price: 4.99,
    quantity: 2,
  },
  {
    _id: "2",
    title: "Organic Black Beans",
    category: "Canned Vegetables",
    image: "/products/toolidooo  sliced mushroom blue.silver .png",
    price: 2.49,
    quantity: 1,
  },
  {
    _id: "3",
    title: "Italian Pasta Sauce",
    category: "Sauces",
    image: "/products/toolidooo  sliced mushroom blue.silver .png",
    price: 3.99,
    quantity: 1,
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialProducts);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const t = useTranslations("cart");

  const handleQuantityChange = (id: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item._id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemove = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item._id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-[var(--color-background)] py-10 px-4 md:px-12 transition-colors duration-300">
      {/* 🛒 Header */}
      <div className="text-center md:text-left mb-10">
        <h1 className="text-3xl font-bold text-[var(--color-primary)] mb-2">
          {t("title")}
        </h1>
        <p className="text-[var(--color-text)] opacity-80">{t("subtitle")}</p>
      </div>

      {/* 🧺 Cart Items */}
      {cartItems.length === 0 ? (
        <Empty
          description={
            <span className="text-[var(--color-text)]">{t("empty")}</span>
          }
          className="mt-20"
        />
      ) : (
        <Row gutter={[32, 32]}>
          {/* 🛍️ Products List */}
          <Col xs={24} lg={16}>
            <div
              className="flex flex-col gap-5 max-h-[70vh] overflow-y-auto pe-2 
              custom-scrollbar
                         "
            >
              {cartItems.map((item) => (
                <CartItem
                  key={item._id}
                  item={item}
                  onQuantityChange={handleQuantityChange}
                  onRemove={handleRemove}
                />
              ))}
              {cartItems.map((item) => (
                <CartItem
                  key={item._id}
                  item={item}
                  onQuantityChange={handleQuantityChange}
                  onRemove={handleRemove}
                />
              ))}
              {cartItems.map((item) => (
                <CartItem
                  key={item._id}
                  item={item}
                  onQuantityChange={handleQuantityChange}
                  onRemove={handleRemove}
                />
              ))}
              {cartItems.map((item) => (
                <CartItem
                  key={item._id}
                  item={item}
                  onQuantityChange={handleQuantityChange}
                  onRemove={handleRemove}
                />
              ))}
            </div>
          </Col>

          {/* 💰 Summary Card */}
          <Col xs={24} lg={8}>
            <Card
              className="rounded-2xl shadow-md border border-[var(--color-border)] 
              bg-[var(--color-card)] text-[var(--color-text)] 
              transition-all duration-300 lg:sticky lg:top-24"
            >
              <h3 className="font-semibold text-xl mb-4 text-[var(--color-text)]">
                {t("summary")}
              </h3>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>{t("subtotal")}:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span>{t("delivery")}:</span>
                  <span className="text-[var(--color-success)]">
                    {t("free")}
                  </span>
                </div>

                <div className="flex justify-between font-bold text-lg pt-3 border-t border-[var(--color-border)]">
                  <span>{t("total")}:</span>
                  <span className="text-[var(--color-primary)]">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* 🧾 Buttons */}
              <div className="mt-6 flex flex-col gap-3">
                <Button
                  type="primary"
                  block
                  size="large"
                  className="!bg-[var(--color-primary)] font-medium 
                             !text-[var(--color-background)] hover:!opacity-90 
                             transition-all duration-300 rounded-xl"
                  onClick={() => setDrawerOpen(true)}
                >
                  {t("checkout")}
                </Button>

                <Button
                  size="large"
                  className="relative overflow-hidden border-2 
                             !border-[var(--color-primary)] text-[var(--color-primary)] 
                             font-medium hover:bg-[var(--color-primary)] 
                             hover:text-[var(--color-background)] 
                             transition-all duration-300 rounded-xl"
                >
                  {t("continue")}
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      )}

      {/* 📦 Shipping Drawer */}
      <ShippingDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSubmit={() => {}}
      />
    </div>
  );
}
