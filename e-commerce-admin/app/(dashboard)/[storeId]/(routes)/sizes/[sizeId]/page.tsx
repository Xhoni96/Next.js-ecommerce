import { client, e } from "@/lib/edgedb";
import { SizeForm } from "./components/SizeForm";
import type { SizeFormType, SizesRouteParams } from "@/lib/types";

const SizePage = async ({ params }: { params: SizesRouteParams }) => {
    let size: SizeFormType | null = null;

    try {
        size = await e
            .select(e.Size, () => ({
                name: true,
                value: true,
                filter_single: { id: params.sizeId },
            }))
            .run(client);
    } catch (error) {
        // do nothing
    }

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SizeForm initialData={size} />
            </div>
        </div>
    );
};

export default SizePage;
