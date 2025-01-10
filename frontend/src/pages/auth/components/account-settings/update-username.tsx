import { updateUser } from "@/actions/auth/account-settings/updateUser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/clerk-react";
import { FormEvent, useState } from "react";

function UpdateUsername() {
    const { user } = useUser();
    const [username, setUsername] = useState<string>(user!.username!);

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        await updateUser(user!, username);
    }

    return (
        <div className="space-y-4">
            <p className="text-sm font-semibold">Display Name</p>
            <form
                onSubmit={handleSubmit}
                className="flex items-center gap-4 w-2/4"
            >
                <Input
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className=" text-sm -tracking-tighter"
                />
                <Button
                    disabled={
                        user!.username?.toLowerCase() == username.toLowerCase()
                    }
                >
                    Save
                </Button>
            </form>
        </div>
    );
}

export default UpdateUsername;
