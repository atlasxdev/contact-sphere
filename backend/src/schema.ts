import {
    boolean,
    pgEnum,
    pgTable,
    serial,
    text,
    timestamp,
    varchar,
} from "drizzle-orm/pg-core";

type Address = [string?, string?];
export const contactTypeEnum = pgEnum("contactType", [
    "Personal",
    "Professional",
    "Organization",
    "Partner",
    "Other",
]);

export const usersTable = pgTable("users_table", {
    id: serial("id").primaryKey(),
    userId: text("userId").unique(),
    username: text("username").notNull(),
    email: text("email").notNull().unique(),
    name: text("name"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at")
        .notNull()
        .$onUpdate(() => new Date()),
});

export const contactsTable = pgTable("contacts_table", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    phoneNumber: text("phoneNumber").notNull(),
    contactType: contactTypeEnum().notNull(),
    address: text("address").$type<Address>(),
    notes: varchar("notes", { length: 150 }),
    isFavorite: boolean("isFavorite").notNull().default(false),
    userId: text("user_id")
        .notNull()
        .references(() => usersTable.userId, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at")
        .notNull()
        .$onUpdate(() => new Date()),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertContact = typeof contactsTable.$inferInsert;
export type SelectContact = typeof contactsTable.$inferSelect;
