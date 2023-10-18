/*
  Warnings:

  - You are about to drop the column `amount` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `tasing_note` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Product` DROP COLUMN `amount`,
    DROP COLUMN `tasing_note`,
    ADD COLUMN `tasting_note` VARCHAR(191) NULL;
