/*
  Warnings:

  - You are about to drop the column `type_user_uuid` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `type_users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_type_user_uuid_fkey";

-- DropIndex
DROP INDEX "users_type_user_uuid_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "type_user_uuid",
ADD COLUMN     "role" VARCHAR(255) NOT NULL DEFAULT 'user';

-- DropTable
DROP TABLE "type_users";
