/*
  Warnings:

  - The values [APROVED] on the enum `PublicationStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PublicationStatus_new" AS ENUM ('APPROVED', 'REJECTED', 'PENDING');
ALTER TABLE "Pet" ALTER COLUMN "publication_status" DROP DEFAULT;
ALTER TABLE "Pet" ALTER COLUMN "publication_status" TYPE "PublicationStatus_new" USING ("publication_status"::text::"PublicationStatus_new");
ALTER TYPE "PublicationStatus" RENAME TO "PublicationStatus_old";
ALTER TYPE "PublicationStatus_new" RENAME TO "PublicationStatus";
DROP TYPE "PublicationStatus_old";
ALTER TABLE "Pet" ALTER COLUMN "publication_status" SET DEFAULT 'PENDING';
COMMIT;
