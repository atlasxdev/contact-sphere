import type { Context } from "hono";
import type { ClerkAPIError } from "@clerk/types";

export async function verifyToken(token: string, c: Context) {
    try {
        const clerkClient = c.get("clerk");
        const user = await clerkClient.users.getUser(token);
        console.log(user);
        return !!user;
    } catch (e) {
        const { longMessage } = e as ClerkAPIError;
        console.error(longMessage);
        return false;
    }
}
