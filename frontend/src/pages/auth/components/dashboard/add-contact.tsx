import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PhoneInput } from "@/components/ui/phone-input";

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import SelectLocation from "./components/add-contact/select-location";
import { useForm } from "react-hook-form";
import { addContactSchema, AddContactSchemaType } from "@/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@/components/error-message";
import { ScrollArea } from "@/components/ui/scroll-area";

export function AddContact() {
    const {
        setValue,
        register,
        handleSubmit,
        getValues,
        reset,
        formState: { isValid, errors },
    } = useForm<AddContactSchemaType>({
        mode: "onChange",
        resolver: zodResolver(addContactSchema),
        defaultValues: {
            address: ["", ""],
            email: "",
            name: "",
            notes: "",
            phoneNumber: "",
        },
    });

    function submit(data: AddContactSchemaType) {
        console.log(data);
        reset();
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button>Create a new contact</Button>
            </SheetTrigger>
            <SheetContent className="pr-2">
                <SheetHeader className="pr-4">
                    <SheetTitle>Add new contact</SheetTitle>
                    <SheetDescription className="text-xs">
                        Add a new contact by filling out the details below.
                        Click save when you're done.
                    </SheetDescription>
                </SheetHeader>
                <div className="h-2" />
                <ScrollArea className="h-[80vh]">
                    <form
                        onSubmit={handleSubmit(submit)}
                        className="flex flex-col gap-4 py-4 pr-4"
                    >
                        <div className="flex flex-col gap-4">
                            <Label htmlFor="name">
                                Name <span className="text-red-600">*</span>
                            </Label>
                            <Input {...register("name")} />
                            {errors.name && (
                                <ErrorMessage message={errors.name.message} />
                            )}
                        </div>
                        <div className="flex flex-col gap-4">
                            <Label htmlFor="name">
                                Email <span className="text-red-600">*</span>
                            </Label>
                            <Input {...register("email")} />
                            {errors.email && (
                                <ErrorMessage message={errors.email.message} />
                            )}
                        </div>
                        <div className="flex flex-col gap-4">
                            <Label>
                                Phone number{" "}
                                <span className="text-red-600">*</span>
                            </Label>
                            <PhoneInput
                                value={getValues("phoneNumber")}
                                onChange={(e) => setValue("phoneNumber", e)}
                                international
                            />
                            {errors.phoneNumber && (
                                <ErrorMessage
                                    message={errors.phoneNumber.message}
                                />
                            )}
                        </div>
                        <div className="flex flex-col gap-4">
                            <Label>Address</Label>
                            <SelectLocation setValue={setValue} />
                            {errors.address && (
                                <ErrorMessage
                                    message={errors.address.message}
                                />
                            )}
                        </div>
                        <div className="flex flex-col gap-4">
                            <Label>Notes</Label>
                            <Textarea {...register("notes")} />
                            {errors.notes && (
                                <ErrorMessage message={errors.notes.message} />
                            )}
                        </div>
                        <SheetFooter>
                            <SheetClose asChild>
                                <Button
                                    type="submit"
                                    disabled={!isValid}
                                    size={"sm"}
                                >
                                    Save changes
                                </Button>
                            </SheetClose>
                        </SheetFooter>
                    </form>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
}
