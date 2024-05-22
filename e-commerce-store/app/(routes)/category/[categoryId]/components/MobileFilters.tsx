"use client";

import { Button } from "@/components/ui/Button";
import { Color, Size } from "@/lib/types";
import { Plus, X } from "lucide-react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTrigger } from "@/components/ui/Drawer";
import Filter from "./Filter";

interface MobileFiltersProps {
  sizes: Size[];
  colors: Color[];
}

const MobileFilters = ({ sizes, colors }: MobileFiltersProps) => {
  return (
    <Drawer preventScrollRestoration={false}>
      <DrawerTrigger asChild>
        <Button className="flex items-center gap-x-2 lg:hidden">
          Filters
          <Plus size={20} />
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader className="flex items-center justify-end px-4">
            <DrawerTrigger asChild>
              <Button variant="icon" size="icon">
                <X size={15} />
              </Button>
            </DrawerTrigger>
          </DrawerHeader>

          <div className="p-4">
            <Filter valueKey="sizeId" name="Sizes" data={sizes} />
            <Filter valueKey="colorId" name="Colors" data={colors} />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileFilters;
