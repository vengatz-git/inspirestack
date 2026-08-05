CREATE TYPE "public"."board_visibility" AS ENUM('PUBLIC', 'PRIVATE');--> statement-breakpoint
CREATE TABLE "board_pins" (
	"board_id" uuid NOT NULL,
	"pin_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "board_pins_board_id_pin_id_pk" PRIMARY KEY("board_id","pin_id")
);
--> statement-breakpoint
CREATE TABLE "boards" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"owner_id" uuid NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" text,
	"cover_pin_id" uuid,
	"visibility" "board_visibility" DEFAULT 'PUBLIC' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "board_pins" ADD CONSTRAINT "board_pins_board_id_boards_id_fk" FOREIGN KEY ("board_id") REFERENCES "public"."boards"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "board_pins" ADD CONSTRAINT "board_pins_pin_id_pins_id_fk" FOREIGN KEY ("pin_id") REFERENCES "public"."pins"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "boards" ADD CONSTRAINT "boards_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "boards" ADD CONSTRAINT "boards_cover_pin_id_pins_id_fk" FOREIGN KEY ("cover_pin_id") REFERENCES "public"."pins"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "board_pins_board_idx" ON "board_pins" USING btree ("board_id");--> statement-breakpoint
CREATE INDEX "board_pins_pin_idx" ON "board_pins" USING btree ("pin_id");--> statement-breakpoint
CREATE INDEX "boards_owner_idx" ON "boards" USING btree ("owner_id");--> statement-breakpoint
CREATE INDEX "boards_created_at_idx" ON "boards" USING btree ("created_at");