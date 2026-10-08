CREATE TABLE "saved_pins" (
	"user_id" uuid NOT NULL,
	"pin_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "saved_pins_user_id_pin_id_pk" PRIMARY KEY("user_id","pin_id")
);
--> statement-breakpoint
ALTER TABLE "saved_pins" ADD CONSTRAINT "saved_pins_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "saved_pins" ADD CONSTRAINT "saved_pins_pin_id_pins_id_fk" FOREIGN KEY ("pin_id") REFERENCES "public"."pins"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "saved_pins_user_idx" ON "saved_pins" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "saved_pins_pin_idx" ON "saved_pins" USING btree ("pin_id");