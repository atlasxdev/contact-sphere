import { updateUser } from "@/actions/auth/account-settings/updateUser";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/clerk-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usernameSchema, UsernameSchemaType } from "@/zod-schema";
import { tailspin } from "ldrs";
import { FormButton } from "@/components/form-button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

tailspin.register();

function UpdateUsername() {
    const { user } = useUser();
    const form = useForm<UsernameSchemaType>({
        defaultValues: {
            username: user!.username!,
        },
        mode: "onChange",
        resolver: zodResolver(usernameSchema),
    });

    async function submit({ username }: UsernameSchemaType) {
        await updateUser(user!, username);
    }

    return (
        <div className="w-full space-y-4">
            <p className="text-sm font-semibold">Display Name</p>
            <Form {...form}>
                <form
                    className="space-y-4"
                    onSubmit={form.handleSubmit(submit)}
                >
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Username{" "}
                                    <span className="text-red-600">*</span>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        className="w-2/4 text-sm -tracking-tighter"
                                    />
                                </FormControl>
                                <FormDescription>
                                    This is your public display name.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormButton
                        isSubmitting={form.formState.isSubmitting}
                        isValid={form.formState.isValid}
                        label="Save"
                        submittingLabel="Saving..."
                    />
                </form>
            </Form>
        </div>
    );
}

export default UpdateUsername;
