import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import { e, client } from "@/lib/edgedb";

import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { CreditCard, DollarSign, Package } from "lucide-react";
import { OverviewChart } from "@/components/OverviewChart";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatter } from "@/lib/utils";

const graphData: Array<{ name: string; totalPrice: number }> = [
  { name: "Jan", totalPrice: 0 },
  { name: "Feb", totalPrice: 0 },
  { name: "Mar", totalPrice: 0 },
  { name: "Apr", totalPrice: 0 },
  { name: "May", totalPrice: 0 },
  { name: "Jun", totalPrice: 0 },
  { name: "Jul", totalPrice: 0 },
  { name: "Aug", totalPrice: 0 },
  { name: "Sep", totalPrice: 0 },
  { name: "Oct", totalPrice: 0 },
  { name: "Nov", totalPrice: 0 },
  { name: "Dec", totalPrice: 0 },
];

export default async function DashboardPage({ params }: { params: { storeId: string } }) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await e
    .select(e.Store, () => ({
      totalSales: true,
      inStock: true,
      totalRevenue: true,
      orders: {
        isPaid: true,
        totalPrice: true,
        createdAt: true,
        customerName: true,
        customerEmail: true,
      },
      filter_single: { id: params.storeId, userId },
    }))
    .run(client);

  if (!store) {
    redirect("/");
  }

  let salesThisMonth = 0;
  const currMonth = new Date().getMonth();
  const thisMonthCustomers: Array<{ customerName: string; customerEmail: string; totalPrice: number }> = [];

  store.orders.forEach((order) => {
    if (order.isPaid) {
      const monthCreated = order.createdAt.getMonth();
      const totalPrice = Number(order.totalPrice);

      graphData[monthCreated].totalPrice = totalPrice;

      if (currMonth === monthCreated) {
        salesThisMonth++;
        thisMonthCustomers.push({
          customerName: order.customerName,
          customerEmail: order.customerEmail,
          totalPrice,
        });
      }
    }
  });

  return (
    // <div className="flex-col">
    <div className="flex-1 space-y-4 p-8 pt-6">
      <Heading title="Dashboard" description="Overview of your store" />
      <Separator />
      {/* <BillboardClient data={formattedBillboards} /> */}

      <div className="grid gap-8 items-center md:grid-cols-2 lg:grid-cols-3">
        {/* Revenue */}
        <div className="flex flex-col p-4 border gap-2 rounded-md">
          <div className="flex justify-between">
            <p className="text-sm font-medium">Total Revenue</p>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </div>
          <p className="font-bold text-2xl">${store.totalRevenue}</p>
        </div>

        {/* Sales */}
        <div className="flex flex-col p-4 border gap-2 rounded-md">
          <div className="flex justify-between">
            <p className="text-sm font-medium">Sales</p>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </div>
          <p className="font-bold text-2xl">+{store.totalSales}</p>
        </div>

        {/* Stock */}
        <div className="flex flex-col p-4 border gap-2 rounded-md">
          <div className="flex justify-between">
            <p className="text-sm font-medium">Products in Stock</p>
            <Package className="h-4 w-4 text-muted-foreground" />
          </div>
          <p className="font-bold text-2xl">{store.inStock}</p>
        </div>
      </div>
      {/* Overview */}
      <div className="grid gap-4  md:grid-cols-2 lg:grid-cols-7">
        <div className="border p-4 font-bold text-lg space-y-6 flex-1 rounded-md col-span-4">
          <h2>Overview</h2>
          <OverviewChart data={graphData} />
        </div>

        <div className="border p-6 flex-1 rounded-md space-y-8 col-span-3">
          <div>
            <h3 className="font-semibold leading-none">Recent Sales</h3>
            <p className="text-muted-foreground text-sm mt-1">
              You made {salesThisMonth} {salesThisMonth <= 1 ? "sale" : "sales"} this month.
            </p>
          </div>
          <div className="space-y-8">
            {thisMonthCustomers.map((customer) => {
              const fallbackName = customer.customerName.split(" ");

              return (
                <div key={customer.customerEmail} className="flex items-center">
                  <Avatar className="h-9 w-9">
                    {/* <AvatarImage  src="/avatars/01.png"  alt="Avatar" /> */}
                    <AvatarFallback>
                      {fallbackName.length > 1 ? `${fallbackName[0][0]} ${fallbackName[1][0]}` : fallbackName[0][0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">{customer.customerName}</p>
                    <p className="text-sm text-muted-foreground">{customer.customerEmail}</p>
                  </div>
                  <div className="ml-auto font-medium">{formatter.format(customer.totalPrice)}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
}
