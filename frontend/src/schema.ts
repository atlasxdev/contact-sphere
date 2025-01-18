export type Contacts = {
    contacts: Contact[];
};

export type Contact_Type =
    | "Personal"
    | "Professional"
    | "Organization"
    | "Partner"
    | "Other";

export type Contact = {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    address: Address | null;
    contactType: Contact_Type;
    notes: string | null;
    isFavorite: boolean;
    createdAt: Date;
    updatedAt: Date;
};

type Address = [string?, string?];
