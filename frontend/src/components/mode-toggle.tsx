import { Monitor, Moon, MoonIcon, Sun } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { useTheme } from "./theme-provider";
import { cn } from "../lib/utils";

export function ModeToggle({
    variant = "outline",
}: {
    variant?:
        | "outline"
        | "link"
        | "default"
        | "destructive"
        | "secondary"
        | "ghost"
        | null
        | undefined;
}) {
    const { setTheme, theme } = useTheme();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={variant} size="icon">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-[150px] space-y-1 rounded-lg"
                align="end"
            >
                <DropdownMenuItem
                    className={cn(
                        "flex justify-between items-center text-sm rounded-md font-light",
                        {
                            "bg-accent": theme == "light",
                        }
                    )}
                    onClick={() => setTheme("light")}
                >
                    Light
                    <Sun />
                </DropdownMenuItem>
                <DropdownMenuItem
                    className={cn(
                        "flex justify-between items-center text-sm rounded-md font-light",
                        {
                            "bg-accent": theme == "dark",
                        }
                    )}
                    onClick={() => setTheme("dark")}
                >
                    Dark
                    <MoonIcon />
                </DropdownMenuItem>
                <DropdownMenuItem
                    className={cn(
                        "flex justify-between items-center text-sm rounded-md font-light",
                        {
                            "bg-accent": theme == "system",
                        }
                    )}
                    onClick={() => setTheme("system")}
                >
                    System
                    <Monitor />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
