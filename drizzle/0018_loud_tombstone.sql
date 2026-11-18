CREATE TABLE "user_mutes" (
	"muter_id" uuid NOT NULL,
	"muted_user_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "user_mutes_muter_id_muted_user_id_pk" PRIMARY KEY("muter_id","muted_user_id"),
	CONSTRAINT "user_mutes_not_self" CHECK ("user_mutes"."muter_id" <> "user_mutes"."muted_user_id")
);
--> statement-breakpoint
ALTER TABLE "user_mutes" ADD CONSTRAINT "user_mutes_muter_id_users_id_fk" FOREIGN KEY ("muter_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_mutes" ADD CONSTRAINT "user_mutes_muted_user_id_users_id_fk" FOREIGN KEY ("muted_user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "user_mutes_muted_user_id_idx" ON "user_mutes" USING btree ("muted_user_id");