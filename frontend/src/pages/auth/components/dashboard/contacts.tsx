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

type ContactCategories =
    | "all"
    | "personal"
    | "professional"
    | "organization"
    | "partner"
    | "other";

function Contacts() {
    const axiosInstance = useAxiosInstance();
    const queryClient = useQueryClient();
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
    }, [category, queryClient]);

    if (isLoading) {
        return <Loader />;
    }

    if (!data?.pages.flatMap((page) => page.data.contacts).length) {
        return <NoContacts />;
    }

    return (
        <div className="space-y-6">
            <div className="flex gap-4">
                <div className="relative flex items-center w-full">
                    <SearchIcon className="absolute left-3.5 size-5" />
                    <Input className="pl-11" placeholder="Search contacts" />
                </div>
                <AddContact />
            </div>
            <div className="flex items-center gap-4">
                <Button
                    onClick={() => setCategory("all")}
                    variant={"secondary"}
                    size={"sm"}
                >
                    All
                </Button>
                <Button
                    onClick={() => setCategory("personal")}
                    className="opacity-70"
                    variant={"outline"}
                    size={"sm"}
                >
                    Personal
                </Button>
                <Button
                    onClick={() => setCategory("professional")}
                    className="opacity-70"
                    variant={"outline"}
                    size={"sm"}
                >
                    Professional
                </Button>
                <Button
                    onClick={() => setCategory("organization")}
                    className="opacity-70"
                    variant={"outline"}
                    size={"sm"}
                >
                    Organization
                </Button>
                <Button
                    onClick={() => setCategory("partner")}
                    className="opacity-70"
                    variant={"outline"}
                    size={"sm"}
                >
                    Partner
                </Button>
                <Button
                    onClick={() => setCategory("other")}
                    className="opacity-70"
                    variant={"outline"}
                    size={"sm"}
                >
                    Other
                </Button>
            </div>
            <div className="grid grid-cols-3 gap-4">
                <AnimatePresence>
                    {data.pages.flatMap((page) =>
                        page.data.contacts.map((props) => (
                            <Contact key={props.id} {...props} />
                        ))
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default Contacts;
