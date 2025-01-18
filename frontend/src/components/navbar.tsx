import {
    SignedIn,
    SignedOut,
    SignInButton,
    UserButton,
    useUser,
} from "@clerk/clerk-react";
import { UserResource } from "@clerk/types";
import { MaxWidthWrapper } from "./max-width-wrapper";
import { Button } from "./ui/button";
import {
    BellIcon,
    LayoutDashboardIcon,
    LogInIcon,
    SettingsIcon,
} from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { Link, NavLink } from "react-router";
import { cn } from "@/lib/utils";
import { dark } from "@clerk/themes";
import { useTheme } from "./theme-provider";

export function Navbar() {
    const { isSignedIn, user, isLoaded } = useUser();

    if (!isLoaded) {
        return null;
    }

    if (isSignedIn && user) {
        return <UserNavbar user={user} />;
    }

    return <PublicNavbar />;
}

function PublicNavbar() {
    return (
        <nav className="sticky top-0 z-20 backdrop-blur-md border-b">
            <MaxWidthWrapper>
                <div className="w-full flex items-center justify-between py-4">
                    <div className="flex items-center justify-center gap-2">
                        <img className="size-12" src="/contact_sphere.png" />
                        <h1 className="font-bold text-base dark:text-white text-black">
                            Contact<span className="text-primary">Sphere</span>
                        </h1>
                    </div>

                    <SignedOut>
                        <SignInButton
                            children={
                                <Button className="text-xs gap-2">
                                    Login <LogInIcon />
                                </Button>
                            }
                        />
                    </SignedOut>
                </div>
            </MaxWidthWrapper>
        </nav>
    );
}

function UserNavbar({ user }: { user: UserResource }) {
    const { theme } = useTheme();

    return (
        <nav className="sticky top-0 z-20 backdrop-blur-md border-b">
            <MaxWidthWrapper>
                <div className="w-full flex items-center justify-between py-4">
                    <div className="flex items-center justify-center gap-10">
                        <Link
                            to={"/dashboard"}
                            className="flex items-center justify-center gap-4"
                        >
                            <img className="size-8" src="/contact_sphere.png" />
                            <span className="text-sm">/</span>
                            <div className="flex items-center gap-2">
                                <img
                                    src={user.imageUrl}
                                    className="rounded-full size-7"
                                />
                                <p className="text-sm -tracking-tighter">
                                    {" "}
                                    {user.username}
                                </p>
                            </div>
                        </Link>
                        <div className="flex items-center justify-center gap-6">
                            <NavLink
                                to={"/dashboard"}
                                className={({
                                    isActive,
                                    isPending,
                                    isTransitioning,
                                }) =>
                                    cn(
                                        "relative flex items-center justify-center gap-2 dark:text-muted-foreground",
                                        {
                                            "opacity-70":
                                                isPending || isTransitioning,
                                            "[&_*]:text-primary [&_*]:dark:text-white  after:content-[''] after:absolute after:w-full after:h-1 after:bg-primary after:dark:bg-white after:-bottom-6 after:rounded-full":
                                                isActive,
                                        }
                                    )
                                }
                            >
                                <LayoutDashboardIcon className="size-5" />
                                <p className="text-sm -tracking-tighter">
                                    Dashboard
                                </p>
                            </NavLink>
                            <NavLink
                                to={"/account-settings"}
                                className={({
                                    isActive,
                                    isPending,
                                    isTransitioning,
                                }) =>
                                    cn(
                                        "relative flex items-center justify-center gap-2 dark:text-muted-foreground",
                                        {
                                            "opacity-70":
                                                isPending || isTransitioning,
                                            "[&_*]:text-primary [&_*]:dark:text-white  after:content-[''] after:absolute after:w-full after:h-1 after:bg-primary after:dark:bg-white after:-bottom-6 after:rounded-full":
                                                isActive,
                                        }
                                    )
                                }
                            >
                                <SettingsIcon className="size-5" />
                                <p className="text-sm -tracking-tighter">
                                    Account Settings
                                </p>
                            </NavLink>
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-4">
                        <Button variant={"ghost"} size="icon">
                            <BellIcon className="size-5" />
                        </Button>
                        <ModeToggle variant={"ghost"} />
                        <SignedIn>
                            <UserButton
                                appearance={{
                                    baseTheme:
                                        theme == "dark" ? dark : undefined,
                                }}
                            />
                        </SignedIn>
                    </div>
                </div>
            </MaxWidthWrapper>
        </nav>
    );
}
