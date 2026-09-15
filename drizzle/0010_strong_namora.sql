CREATE TABLE "pin_likes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"pin_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "pin_likes_pin_user_unique" UNIQUE("pin_id","user_id")
);
--> statement-breakpoint
ALTER TABLE "pin_likes" ADD CONSTRAINT "pin_likes_pin_id_pins_id_fk" FOREIGN KEY ("pin_id") REFERENCES "public"."pins"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pin_likes" ADD CONSTRAINT "pin_likes_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "pin_likes_pin_idx" ON "pin_likes" USING btree ("pin_id");--> statement-breakpoint
CREATE INDEX "pin_likes_user_idx" ON "pin_likes" USING btree ("user_id");