import { createErrorResponse } from "@/utils/error.js";
import type { Context } from "hono";

export function errorMiddlewareHandler(err: Error, c: Context) {
    const { error, statusCode } = createErrorResponse(err);
    console.log("hello");
    console.log(err);
    console.log(error);
    return c.json(error, { status: statusCode });
}
