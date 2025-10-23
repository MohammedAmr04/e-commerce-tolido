"use client";

import Image from "next/image";
import { useLocale } from "next-intl";
import Link from "next/link";
interface LogoProps {
  isAdmin?: boolean;
}
export default function Logo({ isAdmin = false }: LogoProps) {
  const locale = useLocale();
  const logoSrc = locale === "ar" ? "/logo/logoAr.svg" : "/logo/logoEn.svg";
  const href = isAdmin ? "/admin" : "/";
  return (
    <Link href={href} className="flex items-center justify-center">
      <Image
        src={logoSrc}
        alt="Tolido Logo"
        priority
        width={100}
        height={isAdmin ? 60 : 80}
        className={` object-contain transition-transform duration-300 hover:scale-105`}
      />
    </Link>
  );
}
