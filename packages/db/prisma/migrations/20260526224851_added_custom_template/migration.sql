/*
  Warnings:

  - You are about to drop the `WaBulkJob` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WaBulkRecipient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WaContact` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WaMessage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WaMessageMedia` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WaTemplate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WaTemplateButton` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WaTemplateMedia` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "WaBulkJob" DROP CONSTRAINT "WaBulkJob_templateId_fkey";

-- DropForeignKey
ALTER TABLE "WaBulkRecipient" DROP CONSTRAINT "WaBulkRecipient_bulkJobId_fkey";

-- DropForeignKey
ALTER TABLE "WaBulkRecipient" DROP CONSTRAINT "WaBulkRecipient_contactId_fkey";

-- DropForeignKey
ALTER TABLE "WaMessage" DROP CONSTRAINT "WaMessage_bulkJobId_fkey";

-- DropForeignKey
ALTER TABLE "WaMessage" DROP CONSTRAINT "WaMessage_contactId_fkey";

-- DropForeignKey
ALTER TABLE "WaMessage" DROP CONSTRAINT "WaMessage_templateId_fkey";

-- DropForeignKey
ALTER TABLE "WaMessageMedia" DROP CONSTRAINT "WaMessageMedia_messageId_fkey";

-- DropForeignKey
ALTER TABLE "WaTemplateButton" DROP CONSTRAINT "WaTemplateButton_templateId_fkey";

-- DropForeignKey
ALTER TABLE "WaTemplateMedia" DROP CONSTRAINT "WaTemplateMedia_templateId_fkey";

-- DropTable
DROP TABLE "WaBulkJob";

-- DropTable
DROP TABLE "WaBulkRecipient";

-- DropTable
DROP TABLE "WaContact";

-- DropTable
DROP TABLE "WaMessage";

-- DropTable
DROP TABLE "WaMessageMedia";

-- DropTable
DROP TABLE "WaTemplate";

-- DropTable
DROP TABLE "WaTemplateButton";

-- DropTable
DROP TABLE "WaTemplateMedia";

-- CreateTable
CREATE TABLE "wa_templates" (
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

    CONSTRAINT "wa_templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wa_template_buttons" (
    "id" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,
    "index" INTEGER NOT NULL,
    "type" "WaButtonType" NOT NULL,
    "text" TEXT NOT NULL,
    "url" TEXT,
    "phone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "wa_template_buttons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wa_template_media" (
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

    CONSTRAINT "wa_template_media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wa_contacts" (
    "id" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "name" TEXT,
    "waId" TEXT,
    "isValid" BOOLEAN NOT NULL DEFAULT true,
    "optedOut" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "wa_contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wa_messages" (
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

    CONSTRAINT "wa_messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wa_message_media" (
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

    CONSTRAINT "wa_message_media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wa_bulk_jobs" (
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

    CONSTRAINT "wa_bulk_jobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wa_bulk_recipients" (
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

    CONSTRAINT "wa_bulk_recipients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "custom_templates" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'General',
    "emoji" TEXT NOT NULL DEFAULT '💬',
    "usageCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "custom_templates_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "wa_templates_metaTemplateId_key" ON "wa_templates"("metaTemplateId");

-- CreateIndex
CREATE INDEX "wa_templates_status_idx" ON "wa_templates"("status");

-- CreateIndex
CREATE INDEX "wa_templates_category_idx" ON "wa_templates"("category");

-- CreateIndex
CREATE INDEX "wa_templates_name_idx" ON "wa_templates"("name");

-- CreateIndex
CREATE INDEX "wa_template_buttons_templateId_idx" ON "wa_template_buttons"("templateId");

-- CreateIndex
CREATE INDEX "wa_template_media_templateId_idx" ON "wa_template_media"("templateId");

-- CreateIndex
CREATE INDEX "wa_template_media_mediaType_idx" ON "wa_template_media"("mediaType");

-- CreateIndex
CREATE UNIQUE INDEX "wa_contacts_phone_key" ON "wa_contacts"("phone");

-- CreateIndex
CREATE INDEX "wa_contacts_phone_idx" ON "wa_contacts"("phone");

-- CreateIndex
CREATE INDEX "wa_contacts_optedOut_idx" ON "wa_contacts"("optedOut");

-- CreateIndex
CREATE UNIQUE INDEX "wa_messages_wamid_key" ON "wa_messages"("wamid");

-- CreateIndex
CREATE INDEX "wa_messages_to_idx" ON "wa_messages"("to");

-- CreateIndex
CREATE INDEX "wa_messages_status_idx" ON "wa_messages"("status");

-- CreateIndex
CREATE INDEX "wa_messages_templateId_idx" ON "wa_messages"("templateId");

-- CreateIndex
CREATE INDEX "wa_messages_bulkJobId_idx" ON "wa_messages"("bulkJobId");

-- CreateIndex
CREATE INDEX "wa_messages_wamid_idx" ON "wa_messages"("wamid");

-- CreateIndex
CREATE INDEX "wa_messages_direction_idx" ON "wa_messages"("direction");

-- CreateIndex
CREATE INDEX "wa_message_media_messageId_idx" ON "wa_message_media"("messageId");

-- CreateIndex
CREATE INDEX "wa_bulk_jobs_status_idx" ON "wa_bulk_jobs"("status");

-- CreateIndex
CREATE INDEX "wa_bulk_jobs_templateId_idx" ON "wa_bulk_jobs"("templateId");

-- CreateIndex
CREATE INDEX "wa_bulk_recipients_bulkJobId_idx" ON "wa_bulk_recipients"("bulkJobId");

-- CreateIndex
CREATE INDEX "wa_bulk_recipients_phone_idx" ON "wa_bulk_recipients"("phone");

-- CreateIndex
CREATE INDEX "wa_bulk_recipients_status_idx" ON "wa_bulk_recipients"("status");

-- CreateIndex
CREATE UNIQUE INDEX "custom_templates_name_key" ON "custom_templates"("name");

-- CreateIndex
CREATE INDEX "custom_templates_category_idx" ON "custom_templates"("category");

-- AddForeignKey
ALTER TABLE "wa_template_buttons" ADD CONSTRAINT "wa_template_buttons_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "wa_templates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wa_template_media" ADD CONSTRAINT "wa_template_media_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "wa_templates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wa_messages" ADD CONSTRAINT "wa_messages_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "wa_contacts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wa_messages" ADD CONSTRAINT "wa_messages_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "wa_templates"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wa_messages" ADD CONSTRAINT "wa_messages_bulkJobId_fkey" FOREIGN KEY ("bulkJobId") REFERENCES "wa_bulk_jobs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wa_message_media" ADD CONSTRAINT "wa_message_media_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "wa_messages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wa_bulk_jobs" ADD CONSTRAINT "wa_bulk_jobs_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "wa_templates"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wa_bulk_recipients" ADD CONSTRAINT "wa_bulk_recipients_bulkJobId_fkey" FOREIGN KEY ("bulkJobId") REFERENCES "wa_bulk_jobs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wa_bulk_recipients" ADD CONSTRAINT "wa_bulk_recipients_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "wa_contacts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
