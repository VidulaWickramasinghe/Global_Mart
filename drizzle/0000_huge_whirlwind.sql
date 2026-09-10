CREATE TABLE `cart` (
	`owner` text NOT NULL,
	`product_id` text NOT NULL,
	`quantity` integer NOT NULL,
	PRIMARY KEY(`owner`, `product_id`)
);
--> statement-breakpoint
CREATE TABLE `enquiries` (
	`id` text PRIMARY KEY NOT NULL,
	`kind` text NOT NULL,
	`email` text NOT NULL,
	`data` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` text PRIMARY KEY NOT NULL,
	`owner` text NOT NULL,
	`created_at` text NOT NULL,
	`data` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_orders_owner_created` ON `orders` (`owner`,`created_at`);--> statement-breakpoint
CREATE TABLE `profiles` (
	`owner` text PRIMARY KEY NOT NULL,
	`data` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `recently_viewed` (
	`owner` text NOT NULL,
	`product_id` text NOT NULL,
	`viewed_at` text NOT NULL,
	PRIMARY KEY(`owner`, `product_id`)
);
--> statement-breakpoint
CREATE TABLE `reviews` (
	`id` text PRIMARY KEY NOT NULL,
	`owner` text NOT NULL,
	`product_id` text NOT NULL,
	`name` text NOT NULL,
	`rating` integer NOT NULL,
	`body` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_reviews_product` ON `reviews` (`product_id`);--> statement-breakpoint
CREATE TABLE `wishlist` (
	`owner` text NOT NULL,
	`product_id` text NOT NULL,
	PRIMARY KEY(`owner`, `product_id`)
);
