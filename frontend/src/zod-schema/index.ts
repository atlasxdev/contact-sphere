import { z } from "zod";

export const usernameSchema = z.object({
    username: z.string().min(5, {
        message: "Username must be at least 5 characters",
    }),
});

export const addContactSchema = z.object({
    name: z.string().min(5, {
        message: "Username must be at least 5 characters",
    }),
    email: z.string().email(),
    phoneNumber: z.string().min(1, {
        message: "Phone number is required",
    }),
    address: z.tuple([z.string().optional(), z.string().optional()]),
    notes: z
        .string()
        .max(150, { message: "Notes must be less than 150 characters" })
        .optional(),
});

export type UsernameSchemaType = z.infer<typeof usernameSchema>;
export type AddContactSchemaType = z.infer<typeof addContactSchema>;
