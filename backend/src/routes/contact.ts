import {
    insertContactSchema,
    updateContactSchema,
    validateBody,
} from "@/middlewares/validator.js";
import {
    contactTypeEnum,
    contactsTable,
    type InsertContact,
    type SelectContact,
} from "@/schema.js";
import { db } from "@/services/db.js";
import { Hono } from "hono";
import { and, desc, eq, or, ilike } from "drizzle-orm";
import {
    BadRequestError,
    ConflictError,
    NotFoundError,
} from "@/utils/error.js";
import { getUser } from "@/utils/getUser.js";
import { StatusCodes } from "http-status-codes";

type ContactTypeParam = {
    all: "All";
    personal: "Personal";
    professional: "Professional";
    organization: "Organization";
    partner: "Partner";
    other: "Other";
};

const contactTypeMap: ContactTypeParam = {
    all: "All",
    personal: "Personal",
    professional: "Professional",
    organization: "Organization",
    partner: "Partner",
    other: "Other",
};

const contact = new Hono()
    .get("contacts/:contactType", async (c) => {
        const LIMIT_PER_PAGE = 15;
        const user = await getUser(c);
        const contactType = c.req.param("contactType");
        if (!user) {
            throw new NotFoundError("User not found!");
        }
        if (!contactTypeMap[contactType as keyof ContactTypeParam]) {
            throw new BadRequestError("Invalid contact type!");
        }
        const currentPage =
            c.req.query("page") == null ? 1 : parseInt(c.req.query("page")!);
        if (currentPage < 1) {
            throw new NotFoundError("Page param must be a positive number");
        }

        const limit = currentPage * LIMIT_PER_PAGE;
        const offset = limit - LIMIT_PER_PAGE;

        let contacts: Omit<
            SelectContact,
            "userId" | "createdAt" | "updatedAt"
        >[];
        if (contactTypeMap[contactType as keyof ContactTypeParam] == "All") {
            contacts = await db
                .select({
                    id: contactsTable.id,
                    email: contactsTable.email,
                    name: contactsTable.name,
                    address: contactsTable.address,
                    phoneNumber: contactsTable.phoneNumber,
                    contactType: contactsTable.contactType,
                    notes: contactsTable.notes,
                    isFavorite: contactsTable.isFavorite,
                })
                .from(contactsTable)
                .where(eq(contactsTable.userId, user.id))
                .orderBy(desc(contactsTable.id))
                .limit(limit)
                .offset(offset);
        } else {
            contacts = await db
                .select({
                    id: contactsTable.id,
                    email: contactsTable.email,
                    name: contactsTable.name,
                    address: contactsTable.address,
                    phoneNumber: contactsTable.phoneNumber,
                    contactType: contactsTable.contactType,
                    notes: contactsTable.notes,
                    isFavorite: contactsTable.isFavorite,
                })
                .from(contactsTable)
                .where(
                    and(
                        eq(contactsTable.userId, user.id),
                        eq(
                            contactsTable.contactType,
                            contactTypeMap[
                                contactType as keyof ContactTypeParam
                            ] as any
                        )
                    )
                )
                .orderBy(desc(contactsTable.id));
        }

        c.status(StatusCodes.OK);
        return c.json({ contacts });
    })
    .get("contacts/:id", (c) => {
        return c.text("GET /endpoint");
    })
    .get("/contacts/find/:search", async (c) => {
        const search = c.req.param("search");
        if (!search) {
            throw new Error("Search parameter is required");
        }
        const searchPattern = `%${search}%`;

        const searchResults = await db
            .select()
            .from(contactsTable)
            .where(
                or(
                    ilike(contactsTable.name, searchPattern),
                    ilike(contactsTable.email, searchPattern),
                    ilike(contactsTable.phoneNumber, searchPattern)
                )
            );

        if (!searchResults.length) {
            throw new NotFoundError("No contacts to be found.");
        }

        c.status(StatusCodes.OK);
        return c.json({ contacts: searchResults });
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
        c.status(StatusCodes.CREATED);
        return c.json({ message: "Contact has been added!" });
    })
    .patch(
        "contacts/:id",
        validateBody("json", updateContactSchema),
        async (c) => {
            const user = await getUser(c);
            if (!user) {
                throw new NotFoundError("User not found!");
            }
            const contactId = parseInt(c.req.param("id"));
            const data = c.req.valid("json");
            const contactExist = await db
                .select()
                .from(contactsTable)
                .where(
                    and(
                        eq(contactsTable.id, contactId),
                        eq(contactsTable.userId, user.id)
                    )
                )
                .limit(1);
            if (!contactExist.length) {
                throw new NotFoundError("Contact doest not exist");
            }
            await db
                .update(contactsTable)
                .set({ ...data })
                .where(
                    and(
                        eq(contactsTable.id, contactId),
                        eq(contactsTable.userId, user.id)
                    )
                );
            c.status(StatusCodes.OK);
            return c.json({ message: "Contact has been updated." });
        }
    )
    .delete("contacts/:id", async (c) => {
        const user = await getUser(c);
        if (!user) {
            throw new NotFoundError("User not found!");
        }
        const contactId = parseInt(c.req.param("id"));
        const contactExist = await db
            .select()
            .from(contactsTable)
            .where(
                and(
                    eq(contactsTable.id, contactId),
                    eq(contactsTable.userId, user.id)
                )
            )
            .limit(1);
        if (!contactExist.length) {
            throw new NotFoundError("Contact doest not exist");
        }
        await db
            .delete(contactsTable)
            .where(
                and(
                    eq(contactsTable.id, contactId),
                    eq(contactsTable.userId, user.id)
                )
            );
        c.status(StatusCodes.OK);
        return c.json({ message: "Contact has been removed." });
    });

export default contact;
