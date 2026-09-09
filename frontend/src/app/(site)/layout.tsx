import { getCategories } from "@/lib/public-api";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const categories = await getCategories();

  return (
    <>
      <Header categories={categories} />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <Footer categories={categories} />
    </>
  );
}
