ALTER TABLE "users" ALTER COLUMN "emailVerified" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "created_at" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "updated_at" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "display_name" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "website" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "location" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "banner_image" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "role" text DEFAULT 'user' NOT NULL;