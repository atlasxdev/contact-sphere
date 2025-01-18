import { Toggle } from "@/components/ui/toggle";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxiosInstance } from "@/api/axiosInstance";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { Contact } from "@/schema";
import { StarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

function ToggleFavorite({
    id,
    isFavorite,
}: {
    id: number;
    isFavorite: boolean;
}) {
    const queryClient = useQueryClient();
    const axiosInstance = useAxiosInstance();
    const { mutate, isPending, variables, isError } = useMutation({
        mutationFn: async ({ isFavorite }: Pick<Contact, "isFavorite">) => {
            return await axiosInstance.patch<{ message: string }>(
                `/contacts/${id}`,
                { isFavorite }
            );
        },
        // eslint-disable-next-line no-empty-pattern
        onSuccess({}, { isFavorite }) {
            toast.dismiss();
            toast.success(
                `Contact has been ${
                    isFavorite ? "added" : "removed"
                } to favorites`
            );
        },
        onError(err: AxiosError) {
            const { message } = err.response!.data as { message: string };
            toast.error("Uh oh! " + message, {
                description: "Please try again.",
            });
        },
        onSettled() {
            queryClient.invalidateQueries({
                queryKey: ["contacts"],
            });
        },
    });

    function toggleFavoriteContact(pressed: boolean) {
        mutate({ isFavorite: pressed });
    }

    return (
        <Toggle
            onPressedChange={toggleFavoriteContact}
            size={"sm"}
            variant={"outline"}
            pressed={isError ? isFavorite : variables?.isFavorite ?? isFavorite}
        >
            <StarIcon
                className={cn("size-4", {
                    "opacity-70": isPending,
                    "fill-yellow-500 stroke-yellow-500": isError
                        ? isFavorite
                        : variables?.isFavorite ?? isFavorite,
                    "": isError ? !isFavorite : !variables?.isFavorite,
                })}
            />
        </Toggle>
    );
}

export default ToggleFavorite;
