import Header from "@/components/shared/headerUser/Header";
import Footer from "@/components/shared/footerUser/Footer";

// 🇸🇦 Arabic font

export default async function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
