CREATE TYPE "public"."contactType" AS ENUM('Personal', 'Professional', 'Organization', 'Partner', 'Other');--> statement-breakpoint
CREATE TABLE "contacts_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phoneNumber" text NOT NULL,
	"contactType" "contactType" NOT NULL,
	"address" text,
	"notes" varchar(150),
	"user_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" text,
	"username" text NOT NULL,
	"email" text NOT NULL,
	"name" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "users_table_userId_unique" UNIQUE("userId"),
	CONSTRAINT "users_table_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "contacts_table" ADD CONSTRAINT "contacts_table_user_id_users_table_userId_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users_table"("userId") ON DELETE cascade ON UPDATE no action;