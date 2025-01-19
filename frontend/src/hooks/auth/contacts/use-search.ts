import { useAxiosInstance } from "@/api/axiosInstance";
import { Contacts } from "@/schema";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

type SearchStatus = "idle" | "loading" | "success" | "error";

function useSearch(search: string | null) {
    const axiosInstance = useAxiosInstance();
    const queryClient = useQueryClient();
    const [searchStatus, setSearchStatus] = useState<SearchStatus>("idle");
    const [searchResults, setSearchResults] = useState<Contacts>({
        contacts: [],
    });

    useEffect(() => {
        if (search == null) {
            setSearchStatus("idle");
            setSearchResults({
                contacts: [],
            });
            return;
        }

        const handler = setTimeout(async () => {
            try {
                setSearchStatus("loading");
                const { data } = await queryClient.fetchQuery({
                    queryKey: ["search", search],
                    queryFn: async () => {
                        return await axiosInstance.get<Contacts>(
                            `/contacts/find/${search}`
                        );
                    },
                });
                setSearchStatus("success");
                setSearchResults(data);
            } catch (error) {
                setSearchStatus("error");
                console.error(error);
            }
        }, 1000);

        return () => clearTimeout(handler);
    }, [axiosInstance, queryClient, search]);

    return { searchResults, searchStatus };
}

export default useSearch;
