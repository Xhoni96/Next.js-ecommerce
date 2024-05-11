import { cn } from "@/lib/utils";
import { MouseEventHandler } from "react";

type IconButtonProps = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  children: React.ReactElement;
};
export const IconButton = ({ onClick, className, children }: IconButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full flex items-center justify-center bg-white border shadow-md p-2 hover:scale-110 transition",
        className
      )}
    >
      {children}
    </button>
  );
};
