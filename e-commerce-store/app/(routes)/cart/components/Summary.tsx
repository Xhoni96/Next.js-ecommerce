"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/Button";
import { Currency } from "@/components/ui/Currency";
import { useCart } from "@/lib/hooks/useCart";
import { useOrigin } from "@/lib/hooks/useOrigin";
import { Loader } from "@/components/ui/Loader";

export const Summary = () => {
  const searchParams = useSearchParams();
  const cart = useCart();
  const origin = useOrigin();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Payment completed.");
      cart.removeAll();
    }

    if (searchParams.get("canceled")) {
      toast.error("Something went wrong.");
    }
  }, []);

  const totalPrice = cart.products.reduce((total, item) => {
    return total + Number(item.price);
  }, 0);

  const onCheckout = async () => {
    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ productIds: cart.products.map((item) => item.id) }),
      });
      const res = await response.json();

      window.location = res.url;
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Order total</div>
          {origin ? <Currency value={totalPrice} /> : <Loader size={20} className="mr-6" />}
        </div>
      </div>
      <Button disabled={cart.total === 0 || loading} onClick={onCheckout} className="w-full mt-6">
        {loading ? <Loader className="mr-2" /> : null} Checkout
      </Button>
    </div>
  );
};
