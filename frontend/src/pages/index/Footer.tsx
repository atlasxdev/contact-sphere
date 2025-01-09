import { MaxWidthWrapper } from "../../components/max-width-wrapper";
import { ModeToggle } from "../../components/mode-toggle";

function Footer() {
    return (
        <footer className="border-t py-14">
            <MaxWidthWrapper className="max-w-screen-xl space-y-14">
                <div className="flex justify-between flex-wrap">
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-2">
                            <img
                                src="/contact_sphere.png"
                                className="size-12"
                            />
                            <p className="font-bold text-base dark:text-white text-black">
                                Contact
                                <span className="text-primary">Sphere</span>
                            </p>
                        </div>
                        <p className="text-muted-foreground  leading-snug text-xs -tracking-tighter max-w-prose text-balance">
                            Effortlessly organize and manage all your personal
                            and professional contacts in one place.
                        </p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <p className="text-sm font-medium">Product</p>
                        <p className="font-light text-sm text-muted-foreground">
                            Changelog
                        </p>
                        <p className="font-light text-sm text-muted-foreground">
                            Roadmap
                        </p>
                        <p className="font-light text-sm text-muted-foreground">
                            Contact us
                        </p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <p className="text-sm font-medium">Legal</p>
                        <p className="font-light text-sm text-muted-foreground">
                            Terms of services
                        </p>
                        <p className="font-light text-sm text-muted-foreground">
                            Privacy policy
                        </p>
                    </div>
                </div>
                <div className="w-full border-t" />
                <div className="flex justify-between items-center">
                    <p className="text-xs text-muted-foreground">
                        Copyright @ {new Date().getFullYear()} ContactSphere.
                        All rights reserved.
                    </p>
                    <ModeToggle />
                </div>
            </MaxWidthWrapper>
        </footer>
    );
}

export default Footer;
