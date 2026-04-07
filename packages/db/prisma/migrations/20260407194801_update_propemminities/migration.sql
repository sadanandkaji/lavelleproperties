/*
  Warnings:

  - A unique constraint covering the columns `[propertyId,normalized]` on the table `PropertyAmenity` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `normalized` to the `PropertyAmenity` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "PropertyAmenity_propertyId_idx";

-- AlterTable
ALTER TABLE "PropertyAmenity" ADD COLUMN     "normalized" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "PropertyAmenity_propertyId_normalized_key" ON "PropertyAmenity"("propertyId", "normalized");
