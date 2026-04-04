
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
} = require('./runtime/edge.js')


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
  price: 'price',
  imageUrl: 'imageUrl',
  description: 'description',
  type: 'type',
  subType: 'subType',
  layoutType: 'layoutType',
  furnishing: 'furnishing',
  amenityCategory: 'amenityCategory',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AmenityScalarFieldEnum = {
  id: 'id',
  name: 'name',
  category: 'category'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
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

exports.Prisma.ModelName = {
  Property: 'Property',
  Amenity: 'Amenity'
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
      "value": "C:\\Users\\SADANANDKAJI\\clientprojects\\lavelleproperties\\packages\\db\\prisma\\generated",
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
    "previewFeatures": [],
    "sourceFilePath": "C:\\Users\\SADANANDKAJI\\clientprojects\\lavelleproperties\\packages\\db\\prisma\\schema.prisma",
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
  "postinstall": false,
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "DATABASE_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "generator client {\n  provider = \"prisma-client-js\"\n  output   = \"./generated\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n  url      = env(\"DATABASE_URL\")\n}\n\n// This is your updated schema.prisma\n\nmodel Property {\n  id          String  @id @default(uuid())\n  title       String\n  location    String\n  price       Int\n  imageUrl    String?\n  description String\n\n  // Categorization\n  type       PropertyType @default(RENT)\n  subType    SubType      @default(FLAT)\n  layoutType LayoutType   @default(BHK1)\n  furnishing Furnishing   @default(FURNISHED)\n\n  // NEW: The property itself belongs to a category. \n  // No relation to the Amenity table is needed for filtering.\n  amenityCategory AmenityCategory @default(BASIC)\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel Amenity {\n  id       String          @id @default(uuid())\n  name     String          @unique\n  category AmenityCategory @default(BASIC)\n}\n\nenum AmenityCategory {\n  BASIC\n  FULL\n}\n\nenum PropertyType {\n  RENT\n  LEASE\n  SALE\n}\n\nenum SubType {\n  FLAT\n  STANDALONE_HOUSE\n  INDEPENDENT_VILLA\n  PENTHOUSE\n}\n\nenum LayoutType {\n  BHK1   @map(\"1BHK\")\n  BHK2   @map(\"2BHK\")\n  BHK2_5 @map(\"2_5BHK\")\n  BHK3   @map(\"3BHK\")\n  BHK3_5 @map(\"3_5BHK\")\n  BHK4   @map(\"4BHK\")\n  BHK5   @map(\"5BHK\")\n  BHK5P  @map(\"5BHKP\")\n}\n\nenum Furnishing {\n  FURNISHED\n  SEMIFURNISHED\n  UNFURNISHED\n}\n",
  "inlineSchemaHash": "a0e0477fa2f35f0a829fe709a2ed274ae26b378d46e530c88e289bcbc3fdf4b4",
  "copyEngine": true
}
config.dirname = '/'

config.runtimeDataModel = JSON.parse("{\"models\":{\"Property\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid(4)\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"location\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"price\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"imageUrl\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"type\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"PropertyType\",\"default\":\"RENT\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"subType\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"SubType\",\"default\":\"FLAT\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"layoutType\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"LayoutType\",\"default\":\"BHK1\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"furnishing\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Furnishing\",\"default\":\"FURNISHED\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"amenityCategory\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"AmenityCategory\",\"default\":\"BASIC\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Amenity\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid(4)\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"category\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"AmenityCategory\",\"default\":\"BASIC\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false}},\"enums\":{\"AmenityCategory\":{\"values\":[{\"name\":\"BASIC\",\"dbName\":null},{\"name\":\"FULL\",\"dbName\":null}],\"dbName\":null},\"PropertyType\":{\"values\":[{\"name\":\"RENT\",\"dbName\":null},{\"name\":\"LEASE\",\"dbName\":null},{\"name\":\"SALE\",\"dbName\":null}],\"dbName\":null},\"SubType\":{\"values\":[{\"name\":\"FLAT\",\"dbName\":null},{\"name\":\"STANDALONE_HOUSE\",\"dbName\":null},{\"name\":\"INDEPENDENT_VILLA\",\"dbName\":null},{\"name\":\"PENTHOUSE\",\"dbName\":null}],\"dbName\":null},\"LayoutType\":{\"values\":[{\"name\":\"BHK1\",\"dbName\":\"1BHK\"},{\"name\":\"BHK2\",\"dbName\":\"2BHK\"},{\"name\":\"BHK2_5\",\"dbName\":\"2_5BHK\"},{\"name\":\"BHK3\",\"dbName\":\"3BHK\"},{\"name\":\"BHK3_5\",\"dbName\":\"3_5BHK\"},{\"name\":\"BHK4\",\"dbName\":\"4BHK\"},{\"name\":\"BHK5\",\"dbName\":\"5BHK\"},{\"name\":\"BHK5P\",\"dbName\":\"5BHKP\"}],\"dbName\":null},\"Furnishing\":{\"values\":[{\"name\":\"FURNISHED\",\"dbName\":null},{\"name\":\"SEMIFURNISHED\",\"dbName\":null},{\"name\":\"UNFURNISHED\",\"dbName\":null}],\"dbName\":null}},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.engineWasm = undefined

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

