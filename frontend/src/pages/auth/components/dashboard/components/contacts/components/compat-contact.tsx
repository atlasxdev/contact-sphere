import type { Contact_Type, Contact as ContactType } from "@/schema";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
    BriefcaseBusinessIcon,
    Building2Icon,
    HandshakeIcon,
    TagIcon,
    UserIcon,
} from "lucide-react";
import { ReactNode } from "react";
import ToggleFavorite from "./contact/toggle-favorite";
import ContactDropdown from "./contact/contact-dropdown";
import { cn } from "@/lib/utils";
function CompactContact({
    id,
    name,
    contactType,
    isFavorite,
    email,
    phoneNumber,
}: ContactType) {
    return (
        <div className="flex items-center justify-between py-6 px-4 border rounded-lg shadow-sm bg-secondary">
            <div className="flex items-center gap-3">
                <div className="rounded-full p-2 bg-muted flex items-center justify-center">
                    {getContactTypeIcon(contactType)}
                </div>

                <div>
                    <div className="font-semibold text-sm">{name}</div>
                    <div className="flex items-center text-xs text-muted-foreground">
                        {email && <span>{email}</span>}
                        {email && phoneNumber && (
                            <Separator
                                orientation="vertical"
                                className="h-3 mx-2"
                            />
                        )}
                        {phoneNumber && (
                            <span className="text-chart-1">{phoneNumber}</span>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2">
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
                <ToggleFavorite id={id} isFavorite={isFavorite} />
                <ContactDropdown id={id} />
            </div>
        </div>
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

export default CompactContact;
