"use client";

import { cn } from "@/lib/utils";
import type { Category } from "@/lib/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

type MainNavProps = {
  data: Array<Category>;
};

export const MainNav = ({ data }: MainNavProps) => {
  const pathname = usePathname();

  const routes = data.map((route) => ({
    href: `/category/${route.id}`,
    label: route.name,
    active: pathname === `/category/${route.id}`,
  }));

  return (
    <nav className="mx-6 flex items-center space-x-4 lg:space-x-6">
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={`
            text-sm font-medium transition-colors hover:text-black ${
              route.active ? "text-black" : "text-neutral-500"
            }`}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
};
