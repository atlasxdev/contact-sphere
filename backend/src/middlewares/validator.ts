import { z, ZodType } from "zod";
import { zValidator } from "@hono/zod-validator";
import type { ValidationTargets } from "hono";
import { ZodErrorResponse } from "@/utils/error.js";
import { StatusCodes } from "http-status-codes";

export const insertContactSchema = z.object({
    id: z.number().optional(),
    email: z.string().email(),
    name: z.string(),
    phoneNumber: z.string(),
    address: z.tuple([z.string().optional(), z.string().optional()]),
    notes: z.string().optional(),
    userId: z.string(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
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
