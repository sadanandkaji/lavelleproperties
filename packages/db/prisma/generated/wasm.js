
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  NotFoundError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  skip,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  getRuntime
} = require('./runtime/wasm.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.NotFoundError = NotFoundError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}





/**
 * Enums
 */
exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.PropertyScalarFieldEnum = {
  id: 'id',
  title: 'title',
  location: 'location',
  description: 'description',
  price: 'price',
  pricePerSqft: 'pricePerSqft',
  priceNote: 'priceNote',
  callForPrice: 'callForPrice',
  isSoldOut: 'isSoldOut',
  bedrooms: 'bedrooms',
  bathrooms: 'bathrooms',
  halfBaths: 'halfBaths',
  totalRooms: 'totalRooms',
  floors: 'floors',
  floorLevel: 'floorLevel',
  areaSqft: 'areaSqft',
  lotSizeSqft: 'lotSizeSqft',
  yearBuilt: 'yearBuilt',
  yearRemodeled: 'yearRemodeled',
  rentPeriods: 'rentPeriods',
  statuses: 'statuses',
  parkingOptions: 'parkingOptions',
  basementOptions: 'basementOptions',
  type: 'type',
  subType: 'subType',
  layoutType: 'layoutType',
  furnishing: 'furnishing',
  amenityCategory: 'amenityCategory',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PropertyImageScalarFieldEnum = {
  id: 'id',
  url: 'url',
  isPrimary: 'isPrimary',
  order: 'order',
  propertyId: 'propertyId',
  createdAt: 'createdAt'
};

exports.Prisma.BasicAmenityScalarFieldEnum = {
  id: 'id',
  name: 'name',
  normalized: 'normalized',
  propertyId: 'propertyId',
  createdAt: 'createdAt'
};

exports.Prisma.FullAmenityScalarFieldEnum = {
  id: 'id',
  name: 'name',
  normalized: 'normalized',
  propertyId: 'propertyId',
  createdAt: 'createdAt'
};

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  name: 'name',
  email: 'email',
  phone: 'phone',
  password: 'password',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CartScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CartItemScalarFieldEnum = {
  id: 'id',
  cartId: 'cartId',
  propertyId: 'propertyId',
  addedAt: 'addedAt'
};

exports.Prisma.BookingScalarFieldEnum = {
  id: 'id',
  name: 'name',
  email: 'email',
  phone: 'phone',
  date: 'date',
  time: 'time',
  propertyTitle: 'propertyTitle',
  propertyId: 'propertyId',
  userId: 'userId',
  createdAt: 'createdAt'
};

exports.Prisma.WaTemplateScalarFieldEnum = {
  id: 'id',
  metaTemplateId: 'metaTemplateId',
  name: 'name',
  category: 'category',
  language: 'language',
  status: 'status',
  rejectionReason: 'rejectionReason',
  body: 'body',
  headerFormat: 'headerFormat',
  headerText: 'headerText',
  headerMediaId: 'headerMediaId',
  headerMediaUrl: 'headerMediaUrl',
  headerFilename: 'headerFilename',
  footer: 'footer',
  components: 'components',
  variables: 'variables',
  parameterFormat: 'parameterFormat',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.WaTemplateButtonScalarFieldEnum = {
  id: 'id',
  templateId: 'templateId',
  index: 'index',
  type: 'type',
  text: 'text',
  url: 'url',
  phone: 'phone',
  createdAt: 'createdAt'
};

exports.Prisma.WaTemplateMediaScalarFieldEnum = {
  id: 'id',
  templateId: 'templateId',
  mediaType: 'mediaType',
  mediaId: 'mediaId',
  url: 'url',
  filename: 'filename',
  mimeType: 'mimeType',
  sizeBytes: 'sizeBytes',
  caption: 'caption',
  isHeader: 'isHeader',
  uploadedAt: 'uploadedAt'
};

exports.Prisma.WaContactScalarFieldEnum = {
  id: 'id',
  phone: 'phone',
  name: 'name',
  waId: 'waId',
  isValid: 'isValid',
  optedOut: 'optedOut',
  notes: 'notes',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.WaMessageScalarFieldEnum = {
  id: 'id',
  wamid: 'wamid',
  direction: 'direction',
  status: 'status',
  contactId: 'contactId',
  to: 'to',
  type: 'type',
  body: 'body',
  templateId: 'templateId',
  variablesUsed: 'variablesUsed',
  bulkJobId: 'bulkJobId',
  errorCode: 'errorCode',
  errorMessage: 'errorMessage',
  sentAt: 'sentAt',
  deliveredAt: 'deliveredAt',
  readAt: 'readAt',
  failedAt: 'failedAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.WaMessageMediaScalarFieldEnum = {
  id: 'id',
  messageId: 'messageId',
  mediaType: 'mediaType',
  mediaId: 'mediaId',
  url: 'url',
  filename: 'filename',
  mimeType: 'mimeType',
  sizeBytes: 'sizeBytes',
  caption: 'caption',
  createdAt: 'createdAt'
};

exports.Prisma.WaBulkJobScalarFieldEnum = {
  id: 'id',
  label: 'label',
  type: 'type',
  status: 'status',
  templateId: 'templateId',
  message: 'message',
  total: 'total',
  sent: 'sent',
  failed: 'failed',
  cancelled: 'cancelled',
  completedAt: 'completedAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.WaBulkRecipientScalarFieldEnum = {
  id: 'id',
  bulkJobId: 'bulkJobId',
  contactId: 'contactId',
  phone: 'phone',
  name: 'name',
  variables: 'variables',
  status: 'status',
  wamid: 'wamid',
  errorMsg: 'errorMsg',
  sentAt: 'sentAt'
};

exports.Prisma.CustomTemplateScalarFieldEnum = {
  id: 'id',
  name: 'name',
  body: 'body',
  category: 'category',
  emoji: 'emoji',
  usageCount: 'usageCount',
  mediaType: 'mediaType',
  mediaUrl: 'mediaUrl',
  mediaCaption: 'mediaCaption',
  buttons: 'buttons',
  quickReplies: 'quickReplies',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.JsonNullValueInput = {
  JsonNull: Prisma.JsonNull
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};
exports.PropertyType = exports.$Enums.PropertyType = {
  RENT: 'RENT',
  LEASE: 'LEASE',
  SALE: 'SALE'
};

exports.SubType = exports.$Enums.SubType = {
  FLAT: 'FLAT',
  STANDALONE_HOUSE: 'STANDALONE_HOUSE',
  INDEPENDENT_VILLA: 'INDEPENDENT_VILLA',
  PENTHOUSE: 'PENTHOUSE'
};

exports.LayoutType = exports.$Enums.LayoutType = {
  BHK1: 'BHK1',
  BHK2: 'BHK2',
  BHK2_5: 'BHK2_5',
  BHK3: 'BHK3',
  BHK3_5: 'BHK3_5',
  BHK4: 'BHK4',
  BHK5: 'BHK5',
  BHK5P: 'BHK5P'
};

exports.Furnishing = exports.$Enums.Furnishing = {
  FURNISHED: 'FURNISHED',
  SEMIFURNISHED: 'SEMIFURNISHED',
  UNFURNISHED: 'UNFURNISHED'
};

exports.AmenityCategory = exports.$Enums.AmenityCategory = {
  BASIC: 'BASIC',
  FULL: 'FULL'
};

exports.WaTemplateCategory = exports.$Enums.WaTemplateCategory = {
  MARKETING: 'MARKETING',
  UTILITY: 'UTILITY',
  AUTHENTICATION: 'AUTHENTICATION'
};

exports.WaTemplateStatus = exports.$Enums.WaTemplateStatus = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  PAUSED: 'PAUSED',
  DISABLED: 'DISABLED',
  ARCHIVED: 'ARCHIVED'
};

exports.WaHeaderFormat = exports.$Enums.WaHeaderFormat = {
  TEXT: 'TEXT',
  IMAGE: 'IMAGE',
  VIDEO: 'VIDEO',
  DOCUMENT: 'DOCUMENT',
  LOCATION: 'LOCATION'
};

exports.WaParamFormat = exports.$Enums.WaParamFormat = {
  NAMED: 'NAMED',
  POSITIONAL: 'POSITIONAL'
};

exports.WaButtonType = exports.$Enums.WaButtonType = {
  QUICK_REPLY: 'QUICK_REPLY',
  URL: 'URL',
  PHONE_NUMBER: 'PHONE_NUMBER',
  COPY_CODE: 'COPY_CODE'
};

exports.WaMediaType = exports.$Enums.WaMediaType = {
  IMAGE: 'IMAGE',
  VIDEO: 'VIDEO',
  DOCUMENT: 'DOCUMENT',
  AUDIO: 'AUDIO',
  STICKER: 'STICKER'
};

exports.WaMsgDirection = exports.$Enums.WaMsgDirection = {
  OUTBOUND: 'OUTBOUND',
  INBOUND: 'INBOUND'
};

exports.WaMsgStatus = exports.$Enums.WaMsgStatus = {
  QUEUED: 'QUEUED',
  SENT: 'SENT',
  DELIVERED: 'DELIVERED',
  READ: 'READ',
  FAILED: 'FAILED',
  CANCELLED: 'CANCELLED'
};

exports.WaMsgType = exports.$Enums.WaMsgType = {
  TEMPLATE: 'TEMPLATE',
  TEXT: 'TEXT',
  IMAGE: 'IMAGE',
  VIDEO: 'VIDEO',
  DOCUMENT: 'DOCUMENT',
  AUDIO: 'AUDIO',
  STICKER: 'STICKER',
  LOCATION: 'LOCATION',
  REACTION: 'REACTION',
  INTERACTIVE: 'INTERACTIVE',
  UNKNOWN: 'UNKNOWN'
};

exports.WaBulkType = exports.$Enums.WaBulkType = {
  TEMPLATE: 'TEMPLATE',
  SIMPLE: 'SIMPLE'
};

exports.WaBulkStatus = exports.$Enums.WaBulkStatus = {
  RUNNING: 'RUNNING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  CANCELLED: 'CANCELLED'
};

exports.Prisma.ModelName = {
  Property: 'Property',
  PropertyImage: 'PropertyImage',
  BasicAmenity: 'BasicAmenity',
  FullAmenity: 'FullAmenity',
  User: 'User',
  Cart: 'Cart',
  CartItem: 'CartItem',
  Booking: 'Booking',
  WaTemplate: 'WaTemplate',
  WaTemplateButton: 'WaTemplateButton',
  WaTemplateMedia: 'WaTemplateMedia',
  WaContact: 'WaContact',
  WaMessage: 'WaMessage',
  WaMessageMedia: 'WaMessageMedia',
  WaBulkJob: 'WaBulkJob',
  WaBulkRecipient: 'WaBulkRecipient',
  CustomTemplate: 'CustomTemplate'
};
/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "C:\\Users\\SADANANDKAJI\\clientprojects\\lavelleventure\\lavelleproperties\\packages\\db\\prisma\\generated",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "windows",
        "native": true
      }
    ],
    "previewFeatures": [
      "driverAdapters"
    ],
    "sourceFilePath": "C:\\Users\\SADANANDKAJI\\clientprojects\\lavelleventure\\lavelleproperties\\packages\\db\\prisma\\schema.prisma",
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": null,
    "schemaEnvPath": "../../.env"
  },
  "relativePath": "..",
  "clientVersion": "5.22.0",
  "engineVersion": "605197351a3c8bdd595af2d2a9bc3025bca48ea2",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "postgresql",
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "DATABASE_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "generator client {\n  provider        = \"prisma-client-js\"\n  output          = \"./generated\"\n  previewFeatures = [\"driverAdapters\"]\n}\n\ndatasource db {\n  provider = \"postgresql\"\n  url      = env(\"DATABASE_URL\")\n}\n\n// ── Existing models (unchanged) ───────────────────────────────────────────────\n\nmodel Property {\n  id          String @id @default(uuid())\n  title       String\n  location    String\n  description String\n\n  price        Int\n  pricePerSqft Int?\n  priceNote    String?\n  callForPrice Boolean @default(false)\n  isSoldOut    Boolean @default(false)\n\n  bedrooms      Int?\n  bathrooms     Int?\n  halfBaths     Int?\n  totalRooms    Int?\n  floors        Int?\n  floorLevel    Int?\n  areaSqft      Int?\n  lotSizeSqft   Int?\n  yearBuilt     Int?\n  yearRemodeled Int?\n\n  rentPeriods     String[] @default([])\n  statuses        String[] @default([])\n  parkingOptions  String[] @default([])\n  basementOptions String[] @default([])\n\n  type            PropertyType    @default(RENT)\n  subType         SubType         @default(FLAT)\n  layoutType      LayoutType      @default(BHK1)\n  furnishing      Furnishing      @default(FURNISHED)\n  amenityCategory AmenityCategory @default(BASIC)\n\n  images         PropertyImage[]\n  basicAmenities BasicAmenity[]\n  fullAmenities  FullAmenity[]\n  cartItems      CartItem[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel PropertyImage {\n  id         String   @id @default(uuid())\n  url        String\n  isPrimary  Boolean  @default(false)\n  order      Int      @default(0)\n  property   Property @relation(fields: [propertyId], references: [id], onDelete: Cascade)\n  propertyId String\n  createdAt  DateTime @default(now())\n}\n\nmodel BasicAmenity {\n  id         String   @id @default(uuid())\n  name       String\n  normalized String\n  property   Property @relation(fields: [propertyId], references: [id], onDelete: Cascade)\n  propertyId String\n  createdAt  DateTime @default(now())\n\n  @@unique([propertyId, normalized])\n}\n\nmodel FullAmenity {\n  id         String   @id @default(uuid())\n  name       String\n  normalized String\n  property   Property @relation(fields: [propertyId], references: [id], onDelete: Cascade)\n  propertyId String\n  createdAt  DateTime @default(now())\n\n  @@unique([propertyId, normalized])\n}\n\nmodel User {\n  id        String    @id @default(uuid())\n  name      String?\n  email     String    @unique\n  phone     String?\n  password  String?\n  cart      Cart?\n  bookings  Booking[]\n  createdAt DateTime  @default(now())\n  updatedAt DateTime  @updatedAt\n}\n\nmodel Cart {\n  id        String     @id @default(uuid())\n  user      User       @relation(fields: [userId], references: [id], onDelete: Cascade)\n  userId    String     @unique\n  items     CartItem[]\n  createdAt DateTime   @default(now())\n  updatedAt DateTime   @updatedAt\n}\n\nmodel CartItem {\n  id         String   @id @default(uuid())\n  cart       Cart     @relation(fields: [cartId], references: [id], onDelete: Cascade)\n  cartId     String\n  property   Property @relation(fields: [propertyId], references: [id], onDelete: Cascade)\n  propertyId String\n  addedAt    DateTime @default(now())\n\n  @@unique([cartId, propertyId])\n}\n\nmodel Booking {\n  id            String   @id @default(uuid())\n  name          String\n  email         String\n  phone         String\n  date          String\n  time          String\n  propertyTitle String\n  propertyId    String\n  user          User?    @relation(fields: [userId], references: [id])\n  userId        String?\n  createdAt     DateTime @default(now())\n}\n\n// ── WhatsApp Messaging ────────────────────────────────────────────────────────\n\n// Stores WhatsApp message templates synced from Meta or created locally\nmodel WaTemplate {\n  id              String             @id @default(uuid()) // internal UUID\n  metaTemplateId  String?            @unique // Meta's numeric template ID e.g. \"1727809288586265\"\n  name            String // e.g. \"lavelle_wlcm\"\n  category        WaTemplateCategory\n  language        String // e.g. \"en_US\"\n  status          WaTemplateStatus   @default(PENDING)\n  rejectionReason String?\n\n  // Body text (extracted from BODY component for quick access)\n  body String\n\n  // Header info\n  headerFormat   WaHeaderFormat? // TEXT | IMAGE | VIDEO | DOCUMENT | null\n  headerText     String? // if headerFormat = TEXT\n  headerMediaId  String? // Meta media object ID (uploaded via Resumable Upload API)\n  headerMediaUrl String? // public CDN/S3 URL for the header image/video/doc\n  headerFilename String? // for DOCUMENT headers\n\n  // Footer text\n  footer String?\n\n  // Full components JSON as returned by Meta API (for sending)\n  components Json @default(\"[]\")\n\n  // Variables extracted from body e.g. [\"{{1}}\", \"{{name}}\"]\n  variables String[] @default([])\n\n  // Parameter format: named ({{name}}) or positional ({{1}})\n  parameterFormat WaParamFormat @default(NAMED)\n\n  // Relations\n  buttons  WaTemplateButton[]\n  media    WaTemplateMedia[]\n  messages WaMessage[]\n  bulkJobs WaBulkJob[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([status])\n  @@index([category])\n  @@index([name])\n  @@map(\"wa_templates\")\n}\n\n// Template buttons stored separately for queryability\nmodel WaTemplateButton {\n  id         String       @id @default(uuid())\n  template   WaTemplate   @relation(fields: [templateId], references: [id], onDelete: Cascade)\n  templateId String\n  index      Int // button order (0-based)\n  type       WaButtonType\n  text       String\n  url        String? // for URL buttons\n  phone      String? // for PHONE_NUMBER buttons\n  createdAt  DateTime     @default(now())\n\n  @@index([templateId])\n  @@map(\"wa_template_buttons\")\n}\n\n// Media assets attached to templates (header image/video/doc)\nmodel WaTemplateMedia {\n  id         String      @id @default(uuid())\n  template   WaTemplate  @relation(fields: [templateId], references: [id], onDelete: Cascade)\n  templateId String\n  mediaType  WaMediaType // IMAGE | VIDEO | DOCUMENT | AUDIO | STICKER\n  mediaId    String? // Meta media object ID (from Resumable Upload API)\n  url        String? // public CDN/S3 URL\n  filename   String? // original filename\n  mimeType   String? // e.g. \"image/jpeg\", \"video/mp4\"\n  sizeBytes  Int? // file size\n  caption    String? // optional caption (image/video/doc only)\n  isHeader   Boolean     @default(true) // true = template header media\n  uploadedAt DateTime    @default(now())\n\n  @@index([templateId])\n  @@index([mediaType])\n  @@map(\"wa_template_media\")\n}\n\n// Individual WhatsApp contacts / recipients\nmodel WaContact {\n  id       String  @id @default(uuid())\n  phone    String  @unique // E.164 format e.g. \"917892358529\"\n  name     String? // display name (optional)\n  waId     String? // WhatsApp's wa_id (may differ from phone)\n  isValid  Boolean @default(true) // false if number not on WhatsApp\n  optedOut Boolean @default(false) // true if user replied STOP\n  notes    String?\n\n  messages       WaMessage[]\n  bulkRecipients WaBulkRecipient[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([phone])\n  @@index([optedOut])\n  @@map(\"wa_contacts\")\n}\n\n// Individual messages sent or received\nmodel WaMessage {\n  id        String         @id @default(uuid())\n  wamid     String?        @unique // WhatsApp message ID e.g. \"wamid.HBgM...\"\n  direction WaMsgDirection @default(OUTBOUND)\n  status    WaMsgStatus    @default(QUEUED)\n\n  // Recipient\n  contact   WaContact? @relation(fields: [contactId], references: [id])\n  contactId String?\n  to        String // phone number (denormalized for speed)\n\n  // Content\n  type       WaMsgType   @default(TEMPLATE)\n  body       String? // rendered message body\n  templateId String?\n  template   WaTemplate? @relation(fields: [templateId], references: [id])\n\n  // Variables used when sending (snapshot)\n  variablesUsed Json? // { \"1\": \"Raj\", \"name\": \"Raj\" }\n\n  // Bulk job reference\n  bulkJobId String?\n  bulkJob   WaBulkJob? @relation(fields: [bulkJobId], references: [id])\n\n  // Media (for incoming messages or outgoing with media)\n  media WaMessageMedia[]\n\n  // Delivery tracking\n  errorCode    Int?\n  errorMessage String?\n  sentAt       DateTime?\n  deliveredAt  DateTime?\n  readAt       DateTime?\n  failedAt     DateTime?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([to])\n  @@index([status])\n  @@index([templateId])\n  @@index([bulkJobId])\n  @@index([wamid])\n  @@index([direction])\n  @@map(\"wa_messages\")\n}\n\n// Media attached to individual messages (incoming or outgoing)\nmodel WaMessageMedia {\n  id        String      @id @default(uuid())\n  message   WaMessage   @relation(fields: [messageId], references: [id], onDelete: Cascade)\n  messageId String\n  mediaType WaMediaType\n  mediaId   String? // Meta media object ID\n  url       String? // public URL (after download/upload)\n  filename  String?\n  mimeType  String?\n  sizeBytes Int?\n  caption   String?\n  createdAt DateTime    @default(now())\n\n  @@index([messageId])\n  @@map(\"wa_message_media\")\n}\n\n// Bulk send jobs\nmodel WaBulkJob {\n  id     String       @id @default(uuid())\n  label  String // human name e.g. \"Diwali campaign\"\n  type   WaBulkType\n  status WaBulkStatus @default(RUNNING)\n\n  // Template (for template jobs)\n  templateId String?\n  template   WaTemplate? @relation(fields: [templateId], references: [id])\n\n  // Simple message (for simple text jobs)\n  message String?\n\n  // Counters\n  total     Int @default(0)\n  sent      Int @default(0)\n  failed    Int @default(0)\n  cancelled Int @default(0)\n\n  // Per-recipient tracking\n  recipients WaBulkRecipient[]\n  messages   WaMessage[]\n\n  completedAt DateTime?\n  createdAt   DateTime  @default(now())\n  updatedAt   DateTime  @updatedAt\n\n  @@index([status])\n  @@index([templateId])\n  @@map(\"wa_bulk_jobs\")\n}\n\n// Each recipient row in a bulk job\nmodel WaBulkRecipient {\n  id        String      @id @default(uuid())\n  bulkJob   WaBulkJob   @relation(fields: [bulkJobId], references: [id], onDelete: Cascade)\n  bulkJobId String\n  contact   WaContact?  @relation(fields: [contactId], references: [id])\n  contactId String?\n  phone     String // denormalized\n  name      String?\n  variables Json? // per-recipient variable values\n  status    WaMsgStatus @default(QUEUED)\n  wamid     String? // WhatsApp message ID after send\n  errorMsg  String?\n  sentAt    DateTime?\n\n  @@index([bulkJobId])\n  @@index([phone])\n  @@index([status])\n  @@map(\"wa_bulk_recipients\")\n}\n\nmodel CustomTemplate {\n  id         String @id @default(uuid())\n  name       String @unique\n  body       String @default(\"\")\n  category   String @default(\"General\")\n  emoji      String @default(\"💬\")\n  usageCount Int    @default(0)\n\n  // Rich media support\n  mediaType    String? @map(\"media_type\") // 'image', 'video', 'document'\n  mediaUrl     String? @map(\"media_url\") // CDN/Storage URL\n  mediaCaption String? @map(\"media_caption\") // Optional caption text\n\n  // Interactive elements (stored as JSON)\n  buttons      Json @default(\"[]\") // Array of button objects\n  quickReplies Json @default(\"[]\") // Array of quick reply objects\n\n  // Timestamps\n  createdAt DateTime @default(now()) @map(\"created_at\")\n  updatedAt DateTime @updatedAt @map(\"updated_at\")\n\n  @@index([category])\n  @@index([mediaType])\n  @@index([usageCount])\n  @@map(\"custom_templates\")\n}\n\n// ── Enums ─────────────────────────────────────────────────────────────────────\n\nenum WaTemplateCategory {\n  MARKETING\n  UTILITY\n  AUTHENTICATION\n}\n\nenum WaTemplateStatus {\n  PENDING // submitted, under Meta review\n  APPROVED // active, can be sent\n  REJECTED // rejected by Meta\n  PAUSED // paused due to low quality\n  DISABLED // disabled by Meta\n  ARCHIVED // inactive > 12 months\n}\n\nenum WaParamFormat {\n  NAMED // {{first_name}}\n  POSITIONAL // {{1}}, {{2}}\n}\n\nenum WaHeaderFormat {\n  TEXT\n  IMAGE\n  VIDEO\n  DOCUMENT\n  LOCATION\n}\n\nenum WaButtonType {\n  QUICK_REPLY\n  URL\n  PHONE_NUMBER\n  COPY_CODE\n}\n\nenum WaMediaType {\n  IMAGE\n  VIDEO\n  DOCUMENT\n  AUDIO\n  STICKER\n}\n\nenum WaMsgDirection {\n  OUTBOUND // sent by your business\n  INBOUND // received from customer\n}\n\nenum WaMsgStatus {\n  QUEUED\n  SENT\n  DELIVERED\n  READ\n  FAILED\n  CANCELLED\n}\n\nenum WaMsgType {\n  TEMPLATE\n  TEXT\n  IMAGE\n  VIDEO\n  DOCUMENT\n  AUDIO\n  STICKER\n  LOCATION\n  REACTION\n  INTERACTIVE\n  UNKNOWN\n}\n\nenum WaBulkType {\n  TEMPLATE\n  SIMPLE\n}\n\nenum WaBulkStatus {\n  RUNNING\n  COMPLETED\n  FAILED\n  CANCELLED\n}\n\n// ── Existing enums (unchanged) ─────────────────────────────────────────────────\n\nenum AmenityCategory {\n  BASIC\n  FULL\n}\n\nenum PropertyType {\n  RENT\n  LEASE\n  SALE\n}\n\nenum SubType {\n  FLAT\n  STANDALONE_HOUSE\n  INDEPENDENT_VILLA\n  PENTHOUSE\n}\n\nenum LayoutType {\n  BHK1   @map(\"1BHK\")\n  BHK2   @map(\"2BHK\")\n  BHK2_5 @map(\"2_5BHK\")\n  BHK3   @map(\"3BHK\")\n  BHK3_5 @map(\"3_5BHK\")\n  BHK4   @map(\"4BHK\")\n  BHK5   @map(\"5BHK\")\n  BHK5P  @map(\"5BHKP\")\n}\n\nenum Furnishing {\n  FURNISHED\n  SEMIFURNISHED\n  UNFURNISHED\n}\n",
  "inlineSchemaHash": "d3c68c13293d33357320a2624dde0da80cd03d3904d016a5e02dee6cab56d830",
  "copyEngine": true
}
config.dirname = '/'

config.runtimeDataModel = JSON.parse("{\"models\":{\"Property\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"title\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"location\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"price\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"pricePerSqft\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"priceNote\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"callForPrice\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"isSoldOut\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"bedrooms\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"bathrooms\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"halfBaths\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"totalRooms\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"floors\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"floorLevel\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"areaSqft\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"lotSizeSqft\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"yearBuilt\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"yearRemodeled\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"rentPeriods\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"statuses\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"parkingOptions\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"basementOptions\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"type\",\"kind\":\"enum\",\"type\":\"PropertyType\"},{\"name\":\"subType\",\"kind\":\"enum\",\"type\":\"SubType\"},{\"name\":\"layoutType\",\"kind\":\"enum\",\"type\":\"LayoutType\"},{\"name\":\"furnishing\",\"kind\":\"enum\",\"type\":\"Furnishing\"},{\"name\":\"amenityCategory\",\"kind\":\"enum\",\"type\":\"AmenityCategory\"},{\"name\":\"images\",\"kind\":\"object\",\"type\":\"PropertyImage\",\"relationName\":\"PropertyToPropertyImage\"},{\"name\":\"basicAmenities\",\"kind\":\"object\",\"type\":\"BasicAmenity\",\"relationName\":\"BasicAmenityToProperty\"},{\"name\":\"fullAmenities\",\"kind\":\"object\",\"type\":\"FullAmenity\",\"relationName\":\"FullAmenityToProperty\"},{\"name\":\"cartItems\",\"kind\":\"object\",\"type\":\"CartItem\",\"relationName\":\"CartItemToProperty\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"PropertyImage\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"url\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"isPrimary\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"order\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"property\",\"kind\":\"object\",\"type\":\"Property\",\"relationName\":\"PropertyToPropertyImage\"},{\"name\":\"propertyId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"BasicAmenity\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"normalized\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"property\",\"kind\":\"object\",\"type\":\"Property\",\"relationName\":\"BasicAmenityToProperty\"},{\"name\":\"propertyId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"FullAmenity\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"normalized\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"property\",\"kind\":\"object\",\"type\":\"Property\",\"relationName\":\"FullAmenityToProperty\"},{\"name\":\"propertyId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"User\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"email\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"phone\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"password\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"cart\",\"kind\":\"object\",\"type\":\"Cart\",\"relationName\":\"CartToUser\"},{\"name\":\"bookings\",\"kind\":\"object\",\"type\":\"Booking\",\"relationName\":\"BookingToUser\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"Cart\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"CartToUser\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"items\",\"kind\":\"object\",\"type\":\"CartItem\",\"relationName\":\"CartToCartItem\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"CartItem\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"cart\",\"kind\":\"object\",\"type\":\"Cart\",\"relationName\":\"CartToCartItem\"},{\"name\":\"cartId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"property\",\"kind\":\"object\",\"type\":\"Property\",\"relationName\":\"CartItemToProperty\"},{\"name\":\"propertyId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"addedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"Booking\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"email\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"phone\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"date\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"time\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"propertyTitle\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"propertyId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"BookingToUser\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"WaTemplate\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"metaTemplateId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"category\",\"kind\":\"enum\",\"type\":\"WaTemplateCategory\"},{\"name\":\"language\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"status\",\"kind\":\"enum\",\"type\":\"WaTemplateStatus\"},{\"name\":\"rejectionReason\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"body\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"headerFormat\",\"kind\":\"enum\",\"type\":\"WaHeaderFormat\"},{\"name\":\"headerText\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"headerMediaId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"headerMediaUrl\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"headerFilename\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"footer\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"components\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"variables\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"parameterFormat\",\"kind\":\"enum\",\"type\":\"WaParamFormat\"},{\"name\":\"buttons\",\"kind\":\"object\",\"type\":\"WaTemplateButton\",\"relationName\":\"WaTemplateToWaTemplateButton\"},{\"name\":\"media\",\"kind\":\"object\",\"type\":\"WaTemplateMedia\",\"relationName\":\"WaTemplateToWaTemplateMedia\"},{\"name\":\"messages\",\"kind\":\"object\",\"type\":\"WaMessage\",\"relationName\":\"WaMessageToWaTemplate\"},{\"name\":\"bulkJobs\",\"kind\":\"object\",\"type\":\"WaBulkJob\",\"relationName\":\"WaBulkJobToWaTemplate\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":\"wa_templates\"},\"WaTemplateButton\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"template\",\"kind\":\"object\",\"type\":\"WaTemplate\",\"relationName\":\"WaTemplateToWaTemplateButton\"},{\"name\":\"templateId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"index\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"type\",\"kind\":\"enum\",\"type\":\"WaButtonType\"},{\"name\":\"text\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"url\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"phone\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":\"wa_template_buttons\"},\"WaTemplateMedia\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"template\",\"kind\":\"object\",\"type\":\"WaTemplate\",\"relationName\":\"WaTemplateToWaTemplateMedia\"},{\"name\":\"templateId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"mediaType\",\"kind\":\"enum\",\"type\":\"WaMediaType\"},{\"name\":\"mediaId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"url\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"filename\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"mimeType\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"sizeBytes\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"caption\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"isHeader\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"uploadedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":\"wa_template_media\"},\"WaContact\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"phone\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"waId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"isValid\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"optedOut\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"notes\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"messages\",\"kind\":\"object\",\"type\":\"WaMessage\",\"relationName\":\"WaContactToWaMessage\"},{\"name\":\"bulkRecipients\",\"kind\":\"object\",\"type\":\"WaBulkRecipient\",\"relationName\":\"WaBulkRecipientToWaContact\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":\"wa_contacts\"},\"WaMessage\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"wamid\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"direction\",\"kind\":\"enum\",\"type\":\"WaMsgDirection\"},{\"name\":\"status\",\"kind\":\"enum\",\"type\":\"WaMsgStatus\"},{\"name\":\"contact\",\"kind\":\"object\",\"type\":\"WaContact\",\"relationName\":\"WaContactToWaMessage\"},{\"name\":\"contactId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"to\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"type\",\"kind\":\"enum\",\"type\":\"WaMsgType\"},{\"name\":\"body\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"templateId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"template\",\"kind\":\"object\",\"type\":\"WaTemplate\",\"relationName\":\"WaMessageToWaTemplate\"},{\"name\":\"variablesUsed\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"bulkJobId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"bulkJob\",\"kind\":\"object\",\"type\":\"WaBulkJob\",\"relationName\":\"WaBulkJobToWaMessage\"},{\"name\":\"media\",\"kind\":\"object\",\"type\":\"WaMessageMedia\",\"relationName\":\"WaMessageToWaMessageMedia\"},{\"name\":\"errorCode\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"errorMessage\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"sentAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"deliveredAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"readAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"failedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":\"wa_messages\"},\"WaMessageMedia\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"message\",\"kind\":\"object\",\"type\":\"WaMessage\",\"relationName\":\"WaMessageToWaMessageMedia\"},{\"name\":\"messageId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"mediaType\",\"kind\":\"enum\",\"type\":\"WaMediaType\"},{\"name\":\"mediaId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"url\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"filename\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"mimeType\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"sizeBytes\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"caption\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":\"wa_message_media\"},\"WaBulkJob\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"label\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"type\",\"kind\":\"enum\",\"type\":\"WaBulkType\"},{\"name\":\"status\",\"kind\":\"enum\",\"type\":\"WaBulkStatus\"},{\"name\":\"templateId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"template\",\"kind\":\"object\",\"type\":\"WaTemplate\",\"relationName\":\"WaBulkJobToWaTemplate\"},{\"name\":\"message\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"total\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"sent\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"failed\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"cancelled\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"recipients\",\"kind\":\"object\",\"type\":\"WaBulkRecipient\",\"relationName\":\"WaBulkJobToWaBulkRecipient\"},{\"name\":\"messages\",\"kind\":\"object\",\"type\":\"WaMessage\",\"relationName\":\"WaBulkJobToWaMessage\"},{\"name\":\"completedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":\"wa_bulk_jobs\"},\"WaBulkRecipient\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"bulkJob\",\"kind\":\"object\",\"type\":\"WaBulkJob\",\"relationName\":\"WaBulkJobToWaBulkRecipient\"},{\"name\":\"bulkJobId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"contact\",\"kind\":\"object\",\"type\":\"WaContact\",\"relationName\":\"WaBulkRecipientToWaContact\"},{\"name\":\"contactId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"phone\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"variables\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"status\",\"kind\":\"enum\",\"type\":\"WaMsgStatus\"},{\"name\":\"wamid\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"errorMsg\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"sentAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":\"wa_bulk_recipients\"},\"CustomTemplate\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"body\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"category\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"emoji\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"usageCount\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"mediaType\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"media_type\"},{\"name\":\"mediaUrl\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"media_url\"},{\"name\":\"mediaCaption\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"media_caption\"},{\"name\":\"buttons\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"quickReplies\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\",\"dbName\":\"created_at\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\",\"dbName\":\"updated_at\"}],\"dbName\":\"custom_templates\"}},\"enums\":{},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.engineWasm = {
  getRuntime: () => require('./query_engine_bg.js'),
  getQueryEngineWasmModule: async () => {
    const loader = (await import('#wasm-engine-loader')).default
    const engine = (await loader).default
    return engine 
  }
}

config.injectableEdgeEnv = () => ({
  parsed: {
    DATABASE_URL: typeof globalThis !== 'undefined' && globalThis['DATABASE_URL'] || typeof process !== 'undefined' && process.env && process.env.DATABASE_URL || undefined
  }
})

if (typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined) {
  Debug.enable(typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined)
}

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

