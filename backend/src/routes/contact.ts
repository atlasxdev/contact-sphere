import { Hono } from "hono";

const contact = new Hono()
    .get("contacts", (c) => {
        return c.text("GET /endpoint");
    })
    .get("contacts/:id", (c) => {
        return c.text("GET /endpoint");
    })
    .post("contacts", async (c) => {
        const token = c.req.header("Authorization");
        const data = await c.req.json();
        console.log(token);
        console.log(data);
        c.status(200);
        return c.json({ message: "Hello world!" });
    })
    .patch("contacts/:id", (c) => {
        return c.text("GET /endpoint");
    })
    .delete("contacts/:id", (c) => {
        return c.text("DELETE /endpoint");
    });

export default contact;
