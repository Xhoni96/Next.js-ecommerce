"use client";

import { Container } from "@/components/ui/Container";
import { useCart } from "@/lib/hooks/useCart";
import { CartItem } from "./components/CartItem";
import { Summary } from "./components/Summary";
import { Loader } from "@/components/ui/Loader";
import { useOrigin } from "@/lib/hooks/useOrigin";

const CartPage = () => {
  const cart = useCart();
  const origin = useOrigin();

  return (
    <Container>
      <div className="px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-black">Shopping Cart</h1>
        <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
          <div className="lg:col-span-7">
            {origin ? (
              <>
                {cart.total === 0 && <p className="text-neutral-500">No items added to cart.</p>}
                <ul>
                  {cart.products.map((item) => (
                    <CartItem key={item.id} product={item} />
                  ))}
                </ul>
              </>
            ) : (
              <Loader className="ml-auto mr-auto mt-10" size={35} />
            )}
          </div>
          <Summary />
        </div>
      </div>
    </Container>
  );
};

export default CartPage;
