import { twMerge } from "tailwind-merge";
import { RefreshCw, Loader as LoadingIcon } from "lucide-react";

export const Refresh = ({ className }: { className?: string }) => {
    return <RefreshCw size={15} className={twMerge("animate-spin", className)} />;
};

export const Loader = ({ className, size = 15 }: { className?: string; size?: number }) => {
    return <LoadingIcon size={size} className={twMerge("animate-spin", className)} />;
};
