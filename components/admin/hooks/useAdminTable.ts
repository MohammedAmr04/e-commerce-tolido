import { useState } from "react";

export function useAdminTable<T>() {
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleDrawer = (action: "OPEN" | "CLOSE") =>
    setDrawerOpen(action === "OPEN");
  const handleModal = (action: "OPEN" | "CLOSE") =>
    setModalOpen(action === "OPEN");

  return {
    selectedItem,
    setSelectedItem,
    isDrawerOpen,
    isModalOpen,
    handleDrawer,
    handleModal,
  };
}
