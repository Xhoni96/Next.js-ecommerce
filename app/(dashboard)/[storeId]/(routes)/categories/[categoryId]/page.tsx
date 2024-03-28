import { client, e } from "@/lib/edgedb";
import { CategoryForm } from "./components/CategoryForm";
import type { CategoriesRouteParams } from "@/lib/types";

const CategoryPage = async ({ params }: { params: CategoriesRouteParams }) => {
    const categoryPromise = e
        .select(e.Category, () => ({
            name: true,
            billboard: true,
            filter_single: { id: params.categoryId },
        }))
        .run(client);

    const billboardsPromise = e
        .select(e.Billboard, (billboard) => ({
            id: true,
            label: true,
            filter: e.op(billboard.store.id, "=", e.uuid(params.storeId)),
            order_by: {
                expression: billboard.createdAt,
                direction: e.DESC,
            },
        }))
        .run(client);

    const results = await Promise.allSettled([categoryPromise, billboardsPromise]);

    const category = results[0].status === "fulfilled" ? results[0].value : null;
    const billboards = results[1].status === "fulfilled" ? results[1].value : null;

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <CategoryForm initialData={category} billboards={billboards} />
            </div>
        </div>
    );
};

export default CategoryPage;
