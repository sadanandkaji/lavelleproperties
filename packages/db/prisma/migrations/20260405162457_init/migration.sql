/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Property` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Property" DROP COLUMN "imageUrl",
ADD COLUMN     "areaSqft" INTEGER,
ADD COLUMN     "basementOptions" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "bathrooms" INTEGER,
ADD COLUMN     "bedrooms" INTEGER,
ADD COLUMN     "callForPrice" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "floorLevel" INTEGER,
ADD COLUMN     "floors" INTEGER,
ADD COLUMN     "halfBaths" INTEGER,
ADD COLUMN     "lotSizeSqft" INTEGER,
ADD COLUMN     "parkingOptions" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "priceNote" TEXT,
ADD COLUMN     "pricePerSqft" INTEGER,
ADD COLUMN     "rentPeriods" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "statuses" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "totalRooms" INTEGER,
ADD COLUMN     "yearBuilt" INTEGER,
ADD COLUMN     "yearRemodeled" INTEGER;

-- CreateTable
CREATE TABLE "PropertyImage" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 0,
    "propertyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PropertyImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PropertyImage" ADD CONSTRAINT "PropertyImage_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;
