/*
  Warnings:

  - You are about to drop the column `companyId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `StationEmploye` will be added. If there are existing duplicate values, this will fail.
  - Made the column `companyId` on table `Beneficiary` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `userId` to the `StationEmploye` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('COMPANY_EMPLOYE', 'STATION_EMPLOYE', 'ADMIN');

-- DropForeignKey
ALTER TABLE "Beneficiary" DROP CONSTRAINT "Beneficiary_companyId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_companyId_fkey";

-- AlterTable
ALTER TABLE "Beneficiary" ALTER COLUMN "companyId" SET NOT NULL;

-- AlterTable
ALTER TABLE "StationEmploye" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "companyId",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'COMPANY_EMPLOYE';

-- DropTable
DROP TABLE "Admin";

-- CreateTable
CREATE TABLE "CompanyEmploye" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,

    CONSTRAINT "CompanyEmploye_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CompanyEmploye_userId_key" ON "CompanyEmploye"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "StationEmploye_userId_key" ON "StationEmploye"("userId");

-- AddForeignKey
ALTER TABLE "CompanyEmploye" ADD CONSTRAINT "CompanyEmploye_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyEmploye" ADD CONSTRAINT "CompanyEmploye_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Beneficiary" ADD CONSTRAINT "Beneficiary_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StationEmploye" ADD CONSTRAINT "StationEmploye_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
