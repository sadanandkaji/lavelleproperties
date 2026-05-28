/*
  Warnings:

  - You are about to drop the column `createdAt` on the `custom_templates` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `custom_templates` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `custom_templates` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "custom_templates" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "buttons" JSONB NOT NULL DEFAULT '[]',
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "media_caption" TEXT,
ADD COLUMN     "media_type" TEXT,
ADD COLUMN     "media_url" TEXT,
ADD COLUMN     "quickReplies" JSONB NOT NULL DEFAULT '[]',
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "body" SET DEFAULT '';

-- CreateIndex
CREATE INDEX "custom_templates_media_type_idx" ON "custom_templates"("media_type");

-- CreateIndex
CREATE INDEX "custom_templates_usageCount_idx" ON "custom_templates"("usageCount");
