import { twMerge } from "tailwind-merge";
import { Loader as LoadingIcon } from "lucide-react";

export const Loader = ({ className, size = 15 }: { className?: string; size?: number }) => {
  return <LoadingIcon size={size} className={twMerge("animate-spin", className)} />;
};
