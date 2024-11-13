import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import prisma from "@/lib/db";
import { Item } from "@radix-ui/react-dropdown-menu";
import React from "react";

async function getData() {
  const data = await prisma.order.findMany({
    select: {
      createdAt: true,
      amount: true,
      status: true,
      id: true,
      User: {
        select: {
          email: true,
          firstName: true,
          ProfileImage: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

export default async function OrderPage() {
  const data = await getData();
  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle>Orders</CardTitle>
        <CardDescription> Recent orders from your store!</CardDescription>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <p className="font-medium">{order.User?.firstName}</p>
                  <p className="hidden md:flex text-sm text-muted-foreground">
                    {order.User?.email}
                  </p>
                </TableCell>
                <TableCell> Order</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>
                  {new Intl.DateTimeFormat("en-Us").format(order.createdAt)}
                </TableCell>
                <TableCell className="text-right">
                  ${new Intl.NumberFormat("en-US").format(order.amount / 100)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
