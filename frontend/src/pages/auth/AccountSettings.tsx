import { useUser } from "@clerk/clerk-react";
import { MaxWidthWrapper } from "../../components/max-width-wrapper";
import { Button } from "../../components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";

function AccountSettings() {
    const { user } = useUser();

    return (
        <MaxWidthWrapper className="max-w-screen-xl py-10 space-y-6">
            <h1 className="font-bold text-2xl -tracking-tighter">
                Account Settings
            </h1>

            <Card className="border rounded-lg">
                <CardHeader className="border-b bg-secondary">
                    <CardTitle className="font-normal -tracking-tighter">
                        Display Name
                    </CardTitle>
                </CardHeader>
                <CardContent className="py-6 space-y-6">
                    <p className="text-sm -tracking-tighter">
                        To update your display name, please fill the form below
                    </p>
                    <div className="space-y-4">
                        <p className="text-sm font-semibold">Display Name</p>
                        <div className="flex items-center gap-4 w-2/4">
                            <Input
                                className=" text-sm -tracking-tighter"
                                defaultValue={user!.username!}
                            />
                            <Button>Save</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </MaxWidthWrapper>
    );
}

export default AccountSettings;
