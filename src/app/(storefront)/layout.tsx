import Footer from "@/components/storefront/Footer";
import { Navbar } from "@/components/storefront/Navbar/Navbar";

export default function StoreFrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      <main className="container mx-auto  px-4 sm:px-6 lg:px-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}
