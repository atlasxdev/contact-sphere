import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import SelectLocation from "./components/add-contact/select-location";
import { useForm } from "react-hook-form";
import { addContactSchema, AddContactSchemaType } from "@/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FormButton } from "@/components/form-button";
import { Country } from "react-phone-number-input";
import { useState } from "react";
import { PhoneValidateStatus } from "./components/add-contact/phone-validate-status";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxiosInstance } from "@/api/axiosInstance";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { toast } from "sonner";
import { useUser } from "@clerk/clerk-react";
import { AxiosError } from "axios";

export function AddContact({ label }: { label: string }) {
    const { user } = useUser();
    const queryClient = useQueryClient();
    const axiosInstance = useAxiosInstance();
    const form = useForm<AddContactSchemaType>({
        mode: "onChange",
        resolver: zodResolver(addContactSchema),
    });
    const { mutate, isPending } = useMutation({
        mutationFn: async (data: { userId: string } & AddContactSchemaType) => {
            return await axiosInstance.post<{ message: string }>("/contacts", {
                ...data,
            });
        },
        onSuccess({ data: { message } }) {
            console.log(message);
            setIsOpen(false);
            form.reset({
                address: ["", ""],
                email: "",
                name: "",
                notes: "",
                phoneNumber: "",
            });
            toast.success("Contact has been added!", {
                description: "Check it out on your dashboard.",
            });
        },
        onError(err: AxiosError) {
            console.log(err);
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

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [country, setCountry] = useState<Country>("PH");

    function submit(data: AddContactSchemaType) {
        mutate({ ...data, userId: user!.id });
    }

    return (
        <Sheet open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
            <SheetTrigger asChild>
                <Button>{label}</Button>
            </SheetTrigger>
            <SheetContent className="space-y-1 pr-2">
                <SheetHeader className="pr-4">
                    <SheetTitle>Add new contact</SheetTitle>
                    <SheetDescription>
                        Add a new contact by filling out the details below.
                        Click save when you're done.
                    </SheetDescription>
                </SheetHeader>
                <div className="h-2" />
                <ScrollArea className="h-[80vh]">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(submit)}
                            className="flex flex-col gap-4 py-4 pl-1.5 pr-4"
                        >
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Name{" "}
                                            <span className="text-red-600">
                                                *
                                            </span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Email{" "}
                                            <span className="text-red-600">
                                                *
                                            </span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="contactType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Contact type</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a contact type to display" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Personal">
                                                    Personal
                                                </SelectItem>
                                                <SelectItem value="Professional">
                                                    Professional
                                                </SelectItem>
                                                <SelectItem value="Organization">
                                                    Organization
                                                </SelectItem>
                                                <SelectItem value="Partner">
                                                    Partner
                                                </SelectItem>
                                                <SelectItem value="Other">
                                                    Other
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormDescription>
                                            You can manage contact types in your
                                            contacts settings.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="phoneNumber"
                                render={({ field }) => (
                                    <FormItem className="relative flex flex-col items-start">
                                        <FormLabel>
                                            Phone number{" "}
                                            <span className="text-red-600">
                                                *
                                            </span>
                                        </FormLabel>
                                        <FormControl className="w-full">
                                            <PhoneInput
                                                {...field}
                                                onCountryChange={(country) =>
                                                    setCountry(country!)
                                                }
                                                defaultCountry="PH"
                                                international
                                            />
                                        </FormControl>
                                        {form.getFieldState("phoneNumber")
                                            .isTouched && (
                                            <div className="w-max absolute -right-1 top-[11px]">
                                                <PhoneValidateStatus
                                                    setError={form.setError}
                                                    country={country}
                                                    phoneNumber={String(
                                                        form.getValues(
                                                            "phoneNumber"
                                                        )
                                                    )}
                                                />
                                            </div>
                                        )}

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="address"
                                render={() => (
                                    <FormItem>
                                        <FormLabel>Select Country</FormLabel>
                                        <FormControl>
                                            <SelectLocation
                                                setValue={form.setValue}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            If your country has states, it will
                                            be appear after selecting country
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="notes"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Notes</FormLabel>
                                        <FormControl>
                                            <Textarea {...field} />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <SheetClose asChild>
                                <FormButton
                                    isSubmitting={isPending}
                                    isValid={
                                        form.formState.isValid &&
                                        form.getFieldState("phoneNumber")
                                            .isTouched
                                    }
                                    label="Save"
                                    submittingLabel="Saving..."
                                />
                            </SheetClose>
                        </form>
                    </Form>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
}
