import { AddContact } from "./add-contact";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useAxiosInstance } from "@/api/axiosInstance";
import type { Contacts } from "@/schema";
import Contact from "./components/contacts/contact";
import Loader from "./components/contacts/loader";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import NoContacts from "./components/contacts/no-contacts";
import { AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type ContactCategories =
    | "all"
    | "personal"
    | "professional"
    | "organization"
    | "partner"
    | "other";

function Contacts() {
    console.log("Hello");

    return (
        <div className="space-y-6">
            <div className="flex gap-4">
                <div className="relative flex items-center w-full">
                    <SearchIcon className="absolute left-3.5 size-5" />
                    <Input className="pl-11" placeholder="Search contacts" />
                </div>
                <AddContact label="New contact" />
            </div>
            <Content />
        </div>
    );
}

function Content() {
    const queryClient = useQueryClient();
    const axiosInstance = useAxiosInstance();
    const [category, setCategory] = useState<ContactCategories>("all");

    const { data, isLoading } = useInfiniteQuery({
        queryKey: ["contacts", category],
        queryFn: async ({ pageParam }) => {
            return await axiosInstance.get<Contacts>(
                `/contacts/${category}?page=${pageParam}`
            );
        },
        initialPageParam: 1,
        getNextPageParam: (_, pages) => pages.length + 1,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        queryClient.invalidateQueries({
            queryKey: ["contacts", category],
        });

        return () => {
            queryClient.cancelQueries({
                queryKey: ["contacts", category],
            });
        };
    }, [category, queryClient]);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <>
            <div className="flex items-center gap-4">
                <Button
                    onClick={() => setCategory("all")}
                    variant={category == "all" ? "secondary" : "outline"}
                    className={cn(
                        category == "all" ? "opacity-100" : "opacity-60"
                    )}
                    size={"sm"}
                >
                    All
                </Button>
                <Button
                    onClick={() => setCategory("personal")}
                    className={cn(
                        category == "personal" ? "opacity-100" : "opacity-60"
                    )}
                    variant={category == "personal" ? "secondary" : "outline"}
                    size={"sm"}
                >
                    Personal
                </Button>
                <Button
                    onClick={() => setCategory("professional")}
                    className={cn(
                        category == "professional"
                            ? "opacity-100"
                            : "opacity-60"
                    )}
                    variant={
                        category == "professional" ? "secondary" : "outline"
                    }
                    size={"sm"}
                >
                    Professional
                </Button>
                <Button
                    onClick={() => setCategory("organization")}
                    className={cn(
                        category == "organization"
                            ? "opacity-100"
                            : "opacity-60"
                    )}
                    variant={
                        category == "organization" ? "secondary" : "outline"
                    }
                    size={"sm"}
                >
                    Organization
                </Button>
                <Button
                    onClick={() => setCategory("partner")}
                    className={cn(
                        category == "partner" ? "opacity-100" : "opacity-60"
                    )}
                    variant={category == "partner" ? "secondary" : "outline"}
                    size={"sm"}
                >
                    Partner
                </Button>
                <Button
                    onClick={() => setCategory("other")}
                    className={cn(
                        category == "other" ? "opacity-100" : "opacity-60"
                    )}
                    variant={category == "other" ? "secondary" : "outline"}
                    size={"sm"}
                >
                    Other
                </Button>
            </div>
            {!data?.pages.flatMap((page) => page.data.contacts).length && (
                <NoContacts />
            )}
            {!!data?.pages.flatMap((page) => page.data.contacts).length && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <AnimatePresence>
                        {data.pages.flatMap((page) =>
                            page.data.contacts.map((props) => (
                                <Contact key={props.id} {...props} />
                            ))
                        )}
                    </AnimatePresence>
                </div>
            )}
        </>
    );
}

export default Contacts;
