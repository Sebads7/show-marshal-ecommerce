import Chart from "@/components/dashboard/Chart";
import { DashboadStats } from "@/components/dashboard/DashboardStats";
import ResentSales from "@/components/dashboard/ResentSales";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prisma from "@/lib/db";

async function getData() {
  const now = new Date();

  const sevenDaysAgo = new Date(now);
  sevenDaysAgo.setDate(now.getDate() - 7);

  const data = await prisma.order.findMany({
    where: {
      createdAt: {
        gte: sevenDaysAgo,
      },
    },
    select: {
      amount: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "asc",
    },
    take: 7,
  });
  const result = data.map((order) => ({
    date: new Intl.DateTimeFormat("en-US").format(order.createdAt),
    revenue: order.amount / 100,
  }));

  return result;
}

export default async function DashboardPage() {
  const data = await getData();
  return (
    <>
      <DashboadStats />
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3 mt-10">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Transactions</CardTitle>
            <CardDescription>
              Recent transactions from the last 7 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Chart data={data} />
          </CardContent>
        </Card>

        <ResentSales />
      </div>
    </>
  );
}
