import { useAxiosInstance } from "@/api/axiosInstance";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDeleteContactDialog } from "@/zustand/delete-contact-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function ConfirmDeleteContact() {
    const { contactId, setIsOpen, isOpen, setContactId } =
        useDeleteContactDialog((state) => state);
    const [textConfirmation, setTextConfirmation] = useState<string>("");
    const axiosInstance = useAxiosInstance();
    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: async () => {
            return await axiosInstance.delete<{ message: string }>(
                `/contacts/${contactId}`
            );
        },
        onSuccess({ data: { message } }) {
            setIsOpen(false);
            toast.success(message);
        },
        onError(err: AxiosError) {
            console.log(err);
            const { message } = err.response!.data as { message: string };
            toast.error("Uh oh! " + message, {
                description: "Please try again.",
            });
        },
        onSettled() {
            setContactId(undefined);
            queryClient.invalidateQueries({
                queryKey: ["contacts"],
            });
        },
    });

    useEffect(() => {
        return () => {
            setTextConfirmation("");
        };
    }, []);

    function removeContact() {
        if (textConfirmation != "Delete contact") {
            return toast.warning("Invalid confirmation message");
        }

        mutate();
    }

    return (
        <AlertDialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete Contact</AlertDialogTitle>
                    <AlertDialogDescription>
                        Please type{" "}
                        <span className="font-bold text-white">
                            Delete contact
                        </span>{" "}
                        to delete this contact. After deletion, it can not be
                        recovered.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <Input
                    value={textConfirmation}
                    onChange={(e) => setTextConfirmation(e.target.value)}
                    placeholder={`Type "Delete contact"`}
                />
                <AlertDialogFooter>
                    <AlertDialogCancel
                        onClick={() => {
                            setIsOpen(false);
                            setContactId(undefined);
                        }}
                        className={buttonVariants({
                            size: "lg",
                            variant: "outline",
                            className: "w-full",
                        })}
                    >
                        Cancel
                    </AlertDialogCancel>
                    <Button
                        disabled={
                            isPending || textConfirmation != "Delete contact"
                        }
                        onClick={() => removeContact()}
                        className="w-full"
                        size={"lg"}
                        variant={"destructive"}
                    >
                        {isPending ? (
                            <>
                                <l-tailspin
                                    size="15"
                                    stroke="2"
                                    speed="0.5"
                                    color="white"
                                ></l-tailspin>
                                Deleting...
                            </>
                        ) : (
                            "Delete"
                        )}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default ConfirmDeleteContact;
