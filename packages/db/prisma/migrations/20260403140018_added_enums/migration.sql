/*
  Warnings:

  - You are about to drop the column `amenities` on the `Property` table. All the data in the column will be lost.
  - The `furnishing` column on the `Property` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `layoutType` column on the `Property` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `subType` column on the `Property` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `type` column on the `Property` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "AmenityCategory" AS ENUM ('BASIC', 'FULL');

-- CreateEnum
CREATE TYPE "PropertyType" AS ENUM ('RENT', 'LEASE', 'SALE');

-- CreateEnum
CREATE TYPE "SubType" AS ENUM ('FLAT', 'STANDALONE_HOUSE', 'INDEPENDENT_VILLA', 'PENTHOUSE');

-- CreateEnum
CREATE TYPE "LayoutType" AS ENUM ('BHK1', 'BHK2', 'BHK2_5', 'BHK3', 'BHK3_5', 'BHK4', 'BHK5', 'BHK5P');

-- CreateEnum
CREATE TYPE "Furnishing" AS ENUM ('FURNISHED', 'SEMIFURNISHED', 'UNFURNISHED');

-- AlterTable
ALTER TABLE "Property" DROP COLUMN "amenities",
DROP COLUMN "furnishing",
ADD COLUMN     "furnishing" "Furnishing" NOT NULL DEFAULT 'FURNISHED',
DROP COLUMN "layoutType",
ADD COLUMN     "layoutType" "LayoutType" NOT NULL DEFAULT 'BHK1',
DROP COLUMN "subType",
ADD COLUMN     "subType" "SubType" NOT NULL DEFAULT 'FLAT',
DROP COLUMN "type",
ADD COLUMN     "type" "PropertyType" NOT NULL DEFAULT 'RENT',
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- CreateTable
CREATE TABLE "Amenity" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" "AmenityCategory" NOT NULL DEFAULT 'BASIC',

    CONSTRAINT "Amenity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PropertyAmenities" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Amenity_name_key" ON "Amenity"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_PropertyAmenities_AB_unique" ON "_PropertyAmenities"("A", "B");

-- CreateIndex
CREATE INDEX "_PropertyAmenities_B_index" ON "_PropertyAmenities"("B");

-- AddForeignKey
ALTER TABLE "_PropertyAmenities" ADD CONSTRAINT "_PropertyAmenities_A_fkey" FOREIGN KEY ("A") REFERENCES "Amenity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PropertyAmenities" ADD CONSTRAINT "_PropertyAmenities_B_fkey" FOREIGN KEY ("B") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;
