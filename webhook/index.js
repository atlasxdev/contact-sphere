import express from "express";
import { listen } from "@ngrok/ngrok";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

config({ path: ".env" });

const sql = neon(process.env.DATABASE_URL);
const db = drizzle({ client: sql });
const app = express();
const CLERK_SIGNATURE = process.env.SIGNING_SECRET;

const usersTable = pgTable("users_table", {
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

async function createUser(data) {
    await db.insert(usersTable).values(data);
}

app.use(express.json());

app.post("/webhooks/user-signup", async (req, res) => {
    const signature = req.headers["clerk-signature"];
    if (signature == null || signature != CLERK_SIGNATURE) {
        return res.status(401).json({ message: "Invalid signature!" });
    }
    const { id, username, email_addresses } = req.body.data;
    await createUser({
        userId: id,
        username,
        email: email_addresses[0].email_address,
    });
    res.status(200).json({ message: "User has been created." });
});

listen(app).then(() => {
    console.log("established listener at: " + app.listener.url());
});
