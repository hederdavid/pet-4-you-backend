/*
  Warnings:

  - You are about to drop the column `authorId` on the `Pet` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Pet` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Pet` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PublicationStatus" AS ENUM ('APROVED', 'REJECTED', 'PENDING');

-- DropForeignKey
ALTER TABLE "Pet" DROP CONSTRAINT "Pet_authorId_fkey";

-- AlterTable
ALTER TABLE "Pet" DROP COLUMN "authorId",
DROP COLUMN "status",
ADD COLUMN     "pet_status" "PetStatus" NOT NULL DEFAULT 'AVAILABLE',
ADD COLUMN     "publication_date" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "publication_status" "PublicationStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "deletedAt" SET DATA TYPE TIMESTAMPTZ;

-- AlterTable
ALTER TABLE "Photo" ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "deletedAt" SET DATA TYPE TIMESTAMPTZ;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "deletedAt" SET DATA TYPE TIMESTAMPTZ;

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
