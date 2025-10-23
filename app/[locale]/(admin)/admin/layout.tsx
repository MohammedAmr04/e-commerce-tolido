import HeaderAdmin from "@/components/admin/shared/HeaderAdmin";
import Footer from "@/components/shared/footerUser/Footer";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HeaderAdmin />
      <main>{children}</main>
      <Footer />
    </>
  );
}
