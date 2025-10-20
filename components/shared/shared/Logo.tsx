"use client";

import Image from "next/image";
import { useLocale } from "next-intl";
import Link from "next/link";

export default function Logo() {
  const locale = useLocale();
  const logoSrc = locale === "ar" ? "/logo/logoAr.svg" : "/logo/logoEn.svg";

  return (
    <Link href="/" className="flex items-center justify-center">
      <Image
        src={logoSrc}
        alt="Tolido Logo"
        priority
        width={100}
        height={80}
        className={` object-contain transition-transform duration-300 hover:scale-105`}
      />
    </Link>
  );
}
