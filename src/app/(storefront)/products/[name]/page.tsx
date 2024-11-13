import { ProductCard } from "@/components/storefront/ProductCard";
import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

async function getData(productCategory: string) {
  switch (productCategory) {
    case "all": {
      const data = await prisma.product.findMany({
        select: {
          name: true,
          price: true,
          description: true,
          id: true,
          images: true,
        },
        where: {
          status: "published",
        },
      });
      return {
        title: "All Products",
        data: data,
      };
    }
    case "men": {
      const data = await prisma.product.findMany({
        where: {
          status: "published",
          category: "men",
        },
        select: {
          name: true,
          price: true,
          description: true,
          id: true,
          images: true,
        },
      });

      return {
        title: "Products for Men",
        data: data,
      };
    }
    case "women": {
      const data = await prisma.product.findMany({
        where: {
          status: "published",
          category: "women",
        },
        select: {
          name: true,
          price: true,
          description: true,
          id: true,
          images: true,
        },
      });

      return {
        title: "Products for Women",
        data: data,
      };
    }
    case "kids": {
      const data = await prisma.product.findMany({
        where: {
          status: "published",
          category: "kids",
        },
        select: {
          name: true,
          price: true,
          description: true,
          id: true,
          images: true,
        },
      });

      return {
        title: "Products for Kids",
        data: data,
      };
    }

    default: {
      return notFound();
    }
  }
}

const page = async ({ params }: { params: { name: string } }) => {
  noStore();
  const data = await getData(params.name);
  return (
    <section>
      <h1 className="font-semibold text-3xl my-5">{data.title}</h1>

      <div className="w-full   flex gap-10">
        {data.data.map((item) => (
          <ProductCard key={item.id} items={item} />
        ))}
      </div>
    </section>
  );
};

export default page;
