
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Property
 * 
 */
export type Property = $Result.DefaultSelection<Prisma.$PropertyPayload>
/**
 * Model PropertyImage
 * 
 */
export type PropertyImage = $Result.DefaultSelection<Prisma.$PropertyImagePayload>
/**
 * Model Amenity
 * 
 */
export type Amenity = $Result.DefaultSelection<Prisma.$AmenityPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const PropertyType: {
  RENT: 'RENT',
  LEASE: 'LEASE',
  SALE: 'SALE'
};

export type PropertyType = (typeof PropertyType)[keyof typeof PropertyType]


export const SubType: {
  FLAT: 'FLAT',
  STANDALONE_HOUSE: 'STANDALONE_HOUSE',
  INDEPENDENT_VILLA: 'INDEPENDENT_VILLA',
  PENTHOUSE: 'PENTHOUSE'
};

export type SubType = (typeof SubType)[keyof typeof SubType]


export const LayoutType: {
  BHK1: 'BHK1',
  BHK2: 'BHK2',
  BHK2_5: 'BHK2_5',
  BHK3: 'BHK3',
  BHK3_5: 'BHK3_5',
  BHK4: 'BHK4',
  BHK5: 'BHK5',
  BHK5P: 'BHK5P'
};

export type LayoutType = (typeof LayoutType)[keyof typeof LayoutType]


export const Furnishing: {
  FURNISHED: 'FURNISHED',
  SEMIFURNISHED: 'SEMIFURNISHED',
  UNFURNISHED: 'UNFURNISHED'
};

export type Furnishing = (typeof Furnishing)[keyof typeof Furnishing]


export const AmenityCategory: {
  BASIC: 'BASIC',
  FULL: 'FULL'
};

export type AmenityCategory = (typeof AmenityCategory)[keyof typeof AmenityCategory]

}

export type PropertyType = $Enums.PropertyType

export const PropertyType: typeof $Enums.PropertyType

export type SubType = $Enums.SubType

export const SubType: typeof $Enums.SubType

export type LayoutType = $Enums.LayoutType

export const LayoutType: typeof $Enums.LayoutType

export type Furnishing = $Enums.Furnishing

export const Furnishing: typeof $Enums.Furnishing

export type AmenityCategory = $Enums.AmenityCategory

