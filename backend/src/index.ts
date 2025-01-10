import { prettyJSON } from "hono/pretty-json";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { serve } from "@hono/node-server";
import "dotenv/config";

const port = process.env.PORT as string;

const app = new Hono();

app.use(prettyJSON());

app.use(
    cors({
        origin: process.env.CLIENT_DEV_SERVER as string,
    })
);

app.post("/post", async (c) => {
    const token = c.req.header("Authorization");
    const { message } = await c.req.json<{ message: string }>();
    return c.json({ message, token });
});

app.get("/", (c) => {
    return c.text("Hello world!");
});

console.log(`Server is running on http://localhost:${port}`);

serve({
    fetch: app.fetch,
    port: Number(port),
});
