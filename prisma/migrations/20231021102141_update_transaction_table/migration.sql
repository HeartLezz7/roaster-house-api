/*
  Warnings:

  - You are about to drop the column `creditCard` on the `Transaction` table. All the data in the column will be lost.
  - You are about to alter the column `payment` on the `Transaction` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(4))`.

*/
-- AlterTable
ALTER TABLE `Transaction` DROP COLUMN `creditCard`,
    MODIFY `payment` ENUM('pending', 'paid') NOT NULL DEFAULT 'pending';
