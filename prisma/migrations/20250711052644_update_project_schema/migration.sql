/*
  Warnings:

  - Added the required column `budget` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `project` ADD COLUMN `budget` DOUBLE NOT NULL,
    ADD COLUMN `description` VARCHAR(191) NOT NULL;
