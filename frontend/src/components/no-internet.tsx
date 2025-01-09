import { WifiOffIcon } from "lucide-react";

function NoInternet() {
    return (
        <div className="h-screen flex flex-col gap-4 items-center justify-center">
            <WifiOffIcon className="size-16 animate-bounce" />
            <h1 className="font-medium -tracking-tighter text-lg">
                No Internet connection
            </h1>
            <p className="text-sm -tracking-tighter">
                Please check your internet connection and try again.
            </p>
            <p className="text-muted-foreground -tracking-tighter text-sm">
                We'll be right here when you're back online! 😊
            </p>
        </div>
    );
}

export default NoInternet;
