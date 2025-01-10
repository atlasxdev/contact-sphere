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
    phoneNumber: z.string({ required_error: "Phone number is required" }),
    address: z.tuple([
        z.string({
            required_error: "Country is required",
        }),
        z.string(), // State name, optional
    ]),
    notes: z
        .string()
        .min(5, { message: "Notes must be at least 5 characters" })
        .nullable(),
});

export type UsernameSchemaType = z.infer<typeof usernameSchema>;
export type AddContactSchemaType = z.infer<typeof addContactSchema>;
