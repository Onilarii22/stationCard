/*
  Warnings:

  - You are about to drop the column `cityId` on the `Municipality` table. All the data in the column will be lost.
  - You are about to drop the `City` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "City" DROP CONSTRAINT "City_departmentId_fkey";

-- DropForeignKey
ALTER TABLE "Municipality" DROP CONSTRAINT "Municipality_cityId_fkey";

-- AlterTable
ALTER TABLE "Municipality" DROP COLUMN "cityId",
ADD COLUMN     "departmentId" TEXT;

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "City";

-- AddForeignKey
ALTER TABLE "Municipality" ADD CONSTRAINT "Municipality_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE SET NULL ON UPDATE CASCADE;
