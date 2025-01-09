import { useAuth } from "@clerk/clerk-react";
import { ReactNode } from "react";
import { Navigate } from "react-router";
import Loader from "@/components/ui/loader";

function AuthGate({ children }: { children: ReactNode }) {
    const { isLoaded, isSignedIn } = useAuth();

    if (!isLoaded) {
        return <Loader />;
    }

    if (!isSignedIn) {
        return <Navigate to={"/"} replace />;
    }

    return <>{children}</>;
}

export default AuthGate;
