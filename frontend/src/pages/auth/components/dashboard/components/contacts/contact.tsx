import type { Contact, Contact_Type } from "@/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    BriefcaseBusinessIcon,
    Building2Icon,
    HandshakeIcon,
    MailIcon,
    MessageCircle,
    PhoneCallIcon,
    TagIcon,
    UserIcon,
} from "lucide-react";
import { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import ToggleFavorite from "./components/contact/toggle-favorite";
import ContactDropdown from "./components/contact/contact-dropdown";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

function Contact({
    id,
    name,
    contactType,
    isFavorite,
    email,
    phoneNumber,
}: Contact) {
    return (
        <Card className="dark:bg-black">
            <div className="p-4 flex justify-between items-center ">
                <Badge
                    className={cn(
                        "rounded-full text-[0.65rem] font-medium -tracking-tighter",
                        {
                            "bg-chart-1 hover:bg-chart-1/70":
                                contactType == "Personal",
                            "bg-chart-2 hover:bg-chart-2/70":
                                contactType == "Organization",
                            "bg-chart-3 hover:bg-chart-3/70":
                                contactType == "Professional",
                            "bg-chart-4 hover:bg-chart-4/70":
                                contactType == "Partner",
                            "bg-chart-5 hover:bg-chart-5/70":
                                contactType == "Other",
                        }
                    )}
                >
                    {contactType}
                </Badge>
                <div className="space-x-2">
                    <ToggleFavorite id={id} isFavorite={isFavorite} />
                    <ContactDropdown id={id} />
                </div>
            </div>
            <CardHeader className="pt-0 space-y-0 flex items-center gap-4">
                <div className={"rounded-full w-max p-6 border bg-secondary"}>
                    {getContactTypeIcon(contactType)}
                </div>

                <div className="space-y-1.5">
                    <CardTitle className="text-center -tracking-tighter text-lg">
                        {name}
                    </CardTitle>
                    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                        <span>{email}</span>{" "}
                        <Separator orientation="vertical" className="h-4" />{" "}
                        <span className="text-chart-1">{phoneNumber}</span>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="mt-4 space-y-4">
                <div className="flex items-center justify-center gap-4">
                    <Button size={"lg"} variant={"secondary"}>
                        <PhoneCallIcon />
                    </Button>
                    <Button size={"lg"} variant={"secondary"}>
                        <MessageCircle />
                    </Button>
                    <Button size={"lg"} variant={"secondary"}>
                        <MailIcon />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

function getContactTypeIcon(contactType: Contact_Type) {
    const types: Record<Contact_Type, ReactNode> = {
        Personal: <UserIcon className="size-5" />,
        Organization: <Building2Icon className="size-5" />,
        Professional: <BriefcaseBusinessIcon className="size-5" />,
        Partner: <HandshakeIcon className="size-5" />,
        Other: <TagIcon className="size-5" />,
    };

    return types[contactType];
}

export default Contact;
