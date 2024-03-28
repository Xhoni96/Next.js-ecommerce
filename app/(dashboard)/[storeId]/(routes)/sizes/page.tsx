import { client, e } from "@/lib/edgedb";

import { SizesClient } from "./components/SizesClient";
import { IntlDateTimeFormat } from "@/lib/utils";

const SizesPage = async ({ params }: { params: { storeId: string } }) => {
    const sizes = await e
        .select(e.Size, (size) => ({
            id: true,
            name: true,
            value: true,
            createdAt: true,
            filter: e.op(size.store.id, "=", e.uuid(params.storeId)),
            order_by: {
                expression: size.createdAt,
                direction: e.DESC,
            },
        }))
        .run(client);

    const formattedSizes = sizes.map((size) => ({
        ...size,
        createdAt: IntlDateTimeFormat.format(new Date(size.createdAt)),
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SizesClient data={formattedSizes} />
            </div>
        </div>
    );
};

export default SizesPage;
