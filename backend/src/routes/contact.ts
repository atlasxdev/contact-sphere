import { insertContactSchema, validateBody } from "@/middlewares/validator.js";
import { contactsTable, type InsertContact } from "@/schema.js";
import { validator } from "hono/validator";
import { db } from "@/services/db.js";
import { Hono } from "hono";
import { and, eq } from "drizzle-orm";
import { ConflictError } from "@/utils/error.js";

const contact = new Hono()
    .get("contacts", (c) => {
        return c.text("GET /endpoint");
    })
    .get("contacts/:id", (c) => {
        return c.text("GET /endpoint");
    })
    .post("contacts", validateBody("json", insertContactSchema), async (c) => {
        const data = c.req.valid("json");
        const contactExist = await db
            .select()
            .from(contactsTable)
            .where(
                and(
                    eq(contactsTable.email, data.email),
                    eq(contactsTable.phoneNumber, data.phoneNumber)
                )
            )
            .limit(1);
        if (contactExist.length) {
            throw new ConflictError("Contact already exist");
        }
        await db.insert(contactsTable).values(data as InsertContact);
        c.status(201);
        return c.json({ message: "Contact has been added!" });
    })
    .patch("contacts/:id", (c) => {
        return c.text("GET /endpoint");
    })
    .delete("contacts/:id", (c) => {
        return c.text("DELETE /endpoint");
    });

export default contact;
