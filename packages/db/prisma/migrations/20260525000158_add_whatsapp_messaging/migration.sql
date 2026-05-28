-- CreateEnum
CREATE TYPE "WaTemplateCategory" AS ENUM ('MARKETING', 'UTILITY', 'AUTHENTICATION');

-- CreateEnum
CREATE TYPE "WaTemplateStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'PAUSED', 'DISABLED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "WaParamFormat" AS ENUM ('NAMED', 'POSITIONAL');

-- CreateEnum
CREATE TYPE "WaHeaderFormat" AS ENUM ('TEXT', 'IMAGE', 'VIDEO', 'DOCUMENT', 'LOCATION');

-- CreateEnum
CREATE TYPE "WaButtonType" AS ENUM ('QUICK_REPLY', 'URL', 'PHONE_NUMBER', 'COPY_CODE');

-- CreateEnum
CREATE TYPE "WaMediaType" AS ENUM ('IMAGE', 'VIDEO', 'DOCUMENT', 'AUDIO', 'STICKER');

-- CreateEnum
CREATE TYPE "WaMsgDirection" AS ENUM ('OUTBOUND', 'INBOUND');

-- CreateEnum
CREATE TYPE "WaMsgStatus" AS ENUM ('QUEUED', 'SENT', 'DELIVERED', 'READ', 'FAILED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "WaMsgType" AS ENUM ('TEMPLATE', 'TEXT', 'IMAGE', 'VIDEO', 'DOCUMENT', 'AUDIO', 'STICKER', 'LOCATION', 'REACTION', 'INTERACTIVE', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "WaBulkType" AS ENUM ('TEMPLATE', 'SIMPLE');

-- CreateEnum
CREATE TYPE "WaBulkStatus" AS ENUM ('RUNNING', 'COMPLETED', 'FAILED', 'CANCELLED');

-- CreateTable
CREATE TABLE "WaTemplate" (
    "id" TEXT NOT NULL,
    "metaTemplateId" TEXT,
    "name" TEXT NOT NULL,
    "category" "WaTemplateCategory" NOT NULL,
    "language" TEXT NOT NULL,
    "status" "WaTemplateStatus" NOT NULL DEFAULT 'PENDING',
    "rejectionReason" TEXT,
    "body" TEXT NOT NULL,
    "headerFormat" "WaHeaderFormat",
    "headerText" TEXT,
    "headerMediaId" TEXT,
    "headerMediaUrl" TEXT,
    "headerFilename" TEXT,
    "footer" TEXT,
    "components" JSONB NOT NULL DEFAULT '[]',
    "variables" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "parameterFormat" "WaParamFormat" NOT NULL DEFAULT 'NAMED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WaTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WaTemplateButton" (
    "id" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,
    "index" INTEGER NOT NULL,
    "type" "WaButtonType" NOT NULL,
    "text" TEXT NOT NULL,
    "url" TEXT,
    "phone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WaTemplateButton_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WaTemplateMedia" (
    "id" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,
    "mediaType" "WaMediaType" NOT NULL,
    "mediaId" TEXT,
    "url" TEXT,
    "filename" TEXT,
    "mimeType" TEXT,
    "sizeBytes" INTEGER,
    "caption" TEXT,
    "isHeader" BOOLEAN NOT NULL DEFAULT true,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WaTemplateMedia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WaContact" (
    "id" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "name" TEXT,
    "waId" TEXT,
    "isValid" BOOLEAN NOT NULL DEFAULT true,
    "optedOut" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WaContact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WaMessage" (
    "id" TEXT NOT NULL,
    "wamid" TEXT,
    "direction" "WaMsgDirection" NOT NULL DEFAULT 'OUTBOUND',
    "status" "WaMsgStatus" NOT NULL DEFAULT 'QUEUED',
    "contactId" TEXT,
    "to" TEXT NOT NULL,
    "type" "WaMsgType" NOT NULL DEFAULT 'TEMPLATE',
    "body" TEXT,
    "templateId" TEXT,
    "variablesUsed" JSONB,
    "bulkJobId" TEXT,
    "errorCode" INTEGER,
    "errorMessage" TEXT,
    "sentAt" TIMESTAMP(3),
    "deliveredAt" TIMESTAMP(3),
    "readAt" TIMESTAMP(3),
    "failedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WaMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WaMessageMedia" (
    "id" TEXT NOT NULL,
    "messageId" TEXT NOT NULL,
    "mediaType" "WaMediaType" NOT NULL,
    "mediaId" TEXT,
    "url" TEXT,
    "filename" TEXT,
    "mimeType" TEXT,
    "sizeBytes" INTEGER,
    "caption" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WaMessageMedia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WaBulkJob" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "type" "WaBulkType" NOT NULL,
    "status" "WaBulkStatus" NOT NULL DEFAULT 'RUNNING',
    "templateId" TEXT,
    "message" TEXT,
    "total" INTEGER NOT NULL DEFAULT 0,
    "sent" INTEGER NOT NULL DEFAULT 0,
    "failed" INTEGER NOT NULL DEFAULT 0,
    "cancelled" INTEGER NOT NULL DEFAULT 0,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WaBulkJob_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WaBulkRecipient" (
    "id" TEXT NOT NULL,
    "bulkJobId" TEXT NOT NULL,
    "contactId" TEXT,
    "phone" TEXT NOT NULL,
    "name" TEXT,
    "variables" JSONB,
    "status" "WaMsgStatus" NOT NULL DEFAULT 'QUEUED',
    "wamid" TEXT,
    "errorMsg" TEXT,
    "sentAt" TIMESTAMP(3),

    CONSTRAINT "WaBulkRecipient_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WaTemplate_metaTemplateId_key" ON "WaTemplate"("metaTemplateId");

-- CreateIndex
CREATE INDEX "WaTemplate_status_idx" ON "WaTemplate"("status");

-- CreateIndex
CREATE INDEX "WaTemplate_category_idx" ON "WaTemplate"("category");

-- CreateIndex
CREATE INDEX "WaTemplate_name_idx" ON "WaTemplate"("name");

-- CreateIndex
CREATE INDEX "WaTemplateButton_templateId_idx" ON "WaTemplateButton"("templateId");

-- CreateIndex
CREATE INDEX "WaTemplateMedia_templateId_idx" ON "WaTemplateMedia"("templateId");

-- CreateIndex
CREATE INDEX "WaTemplateMedia_mediaType_idx" ON "WaTemplateMedia"("mediaType");

-- CreateIndex
CREATE UNIQUE INDEX "WaContact_phone_key" ON "WaContact"("phone");

-- CreateIndex
CREATE INDEX "WaContact_phone_idx" ON "WaContact"("phone");

-- CreateIndex
CREATE INDEX "WaContact_optedOut_idx" ON "WaContact"("optedOut");

-- CreateIndex
CREATE UNIQUE INDEX "WaMessage_wamid_key" ON "WaMessage"("wamid");

-- CreateIndex
CREATE INDEX "WaMessage_to_idx" ON "WaMessage"("to");

-- CreateIndex
CREATE INDEX "WaMessage_status_idx" ON "WaMessage"("status");

-- CreateIndex
CREATE INDEX "WaMessage_templateId_idx" ON "WaMessage"("templateId");

-- CreateIndex
CREATE INDEX "WaMessage_bulkJobId_idx" ON "WaMessage"("bulkJobId");

-- CreateIndex
CREATE INDEX "WaMessage_wamid_idx" ON "WaMessage"("wamid");

-- CreateIndex
CREATE INDEX "WaMessage_direction_idx" ON "WaMessage"("direction");

-- CreateIndex
CREATE INDEX "WaMessageMedia_messageId_idx" ON "WaMessageMedia"("messageId");

-- CreateIndex
CREATE INDEX "WaBulkJob_status_idx" ON "WaBulkJob"("status");

-- CreateIndex
CREATE INDEX "WaBulkJob_templateId_idx" ON "WaBulkJob"("templateId");

-- CreateIndex
CREATE INDEX "WaBulkRecipient_bulkJobId_idx" ON "WaBulkRecipient"("bulkJobId");

-- CreateIndex
CREATE INDEX "WaBulkRecipient_phone_idx" ON "WaBulkRecipient"("phone");

-- CreateIndex
CREATE INDEX "WaBulkRecipient_status_idx" ON "WaBulkRecipient"("status");

-- AddForeignKey
ALTER TABLE "WaTemplateButton" ADD CONSTRAINT "WaTemplateButton_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "WaTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WaTemplateMedia" ADD CONSTRAINT "WaTemplateMedia_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "WaTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WaMessage" ADD CONSTRAINT "WaMessage_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "WaContact"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WaMessage" ADD CONSTRAINT "WaMessage_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "WaTemplate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WaMessage" ADD CONSTRAINT "WaMessage_bulkJobId_fkey" FOREIGN KEY ("bulkJobId") REFERENCES "WaBulkJob"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WaMessageMedia" ADD CONSTRAINT "WaMessageMedia_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "WaMessage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WaBulkJob" ADD CONSTRAINT "WaBulkJob_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "WaTemplate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WaBulkRecipient" ADD CONSTRAINT "WaBulkRecipient_bulkJobId_fkey" FOREIGN KEY ("bulkJobId") REFERENCES "WaBulkJob"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WaBulkRecipient" ADD CONSTRAINT "WaBulkRecipient_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "WaContact"("id") ON DELETE SET NULL ON UPDATE CASCADE;
