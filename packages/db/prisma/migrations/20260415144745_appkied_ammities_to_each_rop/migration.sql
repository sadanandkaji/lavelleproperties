/*
  Warnings:

  - You are about to drop the `Amenity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PropertyAmenity` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PropertyAmenity" DROP CONSTRAINT "PropertyAmenity_propertyId_fkey";

-- DropTable
DROP TABLE "Amenity";

-- DropTable
DROP TABLE "PropertyAmenity";

-- CreateTable
CREATE TABLE "BasicAmenity" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "normalized" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BasicAmenity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FullAmenity" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "normalized" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FullAmenity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BasicAmenity_propertyId_normalized_key" ON "BasicAmenity"("propertyId", "normalized");

-- CreateIndex
CREATE UNIQUE INDEX "FullAmenity_propertyId_normalized_key" ON "FullAmenity"("propertyId", "normalized");

-- AddForeignKey
ALTER TABLE "BasicAmenity" ADD CONSTRAINT "BasicAmenity_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FullAmenity" ADD CONSTRAINT "FullAmenity_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;
