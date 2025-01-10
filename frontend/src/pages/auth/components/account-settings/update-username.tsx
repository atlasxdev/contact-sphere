import { updateUser } from "@/actions/auth/account-settings/updateUser";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/clerk-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usernameSchema, UsernameSchemaType } from "@/zod-schema";
import { ErrorMessage } from "@/components/error-message";
import { tailspin } from "ldrs";
import { FormButton } from "@/components/form-button";

tailspin.register();

function UpdateUsername() {
    const { user } = useUser();
    const {
        handleSubmit,
        register,
        formState: { isValid, errors, isSubmitting },
    } = useForm<UsernameSchemaType>({
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
        <div className="space-y-4">
            <p className="text-sm font-semibold">Display Name</p>
            <form
                onSubmit={handleSubmit(submit)}
                className="flex items-center gap-4 w-2/4"
            >
                <Input
                    required
                    {...register("username")}
                    className=" text-sm -tracking-tighter"
                />
                <FormButton
                    isSubmitting={isSubmitting}
                    isValid={isValid}
                    label="Save"
                    submittingLabel="Saving..."
                />
            </form>
            {errors.username && (
                <ErrorMessage message={errors.username.message} />
            )}
        </div>
    );
}

export default UpdateUsername;
