import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import noContacts from "../../../public/no_contacts.json";
import { useLottie } from "lottie-react";
import { AddContact } from "./components/dashboard/add-contact";

function Dashboard() {
    const { View, animationContainerRef } = useLottie({
        animationData: noContacts,
        loop: false,
    });

    return (
        <MaxWidthWrapper className="max-w-screen-xl py-10 space-y-6">
            <h1 className="font-bold text-2xl -tracking-tighter">Dashboard</h1>
            <div className="flex flex-col items-center justify-center gap-6 h-[640px] rounded-lg bg-secondary border">
                <p className="font-medium -tracking-tighter">
                    No contacts added yet!
                </p>
                <div ref={animationContainerRef} className="size-64">
                    {View}
                </div>
                <AddContact />
            </div>
        </MaxWidthWrapper>
    );
}

export default Dashboard;
