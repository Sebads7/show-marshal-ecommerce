import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
import { unstable_noStore as noStore } from "next/cache";

export async function GET() {
  const { getUser } = getKindeServerSession();

  const user = await getUser();
  noStore();

  if (!user || user === null || !user.id) {
    throw new Error("Unauthorized");
  }

  let dbUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        id: user.id,
        firstName: user.given_name ?? "",
        lastName: user.family_name ?? "",
        email: user.email ?? "",
        ProfileImage:
          user.picture ?? `https://avatar.vercel.sh/rauchg/${user.given_name}`,
      },
    });
  }

  return NextResponse.redirect(
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/dashboard"
      : "https://ecommerce-practice1.vercel.app"
  );
}
