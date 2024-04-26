import { client, e } from "@/lib/edgedb";
import { ProductForm } from "./components/ProductForm";
import type { ProductsRouteParams } from "@/lib/types";

const ProductPage = async ({ params }: { params: ProductsRouteParams }) => {
    const productPromise = e
        .select(e.Product, () => ({
            id: true,
            name: true,
            price: true,
            isArchived: true,
            isFeatured: true,
            images: true,
            category: {
                id: true,
            },
            color: {
                id: true,
            },
            size: {
                id: true,
            },

            filter_single: { id: params.productId },
        }))
        .run(client);

    const sizesPromise = e
        .select(e.Size, (size) => ({
            id: true,
            name: true,
            filter: e.op(size.store.id, "=", e.uuid(params.storeId)),
            order_by: {
                expression: size.createdAt,
                direction: e.DESC,
            },
        }))
        .run(client);

    const categoriesPromise = e
        .select(e.Category, (category) => ({
            id: true,
            name: true,
            filter: e.op(category.store.id, "=", e.uuid(params.storeId)),
            order_by: {
                expression: category.createdAt,
                direction: e.DESC,
            },
        }))
        .run(client);

    const colorsPromise = e
        .select(e.Color, (color) => ({
            id: true,
            name: true,
            filter: e.op(color.store.id, "=", e.uuid(params.storeId)),
            order_by: {
                expression: color.createdAt,
                direction: e.DESC,
            },
        }))
        .run(client);

    // const imagesPromise = e
    //     .select(e.Image, (image) => ({
    //         // id: true,
    //         url: true,
    //         filter: e.op(image.product.id, "=", e.uuid(params.productId)),
    //         order_by: {
    //             expression: image.createdAt,
    //             direction: e.DESC,
    //         },
    //     }))
    //     .run(client);

    const results = await Promise.allSettled([
        productPromise,
        categoriesPromise,
        sizesPromise,
        colorsPromise,
        // imagesPromise,
    ]);

    const product = results[0].status === "fulfilled" ? results[0].value : null;
    const categories = results[1].status === "fulfilled" ? results[1].value : [];
    const sizes = results[2].status === "fulfilled" ? results[2].value : [];
    const colors = results[3].status === "fulfilled" ? results[3].value : [];
    // const images = results[4].status === "fulfilled" ? results[4].value : [];

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ProductForm
                    initialData={product}
                    categories={categories}
                    sizes={sizes}
                    colors={colors}
                    // images={images}
                />
            </div>
        </div>
    );
};

export default ProductPage;
