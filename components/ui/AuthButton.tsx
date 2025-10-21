"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import Image from "next/image";
import { Dropdown, Menu } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";

export default function AuthButton() {
  const router = useRouter();
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const [user, setUser] = useState<{ name: string; image?: string } | null>(
    null
  );

  // ✅ Check token on mount
  useEffect(() => {
    const checkUser = () => {
      const token = localStorage.getItem("token");
      const name = localStorage.getItem("username");
      if (token && name) {
        setUser({ name });
      } else {
        setUser(null);
      }
    };

    checkUser(); // run once initially

    window.addEventListener("storage", checkUser);
    return () => window.removeEventListener("storage", checkUser);
  }, []);

  // 🎬 GSAP fade-in animation
  useEffect(() => {
    if (buttonRef.current) {
      gsap.from(buttonRef.current, {
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
      });
    }
  }, []);

  // 📜 Dropdown menu when user is logged in
  const menu = (
    <Menu
      className="rounded-xl p-2"
      items={[
        {
          key: "1",
          label: (
            <span
              onClick={() => router.push("/profile")}
              className="block hover:text-[var(--color-primary)]"
            >
              Profile
            </span>
          ),
        },
        {
          key: "2",
          label: (
            <span
              onClick={() => router.push("/orders")}
              className="block hover:text-[var(--color-primary)]"
            >
              My Orders
            </span>
          ),
        },
        {
          key: "3",
          label: (
            <span
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("username");
                localStorage.removeItem("userImage");
                setUser(null);
              }}
              className="block text-red-500 hover:text-red-600"
            >
              Logout
            </span>
          ),
        },
      ]}
    />
  );

  return (
    <div ref={buttonRef}>
      {!user ? (
        <button
          onClick={() => router.push("/login")}
          className="
            border-2 border-[var(--color-primary)]
            text-[var(--color-primary)]
            px-4 py-1.5 rounded-xl font-medium
            hover:bg-[var(--color-primary)] hover:text-white
            transition-all duration-300
          "
        >
          Login
        </button>
      ) : (
        <Dropdown overlay={menu} trigger={["click"]}>
          <div className="flex items-center gap-2 cursor-pointer select-none">
            {user.image ? (
              <Image
                src={user.image}
                alt="user"
                width={32}
                height={32}
                className="rounded-full border border-gray-300"
              />
            ) : (
              <UserOutlined className="text-[var(--color-primary)] text-xl" />
            )}
            <span className="font-medium text-gray-800">
              {`Hi, ${user.name.split(" ")[0]}`}
            </span>
            <DownOutlined className="text-gray-500 text-xs" />
          </div>
        </Dropdown>
      )}
    </div>
  );
}
