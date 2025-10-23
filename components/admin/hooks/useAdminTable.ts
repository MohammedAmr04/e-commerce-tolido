import { useCallback, useState } from "react";

export function useAdminTable<T>() {
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleDrawer = useCallback((action: "OPEN" | "CLOSE", item?: T) => {
    setDrawerOpen(action === "OPEN");
    if (action === "OPEN" && item) {
      setSelectedItem(item);
    } else if (action === "CLOSE") {
      setSelectedItem(null); // reset عند الإغلاق
    }
  }, []);

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
