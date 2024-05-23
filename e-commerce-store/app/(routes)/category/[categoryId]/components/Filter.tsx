"use client";

import { MouseEvent, useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Color, Size } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface FilterProps {
  data: (Size | Color)[];
  name: string;
  valueKey: string;
}

const Filter: React.FC<FilterProps> = ({ data, name, valueKey }) => {
  const searchParams = useSearchParams();

  const router = useRouter();
  const pathname = usePathname();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      const paramsObj = Object.fromEntries(params);

      if (paramsObj[name] === value) {
        params.delete(name);
      } else {
        params.set(name, value);
      }

      return params.toString();
    },
    [searchParams]
  );

  const selectedValue = searchParams.get(valueKey);

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    router.push(`${pathname}?${createQueryString(valueKey, e.currentTarget.value)}`, {
      scroll: false,
    });
    // router.refresh();
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold">{name}</h3>
      <hr className="my-4" />
      <div className="flex flex-wrap gap-2">
        {data.map((filter) => (
          <div key={filter.id} className="flex items-center">
            <Button
              className={cn(
                "rounded-md text-sm text-gray-800 p-2 bg-white border border-gray-300 hover:opacity-70 hover:bg-white",
                selectedValue === filter.id && "bg-black text-white hover:bg-black"
              )}
              value={filter.id}
              onClick={onClick}
            >
              {filter.name}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
