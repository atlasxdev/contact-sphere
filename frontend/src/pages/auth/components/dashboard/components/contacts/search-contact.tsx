import { useQueryState } from "nuqs";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import useSearch from "@/hooks/auth/contacts/use-search";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import NoSearchResults from "./components/no-search-results";
import { ScrollArea } from "@/components/ui/scroll-area";
import CompactContact from "./components/compat-contact";

function SearchContact() {
    const [search, setSearch] = useQueryState("search");
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const { searchResults, searchStatus } = useSearch(search);

    useEffect(() => {
        if (!search) {
            setSearch(null);
        }
    }, [search, setSearch]);

    return (
        <div
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-full relative flex items-center"
        >
            <SearchIcon className="absolute left-3.5 size-5" />
            <Input
                value={search || ""}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-11"
                placeholder="Search contacts"
            />

            {searchStatus != "idle" && (
                <Card
                    className={cn(
                        "z-20 absolute h-64 -bottom-[16.5rem] w-full bg-white/70 dark:bg-black/70 backdrop-blur-lg",
                        {
                            "animate-in fade-in-0 zoom-in-95 scale-100":
                                isFocused,
                            hidden: !isFocused,
                        }
                    )}
                >
                    <ScrollArea className="h-44">
                        <CardContent className="py-6">
                            {searchStatus == "loading" && <Loading />}
                            {searchStatus == "error" && <NoSearchResults />}
                            {searchStatus == "success" &&
                                searchResults.contacts.length > 0 && (
                                    <div className="space-y-4">
                                        <p className="text-sm -tracking-tighter text-muted-foreground">
                                            {searchResults.contacts.length}{" "}
                                            contacts found
                                        </p>
                                        {searchResults.contacts.map(
                                            (contact) => (
                                                <CompactContact {...contact} />
                                            )
                                        )}
                                    </div>
                                )}
                        </CardContent>
                    </ScrollArea>
                </Card>
            )}
        </div>
    );
}

function Loading() {
    return (
        <div className="w-max mx-auto py-12">
            <l-tailspin
                size="36"
                stroke="3"
                speed="0.5"
                color="white"
            ></l-tailspin>
        </div>
    );
}

export default SearchContact;
