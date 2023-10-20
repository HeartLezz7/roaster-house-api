-- AlterTable
ALTER TABLE `Order` MODIFY `status` ENUM('pending', 'shipping', 'completed', 'cancel') NOT NULL DEFAULT 'pending';
