import { getProductData } from "@/actions/getProduct";
import { Gallery } from "./components/Gallery";
import { Currency } from "@/components/ui/Currency";
import { Button } from "@/components/ui/Button";
import { ShoppingCart } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ProductList } from "../../(root)/components/ProductList";

type ProductType = {
  params: {
    productId: string;
  };
  searchParams: {
    categoryId: string;
  };
};

const ProductPage = async ({ searchParams, params }: ProductType) => {
  const categoryId = searchParams.categoryId;
  const productId = params.productId;
  const { relatedProducts, product } = await getProductData({ productId, categoryId });

  if (!product) return null;

  return (
    <Container className="p-8">
      <div className="flex mb-3 gap-5">
        <Gallery images={product.images} />

        <div className="flex flex-col basis-2/3 gap-y-3">
          <h1 className="font-bold text-gray-900 text-3xl">{product.name}</h1>
          <Currency value={product.price} />
          <hr />
          <div className="flex gap-2">
            <p className="font-semibold">Size: </p>
            <p>{product.size.value}</p>
          </div>
          <div className="flex gap-3 items-center">
            <p className="font-semibold">Color: </p>
            <div className="rounded-full w-5 h-5" style={{ backgroundColor: product.color.value }} />
          </div>

          <Button className="flex gap-2 items-center w-40 mt-4 rounded-full px-5 py-5 font-semibold">
            Add to Cart
            <ShoppingCart />
          </Button>
        </div>
      </div>
      <hr className="my-8" />

      {/* Related Products */}
      <ProductList title="Related Items" products={relatedProducts} />
    </Container>
  );
};

export default ProductPage;
