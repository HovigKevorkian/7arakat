BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS `user_account` (
	`id`	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
	`firs_name`	TEXT NOT NULL,
	`last_name`	TEXT NOT NULL,
	`email_address`	TEXT NOT NULL,
	`password`	TEXT NOT NULL,
	`phone_number`	INTEGER NOT NULL,
	`address`	TEXT NOT NULL,
	`postal_code`	INTEGER NOT NULL,
	`city`	TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS `team` (
	`id`	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
	`image_name`	TEXT NOT NULL,
	`member_name`	TEXT NOT NULL,
	`position`	TEXT NOT NULL,
	`fb_link`	TEXT NOT NULL,
	`gmail_address`	TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS `slider-images` (
	`id`	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
	`image_name`	TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS `products` (
	`id`	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
	`title`	TEXT NOT NULL,
	`image_name`	TEXT NOT NULL,
	`description`	TEXT NOT NULL,
	`price`	INTEGER NOT NULL,
	`category_id`	INTEGER NOT NULL,
	`is_featured`	INTEGER NOT NULL,
	`date_created`	TEXT NOT NULL,
	FOREIGN KEY(`category_id`) REFERENCES `categories`(`id`)
);
CREATE TABLE IF NOT EXISTS `orders` (
	`id`	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
	`user_id`	INTEGER NOT NULL,
	`date`	TEXT NOT NULL,
	`status`	TEXT NOT NULL,
	`delivery_date`	TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS `order_prodcuts` (
	`order_id`	INTEGER NOT NULL,
	`product_id`	INTEGER NOT NULL,
	`quantity`	INTEGER NOT NULL,
	FOREIGN KEY(`order_id`) REFERENCES `orders`(`id`)
);
CREATE TABLE IF NOT EXISTS `gallery_videos` (
	`id`	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
	`link_url`	INTEGER
);
CREATE TABLE IF NOT EXISTS `gallery_images` (
	`id`	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
	`image_name`	TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS `categories` (
	`id`	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
	`name`	TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS `about_us` (
	`id`	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
	`text`	TEXT NOT NULL
);
COMMIT;
