import { redirect } from "next/navigation";
import { client, e } from "@/lib/edgedb";
import { auth } from "@clerk/nextjs/server";

export default async function SetupPageLayout({ children }: { children: React.ReactNode }) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const stores = await e
    .select(e.Store, (store) => ({
      id: true,
      limit: 1,
      filter: e.op(store.userId, "=", userId),
    }))
    .run(client);

  if (stores.length) {
    return redirect(`${stores[0].id}`);
  }
  return <>{children}</>;
}
