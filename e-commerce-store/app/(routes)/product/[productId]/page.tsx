import { getProductData } from "@/actions/getProduct";
import { Gallery } from "@/components/Gallery";
import { Container } from "@/components/ui/Container";
import { ProductList } from "../../(root)/components/ProductList";
import { ProductInfo } from "@/components/ProductInfo";

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
      <div className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
          <Gallery images={product.images} />
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <ProductInfo product={product} />
          </div>
        </div>
        <hr className="my-10" />
        <ProductList title="Related products" products={relatedProducts} />
      </div>
    </Container>
  );
};

export default ProductPage;
