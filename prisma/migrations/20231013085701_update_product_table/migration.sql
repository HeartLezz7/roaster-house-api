/*
  Warnings:

  - You are about to drop the column `description` on the `Product` table. All the data in the column will be lost.
  - Added the required column `origin` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `process` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tasing_note` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Product` DROP COLUMN `description`,
    ADD COLUMN `origin` VARCHAR(191) NOT NULL,
    ADD COLUMN `process` ENUM('natural', 'wash', 'honey', 'dry', 'wet') NOT NULL,
    ADD COLUMN `size` INTEGER NOT NULL,
    ADD COLUMN `tasing_note` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `role` ENUM('admin', 'user') NOT NULL DEFAULT 'user';
