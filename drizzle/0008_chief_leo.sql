CREATE TABLE "drafts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"author_id" uuid NOT NULL,
	"topic_id" uuid,
	"title" varchar(120),
	"description" text,
	"image_url" text NOT NULL,
	"image_public_id" text NOT NULL,
	"image_width" integer NOT NULL,
	"image_height" integer NOT NULL,
	"tag_names" text[] DEFAULT '{}' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "drafts" ADD CONSTRAINT "drafts_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "drafts" ADD CONSTRAINT "drafts_topic_id_topics_id_fk" FOREIGN KEY ("topic_id") REFERENCES "public"."topics"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "drafts_author_idx" ON "drafts" USING btree ("author_id");--> statement-breakpoint
CREATE INDEX "drafts_author_updated_at_idx" ON "drafts" USING btree ("author_id","updated_at");