import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import { client, e } from "@/lib/edgedb";

import Navbar from "@/components/Navbar";

type Props = {
    children: React.ReactNode;
    params: { storeId: string };
};

export default async function DashboardLayout({ children, params }: Props) {
    const { userId } = auth();

    if (!userId) {
        redirect("/sign-in");
    }

    const store = await e
        .select(e.Store, () => ({
            filter_single: { id: params.storeId, userId },
        }))
        .run(client);

    if (!store) {
        redirect("/");
    }

    return (
        <>
            <Navbar />
            {children}
        </>
    );
}
