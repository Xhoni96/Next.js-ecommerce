import { Container } from "@/components/ui/Container";
import { Billboard } from "@/components/Billboard";
import { getCategoryData } from "@/actions/getCategory";
import { NoResults } from "@/components/ui/NoResults";
import Filter from "./components/Filter";
import MobileFilters from "./components/MobileFilters";
import { ProductCard } from "@/components/ProductCard";

type Props = {
  params: {
    categoryId: string;
  };
  searchParams: {
    colorId: string;
    sizeId: string;
  };
};

export default async function Category({ params, searchParams }: Props) {
  const { category, sizes, colors, products } = await getCategoryData({
    categoryId: params.categoryId,
    productQuery: {
      sizeId: searchParams.sizeId,
      colorId: searchParams.colorId,
    },
  });

  if (!category || !sizes || !colors || !products) {
    return null;
  }

  return (
    <Container>
      <Billboard data={category.billboard} />

      <div className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
          <MobileFilters sizes={sizes} colors={colors} />
          <div className="hidden lg:block">
            <Filter valueKey="sizeId" name="Sizes" data={sizes} />
            <Filter valueKey="colorId" name="Colors" data={colors} />
          </div>
          <div className="mt-6 lg:col-span-4 lg:mt-0">
            {products.length === 0 && <NoResults />}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {products.map((item) => (
                <ProductCard key={item.id} data={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
