import noContacts from "@/assets/no_contacts.json";
import { useLottie } from "lottie-react";
import { AddContact } from "../../add-contact";

function NoContacts() {
    const { View, animationContainerRef } = useLottie({
        animationData: noContacts,
        loop: false,
    });

    return (
        <div className="flex flex-col items-center justify-center gap-6 h-[640px] rounded-lg bg-secondary border">
            <p className="font-medium -tracking-tighter">
                No contacts added yet!
            </p>
            <div ref={animationContainerRef} className="size-64">
                {View}
            </div>
            <AddContact />
        </div>
    );
}

export default NoContacts;
