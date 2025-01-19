import "dotenv/config";
import { prettyJSON } from "hono/pretty-json";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { serve } from "@hono/node-server";
import { bearerAuth } from "hono/bearer-auth";
import { clerkMiddleware } from "@hono/clerk-auth";
import contact from "@/routes/contact.js";
import { verifyToken } from "@/utils/verifyToken.js";
import { errorMiddlewareHandler } from "./middlewares/error-handler.js";
import { logger } from "hono/logger";
import { UnauthorizedError } from "./utils/error.js";
import { StatusCodes } from "http-status-codes";
import { db } from "./services/db.js";
import { usersTable } from "./schema.js";

const port = process.env.PORT as string;
const clerkSignature = process.env.CLERK_SIGNATURE as string;
const clerkSecretKey = process.env.CLERK_SECRET_KEY as string;
const clerkPublishableKey = process.env.CLERK_PUBLISHABLE_KEY as string;

const app = new Hono();

app.onError(errorMiddlewareHandler);
app.use(logger());
app.use(prettyJSON());
app.use(
    cors({
        origin: process.env.CLIENT_DEV_SERVER as string,
    })
);
app.use(
    "/api/*",
    clerkMiddleware({
        secretKey: clerkSecretKey,
        publishableKey: clerkPublishableKey,
    })
);
app.use(
    "/api/*",
    bearerAuth({
        verifyToken: async (token, c) => {
            const isAuthorized = await verifyToken(token, c);
            return isAuthorized;
        },
    })
);

app.route("/api", contact);

app.get("/", (c) => {
    return c.text("Hello world!");
});

app.post("/webhooks/user-signup", async (c) => {
    const signature = c.req.header("clerk-signature");
    if (signature == null || signature != clerkSignature) {
        throw new UnauthorizedError("Invalid signature!");
    }
    const {
        data: { id, username, email_addresses },
    } = await c.req.json();
    await db.insert(usersTable).values({
        userId: id,
        username,
        email: email_addresses[0].email_address,
    });
    c.status(StatusCodes.CREATED);
    return c.json({ message: "User has been created." });
});

console.log(`Server is running on http://localhost:${port}`);

serve({
    fetch: app.fetch,
    port: Number(port),
});
