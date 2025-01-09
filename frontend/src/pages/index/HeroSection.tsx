import { MaxWidthWrapper } from "../../components/max-width-wrapper";
import { BackgroundLines } from "../../components/ui/background-lines";
import { Button } from "../../components/ui/button";
import { useLottie } from "lottie-react";
import lottieMation from "../../../public/lottiemation.json";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../../components/ui/card";
import { CircleCheckIcon, CircleXIcon } from "lucide-react";
import { SignUpButton } from "@clerk/clerk-react";

function HeroSection() {
    const { View, animationContainerRef } = useLottie({
        animationData: lottieMation,
        loop: true,
    });

    return (
        <>
            <MaxWidthWrapper>
                <div className="flex flex-col gap-10">
                    <BackgroundLines className="flex flex-col items-center justify-center space-y-4">
                        <h1 className="-tracking-tighter leading-tight mx-auto text-center max-w-4xl text-balance font-bold text-6xl">
                            Manage Your Personal Contacts in One Place
                        </h1>
                        <p className="-tracking-tighter mx-auto max-w-prose text-center text-lg text-balance text-muted-foreground">
                            Organize, track, and streamline every aspect of your
                            personal and professional contacts with{" "}
                            <span className="font-bold">ContactSphere</span>.
                        </p>
                        <SignUpButton
                            children={
                                <Button className="rounded-lg" size={"lg"}>
                                    Get started now
                                </Button>
                            }
                        />
                    </BackgroundLines>
                </div>
            </MaxWidthWrapper>
            <div className="space-y-8 bg-secondary pb-20 px-6 md:px-8">
                <MaxWidthWrapper>
                    <div className="w-full flex items-center">
                        <p className="text-4xl text-center leading-snug font-bold -tracking-tighter text-balance">
                            Struggling to stay connected and organized?
                        </p>
                        <div
                            ref={animationContainerRef}
                            className="aspect-[4/3]"
                        >
                            {View}
                        </div>
                    </div>
                    <div className="w-full grid grid-cols-2 gap-6">
                        <Card className="border-destructive backdrop-blur-md bg-destructive/10">
                            <CardHeader>
                                <CardTitle className="text-center text-2xl font-bold -tracking-tighter">
                                    Without ContactSphere
                                </CardTitle>
                                <CardDescription />
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <CircleXIcon className="fill-destructive stroke-white" />
                                    <p>
                                        Forget key follow-ups and lose
                                        meaningful connections
                                    </p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <CircleXIcon className="fill-destructive stroke-white" />

                                    <p>
                                        Struggle to locate contact details
                                        spread across apps and devices
                                    </p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <CircleXIcon className="fill-destructive stroke-white" />
                                    <p>
                                        Waste time managing contacts without an
                                        organized system
                                    </p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <CircleXIcon className="fill-destructive stroke-white" />
                                    <p>
                                        Miss important events or reminders tied
                                        to your relationships
                                    </p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <CircleXIcon className="fill-destructive stroke-white" />
                                    <p>
                                        Feel overwhelmed trying to keep track of
                                        your network
                                    </p>
                                </div>
                            </CardContent>
                            <CardFooter />
                        </Card>
                        <Card className=" border-green-400 backdrop-blur-md bg-green-400/10">
                            <CardHeader>
                                <CardTitle className="text-center text-2xl font-bold -tracking-tighter">
                                    With ContactSphere
                                </CardTitle>
                                <CardDescription />
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <CircleCheckIcon className="fill-green-400 stroke-white" />
                                    <p>
                                        Centralize all your contacts in one
                                        sleek, intuitive dashboard
                                    </p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <CircleCheckIcon className="fill-green-400 stroke-white" />

                                    <p>
                                        Set reminders to never miss a follow-up
                                        or important date
                                    </p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <CircleCheckIcon className="fill-green-400 stroke-white" />
                                    <p>
                                        Organize and tag contacts for easy
                                        access and categorization
                                    </p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <CircleCheckIcon className="fill-green-400 stroke-white" />
                                    <p>
                                        Track communication history to nurture
                                        stronger connections
                                    </p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <CircleCheckIcon className="fill-green-400 stroke-white" />
                                    <p>
                                        Simplify your contact management and
                                        stay effortlessly in touch
                                    </p>
                                </div>
                            </CardContent>
                            <CardFooter />
                        </Card>
                    </div>
                </MaxWidthWrapper>
            </div>
        </>
    );
}

export default HeroSection;
