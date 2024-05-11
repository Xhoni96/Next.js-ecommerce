import { Container } from "@/components/ui/Container";
import { Billboard } from "./components/Billboard";
import { ProductList } from "./components/ProductList";
import { getRootData } from "@/actions/getRootData";

export const revalidate = 0;

export default async function Home() {
  const { billboard, products } = await getRootData();

  return (
    <Container>
      <div className="space-y-10 pb-10">{billboard ? <Billboard data={billboard} /> : null}</div>
      <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
        <ProductList title="Featured Products" products={products} />
      </div>
    </Container>
  );
}
