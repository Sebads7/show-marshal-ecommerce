import prisma from "@/lib/db";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

async function getData() {
  const data = await prisma.order.findMany({
    select: {
      amount: true,
      id: true,
      User: {
        select: {
          firstName: true,
          ProfileImage: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 7,
  });
  return data;
}

const ResentSales = async () => {
  const data = await getData();
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Recent sales</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-8">
          {data.map((order) => (
            <div className="flex items-center gap-4" key={order.id}>
              <Avatar className="hidden sm:flex h-9 w-9">
                <AvatarImage src={order.User?.ProfileImage} alt="user image" />
                <AvatarFallback>
                  {order.User?.firstName.slice(0, 3)}
                </AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium">{order.User?.firstName}</p>
                <p className="text-sm text-muted-foreground">
                  {order.User?.email}
                </p>
              </div>

              <p className="ml-auto font-medium">
                +${new Intl.NumberFormat("en-US").format(order.amount / 100)}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
};

export default ResentSales;
