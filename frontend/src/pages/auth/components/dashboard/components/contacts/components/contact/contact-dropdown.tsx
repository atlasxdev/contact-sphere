import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
    EllipsisVerticalIcon,
    FilePenIcon,
    Share2Icon,
    Trash2Icon,
} from "lucide-react";
import { useDeleteContactDialog } from "@/zustand/delete-contact-dialog";
function ContactDropdown({ id }: { id: number }) {
    const { setIsOpen, setContactId } = useDeleteContactDialog(
        (state) => state
    );

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"ghost"} size="sm">
                    <EllipsisVerticalIcon className="size-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem className="cursor-pointer">
                    <FilePenIcon className="size-4 mr-1.5" />
                    Edit
                </DropdownMenuItem>
                <DropdownMenuItem className="text-blue-600 cursor-pointer">
                    <Share2Icon className="size-4 mr-1.5" />
                    Share contact
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={() => {
                        setContactId(id);
                        setIsOpen(true);
                    }}
                    className="cursor-pointer text-destructive"
                >
                    <Trash2Icon className="size-4 mr-2" />
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default ContactDropdown;
