"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { message } from "antd";
import {
  useAddToWishlist,
  useRemoveFromWishlist,
  useWishlist,
  useGuestWishlist,
} from "../api/wishlist/hooks";

interface WishlistContextType {
  wishlistIds: string[];
  wishlistCount: number;
  handleAdd: (productId: string, callback?: () => void) => void;
  handleRemove: (productId: string, callback?: () => void) => void;
  isLoggedIn: boolean;
  loading: boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

export const WishlistProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const addMutation = useAddToWishlist();
  const removeMutation = useRemoveFromWishlist();

  const cleanIds = useCallback(
    (ids: (string | null | undefined)[]): string[] => {
      return ids.filter((id): id is string => !!id && id.trim() !== "");
    },
    []
  );

  // ✅ check token dynamically
  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };
    checkToken();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "token") checkToken();
    };
    window.addEventListener("storage", handleStorageChange);
    const interval = setInterval(checkToken, 2000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const { data: remoteWishlist } = useWishlist({
    enabled: isLoggedIn,
  });

  const { data: guestWishlist } = useGuestWishlist({
    enabled: !isLoggedIn && wishlistIds.length > 0,
    productIds: wishlistIds,
  });

  // ✅ sync wishlist after login/logout or data fetch
  useEffect(() => {
    if (isSyncing) return;

    const localWishlist: string[] = cleanIds(
      JSON.parse(localStorage.getItem("wishlist") || "[]")
    );

    console.log("📦 Local wishlist (before merge):", localWishlist);
    console.log("☁️ Remote wishlist:", remoteWishlist);

    if (isLoggedIn && remoteWishlist) {
      const serverIds = cleanIds(remoteWishlist.map((item) => item?.id));
      const merged = cleanIds([...new Set([...serverIds, ...localWishlist])]);

      setWishlistIds(merged);
      localStorage.setItem("wishlist", JSON.stringify(merged));
      setLoading(false);

      const newItems = localWishlist.filter((id) => !serverIds.includes(id));
      newItems.forEach((id) => addMutation.mutate({ productId: id }));
    } else if (!isLoggedIn && guestWishlist) {
      const ids = cleanIds(guestWishlist.map((p) => p.id));
      setWishlistIds(ids);
      localStorage.setItem("wishlist", JSON.stringify(ids));
      setLoading(false);
    } else if (!isLoggedIn && localWishlist.length > 0) {
      setWishlistIds(localWishlist);
      setLoading(false);
    }
  }, [isLoggedIn, remoteWishlist, guestWishlist, cleanIds]);

  // ✅ handle add (useCallback)
  const handleAdd = useCallback(
    (productId: string, callback?: () => void) => {
      if (!productId || productId.trim() === "") return;
      setIsSyncing(true);

      if (isLoggedIn) {
        addMutation.mutate(
          { productId },
          {
            onSuccess: () => {
              setWishlistIds((prev) => {
                const updated = cleanIds([...new Set([...prev, productId])]);
                localStorage.setItem("wishlist", JSON.stringify(updated));
                return updated;
              });
              message.success("Added to wishlist");
              callback?.();
            },
            onSettled: () => setIsSyncing(false),
            onError: () => {
              message.warning("Already in wishlist");
              setIsSyncing(false);
            },
          }
        );
      } else {
        setWishlistIds((prev) => {
          if (prev.includes(productId)) {
            message.warning("Already in wishlist");
            setIsSyncing(false);
            return prev;
          }
          const updated = cleanIds([...prev, productId]);
          localStorage.setItem("wishlist", JSON.stringify(updated));
          message.success("Added to wishlist");
          callback?.();
          setIsSyncing(false);
          return updated;
        });
      }
    },
    [isLoggedIn, addMutation, cleanIds]
  );

  // ✅ handle remove (useCallback)
  const handleRemove = useCallback(
    (productId: string, callback?: () => void) => {
      if (!productId || productId.trim() === "") return;
      setIsSyncing(true);

      const updateLocal = () => {
        const updated = cleanIds(wishlistIds.filter((id) => id !== productId));
        setWishlistIds(updated);
        localStorage.setItem("wishlist", JSON.stringify(updated));
        message.success("Removed from wishlist");
        callback?.();
      };

      if (isLoggedIn) {
        removeMutation.mutate(productId, {
          onSuccess: () => updateLocal(),
          onSettled: () => setIsSyncing(false),
        });
      } else {
        updateLocal();
        setIsSyncing(false);
      }
    },
    [isLoggedIn, wishlistIds, removeMutation, cleanIds]
  );

  // ✅ memoize context value
  const value = useMemo(
    () => ({
      wishlistIds,
      wishlistCount: wishlistIds.length,
      handleAdd,
      handleRemove,
      isLoggedIn,
      loading,
    }),
    [wishlistIds, handleAdd, handleRemove, isLoggedIn, loading]
  );

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlistContext = () => {
  const context = useContext(WishlistContext);
  if (!context)
    throw new Error(
      "useWishlistContext must be used within a WishlistProvider"
    );
  return context;
};
