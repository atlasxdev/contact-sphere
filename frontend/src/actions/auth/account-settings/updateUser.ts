import { UserResource, ClerkAPIError } from "@clerk/types";
import { toast } from "sonner";

export async function updateUser(user: UserResource, username: string) {
    try {
        await user.update({
            username,
        });
        await user.reload();
        toast.success("Username updated successfully!");
    } catch (error) {
        toast.error((error as ClerkAPIError).message);
    }
}
