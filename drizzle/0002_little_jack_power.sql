ALTER TABLE "boards" ADD COLUMN "last_used_at" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
CREATE INDEX "boards_last_used_at_idx" ON "boards" USING btree ("last_used_at");