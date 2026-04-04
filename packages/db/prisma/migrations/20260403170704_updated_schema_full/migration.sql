/*
  Warnings:

  - You are about to drop the `_PropertyAmenities` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_PropertyAmenities" DROP CONSTRAINT "_PropertyAmenities_A_fkey";

-- DropForeignKey
ALTER TABLE "_PropertyAmenities" DROP CONSTRAINT "_PropertyAmenities_B_fkey";

-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "amenityCategory" "AmenityCategory" NOT NULL DEFAULT 'BASIC';

-- DropTable
DROP TABLE "_PropertyAmenities";
