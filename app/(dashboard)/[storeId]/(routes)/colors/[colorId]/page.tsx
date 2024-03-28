import { client, e } from "@/lib/edgedb";
import { ColorForm } from "./components/ColorForm";
import type { ColorFormType, ColorsRouteParams } from "@/lib/types";

const ColorPage = async ({ params }: { params: ColorsRouteParams }) => {
    let color: ColorFormType | null = null;

    try {
        color = await e
            .select(e.Color, () => ({
                name: true,
                value: true,
                filter_single: { id: params.colorId },
            }))
            .run(client);
    } catch (error) {
        // do nothing
    }

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ColorForm initialData={color} />
            </div>
        </div>
    );
};

export default ColorPage;
