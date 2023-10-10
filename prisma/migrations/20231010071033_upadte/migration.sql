/*
  Warnings:

  - A unique constraint covering the columns `[orderId]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `shopping_cart` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Transaction_orderId_key` ON `Transaction`(`orderId`);

-- CreateIndex
CREATE UNIQUE INDEX `shopping_cart_userId_key` ON `shopping_cart`(`userId`);
