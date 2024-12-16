import prisma from "@/lib/db";
import HeroCarousel from "./HeroCarrosuel";

async function getData() {
  const data = await prisma.banner.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

export async function Hero() {
  const data = await getData();
  // console.log(data);
  return (
    <>
      <HeroCarousel data={data} />
    </>
  );
}
