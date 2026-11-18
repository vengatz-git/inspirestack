ALTER TABLE "users" ADD COLUMN "show_in_search" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "allow_search_engine_indexing" boolean DEFAULT true NOT NULL;