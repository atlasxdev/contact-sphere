import { createErrorResponse } from "@/utils/error.js";
import type { Context } from "hono";

export function errorMiddlewareHandler(err: Error, c: Context) {
    const { error, statusCode } = createErrorResponse(err);
    return c.json(error, { status: statusCode });
}
