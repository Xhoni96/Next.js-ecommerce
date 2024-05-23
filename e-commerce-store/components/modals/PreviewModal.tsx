import { useAtom } from "jotai";

import { Dialog, DialogContent } from "../ui/Dialog";
import { previewModalAtom } from "@/atoms/atoms";
import { Gallery } from "../Gallery";
import { ProductInfo } from "../ProductInfo";

export const PreviewModal = () => {
  const [product, setProduct] = useAtom(previewModalAtom);

  const onClose = (open: boolean) => {
    if (!open) {
      setProduct(null);
    }
  };

  if (!product) return null;

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="grid lg:max-w-[50%] grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
        <div className="sm:col-span-6 lg:col-span-6">
          <Gallery variant="preview" images={product.images} />
        </div>
        <div className="sm:col-span-6 lg:col-span-6">
          <ProductInfo product={product} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
