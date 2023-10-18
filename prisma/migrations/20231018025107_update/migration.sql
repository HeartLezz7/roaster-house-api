-- DropForeignKey
ALTER TABLE `shopping_cart` DROP FOREIGN KEY `shopping_cart_productId_fkey`;

-- AddForeignKey
ALTER TABLE `shopping_cart` ADD CONSTRAINT `shopping_cart_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
