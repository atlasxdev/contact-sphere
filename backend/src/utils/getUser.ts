import type { Context } from "hono";

export async function getUser(c: Context) {
    const token = c.req.header("Authorization")?.split(" ")[1];
    const clerkClient = c.get("clerk");
    const user = await clerkClient.users.getUser(token!);
    return user;
}
