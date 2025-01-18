import { z, ZodType } from "zod";
import { zValidator } from "@hono/zod-validator";
import type { ValidationTargets } from "hono";
import { ZodErrorResponse } from "@/utils/error.js";

const CONTACT_TYPE = [
    "Personal",
    "Professional",
    "Organization",
    "Partner",
    "Other",
] as const;

export const insertContactSchema = z.object({
    id: z.number().optional(),
    email: z.string().email(),
    name: z.string(),
    phoneNumber: z.string(),
    address: z.tuple([z.string().optional(), z.string().optional()]),
    contactType: z.enum(CONTACT_TYPE, {}),
    notes: z.string().optional(),
    userId: z.string(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});

export const updateContactSchema = z.object({
    email: z.string().email().optional(),
    name: z.string().optional(),
    phoneNumber: z.string().optional(),
    isFavorite: z.boolean().optional(),
    address: z.tuple([z.string().optional(), z.string().optional()]).optional(),
    contactType: z.enum(CONTACT_TYPE, {}).optional(),
    notes: z.string().optional(),
});

export function validateBody<T>(
    validatorName: keyof ValidationTargets,
    schema: ZodType<T>
) {
    return zValidator(validatorName, schema, (result, c) => {
        if (!result.success) {
            throw new ZodErrorResponse(result.error);
        }
    });
}