export const AmenityCategory: typeof $Enums.AmenityCategory

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Properties
 * const properties = await prisma.property.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Properties
   * const properties = await prisma.property.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.property`: Exposes CRUD operations for the **Property** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Properties
    * const properties = await prisma.property.findMany()
    * ```
    */
  get property(): Prisma.PropertyDelegate<ExtArgs>;

  /**
   * `prisma.propertyImage`: Exposes CRUD operations for the **PropertyImage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PropertyImages
    * const propertyImages = await prisma.propertyImage.findMany()
    * ```
    */
  get propertyImage(): Prisma.PropertyImageDelegate<ExtArgs>;

  /**
   * `prisma.amenity`: Exposes CRUD operations for the **Amenity** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Amenities
    * const amenities = await prisma.amenity.findMany()
    * ```
    */
  get amenity(): Prisma.AmenityDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Property: 'Property',
    PropertyImage: 'PropertyImage',
    Amenity: 'Amenity'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "property" | "propertyImage" | "amenity"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Property: {
        payload: Prisma.$PropertyPayload<ExtArgs>
        fields: Prisma.PropertyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PropertyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PropertyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>
          }
          findFirst: {
            args: Prisma.PropertyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PropertyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>
          }
          findMany: {
            args: Prisma.PropertyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>[]
          }
          create: {
            args: Prisma.PropertyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>
          }
          createMany: {
            args: Prisma.PropertyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PropertyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>[]
          }
          delete: {
            args: Prisma.PropertyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>
          }
          update: {
            args: Prisma.PropertyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>
          }
          deleteMany: {
            args: Prisma.PropertyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PropertyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PropertyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>
          }
          aggregate: {
            args: Prisma.PropertyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProperty>
          }
          groupBy: {
            args: Prisma.PropertyGroupByArgs<ExtArgs>
            result: $Utils.Optional<PropertyGroupByOutputType>[]
          }
          count: {
            args: Prisma.PropertyCountArgs<ExtArgs>
            result: $Utils.Optional<PropertyCountAggregateOutputType> | number
          }
        }
      }
      PropertyImage: {
        payload: Prisma.$PropertyImagePayload<ExtArgs>
        fields: Prisma.PropertyImageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PropertyImageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyImagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PropertyImageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyImagePayload>
          }
          findFirst: {
            args: Prisma.PropertyImageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyImagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PropertyImageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyImagePayload>
          }
          findMany: {
            args: Prisma.PropertyImageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyImagePayload>[]
          }
          create: {
            args: Prisma.PropertyImageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyImagePayload>
          }
          createMany: {
            args: Prisma.PropertyImageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PropertyImageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyImagePayload>[]
          }
          delete: {
            args: Prisma.PropertyImageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyImagePayload>
          }
          update: {
            args: Prisma.PropertyImageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyImagePayload>
          }
          deleteMany: {
            args: Prisma.PropertyImageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PropertyImageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PropertyImageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyImagePayload>
          }
          aggregate: {
            args: Prisma.PropertyImageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePropertyImage>
          }
          groupBy: {
            args: Prisma.PropertyImageGroupByArgs<ExtArgs>
            result: $Utils.Optional<PropertyImageGroupByOutputType>[]
          }
          count: {
            args: Prisma.PropertyImageCountArgs<ExtArgs>
            result: $Utils.Optional<PropertyImageCountAggregateOutputType> | number
          }
        }
      }
      Amenity: {
        payload: Prisma.$AmenityPayload<ExtArgs>
        fields: Prisma.AmenityFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AmenityFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AmenityPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AmenityFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AmenityPayload>
          }
          findFirst: {
            args: Prisma.AmenityFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AmenityPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AmenityFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AmenityPayload>
          }
          findMany: {
            args: Prisma.AmenityFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AmenityPayload>[]
          }
          create: {
            args: Prisma.AmenityCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AmenityPayload>
          }
          createMany: {
            args: Prisma.AmenityCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AmenityCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AmenityPayload>[]
          }
          delete: {
            args: Prisma.AmenityDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AmenityPayload>
          }
          update: {
            args: Prisma.AmenityUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AmenityPayload>
          }
          deleteMany: {
            args: Prisma.AmenityDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AmenityUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AmenityUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AmenityPayload>
          }
          aggregate: {
            args: Prisma.AmenityAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAmenity>
          }
          groupBy: {
            args: Prisma.AmenityGroupByArgs<ExtArgs>
            result: $Utils.Optional<AmenityGroupByOutputType>[]
          }
          count: {
            args: Prisma.AmenityCountArgs<ExtArgs>
            result: $Utils.Optional<AmenityCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type PropertyCountOutputType
   */

  export type PropertyCountOutputType = {
    images: number
  }

  export type PropertyCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    images?: boolean | PropertyCountOutputTypeCountImagesArgs
  }

  // Custom InputTypes
  /**
   * PropertyCountOutputType without action
   */
  export type PropertyCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyCountOutputType
     */
    select?: PropertyCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PropertyCountOutputType without action
   */
  export type PropertyCountOutputTypeCountImagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PropertyImageWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Property
   */

  export type AggregateProperty = {
    _count: PropertyCountAggregateOutputType | null
    _avg: PropertyAvgAggregateOutputType | null
    _sum: PropertySumAggregateOutputType | null
    _min: PropertyMinAggregateOutputType | null
    _max: PropertyMaxAggregateOutputType | null
  }

  export type PropertyAvgAggregateOutputType = {
    price: number | null
    pricePerSqft: number | null
    bedrooms: number | null
    bathrooms: number | null
    halfBaths: number | null
    totalRooms: number | null
    floors: number | null
    floorLevel: number | null
    areaSqft: number | null
    lotSizeSqft: number | null
    yearBuilt: number | null
    yearRemodeled: number | null
  }

  export type PropertySumAggregateOutputType = {
    price: number | null
    pricePerSqft: number | null
    bedrooms: number | null
    bathrooms: number | null
    halfBaths: number | null
    totalRooms: number | null
    floors: number | null
    floorLevel: number | null
    areaSqft: number | null
    lotSizeSqft: number | null
    yearBuilt: number | null
    yearRemodeled: number | null
  }

  export type PropertyMinAggregateOutputType = {
    id: string | null
    title: string | null
    location: string | null
    description: string | null
    price: number | null
    pricePerSqft: number | null
    priceNote: string | null
    callForPrice: boolean | null
    bedrooms: number | null
    bathrooms: number | null
    halfBaths: number | null
    totalRooms: number | null
    floors: number | null
    floorLevel: number | null
    areaSqft: number | null
    lotSizeSqft: number | null
    yearBuilt: number | null
    yearRemodeled: number | null
    type: $Enums.PropertyType | null
    subType: $Enums.SubType | null
    layoutType: $Enums.LayoutType | null
    furnishing: $Enums.Furnishing | null
    amenityCategory: $Enums.AmenityCategory | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PropertyMaxAggregateOutputType = {
    id: string | null
    title: string | null
    location: string | null
    description: string | null
    price: number | null
    pricePerSqft: number | null
    priceNote: string | null
    callForPrice: boolean | null
    bedrooms: number | null
    bathrooms: number | null
    halfBaths: number | null
    totalRooms: number | null
    floors: number | null
    floorLevel: number | null
    areaSqft: number | null
    lotSizeSqft: number | null
    yearBuilt: number | null
    yearRemodeled: number | null
    type: $Enums.PropertyType | null
    subType: $Enums.SubType | null
    layoutType: $Enums.LayoutType | null
    furnishing: $Enums.Furnishing | null
    amenityCategory: $Enums.AmenityCategory | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PropertyCountAggregateOutputType = {
    id: number
    title: number
    location: number
    description: number
    price: number
    pricePerSqft: number
    priceNote: number
    callForPrice: number
    bedrooms: number
    bathrooms: number
    halfBaths: number
    totalRooms: number
    floors: number
    floorLevel: number
    areaSqft: number
    lotSizeSqft: number
    yearBuilt: number
    yearRemodeled: number
    rentPeriods: number
    statuses: number
    parkingOptions: number
    basementOptions: number
    type: number
    subType: number
    layoutType: number
    furnishing: number
    amenityCategory: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PropertyAvgAggregateInputType = {
    price?: true
    pricePerSqft?: true
    bedrooms?: true
    bathrooms?: true
    halfBaths?: true
    totalRooms?: true
    floors?: true
    floorLevel?: true
    areaSqft?: true
    lotSizeSqft?: true
    yearBuilt?: true
    yearRemodeled?: true
  }

  export type PropertySumAggregateInputType = {
    price?: true
    pricePerSqft?: true
    bedrooms?: true
    bathrooms?: true
    halfBaths?: true
    totalRooms?: true
    floors?: true
    floorLevel?: true
    areaSqft?: true
    lotSizeSqft?: true
    yearBuilt?: true
    yearRemodeled?: true
  }

  export type PropertyMinAggregateInputType = {
    id?: true
    title?: true
    location?: true
    description?: true
    price?: true
    pricePerSqft?: true
    priceNote?: true
    callForPrice?: true
    bedrooms?: true
    bathrooms?: true
    halfBaths?: true
    totalRooms?: true
    floors?: true
    floorLevel?: true
    areaSqft?: true
    lotSizeSqft?: true
    yearBuilt?: true
    yearRemodeled?: true
    type?: true
    subType?: true
    layoutType?: true
    furnishing?: true
    amenityCategory?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PropertyMaxAggregateInputType = {
    id?: true
    title?: true
    location?: true
    description?: true
    price?: true
    pricePerSqft?: true
    priceNote?: true
    callForPrice?: true
    bedrooms?: true
    bathrooms?: true
    halfBaths?: true
    totalRooms?: true
    floors?: true
    floorLevel?: true
    areaSqft?: true
    lotSizeSqft?: true
    yearBuilt?: true
    yearRemodeled?: true
    type?: true
    subType?: true
    layoutType?: true
    furnishing?: true
    amenityCategory?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PropertyCountAggregateInputType = {
    id?: true
    title?: true
    location?: true
    description?: true
    price?: true
    pricePerSqft?: true
    priceNote?: true
    callForPrice?: true
    bedrooms?: true
    bathrooms?: true
    halfBaths?: true
    totalRooms?: true
    floors?: true
    floorLevel?: true
    areaSqft?: true
    lotSizeSqft?: true
    yearBuilt?: true
    yearRemodeled?: true
    rentPeriods?: true
    statuses?: true
    parkingOptions?: true
    basementOptions?: true
    type?: true
    subType?: true
    layoutType?: true
    furnishing?: true
    amenityCategory?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PropertyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Property to aggregate.
     */
    where?: PropertyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Properties to fetch.
     */
    orderBy?: PropertyOrderByWithRelationInput | PropertyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PropertyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Properties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Properties.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Properties
    **/
    _count?: true | PropertyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PropertyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PropertySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PropertyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PropertyMaxAggregateInputType
  }

  export type GetPropertyAggregateType<T extends PropertyAggregateArgs> = {
        [P in keyof T & keyof AggregateProperty]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProperty[P]>
      : GetScalarType<T[P], AggregateProperty[P]>
  }




  export type PropertyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PropertyWhereInput
    orderBy?: PropertyOrderByWithAggregationInput | PropertyOrderByWithAggregationInput[]
    by: PropertyScalarFieldEnum[] | PropertyScalarFieldEnum
    having?: PropertyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PropertyCountAggregateInputType | true
    _avg?: PropertyAvgAggregateInputType
    _sum?: PropertySumAggregateInputType
    _min?: PropertyMinAggregateInputType
    _max?: PropertyMaxAggregateInputType
  }

  export type PropertyGroupByOutputType = {
    id: string
    title: string
    location: string
    description: string
    price: number
    pricePerSqft: number | null
    priceNote: string | null
    callForPrice: boolean
    bedrooms: number | null
    bathrooms: number | null
    halfBaths: number | null
    totalRooms: number | null
    floors: number | null
    floorLevel: number | null
    areaSqft: number | null
    lotSizeSqft: number | null
    yearBuilt: number | null
    yearRemodeled: number | null
    rentPeriods: string[]
    statuses: string[]
    parkingOptions: string[]
    basementOptions: string[]
    type: $Enums.PropertyType
    subType: $Enums.SubType
    layoutType: $Enums.LayoutType
    furnishing: $Enums.Furnishing
    amenityCategory: $Enums.AmenityCategory
    createdAt: Date
    updatedAt: Date
    _count: PropertyCountAggregateOutputType | null
    _avg: PropertyAvgAggregateOutputType | null
    _sum: PropertySumAggregateOutputType | null
    _min: PropertyMinAggregateOutputType | null
    _max: PropertyMaxAggregateOutputType | null
  }

  type GetPropertyGroupByPayload<T extends PropertyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PropertyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PropertyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PropertyGroupByOutputType[P]>
            : GetScalarType<T[P], PropertyGroupByOutputType[P]>
        }
      >
    >


  export type PropertySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    location?: boolean
    description?: boolean
    price?: boolean
    pricePerSqft?: boolean
    priceNote?: boolean
    callForPrice?: boolean
    bedrooms?: boolean
    bathrooms?: boolean
    halfBaths?: boolean
    totalRooms?: boolean
    floors?: boolean
    floorLevel?: boolean
    areaSqft?: boolean
    lotSizeSqft?: boolean
    yearBuilt?: boolean
    yearRemodeled?: boolean
    rentPeriods?: boolean
    statuses?: boolean
    parkingOptions?: boolean
    basementOptions?: boolean
    type?: boolean
    subType?: boolean
    layoutType?: boolean
    furnishing?: boolean
    amenityCategory?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    images?: boolean | Property$imagesArgs<ExtArgs>
    _count?: boolean | PropertyCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["property"]>

  export type PropertySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    location?: boolean
    description?: boolean
    price?: boolean
    pricePerSqft?: boolean
    priceNote?: boolean
    callForPrice?: boolean
    bedrooms?: boolean
    bathrooms?: boolean
    halfBaths?: boolean
    totalRooms?: boolean
    floors?: boolean
    floorLevel?: boolean
    areaSqft?: boolean
    lotSizeSqft?: boolean
    yearBuilt?: boolean
    yearRemodeled?: boolean
    rentPeriods?: boolean
    statuses?: boolean
    parkingOptions?: boolean
    basementOptions?: boolean
    type?: boolean
    subType?: boolean
    layoutType?: boolean
    furnishing?: boolean
    amenityCategory?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["property"]>

  export type PropertySelectScalar = {
    id?: boolean
    title?: boolean
    location?: boolean
    description?: boolean
    price?: boolean
    pricePerSqft?: boolean
    priceNote?: boolean
    callForPrice?: boolean
    bedrooms?: boolean
    bathrooms?: boolean
    halfBaths?: boolean
    totalRooms?: boolean
    floors?: boolean
    floorLevel?: boolean
    areaSqft?: boolean
    lotSizeSqft?: boolean
    yearBuilt?: boolean
    yearRemodeled?: boolean
    rentPeriods?: boolean
    statuses?: boolean
    parkingOptions?: boolean
    basementOptions?: boolean
    type?: boolean
    subType?: boolean
    layoutType?: boolean
    furnishing?: boolean
    amenityCategory?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PropertyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    images?: boolean | Property$imagesArgs<ExtArgs>
    _count?: boolean | PropertyCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PropertyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PropertyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Property"
    objects: {
      images: Prisma.$PropertyImagePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      location: string
      description: string
      price: number
      pricePerSqft: number | null
      priceNote: string | null
      callForPrice: boolean
      bedrooms: number | null
      bathrooms: number | null
      halfBaths: number | null
      totalRooms: number | null
      floors: number | null
      floorLevel: number | null
      areaSqft: number | null
      lotSizeSqft: number | null
      yearBuilt: number | null
      yearRemodeled: number | null
      rentPeriods: string[]
      statuses: string[]
      parkingOptions: string[]
      basementOptions: string[]
      type: $Enums.PropertyType
      subType: $Enums.SubType
      layoutType: $Enums.LayoutType
      furnishing: $Enums.Furnishing
      amenityCategory: $Enums.AmenityCategory
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["property"]>
    composites: {}
  }

  type PropertyGetPayload<S extends boolean | null | undefined | PropertyDefaultArgs> = $Result.GetResult<Prisma.$PropertyPayload, S>

  type PropertyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PropertyFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PropertyCountAggregateInputType | true
    }

  export interface PropertyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Property'], meta: { name: 'Property' } }
    /**
     * Find zero or one Property that matches the filter.
     * @param {PropertyFindUniqueArgs} args - Arguments to find a Property
     * @example
     * // Get one Property
     * const property = await prisma.property.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PropertyFindUniqueArgs>(args: SelectSubset<T, PropertyFindUniqueArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Property that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PropertyFindUniqueOrThrowArgs} args - Arguments to find a Property
     * @example
     * // Get one Property
     * const property = await prisma.property.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PropertyFindUniqueOrThrowArgs>(args: SelectSubset<T, PropertyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Property that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyFindFirstArgs} args - Arguments to find a Property
     * @example
     * // Get one Property
     * const property = await prisma.property.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PropertyFindFirstArgs>(args?: SelectSubset<T, PropertyFindFirstArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Property that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyFindFirstOrThrowArgs} args - Arguments to find a Property
     * @example
     * // Get one Property
     * const property = await prisma.property.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PropertyFindFirstOrThrowArgs>(args?: SelectSubset<T, PropertyFindFirstOrThrowArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Properties that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Properties
     * const properties = await prisma.property.findMany()
     * 
     * // Get first 10 Properties
     * const properties = await prisma.property.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const propertyWithIdOnly = await prisma.property.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PropertyFindManyArgs>(args?: SelectSubset<T, PropertyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Property.
     * @param {PropertyCreateArgs} args - Arguments to create a Property.
     * @example
     * // Create one Property
     * const Property = await prisma.property.create({
     *   data: {
     *     // ... data to create a Property
     *   }
     * })
     * 
     */
    create<T extends PropertyCreateArgs>(args: SelectSubset<T, PropertyCreateArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Properties.
     * @param {PropertyCreateManyArgs} args - Arguments to create many Properties.
     * @example
     * // Create many Properties
     * const property = await prisma.property.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PropertyCreateManyArgs>(args?: SelectSubset<T, PropertyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Properties and returns the data saved in the database.
     * @param {PropertyCreateManyAndReturnArgs} args - Arguments to create many Properties.
     * @example
     * // Create many Properties
     * const property = await prisma.property.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Properties and only return the `id`
     * const propertyWithIdOnly = await prisma.property.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PropertyCreateManyAndReturnArgs>(args?: SelectSubset<T, PropertyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Property.
     * @param {PropertyDeleteArgs} args - Arguments to delete one Property.
     * @example
     * // Delete one Property
     * const Property = await prisma.property.delete({
     *   where: {
     *     // ... filter to delete one Property
     *   }
     * })
     * 
     */
    delete<T extends PropertyDeleteArgs>(args: SelectSubset<T, PropertyDeleteArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Property.
     * @param {PropertyUpdateArgs} args - Arguments to update one Property.
     * @example
     * // Update one Property
     * const property = await prisma.property.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PropertyUpdateArgs>(args: SelectSubset<T, PropertyUpdateArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Properties.
     * @param {PropertyDeleteManyArgs} args - Arguments to filter Properties to delete.
     * @example
     * // Delete a few Properties
     * const { count } = await prisma.property.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PropertyDeleteManyArgs>(args?: SelectSubset<T, PropertyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Properties.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Properties
     * const property = await prisma.property.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PropertyUpdateManyArgs>(args: SelectSubset<T, PropertyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Property.
     * @param {PropertyUpsertArgs} args - Arguments to update or create a Property.
     * @example
     * // Update or create a Property
     * const property = await prisma.property.upsert({
     *   create: {
     *     // ... data to create a Property
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Property we want to update
     *   }
     * })
     */
    upsert<T extends PropertyUpsertArgs>(args: SelectSubset<T, PropertyUpsertArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Properties.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyCountArgs} args - Arguments to filter Properties to count.
     * @example
     * // Count the number of Properties
     * const count = await prisma.property.count({
     *   where: {
     *     // ... the filter for the Properties we want to count
     *   }
     * })
    **/
    count<T extends PropertyCountArgs>(
      args?: Subset<T, PropertyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PropertyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Property.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PropertyAggregateArgs>(args: Subset<T, PropertyAggregateArgs>): Prisma.PrismaPromise<GetPropertyAggregateType<T>>

    /**
     * Group by Property.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PropertyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PropertyGroupByArgs['orderBy'] }
        : { orderBy?: PropertyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PropertyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPropertyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Property model
   */
  readonly fields: PropertyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Property.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PropertyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    images<T extends Property$imagesArgs<ExtArgs> = {}>(args?: Subset<T, Property$imagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PropertyImagePayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Property model
   */ 
  interface PropertyFieldRefs {
    readonly id: FieldRef<"Property", 'String'>
    readonly title: FieldRef<"Property", 'String'>
    readonly location: FieldRef<"Property", 'String'>
    readonly description: FieldRef<"Property", 'String'>
    readonly price: FieldRef<"Property", 'Int'>
    readonly pricePerSqft: FieldRef<"Property", 'Int'>
    readonly priceNote: FieldRef<"Property", 'String'>
    readonly callForPrice: FieldRef<"Property", 'Boolean'>
    readonly bedrooms: FieldRef<"Property", 'Int'>
    readonly bathrooms: FieldRef<"Property", 'Int'>
    readonly halfBaths: FieldRef<"Property", 'Int'>
    readonly totalRooms: FieldRef<"Property", 'Int'>
    readonly floors: FieldRef<"Property", 'Int'>
    readonly floorLevel: FieldRef<"Property", 'Int'>
    readonly areaSqft: FieldRef<"Property", 'Int'>
    readonly lotSizeSqft: FieldRef<"Property", 'Int'>
    readonly yearBuilt: FieldRef<"Property", 'Int'>
    readonly yearRemodeled: FieldRef<"Property", 'Int'>
    readonly rentPeriods: FieldRef<"Property", 'String[]'>
    readonly statuses: FieldRef<"Property", 'String[]'>
    readonly parkingOptions: FieldRef<"Property", 'String[]'>
    readonly basementOptions: FieldRef<"Property", 'String[]'>
    readonly type: FieldRef<"Property", 'PropertyType'>
    readonly subType: FieldRef<"Property", 'SubType'>
    readonly layoutType: FieldRef<"Property", 'LayoutType'>
    readonly furnishing: FieldRef<"Property", 'Furnishing'>
    readonly amenityCategory: FieldRef<"Property", 'AmenityCategory'>
    readonly createdAt: FieldRef<"Property", 'DateTime'>
    readonly updatedAt: FieldRef<"Property", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Property findUnique
   */
  export type PropertyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    /**
     * Filter, which Property to fetch.
     */
    where: PropertyWhereUniqueInput
  }

  /**
   * Property findUniqueOrThrow
   */
  export type PropertyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    /**
     * Filter, which Property to fetch.
     */
    where: PropertyWhereUniqueInput
  }

  /**
   * Property findFirst
   */
  export type PropertyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    /**
     * Filter, which Property to fetch.
     */
    where?: PropertyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Properties to fetch.
     */
    orderBy?: PropertyOrderByWithRelationInput | PropertyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Properties.
     */
    cursor?: PropertyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Properties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Properties.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Properties.
     */
    distinct?: PropertyScalarFieldEnum | PropertyScalarFieldEnum[]
  }

  /**
   * Property findFirstOrThrow
   */
  export type PropertyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    /**
     * Filter, which Property to fetch.
     */
    where?: PropertyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Properties to fetch.
     */
    orderBy?: PropertyOrderByWithRelationInput | PropertyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Properties.
     */
    cursor?: PropertyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Properties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Properties.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Properties.
     */
    distinct?: PropertyScalarFieldEnum | PropertyScalarFieldEnum[]
  }

  /**
   * Property findMany
   */
  export type PropertyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    /**
     * Filter, which Properties to fetch.
     */
    where?: PropertyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Properties to fetch.
     */
    orderBy?: PropertyOrderByWithRelationInput | PropertyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Properties.
     */
    cursor?: PropertyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Properties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Properties.
     */
    skip?: number
    distinct?: PropertyScalarFieldEnum | PropertyScalarFieldEnum[]
  }

  /**
   * Property create
   */
  export type PropertyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    /**
     * The data needed to create a Property.
     */
    data: XOR<PropertyCreateInput, PropertyUncheckedCreateInput>
  }

  /**
   * Property createMany
   */
  export type PropertyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Properties.
     */
    data: PropertyCreateManyInput | PropertyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Property createManyAndReturn
   */
  export type PropertyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Properties.
     */
    data: PropertyCreateManyInput | PropertyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Property update
   */
  export type PropertyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    /**
     * The data needed to update a Property.
     */
    data: XOR<PropertyUpdateInput, PropertyUncheckedUpdateInput>
    /**
     * Choose, which Property to update.
     */
    where: PropertyWhereUniqueInput
  }

  /**
   * Property updateMany
   */
  export type PropertyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Properties.
     */
    data: XOR<PropertyUpdateManyMutationInput, PropertyUncheckedUpdateManyInput>
    /**
     * Filter which Properties to update
     */
    where?: PropertyWhereInput
  }

  /**
   * Property upsert
   */
  export type PropertyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    /**
     * The filter to search for the Property to update in case it exists.
     */
    where: PropertyWhereUniqueInput
    /**
     * In case the Property found by the `where` argument doesn't exist, create a new Property with this data.
     */
    create: XOR<PropertyCreateInput, PropertyUncheckedCreateInput>
    /**
     * In case the Property was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PropertyUpdateInput, PropertyUncheckedUpdateInput>
  }

  /**
   * Property delete
   */
  export type PropertyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    /**
     * Filter which Property to delete.
     */
    where: PropertyWhereUniqueInput
  }

  /**
   * Property deleteMany
   */
  export type PropertyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Properties to delete
     */
    where?: PropertyWhereInput
  }

  /**
   * Property.images
   */
  export type Property$imagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyImage
     */
    select?: PropertyImageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyImageInclude<ExtArgs> | null
    where?: PropertyImageWhereInput
    orderBy?: PropertyImageOrderByWithRelationInput | PropertyImageOrderByWithRelationInput[]
    cursor?: PropertyImageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PropertyImageScalarFieldEnum | PropertyImageScalarFieldEnum[]
  }

  /**
   * Property without action
   */
  export type PropertyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
  }


  /**
   * Model PropertyImage
   */

  export type AggregatePropertyImage = {
    _count: PropertyImageCountAggregateOutputType | null
    _avg: PropertyImageAvgAggregateOutputType | null
    _sum: PropertyImageSumAggregateOutputType | null
    _min: PropertyImageMinAggregateOutputType | null
    _max: PropertyImageMaxAggregateOutputType | null
  }

  export type PropertyImageAvgAggregateOutputType = {
    order: number | null
  }

  export type PropertyImageSumAggregateOutputType = {
    order: number | null
  }

  export type PropertyImageMinAggregateOutputType = {
    id: string | null
    url: string | null
    isPrimary: boolean | null
    order: number | null
    propertyId: string | null
    createdAt: Date | null
  }

  export type PropertyImageMaxAggregateOutputType = {
    id: string | null
    url: string | null
    isPrimary: boolean | null
    order: number | null
    propertyId: string | null
    createdAt: Date | null
  }

  export type PropertyImageCountAggregateOutputType = {
    id: number
    url: number
    isPrimary: number
    order: number
    propertyId: number
    createdAt: number
    _all: number
  }


  export type PropertyImageAvgAggregateInputType = {
    order?: true
  }

  export type PropertyImageSumAggregateInputType = {
    order?: true
  }

  export type PropertyImageMinAggregateInputType = {
    id?: true
    url?: true
    isPrimary?: true
    order?: true
    propertyId?: true
    createdAt?: true
  }

  export type PropertyImageMaxAggregateInputType = {
    id?: true
    url?: true
    isPrimary?: true
    order?: true
    propertyId?: true
    createdAt?: true
  }

  export type PropertyImageCountAggregateInputType = {
    id?: true
    url?: true
    isPrimary?: true
    order?: true
    propertyId?: true
    createdAt?: true
    _all?: true
  }

  export type PropertyImageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PropertyImage to aggregate.
     */
    where?: PropertyImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PropertyImages to fetch.
     */
    orderBy?: PropertyImageOrderByWithRelationInput | PropertyImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PropertyImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PropertyImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PropertyImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PropertyImages
    **/
    _count?: true | PropertyImageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PropertyImageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PropertyImageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PropertyImageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PropertyImageMaxAggregateInputType
  }

  export type GetPropertyImageAggregateType<T extends PropertyImageAggregateArgs> = {
        [P in keyof T & keyof AggregatePropertyImage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePropertyImage[P]>
      : GetScalarType<T[P], AggregatePropertyImage[P]>
  }




  export type PropertyImageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PropertyImageWhereInput
    orderBy?: PropertyImageOrderByWithAggregationInput | PropertyImageOrderByWithAggregationInput[]
    by: PropertyImageScalarFieldEnum[] | PropertyImageScalarFieldEnum
    having?: PropertyImageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PropertyImageCountAggregateInputType | true
    _avg?: PropertyImageAvgAggregateInputType
    _sum?: PropertyImageSumAggregateInputType
    _min?: PropertyImageMinAggregateInputType
    _max?: PropertyImageMaxAggregateInputType
  }

  export type PropertyImageGroupByOutputType = {
    id: string
    url: string
    isPrimary: boolean
    order: number
    propertyId: string
    createdAt: Date
    _count: PropertyImageCountAggregateOutputType | null
    _avg: PropertyImageAvgAggregateOutputType | null
    _sum: PropertyImageSumAggregateOutputType | null
    _min: PropertyImageMinAggregateOutputType | null
    _max: PropertyImageMaxAggregateOutputType | null
  }

  type GetPropertyImageGroupByPayload<T extends PropertyImageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PropertyImageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PropertyImageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PropertyImageGroupByOutputType[P]>
            : GetScalarType<T[P], PropertyImageGroupByOutputType[P]>
        }
      >
    >


  export type PropertyImageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    isPrimary?: boolean
    order?: boolean
    propertyId?: boolean
    createdAt?: boolean
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["propertyImage"]>

  export type PropertyImageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    isPrimary?: boolean
    order?: boolean
    propertyId?: boolean
    createdAt?: boolean
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["propertyImage"]>

  export type PropertyImageSelectScalar = {
    id?: boolean
    url?: boolean
    isPrimary?: boolean
    order?: boolean
    propertyId?: boolean
    createdAt?: boolean
  }

  export type PropertyImageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }
  export type PropertyImageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }

  export type $PropertyImagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PropertyImage"
    objects: {
      property: Prisma.$PropertyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      url: string
      isPrimary: boolean
      order: number
      propertyId: string
      createdAt: Date
    }, ExtArgs["result"]["propertyImage"]>
    composites: {}
  }

  type PropertyImageGetPayload<S extends boolean | null | undefined | PropertyImageDefaultArgs> = $Result.GetResult<Prisma.$PropertyImagePayload, S>

  type PropertyImageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PropertyImageFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PropertyImageCountAggregateInputType | true
    }

  export interface PropertyImageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PropertyImage'], meta: { name: 'PropertyImage' } }
    /**
     * Find zero or one PropertyImage that matches the filter.
     * @param {PropertyImageFindUniqueArgs} args - Arguments to find a PropertyImage
     * @example
     * // Get one PropertyImage
     * const propertyImage = await prisma.propertyImage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PropertyImageFindUniqueArgs>(args: SelectSubset<T, PropertyImageFindUniqueArgs<ExtArgs>>): Prisma__PropertyImageClient<$Result.GetResult<Prisma.$PropertyImagePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one PropertyImage that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PropertyImageFindUniqueOrThrowArgs} args - Arguments to find a PropertyImage
     * @example
     * // Get one PropertyImage
     * const propertyImage = await prisma.propertyImage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PropertyImageFindUniqueOrThrowArgs>(args: SelectSubset<T, PropertyImageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PropertyImageClient<$Result.GetResult<Prisma.$PropertyImagePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first PropertyImage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyImageFindFirstArgs} args - Arguments to find a PropertyImage
     * @example
     * // Get one PropertyImage
     * const propertyImage = await prisma.propertyImage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PropertyImageFindFirstArgs>(args?: SelectSubset<T, PropertyImageFindFirstArgs<ExtArgs>>): Prisma__PropertyImageClient<$Result.GetResult<Prisma.$PropertyImagePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first PropertyImage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyImageFindFirstOrThrowArgs} args - Arguments to find a PropertyImage
     * @example
     * // Get one PropertyImage
     * const propertyImage = await prisma.propertyImage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PropertyImageFindFirstOrThrowArgs>(args?: SelectSubset<T, PropertyImageFindFirstOrThrowArgs<ExtArgs>>): Prisma__PropertyImageClient<$Result.GetResult<Prisma.$PropertyImagePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more PropertyImages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyImageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PropertyImages
     * const propertyImages = await prisma.propertyImage.findMany()
     * 
     * // Get first 10 PropertyImages
     * const propertyImages = await prisma.propertyImage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const propertyImageWithIdOnly = await prisma.propertyImage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PropertyImageFindManyArgs>(args?: SelectSubset<T, PropertyImageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PropertyImagePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a PropertyImage.
     * @param {PropertyImageCreateArgs} args - Arguments to create a PropertyImage.
     * @example
     * // Create one PropertyImage
     * const PropertyImage = await prisma.propertyImage.create({
     *   data: {
     *     // ... data to create a PropertyImage
     *   }
     * })
     * 
     */
    create<T extends PropertyImageCreateArgs>(args: SelectSubset<T, PropertyImageCreateArgs<ExtArgs>>): Prisma__PropertyImageClient<$Result.GetResult<Prisma.$PropertyImagePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many PropertyImages.
     * @param {PropertyImageCreateManyArgs} args - Arguments to create many PropertyImages.
     * @example
     * // Create many PropertyImages
     * const propertyImage = await prisma.propertyImage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PropertyImageCreateManyArgs>(args?: SelectSubset<T, PropertyImageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PropertyImages and returns the data saved in the database.
     * @param {PropertyImageCreateManyAndReturnArgs} args - Arguments to create many PropertyImages.
     * @example
     * // Create many PropertyImages
     * const propertyImage = await prisma.propertyImage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PropertyImages and only return the `id`
     * const propertyImageWithIdOnly = await prisma.propertyImage.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PropertyImageCreateManyAndReturnArgs>(args?: SelectSubset<T, PropertyImageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PropertyImagePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a PropertyImage.
     * @param {PropertyImageDeleteArgs} args - Arguments to delete one PropertyImage.
     * @example
     * // Delete one PropertyImage
     * const PropertyImage = await prisma.propertyImage.delete({
     *   where: {
     *     // ... filter to delete one PropertyImage
     *   }
     * })
     * 
     */
    delete<T extends PropertyImageDeleteArgs>(args: SelectSubset<T, PropertyImageDeleteArgs<ExtArgs>>): Prisma__PropertyImageClient<$Result.GetResult<Prisma.$PropertyImagePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one PropertyImage.
     * @param {PropertyImageUpdateArgs} args - Arguments to update one PropertyImage.
     * @example
     * // Update one PropertyImage
     * const propertyImage = await prisma.propertyImage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PropertyImageUpdateArgs>(args: SelectSubset<T, PropertyImageUpdateArgs<ExtArgs>>): Prisma__PropertyImageClient<$Result.GetResult<Prisma.$PropertyImagePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more PropertyImages.
     * @param {PropertyImageDeleteManyArgs} args - Arguments to filter PropertyImages to delete.
     * @example
     * // Delete a few PropertyImages
     * const { count } = await prisma.propertyImage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PropertyImageDeleteManyArgs>(args?: SelectSubset<T, PropertyImageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PropertyImages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyImageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PropertyImages
     * const propertyImage = await prisma.propertyImage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PropertyImageUpdateManyArgs>(args: SelectSubset<T, PropertyImageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PropertyImage.
     * @param {PropertyImageUpsertArgs} args - Arguments to update or create a PropertyImage.
     * @example
     * // Update or create a PropertyImage
     * const propertyImage = await prisma.propertyImage.upsert({
     *   create: {
     *     // ... data to create a PropertyImage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PropertyImage we want to update
     *   }
     * })
     */
    upsert<T extends PropertyImageUpsertArgs>(args: SelectSubset<T, PropertyImageUpsertArgs<ExtArgs>>): Prisma__PropertyImageClient<$Result.GetResult<Prisma.$PropertyImagePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of PropertyImages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyImageCountArgs} args - Arguments to filter PropertyImages to count.
     * @example
     * // Count the number of PropertyImages
     * const count = await prisma.propertyImage.count({
     *   where: {
     *     // ... the filter for the PropertyImages we want to count
     *   }
     * })
    **/
    count<T extends PropertyImageCountArgs>(
      args?: Subset<T, PropertyImageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PropertyImageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PropertyImage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyImageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PropertyImageAggregateArgs>(args: Subset<T, PropertyImageAggregateArgs>): Prisma.PrismaPromise<GetPropertyImageAggregateType<T>>

    /**
     * Group by PropertyImage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyImageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PropertyImageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PropertyImageGroupByArgs['orderBy'] }
        : { orderBy?: PropertyImageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PropertyImageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPropertyImageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PropertyImage model
   */
  readonly fields: PropertyImageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PropertyImage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PropertyImageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    property<T extends PropertyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PropertyDefaultArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PropertyImage model
   */ 
  interface PropertyImageFieldRefs {
    readonly id: FieldRef<"PropertyImage", 'String'>
    readonly url: FieldRef<"PropertyImage", 'String'>
    readonly isPrimary: FieldRef<"PropertyImage", 'Boolean'>
    readonly order: FieldRef<"PropertyImage", 'Int'>
    readonly propertyId: FieldRef<"PropertyImage", 'String'>
    readonly createdAt: FieldRef<"PropertyImage", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PropertyImage findUnique
   */
  export type PropertyImageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyImage
     */
    select?: PropertyImageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyImageInclude<ExtArgs> | null
    /**
     * Filter, which PropertyImage to fetch.
     */
    where: PropertyImageWhereUniqueInput
  }

  /**
   * PropertyImage findUniqueOrThrow
   */
  export type PropertyImageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyImage
     */
    select?: PropertyImageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyImageInclude<ExtArgs> | null
    /**
     * Filter, which PropertyImage to fetch.
     */
    where: PropertyImageWhereUniqueInput
  }

  /**
   * PropertyImage findFirst
   */
  export type PropertyImageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyImage
     */
    select?: PropertyImageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyImageInclude<ExtArgs> | null
    /**
     * Filter, which PropertyImage to fetch.
     */
    where?: PropertyImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PropertyImages to fetch.
     */
    orderBy?: PropertyImageOrderByWithRelationInput | PropertyImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PropertyImages.
     */
    cursor?: PropertyImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PropertyImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PropertyImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PropertyImages.
     */
    distinct?: PropertyImageScalarFieldEnum | PropertyImageScalarFieldEnum[]
  }

  /**
   * PropertyImage findFirstOrThrow
   */
  export type PropertyImageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyImage
     */
    select?: PropertyImageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyImageInclude<ExtArgs> | null
    /**
     * Filter, which PropertyImage to fetch.
     */
    where?: PropertyImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PropertyImages to fetch.
     */
    orderBy?: PropertyImageOrderByWithRelationInput | PropertyImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PropertyImages.
     */
    cursor?: PropertyImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PropertyImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PropertyImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PropertyImages.
     */
    distinct?: PropertyImageScalarFieldEnum | PropertyImageScalarFieldEnum[]
  }

  /**
   * PropertyImage findMany
   */
  export type PropertyImageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyImage
     */
    select?: PropertyImageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyImageInclude<ExtArgs> | null
    /**
     * Filter, which PropertyImages to fetch.
     */
    where?: PropertyImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PropertyImages to fetch.
     */
    orderBy?: PropertyImageOrderByWithRelationInput | PropertyImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PropertyImages.
     */
    cursor?: PropertyImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PropertyImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PropertyImages.
     */
    skip?: number
    distinct?: PropertyImageScalarFieldEnum | PropertyImageScalarFieldEnum[]
  }

  /**
   * PropertyImage create
   */
  export type PropertyImageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyImage
     */
    select?: PropertyImageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyImageInclude<ExtArgs> | null
    /**
     * The data needed to create a PropertyImage.
     */
    data: XOR<PropertyImageCreateInput, PropertyImageUncheckedCreateInput>
  }

  /**
   * PropertyImage createMany
   */
  export type PropertyImageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PropertyImages.
     */
    data: PropertyImageCreateManyInput | PropertyImageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PropertyImage createManyAndReturn
   */
  export type PropertyImageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyImage
     */
    select?: PropertyImageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many PropertyImages.
     */
    data: PropertyImageCreateManyInput | PropertyImageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyImageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PropertyImage update
   */
  export type PropertyImageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyImage
     */
    select?: PropertyImageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyImageInclude<ExtArgs> | null
    /**
     * The data needed to update a PropertyImage.
     */
    data: XOR<PropertyImageUpdateInput, PropertyImageUncheckedUpdateInput>
    /**
     * Choose, which PropertyImage to update.
     */
    where: PropertyImageWhereUniqueInput
  }

  /**
   * PropertyImage updateMany
   */
  export type PropertyImageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PropertyImages.
     */
    data: XOR<PropertyImageUpdateManyMutationInput, PropertyImageUncheckedUpdateManyInput>
    /**
     * Filter which PropertyImages to update
     */
    where?: PropertyImageWhereInput
  }

  /**
   * PropertyImage upsert
   */
  export type PropertyImageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyImage
     */
    select?: PropertyImageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyImageInclude<ExtArgs> | null
    /**
     * The filter to search for the PropertyImage to update in case it exists.
     */
    where: PropertyImageWhereUniqueInput
    /**
     * In case the PropertyImage found by the `where` argument doesn't exist, create a new PropertyImage with this data.
     */
    create: XOR<PropertyImageCreateInput, PropertyImageUncheckedCreateInput>
    /**
     * In case the PropertyImage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PropertyImageUpdateInput, PropertyImageUncheckedUpdateInput>
  }

  /**
   * PropertyImage delete
   */
  export type PropertyImageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyImage
     */
    select?: PropertyImageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyImageInclude<ExtArgs> | null
    /**
     * Filter which PropertyImage to delete.
     */
    where: PropertyImageWhereUniqueInput
  }

  /**
   * PropertyImage deleteMany
   */
  export type PropertyImageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PropertyImages to delete
     */
    where?: PropertyImageWhereInput
  }

  /**
   * PropertyImage without action
   */
  export type PropertyImageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyImage
     */
    select?: PropertyImageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyImageInclude<ExtArgs> | null
  }


  /**
   * Model Amenity
   */

  export type AggregateAmenity = {
    _count: AmenityCountAggregateOutputType | null
    _min: AmenityMinAggregateOutputType | null
    _max: AmenityMaxAggregateOutputType | null
  }

  export type AmenityMinAggregateOutputType = {
    id: string | null
    name: string | null
    category: $Enums.AmenityCategory | null
  }

  export type AmenityMaxAggregateOutputType = {
    id: string | null
    name: string | null
    category: $Enums.AmenityCategory | null
  }

  export type AmenityCountAggregateOutputType = {
    id: number
    name: number
    category: number
    _all: number
  }


  export type AmenityMinAggregateInputType = {
    id?: true
    name?: true
    category?: true
  }

  export type AmenityMaxAggregateInputType = {
    id?: true
    name?: true
    category?: true
  }

  export type AmenityCountAggregateInputType = {
    id?: true
    name?: true
    category?: true
    _all?: true
  }

  export type AmenityAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Amenity to aggregate.
     */
    where?: AmenityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Amenities to fetch.
     */
    orderBy?: AmenityOrderByWithRelationInput | AmenityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AmenityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Amenities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Amenities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Amenities
    **/
    _count?: true | AmenityCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AmenityMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AmenityMaxAggregateInputType
  }

  export type GetAmenityAggregateType<T extends AmenityAggregateArgs> = {
        [P in keyof T & keyof AggregateAmenity]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAmenity[P]>
      : GetScalarType<T[P], AggregateAmenity[P]>
  }




  export type AmenityGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AmenityWhereInput
    orderBy?: AmenityOrderByWithAggregationInput | AmenityOrderByWithAggregationInput[]
    by: AmenityScalarFieldEnum[] | AmenityScalarFieldEnum
    having?: AmenityScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AmenityCountAggregateInputType | true
    _min?: AmenityMinAggregateInputType
    _max?: AmenityMaxAggregateInputType
  }

  export type AmenityGroupByOutputType = {
    id: string
    name: string
    category: $Enums.AmenityCategory
    _count: AmenityCountAggregateOutputType | null
    _min: AmenityMinAggregateOutputType | null
    _max: AmenityMaxAggregateOutputType | null
  }

  type GetAmenityGroupByPayload<T extends AmenityGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AmenityGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AmenityGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AmenityGroupByOutputType[P]>
            : GetScalarType<T[P], AmenityGroupByOutputType[P]>
        }
      >
    >


  export type AmenitySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    category?: boolean
  }, ExtArgs["result"]["amenity"]>

  export type AmenitySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    category?: boolean
  }, ExtArgs["result"]["amenity"]>

  export type AmenitySelectScalar = {
    id?: boolean
    name?: boolean
    category?: boolean
  }


  export type $AmenityPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Amenity"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      category: $Enums.AmenityCategory
    }, ExtArgs["result"]["amenity"]>
    composites: {}
  }

  type AmenityGetPayload<S extends boolean | null | undefined | AmenityDefaultArgs> = $Result.GetResult<Prisma.$AmenityPayload, S>

  type AmenityCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AmenityFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AmenityCountAggregateInputType | true
    }

  export interface AmenityDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Amenity'], meta: { name: 'Amenity' } }
    /**
     * Find zero or one Amenity that matches the filter.
     * @param {AmenityFindUniqueArgs} args - Arguments to find a Amenity
     * @example
     * // Get one Amenity
     * const amenity = await prisma.amenity.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AmenityFindUniqueArgs>(args: SelectSubset<T, AmenityFindUniqueArgs<ExtArgs>>): Prisma__AmenityClient<$Result.GetResult<Prisma.$AmenityPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Amenity that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AmenityFindUniqueOrThrowArgs} args - Arguments to find a Amenity
     * @example
     * // Get one Amenity
     * const amenity = await prisma.amenity.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AmenityFindUniqueOrThrowArgs>(args: SelectSubset<T, AmenityFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AmenityClient<$Result.GetResult<Prisma.$AmenityPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Amenity that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AmenityFindFirstArgs} args - Arguments to find a Amenity
     * @example
     * // Get one Amenity
     * const amenity = await prisma.amenity.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AmenityFindFirstArgs>(args?: SelectSubset<T, AmenityFindFirstArgs<ExtArgs>>): Prisma__AmenityClient<$Result.GetResult<Prisma.$AmenityPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Amenity that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AmenityFindFirstOrThrowArgs} args - Arguments to find a Amenity
     * @example
     * // Get one Amenity
     * const amenity = await prisma.amenity.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AmenityFindFirstOrThrowArgs>(args?: SelectSubset<T, AmenityFindFirstOrThrowArgs<ExtArgs>>): Prisma__AmenityClient<$Result.GetResult<Prisma.$AmenityPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Amenities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AmenityFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Amenities
     * const amenities = await prisma.amenity.findMany()
     * 
     * // Get first 10 Amenities
     * const amenities = await prisma.amenity.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const amenityWithIdOnly = await prisma.amenity.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AmenityFindManyArgs>(args?: SelectSubset<T, AmenityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AmenityPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Amenity.
     * @param {AmenityCreateArgs} args - Arguments to create a Amenity.
     * @example
     * // Create one Amenity
     * const Amenity = await prisma.amenity.create({
     *   data: {
     *     // ... data to create a Amenity
     *   }
     * })
     * 
     */
    create<T extends AmenityCreateArgs>(args: SelectSubset<T, AmenityCreateArgs<ExtArgs>>): Prisma__AmenityClient<$Result.GetResult<Prisma.$AmenityPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Amenities.
     * @param {AmenityCreateManyArgs} args - Arguments to create many Amenities.
     * @example
     * // Create many Amenities
     * const amenity = await prisma.amenity.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AmenityCreateManyArgs>(args?: SelectSubset<T, AmenityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Amenities and returns the data saved in the database.
     * @param {AmenityCreateManyAndReturnArgs} args - Arguments to create many Amenities.
     * @example
     * // Create many Amenities
     * const amenity = await prisma.amenity.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Amenities and only return the `id`
     * const amenityWithIdOnly = await prisma.amenity.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AmenityCreateManyAndReturnArgs>(args?: SelectSubset<T, AmenityCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AmenityPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Amenity.
     * @param {AmenityDeleteArgs} args - Arguments to delete one Amenity.
     * @example
     * // Delete one Amenity
     * const Amenity = await prisma.amenity.delete({
     *   where: {
     *     // ... filter to delete one Amenity
     *   }
     * })
     * 
     */
    delete<T extends AmenityDeleteArgs>(args: SelectSubset<T, AmenityDeleteArgs<ExtArgs>>): Prisma__AmenityClient<$Result.GetResult<Prisma.$AmenityPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Amenity.
     * @param {AmenityUpdateArgs} args - Arguments to update one Amenity.
     * @example
     * // Update one Amenity
     * const amenity = await prisma.amenity.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AmenityUpdateArgs>(args: SelectSubset<T, AmenityUpdateArgs<ExtArgs>>): Prisma__AmenityClient<$Result.GetResult<Prisma.$AmenityPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Amenities.
     * @param {AmenityDeleteManyArgs} args - Arguments to filter Amenities to delete.
     * @example
     * // Delete a few Amenities
     * const { count } = await prisma.amenity.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AmenityDeleteManyArgs>(args?: SelectSubset<T, AmenityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Amenities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AmenityUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Amenities
     * const amenity = await prisma.amenity.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AmenityUpdateManyArgs>(args: SelectSubset<T, AmenityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Amenity.
     * @param {AmenityUpsertArgs} args - Arguments to update or create a Amenity.
     * @example
     * // Update or create a Amenity
     * const amenity = await prisma.amenity.upsert({
     *   create: {
     *     // ... data to create a Amenity
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Amenity we want to update
     *   }
     * })
     */
    upsert<T extends AmenityUpsertArgs>(args: SelectSubset<T, AmenityUpsertArgs<ExtArgs>>): Prisma__AmenityClient<$Result.GetResult<Prisma.$AmenityPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Amenities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AmenityCountArgs} args - Arguments to filter Amenities to count.
     * @example
     * // Count the number of Amenities
     * const count = await prisma.amenity.count({
     *   where: {
     *     // ... the filter for the Amenities we want to count
     *   }
     * })
    **/
    count<T extends AmenityCountArgs>(
      args?: Subset<T, AmenityCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AmenityCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Amenity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AmenityAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AmenityAggregateArgs>(args: Subset<T, AmenityAggregateArgs>): Prisma.PrismaPromise<GetAmenityAggregateType<T>>

    /**
     * Group by Amenity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AmenityGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AmenityGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AmenityGroupByArgs['orderBy'] }
        : { orderBy?: AmenityGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AmenityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAmenityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Amenity model
   */
  readonly fields: AmenityFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Amenity.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AmenityClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Amenity model
   */ 
  interface AmenityFieldRefs {
    readonly id: FieldRef<"Amenity", 'String'>
    readonly name: FieldRef<"Amenity", 'String'>
    readonly category: FieldRef<"Amenity", 'AmenityCategory'>
  }
    

  // Custom InputTypes
  /**
   * Amenity findUnique
   */
  export type AmenityFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Amenity
     */
    select?: AmenitySelect<ExtArgs> | null
    /**
     * Filter, which Amenity to fetch.
     */
    where: AmenityWhereUniqueInput
  }

  /**
   * Amenity findUniqueOrThrow
   */
  export type AmenityFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Amenity
     */
    select?: AmenitySelect<ExtArgs> | null
    /**
     * Filter, which Amenity to fetch.
     */
    where: AmenityWhereUniqueInput
  }

  /**
   * Amenity findFirst
   */
  export type AmenityFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Amenity
     */
    select?: AmenitySelect<ExtArgs> | null
    /**
     * Filter, which Amenity to fetch.
     */
    where?: AmenityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Amenities to fetch.
     */
    orderBy?: AmenityOrderByWithRelationInput | AmenityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Amenities.
     */
    cursor?: AmenityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Amenities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Amenities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Amenities.
     */
    distinct?: AmenityScalarFieldEnum | AmenityScalarFieldEnum[]
  }

  /**
   * Amenity findFirstOrThrow
   */
  export type AmenityFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Amenity
     */
    select?: AmenitySelect<ExtArgs> | null
    /**
     * Filter, which Amenity to fetch.
     */
    where?: AmenityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Amenities to fetch.
     */
    orderBy?: AmenityOrderByWithRelationInput | AmenityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Amenities.
     */
    cursor?: AmenityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Amenities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Amenities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Amenities.
     */
    distinct?: AmenityScalarFieldEnum | AmenityScalarFieldEnum[]
  }

  /**
   * Amenity findMany
   */
  export type AmenityFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Amenity
     */
    select?: AmenitySelect<ExtArgs> | null
    /**
     * Filter, which Amenities to fetch.
     */
    where?: AmenityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Amenities to fetch.
     */
    orderBy?: AmenityOrderByWithRelationInput | AmenityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Amenities.
     */
    cursor?: AmenityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Amenities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Amenities.
     */
    skip?: number
    distinct?: AmenityScalarFieldEnum | AmenityScalarFieldEnum[]
  }

  /**
   * Amenity create
   */
  export type AmenityCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Amenity
     */
    select?: AmenitySelect<ExtArgs> | null
    /**
     * The data needed to create a Amenity.
     */
    data: XOR<AmenityCreateInput, AmenityUncheckedCreateInput>
  }

  /**
   * Amenity createMany
   */
  export type AmenityCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Amenities.
     */
    data: AmenityCreateManyInput | AmenityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Amenity createManyAndReturn
   */
  export type AmenityCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Amenity
     */
    select?: AmenitySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Amenities.
     */
    data: AmenityCreateManyInput | AmenityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Amenity update
   */
  export type AmenityUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Amenity
     */
    select?: AmenitySelect<ExtArgs> | null
    /**
     * The data needed to update a Amenity.
     */
    data: XOR<AmenityUpdateInput, AmenityUncheckedUpdateInput>
    /**
     * Choose, which Amenity to update.
     */
    where: AmenityWhereUniqueInput
  }

  /**
   * Amenity updateMany
   */
  export type AmenityUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Amenities.
     */
    data: XOR<AmenityUpdateManyMutationInput, AmenityUncheckedUpdateManyInput>
    /**
     * Filter which Amenities to update
     */
    where?: AmenityWhereInput
  }

  /**
   * Amenity upsert
   */
  export type AmenityUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Amenity
     */
    select?: AmenitySelect<ExtArgs> | null
    /**
     * The filter to search for the Amenity to update in case it exists.
     */
    where: AmenityWhereUniqueInput
    /**
     * In case the Amenity found by the `where` argument doesn't exist, create a new Amenity with this data.
     */
    create: XOR<AmenityCreateInput, AmenityUncheckedCreateInput>
    /**
     * In case the Amenity was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AmenityUpdateInput, AmenityUncheckedUpdateInput>
  }

  /**
   * Amenity delete
   */
  export type AmenityDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Amenity
     */
    select?: AmenitySelect<ExtArgs> | null
    /**
     * Filter which Amenity to delete.
     */
    where: AmenityWhereUniqueInput
  }

  /**
   * Amenity deleteMany
   */
  export type AmenityDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Amenities to delete
     */
    where?: AmenityWhereInput
  }

  /**
   * Amenity without action
   */
  export type AmenityDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Amenity
     */
    select?: AmenitySelect<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const PropertyScalarFieldEnum: {
    id: 'id',
    title: 'title',
    location: 'location',
    description: 'description',
    price: 'price',
    pricePerSqft: 'pricePerSqft',
    priceNote: 'priceNote',
    callForPrice: 'callForPrice',
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

  export type PropertyScalarFieldEnum = (typeof PropertyScalarFieldEnum)[keyof typeof PropertyScalarFieldEnum]


  export const PropertyImageScalarFieldEnum: {
    id: 'id',
    url: 'url',
    isPrimary: 'isPrimary',
    order: 'order',
    propertyId: 'propertyId',
    createdAt: 'createdAt'
  };

  export type PropertyImageScalarFieldEnum = (typeof PropertyImageScalarFieldEnum)[keyof typeof PropertyImageScalarFieldEnum]


  export const AmenityScalarFieldEnum: {
    id: 'id',
    name: 'name',
    category: 'category'
  };

  export type AmenityScalarFieldEnum = (typeof AmenityScalarFieldEnum)[keyof typeof AmenityScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'PropertyType'
   */
  export type EnumPropertyTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PropertyType'>
    


  /**
   * Reference to a field of type 'PropertyType[]'
   */
  export type ListEnumPropertyTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PropertyType[]'>
    


  /**
   * Reference to a field of type 'SubType'
   */
  export type EnumSubTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SubType'>
    


  /**
   * Reference to a field of type 'SubType[]'
   */
  export type ListEnumSubTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SubType[]'>
    


  /**
   * Reference to a field of type 'LayoutType'
   */
  export type EnumLayoutTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LayoutType'>
    


  /**
   * Reference to a field of type 'LayoutType[]'
   */
  export type ListEnumLayoutTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LayoutType[]'>
    


  /**
   * Reference to a field of type 'Furnishing'
   */
  export type EnumFurnishingFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Furnishing'>
    


  /**
   * Reference to a field of type 'Furnishing[]'
   */
  export type ListEnumFurnishingFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Furnishing[]'>
    


  /**
   * Reference to a field of type 'AmenityCategory'
   */
  export type EnumAmenityCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AmenityCategory'>
    


  /**
   * Reference to a field of type 'AmenityCategory[]'
   */
  export type ListEnumAmenityCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AmenityCategory[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type PropertyWhereInput = {
    AND?: PropertyWhereInput | PropertyWhereInput[]
    OR?: PropertyWhereInput[]
    NOT?: PropertyWhereInput | PropertyWhereInput[]
    id?: StringFilter<"Property"> | string
    title?: StringFilter<"Property"> | string
    location?: StringFilter<"Property"> | string
    description?: StringFilter<"Property"> | string
    price?: IntFilter<"Property"> | number
    pricePerSqft?: IntNullableFilter<"Property"> | number | null
    priceNote?: StringNullableFilter<"Property"> | string | null
    callForPrice?: BoolFilter<"Property"> | boolean
    bedrooms?: IntNullableFilter<"Property"> | number | null
    bathrooms?: IntNullableFilter<"Property"> | number | null
    halfBaths?: IntNullableFilter<"Property"> | number | null
    totalRooms?: IntNullableFilter<"Property"> | number | null
    floors?: IntNullableFilter<"Property"> | number | null
    floorLevel?: IntNullableFilter<"Property"> | number | null
    areaSqft?: IntNullableFilter<"Property"> | number | null
    lotSizeSqft?: IntNullableFilter<"Property"> | number | null
    yearBuilt?: IntNullableFilter<"Property"> | number | null
    yearRemodeled?: IntNullableFilter<"Property"> | number | null
    rentPeriods?: StringNullableListFilter<"Property">
    statuses?: StringNullableListFilter<"Property">
    parkingOptions?: StringNullableListFilter<"Property">
    basementOptions?: StringNullableListFilter<"Property">
    type?: EnumPropertyTypeFilter<"Property"> | $Enums.PropertyType
    subType?: EnumSubTypeFilter<"Property"> | $Enums.SubType
    layoutType?: EnumLayoutTypeFilter<"Property"> | $Enums.LayoutType
    furnishing?: EnumFurnishingFilter<"Property"> | $Enums.Furnishing
    amenityCategory?: EnumAmenityCategoryFilter<"Property"> | $Enums.AmenityCategory
    createdAt?: DateTimeFilter<"Property"> | Date | string
    updatedAt?: DateTimeFilter<"Property"> | Date | string
    images?: PropertyImageListRelationFilter
  }

  export type PropertyOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    location?: SortOrder
    description?: SortOrder
    price?: SortOrder
    pricePerSqft?: SortOrderInput | SortOrder
    priceNote?: SortOrderInput | SortOrder
    callForPrice?: SortOrder
    bedrooms?: SortOrderInput | SortOrder
    bathrooms?: SortOrderInput | SortOrder
    halfBaths?: SortOrderInput | SortOrder
    totalRooms?: SortOrderInput | SortOrder
    floors?: SortOrderInput | SortOrder
    floorLevel?: SortOrderInput | SortOrder
    areaSqft?: SortOrderInput | SortOrder
    lotSizeSqft?: SortOrderInput | SortOrder
    yearBuilt?: SortOrderInput | SortOrder
    yearRemodeled?: SortOrderInput | SortOrder
    rentPeriods?: SortOrder
    statuses?: SortOrder
    parkingOptions?: SortOrder
    basementOptions?: SortOrder
    type?: SortOrder
    subType?: SortOrder
    layoutType?: SortOrder
    furnishing?: SortOrder
    amenityCategory?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    images?: PropertyImageOrderByRelationAggregateInput
  }

  export type PropertyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PropertyWhereInput | PropertyWhereInput[]
    OR?: PropertyWhereInput[]
    NOT?: PropertyWhereInput | PropertyWhereInput[]
    title?: StringFilter<"Property"> | string
    location?: StringFilter<"Property"> | string
    description?: StringFilter<"Property"> | string
    price?: IntFilter<"Property"> | number
    pricePerSqft?: IntNullableFilter<"Property"> | number | null
    priceNote?: StringNullableFilter<"Property"> | string | null
    callForPrice?: BoolFilter<"Property"> | boolean
    bedrooms?: IntNullableFilter<"Property"> | number | null
    bathrooms?: IntNullableFilter<"Property"> | number | null
    halfBaths?: IntNullableFilter<"Property"> | number | null
    totalRooms?: IntNullableFilter<"Property"> | number | null
    floors?: IntNullableFilter<"Property"> | number | null
    floorLevel?: IntNullableFilter<"Property"> | number | null
    areaSqft?: IntNullableFilter<"Property"> | number | null
    lotSizeSqft?: IntNullableFilter<"Property"> | number | null
    yearBuilt?: IntNullableFilter<"Property"> | number | null
    yearRemodeled?: IntNullableFilter<"Property"> | number | null
    rentPeriods?: StringNullableListFilter<"Property">
    statuses?: StringNullableListFilter<"Property">
    parkingOptions?: StringNullableListFilter<"Property">
    basementOptions?: StringNullableListFilter<"Property">
    type?: EnumPropertyTypeFilter<"Property"> | $Enums.PropertyType
    subType?: EnumSubTypeFilter<"Property"> | $Enums.SubType
    layoutType?: EnumLayoutTypeFilter<"Property"> | $Enums.LayoutType
    furnishing?: EnumFurnishingFilter<"Property"> | $Enums.Furnishing
    amenityCategory?: EnumAmenityCategoryFilter<"Property"> | $Enums.AmenityCategory
    createdAt?: DateTimeFilter<"Property"> | Date | string
    updatedAt?: DateTimeFilter<"Property"> | Date | string
    images?: PropertyImageListRelationFilter
  }, "id">

  export type PropertyOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    location?: SortOrder
    description?: SortOrder
    price?: SortOrder
    pricePerSqft?: SortOrderInput | SortOrder
    priceNote?: SortOrderInput | SortOrder
    callForPrice?: SortOrder
    bedrooms?: SortOrderInput | SortOrder
    bathrooms?: SortOrderInput | SortOrder
    halfBaths?: SortOrderInput | SortOrder
    totalRooms?: SortOrderInput | SortOrder
    floors?: SortOrderInput | SortOrder
    floorLevel?: SortOrderInput | SortOrder
    areaSqft?: SortOrderInput | SortOrder
    lotSizeSqft?: SortOrderInput | SortOrder
    yearBuilt?: SortOrderInput | SortOrder
    yearRemodeled?: SortOrderInput | SortOrder
    rentPeriods?: SortOrder
    statuses?: SortOrder
    parkingOptions?: SortOrder
    basementOptions?: SortOrder
    type?: SortOrder
    subType?: SortOrder
    layoutType?: SortOrder
    furnishing?: SortOrder
    amenityCategory?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PropertyCountOrderByAggregateInput
    _avg?: PropertyAvgOrderByAggregateInput
    _max?: PropertyMaxOrderByAggregateInput
    _min?: PropertyMinOrderByAggregateInput
    _sum?: PropertySumOrderByAggregateInput
  }

  export type PropertyScalarWhereWithAggregatesInput = {
    AND?: PropertyScalarWhereWithAggregatesInput | PropertyScalarWhereWithAggregatesInput[]
    OR?: PropertyScalarWhereWithAggregatesInput[]
    NOT?: PropertyScalarWhereWithAggregatesInput | PropertyScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Property"> | string
    title?: StringWithAggregatesFilter<"Property"> | string
    location?: StringWithAggregatesFilter<"Property"> | string
    description?: StringWithAggregatesFilter<"Property"> | string
    price?: IntWithAggregatesFilter<"Property"> | number
    pricePerSqft?: IntNullableWithAggregatesFilter<"Property"> | number | null
    priceNote?: StringNullableWithAggregatesFilter<"Property"> | string | null
    callForPrice?: BoolWithAggregatesFilter<"Property"> | boolean
    bedrooms?: IntNullableWithAggregatesFilter<"Property"> | number | null
    bathrooms?: IntNullableWithAggregatesFilter<"Property"> | number | null
    halfBaths?: IntNullableWithAggregatesFilter<"Property"> | number | null
    totalRooms?: IntNullableWithAggregatesFilter<"Property"> | number | null
    floors?: IntNullableWithAggregatesFilter<"Property"> | number | null
    floorLevel?: IntNullableWithAggregatesFilter<"Property"> | number | null
    areaSqft?: IntNullableWithAggregatesFilter<"Property"> | number | null
    lotSizeSqft?: IntNullableWithAggregatesFilter<"Property"> | number | null
    yearBuilt?: IntNullableWithAggregatesFilter<"Property"> | number | null
    yearRemodeled?: IntNullableWithAggregatesFilter<"Property"> | number | null
    rentPeriods?: StringNullableListFilter<"Property">
    statuses?: StringNullableListFilter<"Property">
    parkingOptions?: StringNullableListFilter<"Property">
    basementOptions?: StringNullableListFilter<"Property">
    type?: EnumPropertyTypeWithAggregatesFilter<"Property"> | $Enums.PropertyType
    subType?: EnumSubTypeWithAggregatesFilter<"Property"> | $Enums.SubType
    layoutType?: EnumLayoutTypeWithAggregatesFilter<"Property"> | $Enums.LayoutType
    furnishing?: EnumFurnishingWithAggregatesFilter<"Property"> | $Enums.Furnishing
    amenityCategory?: EnumAmenityCategoryWithAggregatesFilter<"Property"> | $Enums.AmenityCategory
    createdAt?: DateTimeWithAggregatesFilter<"Property"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Property"> | Date | string
  }

  export type PropertyImageWhereInput = {
    AND?: PropertyImageWhereInput | PropertyImageWhereInput[]
    OR?: PropertyImageWhereInput[]
    NOT?: PropertyImageWhereInput | PropertyImageWhereInput[]
    id?: StringFilter<"PropertyImage"> | string
    url?: StringFilter<"PropertyImage"> | string
    isPrimary?: BoolFilter<"PropertyImage"> | boolean
    order?: IntFilter<"PropertyImage"> | number
    propertyId?: StringFilter<"PropertyImage"> | string
    createdAt?: DateTimeFilter<"PropertyImage"> | Date | string
    property?: XOR<PropertyRelationFilter, PropertyWhereInput>
  }

  export type PropertyImageOrderByWithRelationInput = {
    id?: SortOrder
    url?: SortOrder
    isPrimary?: SortOrder
    order?: SortOrder
    propertyId?: SortOrder
    createdAt?: SortOrder
    property?: PropertyOrderByWithRelationInput
  }

  export type PropertyImageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PropertyImageWhereInput | PropertyImageWhereInput[]
    OR?: PropertyImageWhereInput[]
    NOT?: PropertyImageWhereInput | PropertyImageWhereInput[]
    url?: StringFilter<"PropertyImage"> | string
    isPrimary?: BoolFilter<"PropertyImage"> | boolean
    order?: IntFilter<"PropertyImage"> | number
    propertyId?: StringFilter<"PropertyImage"> | string
    createdAt?: DateTimeFilter<"PropertyImage"> | Date | string
    property?: XOR<PropertyRelationFilter, PropertyWhereInput>
  }, "id">

  export type PropertyImageOrderByWithAggregationInput = {
    id?: SortOrder
    url?: SortOrder
    isPrimary?: SortOrder
    order?: SortOrder
    propertyId?: SortOrder
    createdAt?: SortOrder
    _count?: PropertyImageCountOrderByAggregateInput
    _avg?: PropertyImageAvgOrderByAggregateInput
    _max?: PropertyImageMaxOrderByAggregateInput
    _min?: PropertyImageMinOrderByAggregateInput
    _sum?: PropertyImageSumOrderByAggregateInput
  }

  export type PropertyImageScalarWhereWithAggregatesInput = {
    AND?: PropertyImageScalarWhereWithAggregatesInput | PropertyImageScalarWhereWithAggregatesInput[]
    OR?: PropertyImageScalarWhereWithAggregatesInput[]
    NOT?: PropertyImageScalarWhereWithAggregatesInput | PropertyImageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PropertyImage"> | string
    url?: StringWithAggregatesFilter<"PropertyImage"> | string
    isPrimary?: BoolWithAggregatesFilter<"PropertyImage"> | boolean
    order?: IntWithAggregatesFilter<"PropertyImage"> | number
    propertyId?: StringWithAggregatesFilter<"PropertyImage"> | string
    createdAt?: DateTimeWithAggregatesFilter<"PropertyImage"> | Date | string
  }

  export type AmenityWhereInput = {
    AND?: AmenityWhereInput | AmenityWhereInput[]
    OR?: AmenityWhereInput[]
    NOT?: AmenityWhereInput | AmenityWhereInput[]
    id?: StringFilter<"Amenity"> | string
    name?: StringFilter<"Amenity"> | string
    category?: EnumAmenityCategoryFilter<"Amenity"> | $Enums.AmenityCategory
  }

  export type AmenityOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
  }

  export type AmenityWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: AmenityWhereInput | AmenityWhereInput[]
    OR?: AmenityWhereInput[]
    NOT?: AmenityWhereInput | AmenityWhereInput[]
    category?: EnumAmenityCategoryFilter<"Amenity"> | $Enums.AmenityCategory
  }, "id" | "name">

  export type AmenityOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
    _count?: AmenityCountOrderByAggregateInput
    _max?: AmenityMaxOrderByAggregateInput
    _min?: AmenityMinOrderByAggregateInput
  }

  export type AmenityScalarWhereWithAggregatesInput = {
    AND?: AmenityScalarWhereWithAggregatesInput | AmenityScalarWhereWithAggregatesInput[]
    OR?: AmenityScalarWhereWithAggregatesInput[]
    NOT?: AmenityScalarWhereWithAggregatesInput | AmenityScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Amenity"> | string
    name?: StringWithAggregatesFilter<"Amenity"> | string
    category?: EnumAmenityCategoryWithAggregatesFilter<"Amenity"> | $Enums.AmenityCategory
  }

  export type PropertyCreateInput = {
    id?: string
    title: string
    location: string
    description: string
    price: number
    pricePerSqft?: number | null
    priceNote?: string | null
    callForPrice?: boolean
    bedrooms?: number | null
    bathrooms?: number | null
    halfBaths?: number | null
    totalRooms?: number | null
    floors?: number | null
    floorLevel?: number | null
    areaSqft?: number | null
    lotSizeSqft?: number | null
    yearBuilt?: number | null
    yearRemodeled?: number | null
    rentPeriods?: PropertyCreaterentPeriodsInput | string[]
    statuses?: PropertyCreatestatusesInput | string[]
    parkingOptions?: PropertyCreateparkingOptionsInput | string[]
    basementOptions?: PropertyCreatebasementOptionsInput | string[]
    type?: $Enums.PropertyType
    subType?: $Enums.SubType
    layoutType?: $Enums.LayoutType
    furnishing?: $Enums.Furnishing
    amenityCategory?: $Enums.AmenityCategory
    createdAt?: Date | string
    updatedAt?: Date | string
    images?: PropertyImageCreateNestedManyWithoutPropertyInput
  }

  export type PropertyUncheckedCreateInput = {
    id?: string
    title: string
    location: string
    description: string
    price: number
    pricePerSqft?: number | null
    priceNote?: string | null
    callForPrice?: boolean
    bedrooms?: number | null
    bathrooms?: number | null
    halfBaths?: number | null
    totalRooms?: number | null
    floors?: number | null
    floorLevel?: number | null
    areaSqft?: number | null
    lotSizeSqft?: number | null
    yearBuilt?: number | null
    yearRemodeled?: number | null
    rentPeriods?: PropertyCreaterentPeriodsInput | string[]
    statuses?: PropertyCreatestatusesInput | string[]
    parkingOptions?: PropertyCreateparkingOptionsInput | string[]
    basementOptions?: PropertyCreatebasementOptionsInput | string[]
    type?: $Enums.PropertyType
    subType?: $Enums.SubType
    layoutType?: $Enums.LayoutType
    furnishing?: $Enums.Furnishing
    amenityCategory?: $Enums.AmenityCategory
    createdAt?: Date | string
    updatedAt?: Date | string
    images?: PropertyImageUncheckedCreateNestedManyWithoutPropertyInput
  }

  export type PropertyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    pricePerSqft?: NullableIntFieldUpdateOperationsInput | number | null
    priceNote?: NullableStringFieldUpdateOperationsInput | string | null
    callForPrice?: BoolFieldUpdateOperationsInput | boolean
    bedrooms?: NullableIntFieldUpdateOperationsInput | number | null
    bathrooms?: NullableIntFieldUpdateOperationsInput | number | null
    halfBaths?: NullableIntFieldUpdateOperationsInput | number | null
    totalRooms?: NullableIntFieldUpdateOperationsInput | number | null
    floors?: NullableIntFieldUpdateOperationsInput | number | null
    floorLevel?: NullableIntFieldUpdateOperationsInput | number | null
    areaSqft?: NullableIntFieldUpdateOperationsInput | number | null
    lotSizeSqft?: NullableIntFieldUpdateOperationsInput | number | null
    yearBuilt?: NullableIntFieldUpdateOperationsInput | number | null
    yearRemodeled?: NullableIntFieldUpdateOperationsInput | number | null
    rentPeriods?: PropertyUpdaterentPeriodsInput | string[]
    statuses?: PropertyUpdatestatusesInput | string[]
    parkingOptions?: PropertyUpdateparkingOptionsInput | string[]
    basementOptions?: PropertyUpdatebasementOptionsInput | string[]
    type?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType
    subType?: EnumSubTypeFieldUpdateOperationsInput | $Enums.SubType
    layoutType?: EnumLayoutTypeFieldUpdateOperationsInput | $Enums.LayoutType
    furnishing?: EnumFurnishingFieldUpdateOperationsInput | $Enums.Furnishing
    amenityCategory?: EnumAmenityCategoryFieldUpdateOperationsInput | $Enums.AmenityCategory
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    images?: PropertyImageUpdateManyWithoutPropertyNestedInput
  }

  export type PropertyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    pricePerSqft?: NullableIntFieldUpdateOperationsInput | number | null
    priceNote?: NullableStringFieldUpdateOperationsInput | string | null
    callForPrice?: BoolFieldUpdateOperationsInput | boolean
    bedrooms?: NullableIntFieldUpdateOperationsInput | number | null
    bathrooms?: NullableIntFieldUpdateOperationsInput | number | null
    halfBaths?: NullableIntFieldUpdateOperationsInput | number | null
    totalRooms?: NullableIntFieldUpdateOperationsInput | number | null
    floors?: NullableIntFieldUpdateOperationsInput | number | null
    floorLevel?: NullableIntFieldUpdateOperationsInput | number | null
    areaSqft?: NullableIntFieldUpdateOperationsInput | number | null
    lotSizeSqft?: NullableIntFieldUpdateOperationsInput | number | null
    yearBuilt?: NullableIntFieldUpdateOperationsInput | number | null
    yearRemodeled?: NullableIntFieldUpdateOperationsInput | number | null
    rentPeriods?: PropertyUpdaterentPeriodsInput | string[]
    statuses?: PropertyUpdatestatusesInput | string[]
    parkingOptions?: PropertyUpdateparkingOptionsInput | string[]
    basementOptions?: PropertyUpdatebasementOptionsInput | string[]
    type?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType
    subType?: EnumSubTypeFieldUpdateOperationsInput | $Enums.SubType
    layoutType?: EnumLayoutTypeFieldUpdateOperationsInput | $Enums.LayoutType
    furnishing?: EnumFurnishingFieldUpdateOperationsInput | $Enums.Furnishing
    amenityCategory?: EnumAmenityCategoryFieldUpdateOperationsInput | $Enums.AmenityCategory
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    images?: PropertyImageUncheckedUpdateManyWithoutPropertyNestedInput
  }

  export type PropertyCreateManyInput = {
    id?: string
    title: string
    location: string
    description: string
    price: number
    pricePerSqft?: number | null
    priceNote?: string | null
    callForPrice?: boolean
    bedrooms?: number | null
    bathrooms?: number | null
    halfBaths?: number | null
    totalRooms?: number | null
    floors?: number | null
    floorLevel?: number | null
    areaSqft?: number | null
    lotSizeSqft?: number | null
    yearBuilt?: number | null
    yearRemodeled?: number | null
    rentPeriods?: PropertyCreaterentPeriodsInput | string[]
    statuses?: PropertyCreatestatusesInput | string[]
    parkingOptions?: PropertyCreateparkingOptionsInput | string[]
    basementOptions?: PropertyCreatebasementOptionsInput | string[]
    type?: $Enums.PropertyType
    subType?: $Enums.SubType
    layoutType?: $Enums.LayoutType
    furnishing?: $Enums.Furnishing
    amenityCategory?: $Enums.AmenityCategory
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PropertyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    pricePerSqft?: NullableIntFieldUpdateOperationsInput | number | null
    priceNote?: NullableStringFieldUpdateOperationsInput | string | null
    callForPrice?: BoolFieldUpdateOperationsInput | boolean
    bedrooms?: NullableIntFieldUpdateOperationsInput | number | null
    bathrooms?: NullableIntFieldUpdateOperationsInput | number | null
    halfBaths?: NullableIntFieldUpdateOperationsInput | number | null
    totalRooms?: NullableIntFieldUpdateOperationsInput | number | null
    floors?: NullableIntFieldUpdateOperationsInput | number | null
    floorLevel?: NullableIntFieldUpdateOperationsInput | number | null
    areaSqft?: NullableIntFieldUpdateOperationsInput | number | null
    lotSizeSqft?: NullableIntFieldUpdateOperationsInput | number | null
    yearBuilt?: NullableIntFieldUpdateOperationsInput | number | null
    yearRemodeled?: NullableIntFieldUpdateOperationsInput | number | null
    rentPeriods?: PropertyUpdaterentPeriodsInput | string[]
    statuses?: PropertyUpdatestatusesInput | string[]
    parkingOptions?: PropertyUpdateparkingOptionsInput | string[]
    basementOptions?: PropertyUpdatebasementOptionsInput | string[]
    type?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType
    subType?: EnumSubTypeFieldUpdateOperationsInput | $Enums.SubType
    layoutType?: EnumLayoutTypeFieldUpdateOperationsInput | $Enums.LayoutType
    furnishing?: EnumFurnishingFieldUpdateOperationsInput | $Enums.Furnishing
    amenityCategory?: EnumAmenityCategoryFieldUpdateOperationsInput | $Enums.AmenityCategory
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PropertyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    pricePerSqft?: NullableIntFieldUpdateOperationsInput | number | null
    priceNote?: NullableStringFieldUpdateOperationsInput | string | null
    callForPrice?: BoolFieldUpdateOperationsInput | boolean
    bedrooms?: NullableIntFieldUpdateOperationsInput | number | null
    bathrooms?: NullableIntFieldUpdateOperationsInput | number | null
    halfBaths?: NullableIntFieldUpdateOperationsInput | number | null
    totalRooms?: NullableIntFieldUpdateOperationsInput | number | null
    floors?: NullableIntFieldUpdateOperationsInput | number | null
    floorLevel?: NullableIntFieldUpdateOperationsInput | number | null
    areaSqft?: NullableIntFieldUpdateOperationsInput | number | null
    lotSizeSqft?: NullableIntFieldUpdateOperationsInput | number | null
    yearBuilt?: NullableIntFieldUpdateOperationsInput | number | null
    yearRemodeled?: NullableIntFieldUpdateOperationsInput | number | null
    rentPeriods?: PropertyUpdaterentPeriodsInput | string[]
    statuses?: PropertyUpdatestatusesInput | string[]
    parkingOptions?: PropertyUpdateparkingOptionsInput | string[]
    basementOptions?: PropertyUpdatebasementOptionsInput | string[]
    type?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType
    subType?: EnumSubTypeFieldUpdateOperationsInput | $Enums.SubType
    layoutType?: EnumLayoutTypeFieldUpdateOperationsInput | $Enums.LayoutType
    furnishing?: EnumFurnishingFieldUpdateOperationsInput | $Enums.Furnishing
    amenityCategory?: EnumAmenityCategoryFieldUpdateOperationsInput | $Enums.AmenityCategory
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PropertyImageCreateInput = {
    id?: string
    url: string
    isPrimary?: boolean
    order?: number
    createdAt?: Date | string
    property: PropertyCreateNestedOneWithoutImagesInput
  }

  export type PropertyImageUncheckedCreateInput = {
    id?: string
    url: string
    isPrimary?: boolean
    order?: number
    propertyId: string
    createdAt?: Date | string
  }

  export type PropertyImageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    property?: PropertyUpdateOneRequiredWithoutImagesNestedInput
  }

  export type PropertyImageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
    propertyId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PropertyImageCreateManyInput = {
    id?: string
    url: string
    isPrimary?: boolean
    order?: number
    propertyId: string
    createdAt?: Date | string
  }

  export type PropertyImageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PropertyImageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
    propertyId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AmenityCreateInput = {
    id?: string
    name: string
    category?: $Enums.AmenityCategory
  }

  export type AmenityUncheckedCreateInput = {
    id?: string
    name: string
    category?: $Enums.AmenityCategory
  }

  export type AmenityUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: EnumAmenityCategoryFieldUpdateOperationsInput | $Enums.AmenityCategory
  }

  export type AmenityUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: EnumAmenityCategoryFieldUpdateOperationsInput | $Enums.AmenityCategory
  }

  export type AmenityCreateManyInput = {
    id?: string
    name: string
    category?: $Enums.AmenityCategory
  }

  export type AmenityUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: EnumAmenityCategoryFieldUpdateOperationsInput | $Enums.AmenityCategory
  }

  export type AmenityUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: EnumAmenityCategoryFieldUpdateOperationsInput | $Enums.AmenityCategory
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type EnumPropertyTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PropertyType | EnumPropertyTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PropertyType[] | ListEnumPropertyTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PropertyType[] | ListEnumPropertyTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPropertyTypeFilter<$PrismaModel> | $Enums.PropertyType
  }

  export type EnumSubTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.SubType | EnumSubTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SubType[] | ListEnumSubTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SubType[] | ListEnumSubTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSubTypeFilter<$PrismaModel> | $Enums.SubType
  }

  export type EnumLayoutTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.LayoutType | EnumLayoutTypeFieldRefInput<$PrismaModel>
    in?: $Enums.LayoutType[] | ListEnumLayoutTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.LayoutType[] | ListEnumLayoutTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumLayoutTypeFilter<$PrismaModel> | $Enums.LayoutType
  }

  export type EnumFurnishingFilter<$PrismaModel = never> = {
    equals?: $Enums.Furnishing | EnumFurnishingFieldRefInput<$PrismaModel>
    in?: $Enums.Furnishing[] | ListEnumFurnishingFieldRefInput<$PrismaModel>
    notIn?: $Enums.Furnishing[] | ListEnumFurnishingFieldRefInput<$PrismaModel>
    not?: NestedEnumFurnishingFilter<$PrismaModel> | $Enums.Furnishing
  }

  export type EnumAmenityCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.AmenityCategory | EnumAmenityCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.AmenityCategory[] | ListEnumAmenityCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.AmenityCategory[] | ListEnumAmenityCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumAmenityCategoryFilter<$PrismaModel> | $Enums.AmenityCategory
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type PropertyImageListRelationFilter = {
    every?: PropertyImageWhereInput
    some?: PropertyImageWhereInput
    none?: PropertyImageWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type PropertyImageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PropertyCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    location?: SortOrder
    description?: SortOrder
    price?: SortOrder
    pricePerSqft?: SortOrder
    priceNote?: SortOrder
    callForPrice?: SortOrder
    bedrooms?: SortOrder
    bathrooms?: SortOrder
    halfBaths?: SortOrder
    totalRooms?: SortOrder
    floors?: SortOrder
    floorLevel?: SortOrder
    areaSqft?: SortOrder
    lotSizeSqft?: SortOrder
    yearBuilt?: SortOrder
    yearRemodeled?: SortOrder
    rentPeriods?: SortOrder
    statuses?: SortOrder
    parkingOptions?: SortOrder
    basementOptions?: SortOrder
    type?: SortOrder
    subType?: SortOrder
    layoutType?: SortOrder
    furnishing?: SortOrder
    amenityCategory?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PropertyAvgOrderByAggregateInput = {
    price?: SortOrder
    pricePerSqft?: SortOrder
    bedrooms?: SortOrder
    bathrooms?: SortOrder
    halfBaths?: SortOrder
    totalRooms?: SortOrder
    floors?: SortOrder
    floorLevel?: SortOrder
    areaSqft?: SortOrder
    lotSizeSqft?: SortOrder
    yearBuilt?: SortOrder
    yearRemodeled?: SortOrder
  }

  export type PropertyMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    location?: SortOrder
    description?: SortOrder
    price?: SortOrder
    pricePerSqft?: SortOrder
    priceNote?: SortOrder
    callForPrice?: SortOrder
    bedrooms?: SortOrder
    bathrooms?: SortOrder
    halfBaths?: SortOrder
    totalRooms?: SortOrder
    floors?: SortOrder
    floorLevel?: SortOrder
    areaSqft?: SortOrder
    lotSizeSqft?: SortOrder
    yearBuilt?: SortOrder
    yearRemodeled?: SortOrder
    type?: SortOrder
    subType?: SortOrder
    layoutType?: SortOrder
    furnishing?: SortOrder
    amenityCategory?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PropertyMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    location?: SortOrder
    description?: SortOrder
    price?: SortOrder
    pricePerSqft?: SortOrder
    priceNote?: SortOrder
    callForPrice?: SortOrder
    bedrooms?: SortOrder
    bathrooms?: SortOrder
    halfBaths?: SortOrder
    totalRooms?: SortOrder
    floors?: SortOrder
    floorLevel?: SortOrder
    areaSqft?: SortOrder
    lotSizeSqft?: SortOrder
    yearBuilt?: SortOrder
    yearRemodeled?: SortOrder
    type?: SortOrder
    subType?: SortOrder
    layoutType?: SortOrder
    furnishing?: SortOrder
    amenityCategory?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PropertySumOrderByAggregateInput = {
    price?: SortOrder
    pricePerSqft?: SortOrder
    bedrooms?: SortOrder
    bathrooms?: SortOrder
    halfBaths?: SortOrder
    totalRooms?: SortOrder
    floors?: SortOrder
    floorLevel?: SortOrder
    areaSqft?: SortOrder
    lotSizeSqft?: SortOrder
    yearBuilt?: SortOrder
    yearRemodeled?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumPropertyTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PropertyType | EnumPropertyTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PropertyType[] | ListEnumPropertyTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PropertyType[] | ListEnumPropertyTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPropertyTypeWithAggregatesFilter<$PrismaModel> | $Enums.PropertyType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPropertyTypeFilter<$PrismaModel>
    _max?: NestedEnumPropertyTypeFilter<$PrismaModel>
  }

  export type EnumSubTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SubType | EnumSubTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SubType[] | ListEnumSubTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SubType[] | ListEnumSubTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSubTypeWithAggregatesFilter<$PrismaModel> | $Enums.SubType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSubTypeFilter<$PrismaModel>
    _max?: NestedEnumSubTypeFilter<$PrismaModel>
  }

  export type EnumLayoutTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LayoutType | EnumLayoutTypeFieldRefInput<$PrismaModel>
    in?: $Enums.LayoutType[] | ListEnumLayoutTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.LayoutType[] | ListEnumLayoutTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumLayoutTypeWithAggregatesFilter<$PrismaModel> | $Enums.LayoutType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLayoutTypeFilter<$PrismaModel>
    _max?: NestedEnumLayoutTypeFilter<$PrismaModel>
  }

  export type EnumFurnishingWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Furnishing | EnumFurnishingFieldRefInput<$PrismaModel>
    in?: $Enums.Furnishing[] | ListEnumFurnishingFieldRefInput<$PrismaModel>
    notIn?: $Enums.Furnishing[] | ListEnumFurnishingFieldRefInput<$PrismaModel>
    not?: NestedEnumFurnishingWithAggregatesFilter<$PrismaModel> | $Enums.Furnishing
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFurnishingFilter<$PrismaModel>
    _max?: NestedEnumFurnishingFilter<$PrismaModel>
  }

  export type EnumAmenityCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AmenityCategory | EnumAmenityCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.AmenityCategory[] | ListEnumAmenityCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.AmenityCategory[] | ListEnumAmenityCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumAmenityCategoryWithAggregatesFilter<$PrismaModel> | $Enums.AmenityCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAmenityCategoryFilter<$PrismaModel>
    _max?: NestedEnumAmenityCategoryFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type PropertyRelationFilter = {
    is?: PropertyWhereInput
    isNot?: PropertyWhereInput
  }

  export type PropertyImageCountOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    isPrimary?: SortOrder
    order?: SortOrder
    propertyId?: SortOrder
    createdAt?: SortOrder
  }

  export type PropertyImageAvgOrderByAggregateInput = {
    order?: SortOrder
  }

  export type PropertyImageMaxOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    isPrimary?: SortOrder
    order?: SortOrder
    propertyId?: SortOrder
    createdAt?: SortOrder
  }

  export type PropertyImageMinOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    isPrimary?: SortOrder
    order?: SortOrder
    propertyId?: SortOrder
    createdAt?: SortOrder
  }

  export type PropertyImageSumOrderByAggregateInput = {
    order?: SortOrder
  }

  export type AmenityCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
  }

  export type AmenityMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
  }

  export type AmenityMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
  }

  export type PropertyCreaterentPeriodsInput = {
    set: string[]
  }

  export type PropertyCreatestatusesInput = {
    set: string[]
  }

  export type PropertyCreateparkingOptionsInput = {
    set: string[]
  }

  export type PropertyCreatebasementOptionsInput = {
    set: string[]
  }

  export type PropertyImageCreateNestedManyWithoutPropertyInput = {
    create?: XOR<PropertyImageCreateWithoutPropertyInput, PropertyImageUncheckedCreateWithoutPropertyInput> | PropertyImageCreateWithoutPropertyInput[] | PropertyImageUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: PropertyImageCreateOrConnectWithoutPropertyInput | PropertyImageCreateOrConnectWithoutPropertyInput[]
    createMany?: PropertyImageCreateManyPropertyInputEnvelope
    connect?: PropertyImageWhereUniqueInput | PropertyImageWhereUniqueInput[]
  }

  export type PropertyImageUncheckedCreateNestedManyWithoutPropertyInput = {
    create?: XOR<PropertyImageCreateWithoutPropertyInput, PropertyImageUncheckedCreateWithoutPropertyInput> | PropertyImageCreateWithoutPropertyInput[] | PropertyImageUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: PropertyImageCreateOrConnectWithoutPropertyInput | PropertyImageCreateOrConnectWithoutPropertyInput[]
    createMany?: PropertyImageCreateManyPropertyInputEnvelope
    connect?: PropertyImageWhereUniqueInput | PropertyImageWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type PropertyUpdaterentPeriodsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type PropertyUpdatestatusesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type PropertyUpdateparkingOptionsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type PropertyUpdatebasementOptionsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type EnumPropertyTypeFieldUpdateOperationsInput = {
    set?: $Enums.PropertyType
  }

  export type EnumSubTypeFieldUpdateOperationsInput = {
    set?: $Enums.SubType
  }

  export type EnumLayoutTypeFieldUpdateOperationsInput = {
    set?: $Enums.LayoutType
  }

  export type EnumFurnishingFieldUpdateOperationsInput = {
    set?: $Enums.Furnishing
  }

  export type EnumAmenityCategoryFieldUpdateOperationsInput = {
    set?: $Enums.AmenityCategory
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type PropertyImageUpdateManyWithoutPropertyNestedInput = {
    create?: XOR<PropertyImageCreateWithoutPropertyInput, PropertyImageUncheckedCreateWithoutPropertyInput> | PropertyImageCreateWithoutPropertyInput[] | PropertyImageUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: PropertyImageCreateOrConnectWithoutPropertyInput | PropertyImageCreateOrConnectWithoutPropertyInput[]
    upsert?: PropertyImageUpsertWithWhereUniqueWithoutPropertyInput | PropertyImageUpsertWithWhereUniqueWithoutPropertyInput[]
    createMany?: PropertyImageCreateManyPropertyInputEnvelope
    set?: PropertyImageWhereUniqueInput | PropertyImageWhereUniqueInput[]
    disconnect?: PropertyImageWhereUniqueInput | PropertyImageWhereUniqueInput[]
    delete?: PropertyImageWhereUniqueInput | PropertyImageWhereUniqueInput[]
    connect?: PropertyImageWhereUniqueInput | PropertyImageWhereUniqueInput[]
    update?: PropertyImageUpdateWithWhereUniqueWithoutPropertyInput | PropertyImageUpdateWithWhereUniqueWithoutPropertyInput[]
    updateMany?: PropertyImageUpdateManyWithWhereWithoutPropertyInput | PropertyImageUpdateManyWithWhereWithoutPropertyInput[]
    deleteMany?: PropertyImageScalarWhereInput | PropertyImageScalarWhereInput[]
  }

  export type PropertyImageUncheckedUpdateManyWithoutPropertyNestedInput = {
    create?: XOR<PropertyImageCreateWithoutPropertyInput, PropertyImageUncheckedCreateWithoutPropertyInput> | PropertyImageCreateWithoutPropertyInput[] | PropertyImageUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: PropertyImageCreateOrConnectWithoutPropertyInput | PropertyImageCreateOrConnectWithoutPropertyInput[]
    upsert?: PropertyImageUpsertWithWhereUniqueWithoutPropertyInput | PropertyImageUpsertWithWhereUniqueWithoutPropertyInput[]
    createMany?: PropertyImageCreateManyPropertyInputEnvelope
    set?: PropertyImageWhereUniqueInput | PropertyImageWhereUniqueInput[]
    disconnect?: PropertyImageWhereUniqueInput | PropertyImageWhereUniqueInput[]
    delete?: PropertyImageWhereUniqueInput | PropertyImageWhereUniqueInput[]
    connect?: PropertyImageWhereUniqueInput | PropertyImageWhereUniqueInput[]
    update?: PropertyImageUpdateWithWhereUniqueWithoutPropertyInput | PropertyImageUpdateWithWhereUniqueWithoutPropertyInput[]
    updateMany?: PropertyImageUpdateManyWithWhereWithoutPropertyInput | PropertyImageUpdateManyWithWhereWithoutPropertyInput[]
    deleteMany?: PropertyImageScalarWhereInput | PropertyImageScalarWhereInput[]
  }

  export type PropertyCreateNestedOneWithoutImagesInput = {
    create?: XOR<PropertyCreateWithoutImagesInput, PropertyUncheckedCreateWithoutImagesInput>
    connectOrCreate?: PropertyCreateOrConnectWithoutImagesInput
    connect?: PropertyWhereUniqueInput
  }

  export type PropertyUpdateOneRequiredWithoutImagesNestedInput = {
    create?: XOR<PropertyCreateWithoutImagesInput, PropertyUncheckedCreateWithoutImagesInput>
    connectOrCreate?: PropertyCreateOrConnectWithoutImagesInput
    upsert?: PropertyUpsertWithoutImagesInput
    connect?: PropertyWhereUniqueInput
    update?: XOR<XOR<PropertyUpdateToOneWithWhereWithoutImagesInput, PropertyUpdateWithoutImagesInput>, PropertyUncheckedUpdateWithoutImagesInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumPropertyTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PropertyType | EnumPropertyTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PropertyType[] | ListEnumPropertyTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PropertyType[] | ListEnumPropertyTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPropertyTypeFilter<$PrismaModel> | $Enums.PropertyType
  }

  export type NestedEnumSubTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.SubType | EnumSubTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SubType[] | ListEnumSubTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SubType[] | ListEnumSubTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSubTypeFilter<$PrismaModel> | $Enums.SubType
  }

  export type NestedEnumLayoutTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.LayoutType | EnumLayoutTypeFieldRefInput<$PrismaModel>
    in?: $Enums.LayoutType[] | ListEnumLayoutTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.LayoutType[] | ListEnumLayoutTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumLayoutTypeFilter<$PrismaModel> | $Enums.LayoutType
  }

  export type NestedEnumFurnishingFilter<$PrismaModel = never> = {
    equals?: $Enums.Furnishing | EnumFurnishingFieldRefInput<$PrismaModel>
    in?: $Enums.Furnishing[] | ListEnumFurnishingFieldRefInput<$PrismaModel>
    notIn?: $Enums.Furnishing[] | ListEnumFurnishingFieldRefInput<$PrismaModel>
    not?: NestedEnumFurnishingFilter<$PrismaModel> | $Enums.Furnishing
  }

  export type NestedEnumAmenityCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.AmenityCategory | EnumAmenityCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.AmenityCategory[] | ListEnumAmenityCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.AmenityCategory[] | ListEnumAmenityCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumAmenityCategoryFilter<$PrismaModel> | $Enums.AmenityCategory
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumPropertyTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PropertyType | EnumPropertyTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PropertyType[] | ListEnumPropertyTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PropertyType[] | ListEnumPropertyTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPropertyTypeWithAggregatesFilter<$PrismaModel> | $Enums.PropertyType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPropertyTypeFilter<$PrismaModel>
    _max?: NestedEnumPropertyTypeFilter<$PrismaModel>
  }

  export type NestedEnumSubTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SubType | EnumSubTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SubType[] | ListEnumSubTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SubType[] | ListEnumSubTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSubTypeWithAggregatesFilter<$PrismaModel> | $Enums.SubType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSubTypeFilter<$PrismaModel>
    _max?: NestedEnumSubTypeFilter<$PrismaModel>
  }

  export type NestedEnumLayoutTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LayoutType | EnumLayoutTypeFieldRefInput<$PrismaModel>
    in?: $Enums.LayoutType[] | ListEnumLayoutTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.LayoutType[] | ListEnumLayoutTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumLayoutTypeWithAggregatesFilter<$PrismaModel> | $Enums.LayoutType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLayoutTypeFilter<$PrismaModel>
    _max?: NestedEnumLayoutTypeFilter<$PrismaModel>
  }

  export type NestedEnumFurnishingWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Furnishing | EnumFurnishingFieldRefInput<$PrismaModel>
    in?: $Enums.Furnishing[] | ListEnumFurnishingFieldRefInput<$PrismaModel>
    notIn?: $Enums.Furnishing[] | ListEnumFurnishingFieldRefInput<$PrismaModel>
    not?: NestedEnumFurnishingWithAggregatesFilter<$PrismaModel> | $Enums.Furnishing
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFurnishingFilter<$PrismaModel>
    _max?: NestedEnumFurnishingFilter<$PrismaModel>
  }

  export type NestedEnumAmenityCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AmenityCategory | EnumAmenityCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.AmenityCategory[] | ListEnumAmenityCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.AmenityCategory[] | ListEnumAmenityCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumAmenityCategoryWithAggregatesFilter<$PrismaModel> | $Enums.AmenityCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAmenityCategoryFilter<$PrismaModel>
    _max?: NestedEnumAmenityCategoryFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type PropertyImageCreateWithoutPropertyInput = {
    id?: string
    url: string
    isPrimary?: boolean
    order?: number
    createdAt?: Date | string
  }

  export type PropertyImageUncheckedCreateWithoutPropertyInput = {
    id?: string
    url: string
    isPrimary?: boolean
    order?: number
    createdAt?: Date | string
  }

  export type PropertyImageCreateOrConnectWithoutPropertyInput = {
    where: PropertyImageWhereUniqueInput
    create: XOR<PropertyImageCreateWithoutPropertyInput, PropertyImageUncheckedCreateWithoutPropertyInput>
  }

  export type PropertyImageCreateManyPropertyInputEnvelope = {
    data: PropertyImageCreateManyPropertyInput | PropertyImageCreateManyPropertyInput[]
    skipDuplicates?: boolean
  }

  export type PropertyImageUpsertWithWhereUniqueWithoutPropertyInput = {
    where: PropertyImageWhereUniqueInput
    update: XOR<PropertyImageUpdateWithoutPropertyInput, PropertyImageUncheckedUpdateWithoutPropertyInput>
    create: XOR<PropertyImageCreateWithoutPropertyInput, PropertyImageUncheckedCreateWithoutPropertyInput>
  }

  export type PropertyImageUpdateWithWhereUniqueWithoutPropertyInput = {
    where: PropertyImageWhereUniqueInput
    data: XOR<PropertyImageUpdateWithoutPropertyInput, PropertyImageUncheckedUpdateWithoutPropertyInput>
  }

  export type PropertyImageUpdateManyWithWhereWithoutPropertyInput = {
    where: PropertyImageScalarWhereInput
    data: XOR<PropertyImageUpdateManyMutationInput, PropertyImageUncheckedUpdateManyWithoutPropertyInput>
  }

  export type PropertyImageScalarWhereInput = {
    AND?: PropertyImageScalarWhereInput | PropertyImageScalarWhereInput[]
    OR?: PropertyImageScalarWhereInput[]
    NOT?: PropertyImageScalarWhereInput | PropertyImageScalarWhereInput[]
    id?: StringFilter<"PropertyImage"> | string
    url?: StringFilter<"PropertyImage"> | string
    isPrimary?: BoolFilter<"PropertyImage"> | boolean
    order?: IntFilter<"PropertyImage"> | number
    propertyId?: StringFilter<"PropertyImage"> | string
    createdAt?: DateTimeFilter<"PropertyImage"> | Date | string
  }

  export type PropertyCreateWithoutImagesInput = {
    id?: string
    title: string
    location: string
    description: string
    price: number
    pricePerSqft?: number | null
    priceNote?: string | null
    callForPrice?: boolean
    bedrooms?: number | null
    bathrooms?: number | null
    halfBaths?: number | null
    totalRooms?: number | null
    floors?: number | null
    floorLevel?: number | null
    areaSqft?: number | null
    lotSizeSqft?: number | null
    yearBuilt?: number | null
    yearRemodeled?: number | null
    rentPeriods?: PropertyCreaterentPeriodsInput | string[]
    statuses?: PropertyCreatestatusesInput | string[]
    parkingOptions?: PropertyCreateparkingOptionsInput | string[]
    basementOptions?: PropertyCreatebasementOptionsInput | string[]
    type?: $Enums.PropertyType
    subType?: $Enums.SubType
    layoutType?: $Enums.LayoutType
    furnishing?: $Enums.Furnishing
    amenityCategory?: $Enums.AmenityCategory
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PropertyUncheckedCreateWithoutImagesInput = {
    id?: string
    title: string
    location: string
    description: string
    price: number
    pricePerSqft?: number | null
    priceNote?: string | null
    callForPrice?: boolean
    bedrooms?: number | null
    bathrooms?: number | null
    halfBaths?: number | null
    totalRooms?: number | null
    floors?: number | null
    floorLevel?: number | null
    areaSqft?: number | null
    lotSizeSqft?: number | null
    yearBuilt?: number | null
    yearRemodeled?: number | null
    rentPeriods?: PropertyCreaterentPeriodsInput | string[]
    statuses?: PropertyCreatestatusesInput | string[]
    parkingOptions?: PropertyCreateparkingOptionsInput | string[]
    basementOptions?: PropertyCreatebasementOptionsInput | string[]
    type?: $Enums.PropertyType
    subType?: $Enums.SubType
    layoutType?: $Enums.LayoutType
    furnishing?: $Enums.Furnishing
    amenityCategory?: $Enums.AmenityCategory
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PropertyCreateOrConnectWithoutImagesInput = {
    where: PropertyWhereUniqueInput
    create: XOR<PropertyCreateWithoutImagesInput, PropertyUncheckedCreateWithoutImagesInput>
  }

  export type PropertyUpsertWithoutImagesInput = {
    update: XOR<PropertyUpdateWithoutImagesInput, PropertyUncheckedUpdateWithoutImagesInput>
    create: XOR<PropertyCreateWithoutImagesInput, PropertyUncheckedCreateWithoutImagesInput>
    where?: PropertyWhereInput
  }

  export type PropertyUpdateToOneWithWhereWithoutImagesInput = {
    where?: PropertyWhereInput
    data: XOR<PropertyUpdateWithoutImagesInput, PropertyUncheckedUpdateWithoutImagesInput>
  }

  export type PropertyUpdateWithoutImagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    pricePerSqft?: NullableIntFieldUpdateOperationsInput | number | null
    priceNote?: NullableStringFieldUpdateOperationsInput | string | null
    callForPrice?: BoolFieldUpdateOperationsInput | boolean
    bedrooms?: NullableIntFieldUpdateOperationsInput | number | null
    bathrooms?: NullableIntFieldUpdateOperationsInput | number | null
    halfBaths?: NullableIntFieldUpdateOperationsInput | number | null
    totalRooms?: NullableIntFieldUpdateOperationsInput | number | null
    floors?: NullableIntFieldUpdateOperationsInput | number | null
    floorLevel?: NullableIntFieldUpdateOperationsInput | number | null
    areaSqft?: NullableIntFieldUpdateOperationsInput | number | null
    lotSizeSqft?: NullableIntFieldUpdateOperationsInput | number | null
    yearBuilt?: NullableIntFieldUpdateOperationsInput | number | null
    yearRemodeled?: NullableIntFieldUpdateOperationsInput | number | null
    rentPeriods?: PropertyUpdaterentPeriodsInput | string[]
    statuses?: PropertyUpdatestatusesInput | string[]
    parkingOptions?: PropertyUpdateparkingOptionsInput | string[]
    basementOptions?: PropertyUpdatebasementOptionsInput | string[]
    type?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType
    subType?: EnumSubTypeFieldUpdateOperationsInput | $Enums.SubType
    layoutType?: EnumLayoutTypeFieldUpdateOperationsInput | $Enums.LayoutType
    furnishing?: EnumFurnishingFieldUpdateOperationsInput | $Enums.Furnishing
    amenityCategory?: EnumAmenityCategoryFieldUpdateOperationsInput | $Enums.AmenityCategory
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PropertyUncheckedUpdateWithoutImagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    pricePerSqft?: NullableIntFieldUpdateOperationsInput | number | null
    priceNote?: NullableStringFieldUpdateOperationsInput | string | null
    callForPrice?: BoolFieldUpdateOperationsInput | boolean
    bedrooms?: NullableIntFieldUpdateOperationsInput | number | null
    bathrooms?: NullableIntFieldUpdateOperationsInput | number | null
    halfBaths?: NullableIntFieldUpdateOperationsInput | number | null
    totalRooms?: NullableIntFieldUpdateOperationsInput | number | null
    floors?: NullableIntFieldUpdateOperationsInput | number | null
    floorLevel?: NullableIntFieldUpdateOperationsInput | number | null
    areaSqft?: NullableIntFieldUpdateOperationsInput | number | null
    lotSizeSqft?: NullableIntFieldUpdateOperationsInput | number | null
    yearBuilt?: NullableIntFieldUpdateOperationsInput | number | null
    yearRemodeled?: NullableIntFieldUpdateOperationsInput | number | null
    rentPeriods?: PropertyUpdaterentPeriodsInput | string[]
    statuses?: PropertyUpdatestatusesInput | string[]
    parkingOptions?: PropertyUpdateparkingOptionsInput | string[]
    basementOptions?: PropertyUpdatebasementOptionsInput | string[]
    type?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType
    subType?: EnumSubTypeFieldUpdateOperationsInput | $Enums.SubType
    layoutType?: EnumLayoutTypeFieldUpdateOperationsInput | $Enums.LayoutType
    furnishing?: EnumFurnishingFieldUpdateOperationsInput | $Enums.Furnishing
    amenityCategory?: EnumAmenityCategoryFieldUpdateOperationsInput | $Enums.AmenityCategory
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PropertyImageCreateManyPropertyInput = {
    id?: string
    url: string
    isPrimary?: boolean
    order?: number
    createdAt?: Date | string
  }

  export type PropertyImageUpdateWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PropertyImageUncheckedUpdateWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PropertyImageUncheckedUpdateManyWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use PropertyCountOutputTypeDefaultArgs instead
     */
    export type PropertyCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PropertyCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PropertyDefaultArgs instead
     */
    export type PropertyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PropertyDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PropertyImageDefaultArgs instead
     */
    export type PropertyImageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PropertyImageDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AmenityDefaultArgs instead
     */
    export type AmenityArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AmenityDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}