import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UpdateUsername from "./components/account-settings/update-username";

function AccountSettings() {
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
                    <UpdateUsername />
                </CardContent>
            </Card>
        </MaxWidthWrapper>
    );
}

export default AccountSettings;
