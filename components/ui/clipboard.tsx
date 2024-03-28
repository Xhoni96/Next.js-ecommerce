import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, Tooltip } from "@/components/ui";

export const Clipboard = ({ text }: { text: string }) => {
    const [copied, setCopied] = useState(false);

    const onCopy = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 900);
    };

    return (
        <Tooltip title="Copy to Clipboard">
            <Button variant="outline" size="sm" onClick={onCopy}>
                <Copy
                    className={cn("h-4 transition-transform duration-700", copied ? "scale-0 w-0" : "scale-100 w-4")}
                    onClick={onCopy}
                />
                <Check
                    onClick={onCopy}
                    className={cn("h-4 transition-transform duration-300", copied ? "scale-100 w-4" : "scale-0 w-0")}
                />
            </Button>
        </Tooltip>
    );
};
