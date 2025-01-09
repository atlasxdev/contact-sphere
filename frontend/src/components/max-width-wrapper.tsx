import { ReactNode } from "react";
import { cn } from "../lib/utils";

type Props = {
    children: ReactNode;
    className?: string;
};

export function MaxWidthWrapper({ children, className }: Props) {
    return (
        <div className={cn("max-w-screen-2xl mx-auto px-6 md:px-8", className)}>
            {children}
        </div>
    );
}
