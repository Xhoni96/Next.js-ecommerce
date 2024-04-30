import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { client, e } from "@/lib/edgedb";

import { SettingsForm } from "./components/SettingsForm";

const SettingsPage = async ({ params }: { params: { storeId: string } }) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }
  const store = await e
    .select(e.Store, () => ({
      name: true,
      filter_single: { id: params.storeId, userId },
    }))
    .run(client);

  if (!store) {
    redirect("/");
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={store} />
      </div>
    </div>
  );
};

export default SettingsPage;
