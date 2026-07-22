CREATE INDEX "board_pins_board_idx" ON "board_pins" USING btree ("board_id");--> statement-breakpoint
CREATE INDEX "board_pins_post_idx" ON "board_pins" USING btree ("post_id");