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

//   const handleCheckout = (data: any) => {
//     console.log("Checkout data:", data);
//   };

  return (
    <div className="min-h-screen bg-[var(--color-background)] py-10 px-4 md:px-12">
      <h1 className="text-3xl font-bold mb-3 text-[var(--color-primary)]">
        {t("title")}
      </h1>
      <p className="text-lg mb-10 text-gray-600">{t("subtitle")}</p>

      {cartItems.length === 0 ? (
        <Empty description={t("empty")} className="mt-20" />
      ) : (
        <Row gutter={[32, 32]}>
          <Col xs={24} lg={16}>
            <div className="flex flex-col gap-5">
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

          <Col xs={24} lg={8}>
            <Card className="shadow-lg rounded-2xl">
              <h3 className="font-semibold text-xl mb-4">{t("summary")}</h3>
              <div className="flex justify-between mb-2">
                <span>{t("subtotal")}:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>{t("delivery")}:</span>
                <span className="text-green-600">{t("free")}</span>
              </div>
              <div className="flex justify-between font-bold text-lg mt-4">
                <span>{t("total")}:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <Button
                type="primary"
                block
                size="large"
                className="mt-6"
                onClick={() => setDrawerOpen(true)}
              >
                {t("checkout")}
              </Button>
              <Button block size="large" className="mt-3">
                {t("continue")}
              </Button>
            </Card>
          </Col>
        </Row>
      )}

      <ShippingDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSubmit={()=>{}}
        // onSubmit={handleCheckout}
      />
    </div>
  );
}
