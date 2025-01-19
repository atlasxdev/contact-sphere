import { useLottie } from "lottie-react";
import noContacts from "@/assets/no_contacts.json";
function NoSearchResults() {
    const { View, animationContainerRef } = useLottie({
        animationData: noContacts,
        loop: false,
    });
    return (
        <div className="flex flex-col items-center justify-center gap-4 w-max mx-auto -tracking-tighter text-sm text-muted-foreground">
            <div className="size-28" ref={animationContainerRef}>
                {View}
            </div>
            <span className="text-muted-foreground font-medium">
                No results
            </span>
        </div>
    );
}

export default NoSearchResults;
