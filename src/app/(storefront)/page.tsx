import { CategoriesSelection } from "@/components/storefront/CategorySelection";
import { FeaturedProduct } from "@/components/storefront/FeaturedProducts";
import { Hero } from "@/components/storefront/Hero/Hero";

export default function IndexPage() {
  return (
    <div>
      <Hero />
      <CategoriesSelection />
      <FeaturedProduct />
    </div>
  );
}
