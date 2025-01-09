import { Link } from "react-router";
import { MaxWidthWrapper } from "../components/max-width-wrapper";
import { buttonVariants } from "../components/ui/button";

function NotFound() {
    return (
        <div className="flex h-screen">
            <MaxWidthWrapper className="w-full flex-1 flex items-center justify-center h-full">
                <div className="flex flex-col items-center justify-center gap-4 bg-black h-3/4 w-3/4 border-2 border-dashed">
                    <h1 className="font-bold text-6xl">404</h1>
                    <p className="-tracking-tighter">Oops...page not found!</p>
                    <div className="w-40">
                        <Link
                            to={"/"}
                            className={buttonVariants({
                                className: "text-xs w-full",
                                variant: "secondary",
                            })}
                        >
                            Go back
                        </Link>
                    </div>
                </div>
            </MaxWidthWrapper>
        </div>
    );
}

export default NotFound;
