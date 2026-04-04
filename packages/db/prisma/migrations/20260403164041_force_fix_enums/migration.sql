/*
  Warnings:

  - The values [BHK1,BHK2,BHK2_5,BHK3,BHK3_5,BHK4,BHK5,BHK5P] on the enum `LayoutType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "LayoutType_new" AS ENUM ('1BHK', '2BHK', '2_5BHK', '3BHK', '3_5BHK', '4BHK', '5BHK', '5BHKP');
ALTER TABLE "Property" ALTER COLUMN "layoutType" DROP DEFAULT;
ALTER TABLE "Property" ALTER COLUMN "layoutType" TYPE "LayoutType_new" USING ("layoutType"::text::"LayoutType_new");
ALTER TYPE "LayoutType" RENAME TO "LayoutType_old";
ALTER TYPE "LayoutType_new" RENAME TO "LayoutType";
DROP TYPE "LayoutType_old";
ALTER TABLE "Property" ALTER COLUMN "layoutType" SET DEFAULT '1BHK';
COMMIT;

-- AlterTable
ALTER TABLE "Property" ALTER COLUMN "layoutType" SET DEFAULT '1BHK';
