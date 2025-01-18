import { create } from "zustand";

type DialogState = {
    isOpen: boolean;
    contactId?: number;
    setIsOpen: (open: boolean) => void;
    setContactId: (id?: number) => void;
};

export const useDeleteContactDialog = create<DialogState>((set) => ({
    isOpen: false,
    contactId: undefined,
    setIsOpen: (open) => set({ isOpen: open }),
    setContactId: (id) => set({ contactId: id }),
}));
