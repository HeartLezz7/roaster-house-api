-- DropForeignKey
ALTER TABLE `shopping_cart` DROP FOREIGN KEY `shopping_cart_userId_fkey`;

-- AddForeignKey
ALTER TABLE `shopping_cart` ADD CONSTRAINT `shopping_cart_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
