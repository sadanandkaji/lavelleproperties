
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
 * Model BasicAmenity
 * 
 */
export type BasicAmenity = $Result.DefaultSelection<Prisma.$BasicAmenityPayload>
/**
 * Model FullAmenity
 * 
 */
export type FullAmenity = $Result.DefaultSelection<Prisma.$FullAmenityPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Cart
 * 
 */
export type Cart = $Result.DefaultSelection<Prisma.$CartPayload>
/**
 * Model CartItem
 * 
 */
export type CartItem = $Result.DefaultSelection<Prisma.$CartItemPayload>
/**
 * Model Booking
 * 
 */
export type Booking = $Result.DefaultSelection<Prisma.$BookingPayload>

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
   * `prisma.basicAmenity`: Exposes CRUD operations for the **BasicAmenity** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BasicAmenities
    * const basicAmenities = await prisma.basicAmenity.findMany()
    * ```
    */
  get basicAmenity(): Prisma.BasicAmenityDelegate<ExtArgs>;

  /**
   * `prisma.fullAmenity`: Exposes CRUD operations for the **FullAmenity** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FullAmenities
    * const fullAmenities = await prisma.fullAmenity.findMany()
    * ```
    */
  get fullAmenity(): Prisma.FullAmenityDelegate<ExtArgs>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.cart`: Exposes CRUD operations for the **Cart** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Carts
    * const carts = await prisma.cart.findMany()
    * ```
    */
  get cart(): Prisma.CartDelegate<ExtArgs>;

  /**
   * `prisma.cartItem`: Exposes CRUD operations for the **CartItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CartItems
    * const cartItems = await prisma.cartItem.findMany()
    * ```
    */
  get cartItem(): Prisma.CartItemDelegate<ExtArgs>;

  /**
   * `prisma.booking`: Exposes CRUD operations for the **Booking** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Bookings
    * const bookings = await prisma.booking.findMany()
    * ```
    */
  get booking(): Prisma.BookingDelegate<ExtArgs>;
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
    BasicAmenity: 'BasicAmenity',
    FullAmenity: 'FullAmenity',
    User: 'User',
    Cart: 'Cart',
    CartItem: 'CartItem',
    Booking: 'Booking'
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
      modelProps: "property" | "propertyImage" | "basicAmenity" | "fullAmenity" | "user" | "cart" | "cartItem" | "booking"
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
      BasicAmenity: {
        payload: Prisma.$BasicAmenityPayload<ExtArgs>
        fields: Prisma.BasicAmenityFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BasicAmenityFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BasicAmenityPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BasicAmenityFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BasicAmenityPayload>
          }
          findFirst: {
            args: Prisma.BasicAmenityFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BasicAmenityPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BasicAmenityFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BasicAmenityPayload>
          }
          findMany: {
            args: Prisma.BasicAmenityFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BasicAmenityPayload>[]
          }
          create: {
            args: Prisma.BasicAmenityCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BasicAmenityPayload>
          }
          createMany: {
            args: Prisma.BasicAmenityCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BasicAmenityCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BasicAmenityPayload>[]
          }
          delete: {
            args: Prisma.BasicAmenityDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BasicAmenityPayload>
          }
          update: {
            args: Prisma.BasicAmenityUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BasicAmenityPayload>
          }
          deleteMany: {
            args: Prisma.BasicAmenityDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BasicAmenityUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BasicAmenityUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BasicAmenityPayload>
          }
          aggregate: {
            args: Prisma.BasicAmenityAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBasicAmenity>
          }
          groupBy: {
            args: Prisma.BasicAmenityGroupByArgs<ExtArgs>
            result: $Utils.Optional<BasicAmenityGroupByOutputType>[]
          }
          count: {
            args: Prisma.BasicAmenityCountArgs<ExtArgs>
            result: $Utils.Optional<BasicAmenityCountAggregateOutputType> | number
          }
        }
      }
      FullAmenity: {
        payload: Prisma.$FullAmenityPayload<ExtArgs>
        fields: Prisma.FullAmenityFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FullAmenityFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FullAmenityPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FullAmenityFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FullAmenityPayload>
          }
          findFirst: {
            args: Prisma.FullAmenityFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FullAmenityPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FullAmenityFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FullAmenityPayload>
          }
          findMany: {
            args: Prisma.FullAmenityFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FullAmenityPayload>[]
          }
          create: {
            args: Prisma.FullAmenityCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FullAmenityPayload>
          }
          createMany: {
            args: Prisma.FullAmenityCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FullAmenityCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FullAmenityPayload>[]
          }
          delete: {
            args: Prisma.FullAmenityDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FullAmenityPayload>
          }
          update: {
            args: Prisma.FullAmenityUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FullAmenityPayload>
          }
          deleteMany: {
            args: Prisma.FullAmenityDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FullAmenityUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.FullAmenityUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FullAmenityPayload>
          }
          aggregate: {
            args: Prisma.FullAmenityAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFullAmenity>
          }
          groupBy: {
            args: Prisma.FullAmenityGroupByArgs<ExtArgs>
            result: $Utils.Optional<FullAmenityGroupByOutputType>[]
          }
          count: {
            args: Prisma.FullAmenityCountArgs<ExtArgs>
            result: $Utils.Optional<FullAmenityCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Cart: {
        payload: Prisma.$CartPayload<ExtArgs>
        fields: Prisma.CartFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CartFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CartFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartPayload>
          }
          findFirst: {
            args: Prisma.CartFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CartFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartPayload>
          }
          findMany: {
            args: Prisma.CartFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartPayload>[]
          }
          create: {
            args: Prisma.CartCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartPayload>
          }
          createMany: {
            args: Prisma.CartCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CartCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartPayload>[]
          }
          delete: {
            args: Prisma.CartDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartPayload>
          }
          update: {
            args: Prisma.CartUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartPayload>
          }
          deleteMany: {
            args: Prisma.CartDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CartUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CartUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartPayload>
          }
          aggregate: {
            args: Prisma.CartAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCart>
          }
          groupBy: {
            args: Prisma.CartGroupByArgs<ExtArgs>
            result: $Utils.Optional<CartGroupByOutputType>[]
          }
          count: {
            args: Prisma.CartCountArgs<ExtArgs>
            result: $Utils.Optional<CartCountAggregateOutputType> | number
          }
        }
      }
      CartItem: {
        payload: Prisma.$CartItemPayload<ExtArgs>
        fields: Prisma.CartItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CartItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CartItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartItemPayload>
          }
          findFirst: {
            args: Prisma.CartItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CartItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartItemPayload>
          }
          findMany: {
            args: Prisma.CartItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartItemPayload>[]
          }
          create: {
            args: Prisma.CartItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartItemPayload>
          }
          createMany: {
            args: Prisma.CartItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CartItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartItemPayload>[]
          }
          delete: {
            args: Prisma.CartItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartItemPayload>
          }
          update: {
            args: Prisma.CartItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartItemPayload>
          }
          deleteMany: {
            args: Prisma.CartItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CartItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CartItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartItemPayload>
          }
          aggregate: {
            args: Prisma.CartItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCartItem>
          }
          groupBy: {
            args: Prisma.CartItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<CartItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.CartItemCountArgs<ExtArgs>
            result: $Utils.Optional<CartItemCountAggregateOutputType> | number
          }
        }
      }
      Booking: {
        payload: Prisma.$BookingPayload<ExtArgs>
        fields: Prisma.BookingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BookingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BookingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          findFirst: {
            args: Prisma.BookingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BookingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          findMany: {
            args: Prisma.BookingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>[]
          }
          create: {
            args: Prisma.BookingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          createMany: {
            args: Prisma.BookingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BookingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>[]
          }
          delete: {
            args: Prisma.BookingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          update: {
            args: Prisma.BookingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          deleteMany: {
            args: Prisma.BookingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BookingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BookingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookingPayload>
          }
          aggregate: {
            args: Prisma.BookingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBooking>
          }
          groupBy: {
            args: Prisma.BookingGroupByArgs<ExtArgs>
            result: $Utils.Optional<BookingGroupByOutputType>[]
          }
          count: {
            args: Prisma.BookingCountArgs<ExtArgs>
            result: $Utils.Optional<BookingCountAggregateOutputType> | number
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
    basicAmenities: number
    fullAmenities: number
    cartItems: number
  }

  export type PropertyCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    images?: boolean | PropertyCountOutputTypeCountImagesArgs
    basicAmenities?: boolean | PropertyCountOutputTypeCountBasicAmenitiesArgs
    fullAmenities?: boolean | PropertyCountOutputTypeCountFullAmenitiesArgs
    cartItems?: boolean | PropertyCountOutputTypeCountCartItemsArgs
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
   * PropertyCountOutputType without action
   */
  export type PropertyCountOutputTypeCountBasicAmenitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BasicAmenityWhereInput
  }

  /**
   * PropertyCountOutputType without action
   */
  export type PropertyCountOutputTypeCountFullAmenitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FullAmenityWhereInput
  }

  /**
   * PropertyCountOutputType without action
   */
  export type PropertyCountOutputTypeCountCartItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CartItemWhereInput
  }


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    bookings: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bookings?: boolean | UserCountOutputTypeCountBookingsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountBookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookingWhereInput
  }


  /**
   * Count Type CartCountOutputType
   */

  export type CartCountOutputType = {
    items: number
  }

  export type CartCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | CartCountOutputTypeCountItemsArgs
  }

  // Custom InputTypes
  /**
   * CartCountOutputType without action
   */
  export type CartCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartCountOutputType
     */
    select?: CartCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CartCountOutputType without action
   */
  export type CartCountOutputTypeCountItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CartItemWhereInput
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
    isSoldOut: boolean | null
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
    isSoldOut: boolean | null
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
    isSoldOut: number
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
    isSoldOut?: true
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
    isSoldOut?: true
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
    isSoldOut?: true
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
    isSoldOut: boolean
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
    isSoldOut?: boolean
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
    basicAmenities?: boolean | Property$basicAmenitiesArgs<ExtArgs>
    fullAmenities?: boolean | Property$fullAmenitiesArgs<ExtArgs>
    cartItems?: boolean | Property$cartItemsArgs<ExtArgs>
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
    isSoldOut?: boolean
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
    isSoldOut?: boolean
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
    basicAmenities?: boolean | Property$basicAmenitiesArgs<ExtArgs>
    fullAmenities?: boolean | Property$fullAmenitiesArgs<ExtArgs>
    cartItems?: boolean | Property$cartItemsArgs<ExtArgs>
    _count?: boolean | PropertyCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PropertyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PropertyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Property"
    objects: {
      images: Prisma.$PropertyImagePayload<ExtArgs>[]
      basicAmenities: Prisma.$BasicAmenityPayload<ExtArgs>[]
      fullAmenities: Prisma.$FullAmenityPayload<ExtArgs>[]
      cartItems: Prisma.$CartItemPayload<ExtArgs>[]
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
      isSoldOut: boolean
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
    basicAmenities<T extends Property$basicAmenitiesArgs<ExtArgs> = {}>(args?: Subset<T, Property$basicAmenitiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BasicAmenityPayload<ExtArgs>, T, "findMany"> | Null>
    fullAmenities<T extends Property$fullAmenitiesArgs<ExtArgs> = {}>(args?: Subset<T, Property$fullAmenitiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FullAmenityPayload<ExtArgs>, T, "findMany"> | Null>
    cartItems<T extends Property$cartItemsArgs<ExtArgs> = {}>(args?: Subset<T, Property$cartItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CartItemPayload<ExtArgs>, T, "findMany"> | Null>
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
    readonly isSoldOut: FieldRef<"Property", 'Boolean'>
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
   * Property.basicAmenities
   */
  export type Property$basicAmenitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BasicAmenity
     */
    select?: BasicAmenitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BasicAmenityInclude<ExtArgs> | null
    where?: BasicAmenityWhereInput
    orderBy?: BasicAmenityOrderByWithRelationInput | BasicAmenityOrderByWithRelationInput[]
    cursor?: BasicAmenityWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BasicAmenityScalarFieldEnum | BasicAmenityScalarFieldEnum[]
  }

  /**
   * Property.fullAmenities
   */
  export type Property$fullAmenitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FullAmenity
     */
    select?: FullAmenitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FullAmenityInclude<ExtArgs> | null
    where?: FullAmenityWhereInput
    orderBy?: FullAmenityOrderByWithRelationInput | FullAmenityOrderByWithRelationInput[]
    cursor?: FullAmenityWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FullAmenityScalarFieldEnum | FullAmenityScalarFieldEnum[]
  }

  /**
   * Property.cartItems
   */
  export type Property$cartItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartItem
     */
    select?: CartItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartItemInclude<ExtArgs> | null
    where?: CartItemWhereInput
    orderBy?: CartItemOrderByWithRelationInput | CartItemOrderByWithRelationInput[]
    cursor?: CartItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CartItemScalarFieldEnum | CartItemScalarFieldEnum[]
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
   * Model BasicAmenity
   */

  export type AggregateBasicAmenity = {
    _count: BasicAmenityCountAggregateOutputType | null
    _min: BasicAmenityMinAggregateOutputType | null
    _max: BasicAmenityMaxAggregateOutputType | null
  }

  export type BasicAmenityMinAggregateOutputType = {
    id: string | null
    name: string | null
    normalized: string | null
    propertyId: string | null
    createdAt: Date | null
  }

  export type BasicAmenityMaxAggregateOutputType = {
    id: string | null
    name: string | null
    normalized: string | null
    propertyId: string | null
    createdAt: Date | null
  }

  export type BasicAmenityCountAggregateOutputType = {
    id: number
    name: number
    normalized: number
    propertyId: number
    createdAt: number
    _all: number
  }


  export type BasicAmenityMinAggregateInputType = {
    id?: true
    name?: true
    normalized?: true
    propertyId?: true
    createdAt?: true
  }

  export type BasicAmenityMaxAggregateInputType = {
    id?: true
    name?: true
    normalized?: true
    propertyId?: true
    createdAt?: true
  }

  export type BasicAmenityCountAggregateInputType = {
    id?: true
    name?: true
    normalized?: true
    propertyId?: true
    createdAt?: true
    _all?: true
  }

  export type BasicAmenityAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BasicAmenity to aggregate.
     */
    where?: BasicAmenityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BasicAmenities to fetch.
     */
    orderBy?: BasicAmenityOrderByWithRelationInput | BasicAmenityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BasicAmenityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BasicAmenities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BasicAmenities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BasicAmenities
    **/
    _count?: true | BasicAmenityCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BasicAmenityMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BasicAmenityMaxAggregateInputType
  }

  export type GetBasicAmenityAggregateType<T extends BasicAmenityAggregateArgs> = {
        [P in keyof T & keyof AggregateBasicAmenity]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBasicAmenity[P]>
      : GetScalarType<T[P], AggregateBasicAmenity[P]>
  }




  export type BasicAmenityGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BasicAmenityWhereInput
    orderBy?: BasicAmenityOrderByWithAggregationInput | BasicAmenityOrderByWithAggregationInput[]
    by: BasicAmenityScalarFieldEnum[] | BasicAmenityScalarFieldEnum
    having?: BasicAmenityScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BasicAmenityCountAggregateInputType | true
    _min?: BasicAmenityMinAggregateInputType
    _max?: BasicAmenityMaxAggregateInputType
  }

  export type BasicAmenityGroupByOutputType = {
    id: string
    name: string
    normalized: string
    propertyId: string
    createdAt: Date
    _count: BasicAmenityCountAggregateOutputType | null
    _min: BasicAmenityMinAggregateOutputType | null
    _max: BasicAmenityMaxAggregateOutputType | null
  }

  type GetBasicAmenityGroupByPayload<T extends BasicAmenityGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BasicAmenityGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BasicAmenityGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BasicAmenityGroupByOutputType[P]>
            : GetScalarType<T[P], BasicAmenityGroupByOutputType[P]>
        }
      >
    >


  export type BasicAmenitySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    normalized?: boolean
    propertyId?: boolean
    createdAt?: boolean
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["basicAmenity"]>

  export type BasicAmenitySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    normalized?: boolean
    propertyId?: boolean
    createdAt?: boolean
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["basicAmenity"]>

  export type BasicAmenitySelectScalar = {
    id?: boolean
    name?: boolean
    normalized?: boolean
    propertyId?: boolean
    createdAt?: boolean
  }

  export type BasicAmenityInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }
  export type BasicAmenityIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }

  export type $BasicAmenityPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BasicAmenity"
    objects: {
      property: Prisma.$PropertyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      normalized: string
      propertyId: string
      createdAt: Date
    }, ExtArgs["result"]["basicAmenity"]>
    composites: {}
  }

  type BasicAmenityGetPayload<S extends boolean | null | undefined | BasicAmenityDefaultArgs> = $Result.GetResult<Prisma.$BasicAmenityPayload, S>

  type BasicAmenityCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<BasicAmenityFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: BasicAmenityCountAggregateInputType | true
    }

  export interface BasicAmenityDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BasicAmenity'], meta: { name: 'BasicAmenity' } }
    /**
     * Find zero or one BasicAmenity that matches the filter.
     * @param {BasicAmenityFindUniqueArgs} args - Arguments to find a BasicAmenity
     * @example
     * // Get one BasicAmenity
     * const basicAmenity = await prisma.basicAmenity.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BasicAmenityFindUniqueArgs>(args: SelectSubset<T, BasicAmenityFindUniqueArgs<ExtArgs>>): Prisma__BasicAmenityClient<$Result.GetResult<Prisma.$BasicAmenityPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one BasicAmenity that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {BasicAmenityFindUniqueOrThrowArgs} args - Arguments to find a BasicAmenity
     * @example
     * // Get one BasicAmenity
     * const basicAmenity = await prisma.basicAmenity.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BasicAmenityFindUniqueOrThrowArgs>(args: SelectSubset<T, BasicAmenityFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BasicAmenityClient<$Result.GetResult<Prisma.$BasicAmenityPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first BasicAmenity that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BasicAmenityFindFirstArgs} args - Arguments to find a BasicAmenity
     * @example
     * // Get one BasicAmenity
     * const basicAmenity = await prisma.basicAmenity.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BasicAmenityFindFirstArgs>(args?: SelectSubset<T, BasicAmenityFindFirstArgs<ExtArgs>>): Prisma__BasicAmenityClient<$Result.GetResult<Prisma.$BasicAmenityPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first BasicAmenity that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BasicAmenityFindFirstOrThrowArgs} args - Arguments to find a BasicAmenity
     * @example
     * // Get one BasicAmenity
     * const basicAmenity = await prisma.basicAmenity.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BasicAmenityFindFirstOrThrowArgs>(args?: SelectSubset<T, BasicAmenityFindFirstOrThrowArgs<ExtArgs>>): Prisma__BasicAmenityClient<$Result.GetResult<Prisma.$BasicAmenityPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more BasicAmenities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BasicAmenityFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BasicAmenities
     * const basicAmenities = await prisma.basicAmenity.findMany()
     * 
     * // Get first 10 BasicAmenities
     * const basicAmenities = await prisma.basicAmenity.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const basicAmenityWithIdOnly = await prisma.basicAmenity.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BasicAmenityFindManyArgs>(args?: SelectSubset<T, BasicAmenityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BasicAmenityPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a BasicAmenity.
     * @param {BasicAmenityCreateArgs} args - Arguments to create a BasicAmenity.
     * @example
     * // Create one BasicAmenity
     * const BasicAmenity = await prisma.basicAmenity.create({
     *   data: {
     *     // ... data to create a BasicAmenity
     *   }
     * })
     * 
     */
    create<T extends BasicAmenityCreateArgs>(args: SelectSubset<T, BasicAmenityCreateArgs<ExtArgs>>): Prisma__BasicAmenityClient<$Result.GetResult<Prisma.$BasicAmenityPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many BasicAmenities.
     * @param {BasicAmenityCreateManyArgs} args - Arguments to create many BasicAmenities.
     * @example
     * // Create many BasicAmenities
     * const basicAmenity = await prisma.basicAmenity.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BasicAmenityCreateManyArgs>(args?: SelectSubset<T, BasicAmenityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BasicAmenities and returns the data saved in the database.
     * @param {BasicAmenityCreateManyAndReturnArgs} args - Arguments to create many BasicAmenities.
     * @example
     * // Create many BasicAmenities
     * const basicAmenity = await prisma.basicAmenity.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BasicAmenities and only return the `id`
     * const basicAmenityWithIdOnly = await prisma.basicAmenity.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BasicAmenityCreateManyAndReturnArgs>(args?: SelectSubset<T, BasicAmenityCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BasicAmenityPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a BasicAmenity.
     * @param {BasicAmenityDeleteArgs} args - Arguments to delete one BasicAmenity.
     * @example
     * // Delete one BasicAmenity
     * const BasicAmenity = await prisma.basicAmenity.delete({
     *   where: {
     *     // ... filter to delete one BasicAmenity
     *   }
     * })
     * 
     */
    delete<T extends BasicAmenityDeleteArgs>(args: SelectSubset<T, BasicAmenityDeleteArgs<ExtArgs>>): Prisma__BasicAmenityClient<$Result.GetResult<Prisma.$BasicAmenityPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one BasicAmenity.
     * @param {BasicAmenityUpdateArgs} args - Arguments to update one BasicAmenity.
     * @example
     * // Update one BasicAmenity
     * const basicAmenity = await prisma.basicAmenity.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BasicAmenityUpdateArgs>(args: SelectSubset<T, BasicAmenityUpdateArgs<ExtArgs>>): Prisma__BasicAmenityClient<$Result.GetResult<Prisma.$BasicAmenityPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more BasicAmenities.
     * @param {BasicAmenityDeleteManyArgs} args - Arguments to filter BasicAmenities to delete.
     * @example
     * // Delete a few BasicAmenities
     * const { count } = await prisma.basicAmenity.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BasicAmenityDeleteManyArgs>(args?: SelectSubset<T, BasicAmenityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BasicAmenities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BasicAmenityUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BasicAmenities
     * const basicAmenity = await prisma.basicAmenity.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BasicAmenityUpdateManyArgs>(args: SelectSubset<T, BasicAmenityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one BasicAmenity.
     * @param {BasicAmenityUpsertArgs} args - Arguments to update or create a BasicAmenity.
     * @example
     * // Update or create a BasicAmenity
     * const basicAmenity = await prisma.basicAmenity.upsert({
     *   create: {
     *     // ... data to create a BasicAmenity
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BasicAmenity we want to update
     *   }
     * })
     */
    upsert<T extends BasicAmenityUpsertArgs>(args: SelectSubset<T, BasicAmenityUpsertArgs<ExtArgs>>): Prisma__BasicAmenityClient<$Result.GetResult<Prisma.$BasicAmenityPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of BasicAmenities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BasicAmenityCountArgs} args - Arguments to filter BasicAmenities to count.
     * @example
     * // Count the number of BasicAmenities
     * const count = await prisma.basicAmenity.count({
     *   where: {
     *     // ... the filter for the BasicAmenities we want to count
     *   }
     * })
    **/
    count<T extends BasicAmenityCountArgs>(
      args?: Subset<T, BasicAmenityCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BasicAmenityCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BasicAmenity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BasicAmenityAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BasicAmenityAggregateArgs>(args: Subset<T, BasicAmenityAggregateArgs>): Prisma.PrismaPromise<GetBasicAmenityAggregateType<T>>

    /**
     * Group by BasicAmenity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BasicAmenityGroupByArgs} args - Group by arguments.
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
      T extends BasicAmenityGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BasicAmenityGroupByArgs['orderBy'] }
        : { orderBy?: BasicAmenityGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, BasicAmenityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBasicAmenityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BasicAmenity model
   */
  readonly fields: BasicAmenityFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BasicAmenity.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BasicAmenityClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the BasicAmenity model
   */ 
  interface BasicAmenityFieldRefs {
    readonly id: FieldRef<"BasicAmenity", 'String'>
    readonly name: FieldRef<"BasicAmenity", 'String'>
    readonly normalized: FieldRef<"BasicAmenity", 'String'>
    readonly propertyId: FieldRef<"BasicAmenity", 'String'>
    readonly createdAt: FieldRef<"BasicAmenity", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BasicAmenity findUnique
   */
  export type BasicAmenityFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BasicAmenity
     */
    select?: BasicAmenitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BasicAmenityInclude<ExtArgs> | null
    /**
     * Filter, which BasicAmenity to fetch.
     */
    where: BasicAmenityWhereUniqueInput
  }

  /**
   * BasicAmenity findUniqueOrThrow
   */
  export type BasicAmenityFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BasicAmenity
     */
    select?: BasicAmenitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BasicAmenityInclude<ExtArgs> | null
    /**
     * Filter, which BasicAmenity to fetch.
     */
    where: BasicAmenityWhereUniqueInput
  }

  /**
   * BasicAmenity findFirst
   */
  export type BasicAmenityFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BasicAmenity
     */
    select?: BasicAmenitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BasicAmenityInclude<ExtArgs> | null
    /**
     * Filter, which BasicAmenity to fetch.
     */
    where?: BasicAmenityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BasicAmenities to fetch.
     */
    orderBy?: BasicAmenityOrderByWithRelationInput | BasicAmenityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BasicAmenities.
     */
    cursor?: BasicAmenityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BasicAmenities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BasicAmenities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BasicAmenities.
     */
    distinct?: BasicAmenityScalarFieldEnum | BasicAmenityScalarFieldEnum[]
  }

  /**
   * BasicAmenity findFirstOrThrow
   */
  export type BasicAmenityFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BasicAmenity
     */
    select?: BasicAmenitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BasicAmenityInclude<ExtArgs> | null
    /**
     * Filter, which BasicAmenity to fetch.
     */
    where?: BasicAmenityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BasicAmenities to fetch.
     */
    orderBy?: BasicAmenityOrderByWithRelationInput | BasicAmenityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BasicAmenities.
     */
    cursor?: BasicAmenityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BasicAmenities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BasicAmenities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BasicAmenities.
     */
    distinct?: BasicAmenityScalarFieldEnum | BasicAmenityScalarFieldEnum[]
  }

  /**
   * BasicAmenity findMany
   */
  export type BasicAmenityFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BasicAmenity
     */
    select?: BasicAmenitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BasicAmenityInclude<ExtArgs> | null
    /**
     * Filter, which BasicAmenities to fetch.
     */
    where?: BasicAmenityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BasicAmenities to fetch.
     */
    orderBy?: BasicAmenityOrderByWithRelationInput | BasicAmenityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BasicAmenities.
     */
    cursor?: BasicAmenityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BasicAmenities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BasicAmenities.
     */
    skip?: number
    distinct?: BasicAmenityScalarFieldEnum | BasicAmenityScalarFieldEnum[]
  }

  /**
   * BasicAmenity create
   */
  export type BasicAmenityCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BasicAmenity
     */
    select?: BasicAmenitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BasicAmenityInclude<ExtArgs> | null
    /**
     * The data needed to create a BasicAmenity.
     */
    data: XOR<BasicAmenityCreateInput, BasicAmenityUncheckedCreateInput>
  }

  /**
   * BasicAmenity createMany
   */
  export type BasicAmenityCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BasicAmenities.
     */
    data: BasicAmenityCreateManyInput | BasicAmenityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BasicAmenity createManyAndReturn
   */
  export type BasicAmenityCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BasicAmenity
     */
    select?: BasicAmenitySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many BasicAmenities.
     */
    data: BasicAmenityCreateManyInput | BasicAmenityCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BasicAmenityIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * BasicAmenity update
   */
  export type BasicAmenityUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BasicAmenity
     */
    select?: BasicAmenitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BasicAmenityInclude<ExtArgs> | null
    /**
     * The data needed to update a BasicAmenity.
     */
    data: XOR<BasicAmenityUpdateInput, BasicAmenityUncheckedUpdateInput>
    /**
     * Choose, which BasicAmenity to update.
     */
    where: BasicAmenityWhereUniqueInput
  }

  /**
   * BasicAmenity updateMany
   */
  export type BasicAmenityUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BasicAmenities.
     */
    data: XOR<BasicAmenityUpdateManyMutationInput, BasicAmenityUncheckedUpdateManyInput>
    /**
     * Filter which BasicAmenities to update
     */
    where?: BasicAmenityWhereInput
  }

  /**
   * BasicAmenity upsert
   */
  export type BasicAmenityUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BasicAmenity
     */
    select?: BasicAmenitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BasicAmenityInclude<ExtArgs> | null
    /**
     * The filter to search for the BasicAmenity to update in case it exists.
     */
    where: BasicAmenityWhereUniqueInput
    /**
     * In case the BasicAmenity found by the `where` argument doesn't exist, create a new BasicAmenity with this data.
     */
    create: XOR<BasicAmenityCreateInput, BasicAmenityUncheckedCreateInput>
    /**
     * In case the BasicAmenity was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BasicAmenityUpdateInput, BasicAmenityUncheckedUpdateInput>
  }

  /**
   * BasicAmenity delete
   */
  export type BasicAmenityDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BasicAmenity
     */
    select?: BasicAmenitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BasicAmenityInclude<ExtArgs> | null
    /**
     * Filter which BasicAmenity to delete.
     */
    where: BasicAmenityWhereUniqueInput
  }

  /**
   * BasicAmenity deleteMany
   */
  export type BasicAmenityDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BasicAmenities to delete
     */
    where?: BasicAmenityWhereInput
  }

  /**
   * BasicAmenity without action
   */
  export type BasicAmenityDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BasicAmenity
     */
    select?: BasicAmenitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BasicAmenityInclude<ExtArgs> | null
  }


  /**
   * Model FullAmenity
   */

  export type AggregateFullAmenity = {
    _count: FullAmenityCountAggregateOutputType | null
    _min: FullAmenityMinAggregateOutputType | null
    _max: FullAmenityMaxAggregateOutputType | null
  }

  export type FullAmenityMinAggregateOutputType = {
    id: string | null
    name: string | null
    normalized: string | null
    propertyId: string | null
    createdAt: Date | null
  }

  export type FullAmenityMaxAggregateOutputType = {
    id: string | null
    name: string | null
    normalized: string | null
    propertyId: string | null
    createdAt: Date | null
  }

  export type FullAmenityCountAggregateOutputType = {
    id: number
    name: number
    normalized: number
    propertyId: number
    createdAt: number
    _all: number
  }


  export type FullAmenityMinAggregateInputType = {
    id?: true
    name?: true
    normalized?: true
    propertyId?: true
    createdAt?: true
  }

  export type FullAmenityMaxAggregateInputType = {
    id?: true
    name?: true
    normalized?: true
    propertyId?: true
    createdAt?: true
  }

  export type FullAmenityCountAggregateInputType = {
    id?: true
    name?: true
    normalized?: true
    propertyId?: true
    createdAt?: true
    _all?: true
  }

  export type FullAmenityAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FullAmenity to aggregate.
     */
    where?: FullAmenityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FullAmenities to fetch.
     */
    orderBy?: FullAmenityOrderByWithRelationInput | FullAmenityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FullAmenityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FullAmenities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FullAmenities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FullAmenities
    **/
    _count?: true | FullAmenityCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FullAmenityMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FullAmenityMaxAggregateInputType
  }

  export type GetFullAmenityAggregateType<T extends FullAmenityAggregateArgs> = {
        [P in keyof T & keyof AggregateFullAmenity]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFullAmenity[P]>
      : GetScalarType<T[P], AggregateFullAmenity[P]>
  }




  export type FullAmenityGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FullAmenityWhereInput
    orderBy?: FullAmenityOrderByWithAggregationInput | FullAmenityOrderByWithAggregationInput[]
    by: FullAmenityScalarFieldEnum[] | FullAmenityScalarFieldEnum
    having?: FullAmenityScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FullAmenityCountAggregateInputType | true
    _min?: FullAmenityMinAggregateInputType
    _max?: FullAmenityMaxAggregateInputType
  }

  export type FullAmenityGroupByOutputType = {
    id: string
    name: string
    normalized: string
    propertyId: string
    createdAt: Date
    _count: FullAmenityCountAggregateOutputType | null
    _min: FullAmenityMinAggregateOutputType | null
    _max: FullAmenityMaxAggregateOutputType | null
  }

  type GetFullAmenityGroupByPayload<T extends FullAmenityGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FullAmenityGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FullAmenityGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FullAmenityGroupByOutputType[P]>
            : GetScalarType<T[P], FullAmenityGroupByOutputType[P]>
        }
      >
    >


  export type FullAmenitySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    normalized?: boolean
    propertyId?: boolean
    createdAt?: boolean
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fullAmenity"]>

  export type FullAmenitySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    normalized?: boolean
    propertyId?: boolean
    createdAt?: boolean
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fullAmenity"]>

  export type FullAmenitySelectScalar = {
    id?: boolean
    name?: boolean
    normalized?: boolean
    propertyId?: boolean
    createdAt?: boolean
  }

  export type FullAmenityInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }
  export type FullAmenityIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }

  export type $FullAmenityPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FullAmenity"
    objects: {
      property: Prisma.$PropertyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      normalized: string
      propertyId: string
      createdAt: Date
    }, ExtArgs["result"]["fullAmenity"]>
    composites: {}
  }

  type FullAmenityGetPayload<S extends boolean | null | undefined | FullAmenityDefaultArgs> = $Result.GetResult<Prisma.$FullAmenityPayload, S>

  type FullAmenityCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<FullAmenityFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: FullAmenityCountAggregateInputType | true
    }

  export interface FullAmenityDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FullAmenity'], meta: { name: 'FullAmenity' } }
    /**
     * Find zero or one FullAmenity that matches the filter.
     * @param {FullAmenityFindUniqueArgs} args - Arguments to find a FullAmenity
     * @example
     * // Get one FullAmenity
     * const fullAmenity = await prisma.fullAmenity.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FullAmenityFindUniqueArgs>(args: SelectSubset<T, FullAmenityFindUniqueArgs<ExtArgs>>): Prisma__FullAmenityClient<$Result.GetResult<Prisma.$FullAmenityPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one FullAmenity that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {FullAmenityFindUniqueOrThrowArgs} args - Arguments to find a FullAmenity
     * @example
     * // Get one FullAmenity
     * const fullAmenity = await prisma.fullAmenity.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FullAmenityFindUniqueOrThrowArgs>(args: SelectSubset<T, FullAmenityFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FullAmenityClient<$Result.GetResult<Prisma.$FullAmenityPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first FullAmenity that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FullAmenityFindFirstArgs} args - Arguments to find a FullAmenity
     * @example
     * // Get one FullAmenity
     * const fullAmenity = await prisma.fullAmenity.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FullAmenityFindFirstArgs>(args?: SelectSubset<T, FullAmenityFindFirstArgs<ExtArgs>>): Prisma__FullAmenityClient<$Result.GetResult<Prisma.$FullAmenityPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first FullAmenity that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FullAmenityFindFirstOrThrowArgs} args - Arguments to find a FullAmenity
     * @example
     * // Get one FullAmenity
     * const fullAmenity = await prisma.fullAmenity.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FullAmenityFindFirstOrThrowArgs>(args?: SelectSubset<T, FullAmenityFindFirstOrThrowArgs<ExtArgs>>): Prisma__FullAmenityClient<$Result.GetResult<Prisma.$FullAmenityPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more FullAmenities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FullAmenityFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FullAmenities
     * const fullAmenities = await prisma.fullAmenity.findMany()
     * 
     * // Get first 10 FullAmenities
     * const fullAmenities = await prisma.fullAmenity.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const fullAmenityWithIdOnly = await prisma.fullAmenity.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FullAmenityFindManyArgs>(args?: SelectSubset<T, FullAmenityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FullAmenityPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a FullAmenity.
     * @param {FullAmenityCreateArgs} args - Arguments to create a FullAmenity.
     * @example
     * // Create one FullAmenity
     * const FullAmenity = await prisma.fullAmenity.create({
     *   data: {
     *     // ... data to create a FullAmenity
     *   }
     * })
     * 
     */
    create<T extends FullAmenityCreateArgs>(args: SelectSubset<T, FullAmenityCreateArgs<ExtArgs>>): Prisma__FullAmenityClient<$Result.GetResult<Prisma.$FullAmenityPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many FullAmenities.
     * @param {FullAmenityCreateManyArgs} args - Arguments to create many FullAmenities.
     * @example
     * // Create many FullAmenities
     * const fullAmenity = await prisma.fullAmenity.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FullAmenityCreateManyArgs>(args?: SelectSubset<T, FullAmenityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FullAmenities and returns the data saved in the database.
     * @param {FullAmenityCreateManyAndReturnArgs} args - Arguments to create many FullAmenities.
     * @example
     * // Create many FullAmenities
     * const fullAmenity = await prisma.fullAmenity.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FullAmenities and only return the `id`
     * const fullAmenityWithIdOnly = await prisma.fullAmenity.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FullAmenityCreateManyAndReturnArgs>(args?: SelectSubset<T, FullAmenityCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FullAmenityPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a FullAmenity.
     * @param {FullAmenityDeleteArgs} args - Arguments to delete one FullAmenity.
     * @example
     * // Delete one FullAmenity
     * const FullAmenity = await prisma.fullAmenity.delete({
     *   where: {
     *     // ... filter to delete one FullAmenity
     *   }
     * })
     * 
     */
    delete<T extends FullAmenityDeleteArgs>(args: SelectSubset<T, FullAmenityDeleteArgs<ExtArgs>>): Prisma__FullAmenityClient<$Result.GetResult<Prisma.$FullAmenityPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one FullAmenity.
     * @param {FullAmenityUpdateArgs} args - Arguments to update one FullAmenity.
     * @example
     * // Update one FullAmenity
     * const fullAmenity = await prisma.fullAmenity.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FullAmenityUpdateArgs>(args: SelectSubset<T, FullAmenityUpdateArgs<ExtArgs>>): Prisma__FullAmenityClient<$Result.GetResult<Prisma.$FullAmenityPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more FullAmenities.
     * @param {FullAmenityDeleteManyArgs} args - Arguments to filter FullAmenities to delete.
     * @example
     * // Delete a few FullAmenities
     * const { count } = await prisma.fullAmenity.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FullAmenityDeleteManyArgs>(args?: SelectSubset<T, FullAmenityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FullAmenities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FullAmenityUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FullAmenities
     * const fullAmenity = await prisma.fullAmenity.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FullAmenityUpdateManyArgs>(args: SelectSubset<T, FullAmenityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one FullAmenity.
     * @param {FullAmenityUpsertArgs} args - Arguments to update or create a FullAmenity.
     * @example
     * // Update or create a FullAmenity
     * const fullAmenity = await prisma.fullAmenity.upsert({
     *   create: {
     *     // ... data to create a FullAmenity
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FullAmenity we want to update
     *   }
     * })
     */
    upsert<T extends FullAmenityUpsertArgs>(args: SelectSubset<T, FullAmenityUpsertArgs<ExtArgs>>): Prisma__FullAmenityClient<$Result.GetResult<Prisma.$FullAmenityPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of FullAmenities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FullAmenityCountArgs} args - Arguments to filter FullAmenities to count.
     * @example
     * // Count the number of FullAmenities
     * const count = await prisma.fullAmenity.count({
     *   where: {
     *     // ... the filter for the FullAmenities we want to count
     *   }
     * })
    **/
    count<T extends FullAmenityCountArgs>(
      args?: Subset<T, FullAmenityCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FullAmenityCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FullAmenity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FullAmenityAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends FullAmenityAggregateArgs>(args: Subset<T, FullAmenityAggregateArgs>): Prisma.PrismaPromise<GetFullAmenityAggregateType<T>>

    /**
     * Group by FullAmenity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FullAmenityGroupByArgs} args - Group by arguments.
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
      T extends FullAmenityGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FullAmenityGroupByArgs['orderBy'] }
        : { orderBy?: FullAmenityGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, FullAmenityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFullAmenityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FullAmenity model
   */
  readonly fields: FullAmenityFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FullAmenity.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FullAmenityClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the FullAmenity model
   */ 
  interface FullAmenityFieldRefs {
    readonly id: FieldRef<"FullAmenity", 'String'>
    readonly name: FieldRef<"FullAmenity", 'String'>
    readonly normalized: FieldRef<"FullAmenity", 'String'>
    readonly propertyId: FieldRef<"FullAmenity", 'String'>
    readonly createdAt: FieldRef<"FullAmenity", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FullAmenity findUnique
   */
  export type FullAmenityFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FullAmenity
     */
    select?: FullAmenitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FullAmenityInclude<ExtArgs> | null
    /**
     * Filter, which FullAmenity to fetch.
     */
    where: FullAmenityWhereUniqueInput
  }

  /**
   * FullAmenity findUniqueOrThrow
   */
  export type FullAmenityFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FullAmenity
     */
    select?: FullAmenitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FullAmenityInclude<ExtArgs> | null
    /**
     * Filter, which FullAmenity to fetch.
     */
    where: FullAmenityWhereUniqueInput
  }

  /**
   * FullAmenity findFirst
   */
  export type FullAmenityFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FullAmenity
     */
    select?: FullAmenitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FullAmenityInclude<ExtArgs> | null
    /**
     * Filter, which FullAmenity to fetch.
     */
    where?: FullAmenityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FullAmenities to fetch.
     */
    orderBy?: FullAmenityOrderByWithRelationInput | FullAmenityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FullAmenities.
     */
    cursor?: FullAmenityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FullAmenities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FullAmenities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FullAmenities.
     */
    distinct?: FullAmenityScalarFieldEnum | FullAmenityScalarFieldEnum[]
  }

  /**
   * FullAmenity findFirstOrThrow
   */
  export type FullAmenityFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FullAmenity
     */
    select?: FullAmenitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FullAmenityInclude<ExtArgs> | null
    /**
     * Filter, which FullAmenity to fetch.
     */
    where?: FullAmenityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FullAmenities to fetch.
     */
    orderBy?: FullAmenityOrderByWithRelationInput | FullAmenityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FullAmenities.
     */
    cursor?: FullAmenityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FullAmenities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FullAmenities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FullAmenities.
     */
    distinct?: FullAmenityScalarFieldEnum | FullAmenityScalarFieldEnum[]
  }

  /**
   * FullAmenity findMany
   */
  export type FullAmenityFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FullAmenity
     */
    select?: FullAmenitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FullAmenityInclude<ExtArgs> | null
    /**
     * Filter, which FullAmenities to fetch.
     */
    where?: FullAmenityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FullAmenities to fetch.
     */
    orderBy?: FullAmenityOrderByWithRelationInput | FullAmenityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FullAmenities.
     */
    cursor?: FullAmenityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FullAmenities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FullAmenities.
     */
    skip?: number
    distinct?: FullAmenityScalarFieldEnum | FullAmenityScalarFieldEnum[]
  }

  /**
   * FullAmenity create
   */
  export type FullAmenityCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FullAmenity
     */
    select?: FullAmenitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FullAmenityInclude<ExtArgs> | null
    /**
     * The data needed to create a FullAmenity.
     */
    data: XOR<FullAmenityCreateInput, FullAmenityUncheckedCreateInput>
  }

  /**
   * FullAmenity createMany
   */
  export type FullAmenityCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FullAmenities.
     */
    data: FullAmenityCreateManyInput | FullAmenityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FullAmenity createManyAndReturn
   */
  export type FullAmenityCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FullAmenity
     */
    select?: FullAmenitySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many FullAmenities.
     */
    data: FullAmenityCreateManyInput | FullAmenityCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FullAmenityIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * FullAmenity update
   */
  export type FullAmenityUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FullAmenity
     */
    select?: FullAmenitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FullAmenityInclude<ExtArgs> | null
    /**
     * The data needed to update a FullAmenity.
     */
    data: XOR<FullAmenityUpdateInput, FullAmenityUncheckedUpdateInput>
    /**
     * Choose, which FullAmenity to update.
     */
    where: FullAmenityWhereUniqueInput
  }

  /**
   * FullAmenity updateMany
   */
  export type FullAmenityUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FullAmenities.
     */
    data: XOR<FullAmenityUpdateManyMutationInput, FullAmenityUncheckedUpdateManyInput>
    /**
     * Filter which FullAmenities to update
     */
    where?: FullAmenityWhereInput
  }

  /**
   * FullAmenity upsert
   */
  export type FullAmenityUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FullAmenity
     */
    select?: FullAmenitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FullAmenityInclude<ExtArgs> | null
    /**
     * The filter to search for the FullAmenity to update in case it exists.
     */
    where: FullAmenityWhereUniqueInput
    /**
     * In case the FullAmenity found by the `where` argument doesn't exist, create a new FullAmenity with this data.
     */
    create: XOR<FullAmenityCreateInput, FullAmenityUncheckedCreateInput>
    /**
     * In case the FullAmenity was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FullAmenityUpdateInput, FullAmenityUncheckedUpdateInput>
  }

  /**
   * FullAmenity delete
   */
  export type FullAmenityDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FullAmenity
     */
    select?: FullAmenitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FullAmenityInclude<ExtArgs> | null
    /**
     * Filter which FullAmenity to delete.
     */
    where: FullAmenityWhereUniqueInput
  }

  /**
   * FullAmenity deleteMany
   */
  export type FullAmenityDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FullAmenities to delete
     */
    where?: FullAmenityWhereInput
  }

  /**
   * FullAmenity without action
   */
  export type FullAmenityDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FullAmenity
     */
    select?: FullAmenitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FullAmenityInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    phone: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    phone: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    phone: number
    password: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    phone?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    phone?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    phone?: true
    password?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string | null
    email: string
    phone: string | null
    password: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    cart?: boolean | User$cartArgs<ExtArgs>
    bookings?: boolean | User$bookingsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cart?: boolean | User$cartArgs<ExtArgs>
    bookings?: boolean | User$bookingsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      cart: Prisma.$CartPayload<ExtArgs> | null
      bookings: Prisma.$BookingPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string | null
      email: string
      phone: string | null
      password: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
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
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    cart<T extends User$cartArgs<ExtArgs> = {}>(args?: Subset<T, User$cartArgs<ExtArgs>>): Prisma__CartClient<$Result.GetResult<Prisma.$CartPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    bookings<T extends User$bookingsArgs<ExtArgs> = {}>(args?: Subset<T, User$bookingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly phone: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User.cart
   */
  export type User$cartArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cart
     */
    select?: CartSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartInclude<ExtArgs> | null
    where?: CartWhereInput
  }

  /**
   * User.bookings
   */
  export type User$bookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    where?: BookingWhereInput
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    cursor?: BookingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Cart
   */

  export type AggregateCart = {
    _count: CartCountAggregateOutputType | null
    _min: CartMinAggregateOutputType | null
    _max: CartMaxAggregateOutputType | null
  }

  export type CartMinAggregateOutputType = {
    id: string | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CartMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CartCountAggregateOutputType = {
    id: number
    userId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CartMinAggregateInputType = {
    id?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CartMaxAggregateInputType = {
    id?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CartCountAggregateInputType = {
    id?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CartAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Cart to aggregate.
     */
    where?: CartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Carts to fetch.
     */
    orderBy?: CartOrderByWithRelationInput | CartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Carts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Carts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Carts
    **/
    _count?: true | CartCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CartMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CartMaxAggregateInputType
  }

  export type GetCartAggregateType<T extends CartAggregateArgs> = {
        [P in keyof T & keyof AggregateCart]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCart[P]>
      : GetScalarType<T[P], AggregateCart[P]>
  }




  export type CartGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CartWhereInput
    orderBy?: CartOrderByWithAggregationInput | CartOrderByWithAggregationInput[]
    by: CartScalarFieldEnum[] | CartScalarFieldEnum
    having?: CartScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CartCountAggregateInputType | true
    _min?: CartMinAggregateInputType
    _max?: CartMaxAggregateInputType
  }

  export type CartGroupByOutputType = {
    id: string
    userId: string
    createdAt: Date
    updatedAt: Date
    _count: CartCountAggregateOutputType | null
    _min: CartMinAggregateOutputType | null
    _max: CartMaxAggregateOutputType | null
  }

  type GetCartGroupByPayload<T extends CartGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CartGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CartGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CartGroupByOutputType[P]>
            : GetScalarType<T[P], CartGroupByOutputType[P]>
        }
      >
    >


  export type CartSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    items?: boolean | Cart$itemsArgs<ExtArgs>
    _count?: boolean | CartCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cart"]>

  export type CartSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cart"]>

  export type CartSelectScalar = {
    id?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CartInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    items?: boolean | Cart$itemsArgs<ExtArgs>
    _count?: boolean | CartCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CartIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $CartPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Cart"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      items: Prisma.$CartItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["cart"]>
    composites: {}
  }

  type CartGetPayload<S extends boolean | null | undefined | CartDefaultArgs> = $Result.GetResult<Prisma.$CartPayload, S>

  type CartCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CartFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CartCountAggregateInputType | true
    }

  export interface CartDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Cart'], meta: { name: 'Cart' } }
    /**
     * Find zero or one Cart that matches the filter.
     * @param {CartFindUniqueArgs} args - Arguments to find a Cart
     * @example
     * // Get one Cart
     * const cart = await prisma.cart.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CartFindUniqueArgs>(args: SelectSubset<T, CartFindUniqueArgs<ExtArgs>>): Prisma__CartClient<$Result.GetResult<Prisma.$CartPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Cart that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CartFindUniqueOrThrowArgs} args - Arguments to find a Cart
     * @example
     * // Get one Cart
     * const cart = await prisma.cart.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CartFindUniqueOrThrowArgs>(args: SelectSubset<T, CartFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CartClient<$Result.GetResult<Prisma.$CartPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Cart that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartFindFirstArgs} args - Arguments to find a Cart
     * @example
     * // Get one Cart
     * const cart = await prisma.cart.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CartFindFirstArgs>(args?: SelectSubset<T, CartFindFirstArgs<ExtArgs>>): Prisma__CartClient<$Result.GetResult<Prisma.$CartPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Cart that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartFindFirstOrThrowArgs} args - Arguments to find a Cart
     * @example
     * // Get one Cart
     * const cart = await prisma.cart.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CartFindFirstOrThrowArgs>(args?: SelectSubset<T, CartFindFirstOrThrowArgs<ExtArgs>>): Prisma__CartClient<$Result.GetResult<Prisma.$CartPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Carts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Carts
     * const carts = await prisma.cart.findMany()
     * 
     * // Get first 10 Carts
     * const carts = await prisma.cart.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cartWithIdOnly = await prisma.cart.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CartFindManyArgs>(args?: SelectSubset<T, CartFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CartPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Cart.
     * @param {CartCreateArgs} args - Arguments to create a Cart.
     * @example
     * // Create one Cart
     * const Cart = await prisma.cart.create({
     *   data: {
     *     // ... data to create a Cart
     *   }
     * })
     * 
     */
    create<T extends CartCreateArgs>(args: SelectSubset<T, CartCreateArgs<ExtArgs>>): Prisma__CartClient<$Result.GetResult<Prisma.$CartPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Carts.
     * @param {CartCreateManyArgs} args - Arguments to create many Carts.
     * @example
     * // Create many Carts
     * const cart = await prisma.cart.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CartCreateManyArgs>(args?: SelectSubset<T, CartCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Carts and returns the data saved in the database.
     * @param {CartCreateManyAndReturnArgs} args - Arguments to create many Carts.
     * @example
     * // Create many Carts
     * const cart = await prisma.cart.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Carts and only return the `id`
     * const cartWithIdOnly = await prisma.cart.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CartCreateManyAndReturnArgs>(args?: SelectSubset<T, CartCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CartPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Cart.
     * @param {CartDeleteArgs} args - Arguments to delete one Cart.
     * @example
     * // Delete one Cart
     * const Cart = await prisma.cart.delete({
     *   where: {
     *     // ... filter to delete one Cart
     *   }
     * })
     * 
     */
    delete<T extends CartDeleteArgs>(args: SelectSubset<T, CartDeleteArgs<ExtArgs>>): Prisma__CartClient<$Result.GetResult<Prisma.$CartPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Cart.
     * @param {CartUpdateArgs} args - Arguments to update one Cart.
     * @example
     * // Update one Cart
     * const cart = await prisma.cart.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CartUpdateArgs>(args: SelectSubset<T, CartUpdateArgs<ExtArgs>>): Prisma__CartClient<$Result.GetResult<Prisma.$CartPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Carts.
     * @param {CartDeleteManyArgs} args - Arguments to filter Carts to delete.
     * @example
     * // Delete a few Carts
     * const { count } = await prisma.cart.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CartDeleteManyArgs>(args?: SelectSubset<T, CartDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Carts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Carts
     * const cart = await prisma.cart.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CartUpdateManyArgs>(args: SelectSubset<T, CartUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Cart.
     * @param {CartUpsertArgs} args - Arguments to update or create a Cart.
     * @example
     * // Update or create a Cart
     * const cart = await prisma.cart.upsert({
     *   create: {
     *     // ... data to create a Cart
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Cart we want to update
     *   }
     * })
     */
    upsert<T extends CartUpsertArgs>(args: SelectSubset<T, CartUpsertArgs<ExtArgs>>): Prisma__CartClient<$Result.GetResult<Prisma.$CartPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Carts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartCountArgs} args - Arguments to filter Carts to count.
     * @example
     * // Count the number of Carts
     * const count = await prisma.cart.count({
     *   where: {
     *     // ... the filter for the Carts we want to count
     *   }
     * })
    **/
    count<T extends CartCountArgs>(
      args?: Subset<T, CartCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CartCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Cart.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CartAggregateArgs>(args: Subset<T, CartAggregateArgs>): Prisma.PrismaPromise<GetCartAggregateType<T>>

    /**
     * Group by Cart.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartGroupByArgs} args - Group by arguments.
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
      T extends CartGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CartGroupByArgs['orderBy'] }
        : { orderBy?: CartGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CartGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCartGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Cart model
   */
  readonly fields: CartFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Cart.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CartClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    items<T extends Cart$itemsArgs<ExtArgs> = {}>(args?: Subset<T, Cart$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CartItemPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Cart model
   */ 
  interface CartFieldRefs {
    readonly id: FieldRef<"Cart", 'String'>
    readonly userId: FieldRef<"Cart", 'String'>
    readonly createdAt: FieldRef<"Cart", 'DateTime'>
    readonly updatedAt: FieldRef<"Cart", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Cart findUnique
   */
  export type CartFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cart
     */
    select?: CartSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartInclude<ExtArgs> | null
    /**
     * Filter, which Cart to fetch.
     */
    where: CartWhereUniqueInput
  }

  /**
   * Cart findUniqueOrThrow
   */
  export type CartFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cart
     */
    select?: CartSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartInclude<ExtArgs> | null
    /**
     * Filter, which Cart to fetch.
     */
    where: CartWhereUniqueInput
  }

  /**
   * Cart findFirst
   */
  export type CartFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cart
     */
    select?: CartSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartInclude<ExtArgs> | null
    /**
     * Filter, which Cart to fetch.
     */
    where?: CartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Carts to fetch.
     */
    orderBy?: CartOrderByWithRelationInput | CartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Carts.
     */
    cursor?: CartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Carts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Carts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Carts.
     */
    distinct?: CartScalarFieldEnum | CartScalarFieldEnum[]
  }

  /**
   * Cart findFirstOrThrow
   */
  export type CartFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cart
     */
    select?: CartSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartInclude<ExtArgs> | null
    /**
     * Filter, which Cart to fetch.
     */
    where?: CartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Carts to fetch.
     */
    orderBy?: CartOrderByWithRelationInput | CartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Carts.
     */
    cursor?: CartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Carts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Carts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Carts.
     */
    distinct?: CartScalarFieldEnum | CartScalarFieldEnum[]
  }

  /**
   * Cart findMany
   */
  export type CartFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cart
     */
    select?: CartSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartInclude<ExtArgs> | null
    /**
     * Filter, which Carts to fetch.
     */
    where?: CartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Carts to fetch.
     */
    orderBy?: CartOrderByWithRelationInput | CartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Carts.
     */
    cursor?: CartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Carts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Carts.
     */
    skip?: number
    distinct?: CartScalarFieldEnum | CartScalarFieldEnum[]
  }

  /**
   * Cart create
   */
  export type CartCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cart
     */
    select?: CartSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartInclude<ExtArgs> | null
    /**
     * The data needed to create a Cart.
     */
    data: XOR<CartCreateInput, CartUncheckedCreateInput>
  }

  /**
   * Cart createMany
   */
  export type CartCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Carts.
     */
    data: CartCreateManyInput | CartCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Cart createManyAndReturn
   */
  export type CartCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cart
     */
    select?: CartSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Carts.
     */
    data: CartCreateManyInput | CartCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Cart update
   */
  export type CartUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cart
     */
    select?: CartSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartInclude<ExtArgs> | null
    /**
     * The data needed to update a Cart.
     */
    data: XOR<CartUpdateInput, CartUncheckedUpdateInput>
    /**
     * Choose, which Cart to update.
     */
    where: CartWhereUniqueInput
  }

  /**
   * Cart updateMany
   */
  export type CartUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Carts.
     */
    data: XOR<CartUpdateManyMutationInput, CartUncheckedUpdateManyInput>
    /**
     * Filter which Carts to update
     */
    where?: CartWhereInput
  }

  /**
   * Cart upsert
   */
  export type CartUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cart
     */
    select?: CartSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartInclude<ExtArgs> | null
    /**
     * The filter to search for the Cart to update in case it exists.
     */
    where: CartWhereUniqueInput
    /**
     * In case the Cart found by the `where` argument doesn't exist, create a new Cart with this data.
     */
    create: XOR<CartCreateInput, CartUncheckedCreateInput>
    /**
     * In case the Cart was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CartUpdateInput, CartUncheckedUpdateInput>
  }

  /**
   * Cart delete
   */
  export type CartDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cart
     */
    select?: CartSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartInclude<ExtArgs> | null
    /**
     * Filter which Cart to delete.
     */
    where: CartWhereUniqueInput
  }

  /**
   * Cart deleteMany
   */
  export type CartDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Carts to delete
     */
    where?: CartWhereInput
  }

  /**
   * Cart.items
   */
  export type Cart$itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartItem
     */
    select?: CartItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartItemInclude<ExtArgs> | null
    where?: CartItemWhereInput
    orderBy?: CartItemOrderByWithRelationInput | CartItemOrderByWithRelationInput[]
    cursor?: CartItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CartItemScalarFieldEnum | CartItemScalarFieldEnum[]
  }

  /**
   * Cart without action
   */
  export type CartDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cart
     */
    select?: CartSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartInclude<ExtArgs> | null
  }


  /**
   * Model CartItem
   */

  export type AggregateCartItem = {
    _count: CartItemCountAggregateOutputType | null
    _min: CartItemMinAggregateOutputType | null
    _max: CartItemMaxAggregateOutputType | null
  }

  export type CartItemMinAggregateOutputType = {
    id: string | null
    cartId: string | null
    propertyId: string | null
    addedAt: Date | null
  }

  export type CartItemMaxAggregateOutputType = {
    id: string | null
    cartId: string | null
    propertyId: string | null
    addedAt: Date | null
  }

  export type CartItemCountAggregateOutputType = {
    id: number
    cartId: number
    propertyId: number
    addedAt: number
    _all: number
  }


  export type CartItemMinAggregateInputType = {
    id?: true
    cartId?: true
    propertyId?: true
    addedAt?: true
  }

  export type CartItemMaxAggregateInputType = {
    id?: true
    cartId?: true
    propertyId?: true
    addedAt?: true
  }

  export type CartItemCountAggregateInputType = {
    id?: true
    cartId?: true
    propertyId?: true
    addedAt?: true
    _all?: true
  }

  export type CartItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CartItem to aggregate.
     */
    where?: CartItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CartItems to fetch.
     */
    orderBy?: CartItemOrderByWithRelationInput | CartItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CartItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CartItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CartItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CartItems
    **/
    _count?: true | CartItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CartItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CartItemMaxAggregateInputType
  }

  export type GetCartItemAggregateType<T extends CartItemAggregateArgs> = {
        [P in keyof T & keyof AggregateCartItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCartItem[P]>
      : GetScalarType<T[P], AggregateCartItem[P]>
  }




  export type CartItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CartItemWhereInput
    orderBy?: CartItemOrderByWithAggregationInput | CartItemOrderByWithAggregationInput[]
    by: CartItemScalarFieldEnum[] | CartItemScalarFieldEnum
    having?: CartItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CartItemCountAggregateInputType | true
    _min?: CartItemMinAggregateInputType
    _max?: CartItemMaxAggregateInputType
  }

  export type CartItemGroupByOutputType = {
    id: string
    cartId: string
    propertyId: string
    addedAt: Date
    _count: CartItemCountAggregateOutputType | null
    _min: CartItemMinAggregateOutputType | null
    _max: CartItemMaxAggregateOutputType | null
  }

  type GetCartItemGroupByPayload<T extends CartItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CartItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CartItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CartItemGroupByOutputType[P]>
            : GetScalarType<T[P], CartItemGroupByOutputType[P]>
        }
      >
    >


  export type CartItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cartId?: boolean
    propertyId?: boolean
    addedAt?: boolean
    cart?: boolean | CartDefaultArgs<ExtArgs>
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cartItem"]>

  export type CartItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cartId?: boolean
    propertyId?: boolean
    addedAt?: boolean
    cart?: boolean | CartDefaultArgs<ExtArgs>
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cartItem"]>

  export type CartItemSelectScalar = {
    id?: boolean
    cartId?: boolean
    propertyId?: boolean
    addedAt?: boolean
  }

  export type CartItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cart?: boolean | CartDefaultArgs<ExtArgs>
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }
  export type CartItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cart?: boolean | CartDefaultArgs<ExtArgs>
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }

  export type $CartItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CartItem"
    objects: {
      cart: Prisma.$CartPayload<ExtArgs>
      property: Prisma.$PropertyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      cartId: string
      propertyId: string
      addedAt: Date
    }, ExtArgs["result"]["cartItem"]>
    composites: {}
  }

  type CartItemGetPayload<S extends boolean | null | undefined | CartItemDefaultArgs> = $Result.GetResult<Prisma.$CartItemPayload, S>

  type CartItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CartItemFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CartItemCountAggregateInputType | true
    }

  export interface CartItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CartItem'], meta: { name: 'CartItem' } }
    /**
     * Find zero or one CartItem that matches the filter.
     * @param {CartItemFindUniqueArgs} args - Arguments to find a CartItem
     * @example
     * // Get one CartItem
     * const cartItem = await prisma.cartItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CartItemFindUniqueArgs>(args: SelectSubset<T, CartItemFindUniqueArgs<ExtArgs>>): Prisma__CartItemClient<$Result.GetResult<Prisma.$CartItemPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one CartItem that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CartItemFindUniqueOrThrowArgs} args - Arguments to find a CartItem
     * @example
     * // Get one CartItem
     * const cartItem = await prisma.cartItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CartItemFindUniqueOrThrowArgs>(args: SelectSubset<T, CartItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CartItemClient<$Result.GetResult<Prisma.$CartItemPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first CartItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartItemFindFirstArgs} args - Arguments to find a CartItem
     * @example
     * // Get one CartItem
     * const cartItem = await prisma.cartItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CartItemFindFirstArgs>(args?: SelectSubset<T, CartItemFindFirstArgs<ExtArgs>>): Prisma__CartItemClient<$Result.GetResult<Prisma.$CartItemPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first CartItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartItemFindFirstOrThrowArgs} args - Arguments to find a CartItem
     * @example
     * // Get one CartItem
     * const cartItem = await prisma.cartItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CartItemFindFirstOrThrowArgs>(args?: SelectSubset<T, CartItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__CartItemClient<$Result.GetResult<Prisma.$CartItemPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more CartItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CartItems
     * const cartItems = await prisma.cartItem.findMany()
     * 
     * // Get first 10 CartItems
     * const cartItems = await prisma.cartItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cartItemWithIdOnly = await prisma.cartItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CartItemFindManyArgs>(args?: SelectSubset<T, CartItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CartItemPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a CartItem.
     * @param {CartItemCreateArgs} args - Arguments to create a CartItem.
     * @example
     * // Create one CartItem
     * const CartItem = await prisma.cartItem.create({
     *   data: {
     *     // ... data to create a CartItem
     *   }
     * })
     * 
     */
    create<T extends CartItemCreateArgs>(args: SelectSubset<T, CartItemCreateArgs<ExtArgs>>): Prisma__CartItemClient<$Result.GetResult<Prisma.$CartItemPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many CartItems.
     * @param {CartItemCreateManyArgs} args - Arguments to create many CartItems.
     * @example
     * // Create many CartItems
     * const cartItem = await prisma.cartItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CartItemCreateManyArgs>(args?: SelectSubset<T, CartItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CartItems and returns the data saved in the database.
     * @param {CartItemCreateManyAndReturnArgs} args - Arguments to create many CartItems.
     * @example
     * // Create many CartItems
     * const cartItem = await prisma.cartItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CartItems and only return the `id`
     * const cartItemWithIdOnly = await prisma.cartItem.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CartItemCreateManyAndReturnArgs>(args?: SelectSubset<T, CartItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CartItemPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a CartItem.
     * @param {CartItemDeleteArgs} args - Arguments to delete one CartItem.
     * @example
     * // Delete one CartItem
     * const CartItem = await prisma.cartItem.delete({
     *   where: {
     *     // ... filter to delete one CartItem
     *   }
     * })
     * 
     */
    delete<T extends CartItemDeleteArgs>(args: SelectSubset<T, CartItemDeleteArgs<ExtArgs>>): Prisma__CartItemClient<$Result.GetResult<Prisma.$CartItemPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one CartItem.
     * @param {CartItemUpdateArgs} args - Arguments to update one CartItem.
     * @example
     * // Update one CartItem
     * const cartItem = await prisma.cartItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CartItemUpdateArgs>(args: SelectSubset<T, CartItemUpdateArgs<ExtArgs>>): Prisma__CartItemClient<$Result.GetResult<Prisma.$CartItemPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more CartItems.
     * @param {CartItemDeleteManyArgs} args - Arguments to filter CartItems to delete.
     * @example
     * // Delete a few CartItems
     * const { count } = await prisma.cartItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CartItemDeleteManyArgs>(args?: SelectSubset<T, CartItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CartItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CartItems
     * const cartItem = await prisma.cartItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CartItemUpdateManyArgs>(args: SelectSubset<T, CartItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CartItem.
     * @param {CartItemUpsertArgs} args - Arguments to update or create a CartItem.
     * @example
     * // Update or create a CartItem
     * const cartItem = await prisma.cartItem.upsert({
     *   create: {
     *     // ... data to create a CartItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CartItem we want to update
     *   }
     * })
     */
    upsert<T extends CartItemUpsertArgs>(args: SelectSubset<T, CartItemUpsertArgs<ExtArgs>>): Prisma__CartItemClient<$Result.GetResult<Prisma.$CartItemPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of CartItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartItemCountArgs} args - Arguments to filter CartItems to count.
     * @example
     * // Count the number of CartItems
     * const count = await prisma.cartItem.count({
     *   where: {
     *     // ... the filter for the CartItems we want to count
     *   }
     * })
    **/
    count<T extends CartItemCountArgs>(
      args?: Subset<T, CartItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CartItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CartItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CartItemAggregateArgs>(args: Subset<T, CartItemAggregateArgs>): Prisma.PrismaPromise<GetCartItemAggregateType<T>>

    /**
     * Group by CartItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartItemGroupByArgs} args - Group by arguments.
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
      T extends CartItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CartItemGroupByArgs['orderBy'] }
        : { orderBy?: CartItemGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CartItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCartItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CartItem model
   */
  readonly fields: CartItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CartItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CartItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    cart<T extends CartDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CartDefaultArgs<ExtArgs>>): Prisma__CartClient<$Result.GetResult<Prisma.$CartPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the CartItem model
   */ 
  interface CartItemFieldRefs {
    readonly id: FieldRef<"CartItem", 'String'>
    readonly cartId: FieldRef<"CartItem", 'String'>
    readonly propertyId: FieldRef<"CartItem", 'String'>
    readonly addedAt: FieldRef<"CartItem", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CartItem findUnique
   */
  export type CartItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartItem
     */
    select?: CartItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartItemInclude<ExtArgs> | null
    /**
     * Filter, which CartItem to fetch.
     */
    where: CartItemWhereUniqueInput
  }

  /**
   * CartItem findUniqueOrThrow
   */
  export type CartItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartItem
     */
    select?: CartItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartItemInclude<ExtArgs> | null
    /**
     * Filter, which CartItem to fetch.
     */
    where: CartItemWhereUniqueInput
  }

  /**
   * CartItem findFirst
   */
  export type CartItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartItem
     */
    select?: CartItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartItemInclude<ExtArgs> | null
    /**
     * Filter, which CartItem to fetch.
     */
    where?: CartItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CartItems to fetch.
     */
    orderBy?: CartItemOrderByWithRelationInput | CartItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CartItems.
     */
    cursor?: CartItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CartItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CartItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CartItems.
     */
    distinct?: CartItemScalarFieldEnum | CartItemScalarFieldEnum[]
  }

  /**
   * CartItem findFirstOrThrow
   */
  export type CartItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartItem
     */
    select?: CartItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartItemInclude<ExtArgs> | null
    /**
     * Filter, which CartItem to fetch.
     */
    where?: CartItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CartItems to fetch.
     */
    orderBy?: CartItemOrderByWithRelationInput | CartItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CartItems.
     */
    cursor?: CartItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CartItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CartItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CartItems.
     */
    distinct?: CartItemScalarFieldEnum | CartItemScalarFieldEnum[]
  }

  /**
   * CartItem findMany
   */
  export type CartItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartItem
     */
    select?: CartItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartItemInclude<ExtArgs> | null
    /**
     * Filter, which CartItems to fetch.
     */
    where?: CartItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CartItems to fetch.
     */
    orderBy?: CartItemOrderByWithRelationInput | CartItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CartItems.
     */
    cursor?: CartItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CartItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CartItems.
     */
    skip?: number
    distinct?: CartItemScalarFieldEnum | CartItemScalarFieldEnum[]
  }

  /**
   * CartItem create
   */
  export type CartItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartItem
     */
    select?: CartItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartItemInclude<ExtArgs> | null
    /**
     * The data needed to create a CartItem.
     */
    data: XOR<CartItemCreateInput, CartItemUncheckedCreateInput>
  }

  /**
   * CartItem createMany
   */
  export type CartItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CartItems.
     */
    data: CartItemCreateManyInput | CartItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CartItem createManyAndReturn
   */
  export type CartItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartItem
     */
    select?: CartItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many CartItems.
     */
    data: CartItemCreateManyInput | CartItemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CartItem update
   */
  export type CartItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartItem
     */
    select?: CartItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartItemInclude<ExtArgs> | null
    /**
     * The data needed to update a CartItem.
     */
    data: XOR<CartItemUpdateInput, CartItemUncheckedUpdateInput>
    /**
     * Choose, which CartItem to update.
     */
    where: CartItemWhereUniqueInput
  }

  /**
   * CartItem updateMany
   */
  export type CartItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CartItems.
     */
    data: XOR<CartItemUpdateManyMutationInput, CartItemUncheckedUpdateManyInput>
    /**
     * Filter which CartItems to update
     */
    where?: CartItemWhereInput
  }

  /**
   * CartItem upsert
   */
  export type CartItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartItem
     */
    select?: CartItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartItemInclude<ExtArgs> | null
    /**
     * The filter to search for the CartItem to update in case it exists.
     */
    where: CartItemWhereUniqueInput
    /**
     * In case the CartItem found by the `where` argument doesn't exist, create a new CartItem with this data.
     */
    create: XOR<CartItemCreateInput, CartItemUncheckedCreateInput>
    /**
     * In case the CartItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CartItemUpdateInput, CartItemUncheckedUpdateInput>
  }

  /**
   * CartItem delete
   */
  export type CartItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartItem
     */
    select?: CartItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartItemInclude<ExtArgs> | null
    /**
     * Filter which CartItem to delete.
     */
    where: CartItemWhereUniqueInput
  }

  /**
   * CartItem deleteMany
   */
  export type CartItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CartItems to delete
     */
    where?: CartItemWhereInput
  }

  /**
   * CartItem without action
   */
  export type CartItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartItem
     */
    select?: CartItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartItemInclude<ExtArgs> | null
  }


  /**
   * Model Booking
   */

  export type AggregateBooking = {
    _count: BookingCountAggregateOutputType | null
    _min: BookingMinAggregateOutputType | null
    _max: BookingMaxAggregateOutputType | null
  }

  export type BookingMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    phone: string | null
    date: string | null
    time: string | null
    propertyTitle: string | null
    propertyId: string | null
    userId: string | null
    createdAt: Date | null
  }

  export type BookingMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    phone: string | null
    date: string | null
    time: string | null
    propertyTitle: string | null
    propertyId: string | null
    userId: string | null
    createdAt: Date | null
  }

  export type BookingCountAggregateOutputType = {
    id: number
    name: number
    email: number
    phone: number
    date: number
    time: number
    propertyTitle: number
    propertyId: number
    userId: number
    createdAt: number
    _all: number
  }


  export type BookingMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    phone?: true
    date?: true
    time?: true
    propertyTitle?: true
    propertyId?: true
    userId?: true
    createdAt?: true
  }

  export type BookingMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    phone?: true
    date?: true
    time?: true
    propertyTitle?: true
    propertyId?: true
    userId?: true
    createdAt?: true
  }

  export type BookingCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    phone?: true
    date?: true
    time?: true
    propertyTitle?: true
    propertyId?: true
    userId?: true
    createdAt?: true
    _all?: true
  }

  export type BookingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Booking to aggregate.
     */
    where?: BookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookings to fetch.
     */
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Bookings
    **/
    _count?: true | BookingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BookingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BookingMaxAggregateInputType
  }

  export type GetBookingAggregateType<T extends BookingAggregateArgs> = {
        [P in keyof T & keyof AggregateBooking]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBooking[P]>
      : GetScalarType<T[P], AggregateBooking[P]>
  }




  export type BookingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookingWhereInput
    orderBy?: BookingOrderByWithAggregationInput | BookingOrderByWithAggregationInput[]
    by: BookingScalarFieldEnum[] | BookingScalarFieldEnum
    having?: BookingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BookingCountAggregateInputType | true
    _min?: BookingMinAggregateInputType
    _max?: BookingMaxAggregateInputType
  }

  export type BookingGroupByOutputType = {
    id: string
    name: string
    email: string
    phone: string
    date: string
    time: string
    propertyTitle: string
    propertyId: string
    userId: string | null
    createdAt: Date
    _count: BookingCountAggregateOutputType | null
    _min: BookingMinAggregateOutputType | null
    _max: BookingMaxAggregateOutputType | null
  }

  type GetBookingGroupByPayload<T extends BookingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BookingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BookingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BookingGroupByOutputType[P]>
            : GetScalarType<T[P], BookingGroupByOutputType[P]>
        }
      >
    >


  export type BookingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    date?: boolean
    time?: boolean
    propertyTitle?: boolean
    propertyId?: boolean
    userId?: boolean
    createdAt?: boolean
    user?: boolean | Booking$userArgs<ExtArgs>
  }, ExtArgs["result"]["booking"]>

  export type BookingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    date?: boolean
    time?: boolean
    propertyTitle?: boolean
    propertyId?: boolean
    userId?: boolean
    createdAt?: boolean
    user?: boolean | Booking$userArgs<ExtArgs>
  }, ExtArgs["result"]["booking"]>

  export type BookingSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    date?: boolean
    time?: boolean
    propertyTitle?: boolean
    propertyId?: boolean
    userId?: boolean
    createdAt?: boolean
  }

  export type BookingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Booking$userArgs<ExtArgs>
  }
  export type BookingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Booking$userArgs<ExtArgs>
  }

  export type $BookingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Booking"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      phone: string
      date: string
      time: string
      propertyTitle: string
      propertyId: string
      userId: string | null
      createdAt: Date
    }, ExtArgs["result"]["booking"]>
    composites: {}
  }

  type BookingGetPayload<S extends boolean | null | undefined | BookingDefaultArgs> = $Result.GetResult<Prisma.$BookingPayload, S>

  type BookingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<BookingFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: BookingCountAggregateInputType | true
    }

  export interface BookingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Booking'], meta: { name: 'Booking' } }
    /**
     * Find zero or one Booking that matches the filter.
     * @param {BookingFindUniqueArgs} args - Arguments to find a Booking
     * @example
     * // Get one Booking
     * const booking = await prisma.booking.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BookingFindUniqueArgs>(args: SelectSubset<T, BookingFindUniqueArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Booking that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {BookingFindUniqueOrThrowArgs} args - Arguments to find a Booking
     * @example
     * // Get one Booking
     * const booking = await prisma.booking.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BookingFindUniqueOrThrowArgs>(args: SelectSubset<T, BookingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Booking that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingFindFirstArgs} args - Arguments to find a Booking
     * @example
     * // Get one Booking
     * const booking = await prisma.booking.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BookingFindFirstArgs>(args?: SelectSubset<T, BookingFindFirstArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Booking that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingFindFirstOrThrowArgs} args - Arguments to find a Booking
     * @example
     * // Get one Booking
     * const booking = await prisma.booking.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BookingFindFirstOrThrowArgs>(args?: SelectSubset<T, BookingFindFirstOrThrowArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Bookings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Bookings
     * const bookings = await prisma.booking.findMany()
     * 
     * // Get first 10 Bookings
     * const bookings = await prisma.booking.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bookingWithIdOnly = await prisma.booking.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BookingFindManyArgs>(args?: SelectSubset<T, BookingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Booking.
     * @param {BookingCreateArgs} args - Arguments to create a Booking.
     * @example
     * // Create one Booking
     * const Booking = await prisma.booking.create({
     *   data: {
     *     // ... data to create a Booking
     *   }
     * })
     * 
     */
    create<T extends BookingCreateArgs>(args: SelectSubset<T, BookingCreateArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Bookings.
     * @param {BookingCreateManyArgs} args - Arguments to create many Bookings.
     * @example
     * // Create many Bookings
     * const booking = await prisma.booking.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BookingCreateManyArgs>(args?: SelectSubset<T, BookingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Bookings and returns the data saved in the database.
     * @param {BookingCreateManyAndReturnArgs} args - Arguments to create many Bookings.
     * @example
     * // Create many Bookings
     * const booking = await prisma.booking.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Bookings and only return the `id`
     * const bookingWithIdOnly = await prisma.booking.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BookingCreateManyAndReturnArgs>(args?: SelectSubset<T, BookingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Booking.
     * @param {BookingDeleteArgs} args - Arguments to delete one Booking.
     * @example
     * // Delete one Booking
     * const Booking = await prisma.booking.delete({
     *   where: {
     *     // ... filter to delete one Booking
     *   }
     * })
     * 
     */
    delete<T extends BookingDeleteArgs>(args: SelectSubset<T, BookingDeleteArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Booking.
     * @param {BookingUpdateArgs} args - Arguments to update one Booking.
     * @example
     * // Update one Booking
     * const booking = await prisma.booking.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BookingUpdateArgs>(args: SelectSubset<T, BookingUpdateArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Bookings.
     * @param {BookingDeleteManyArgs} args - Arguments to filter Bookings to delete.
     * @example
     * // Delete a few Bookings
     * const { count } = await prisma.booking.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BookingDeleteManyArgs>(args?: SelectSubset<T, BookingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bookings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Bookings
     * const booking = await prisma.booking.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BookingUpdateManyArgs>(args: SelectSubset<T, BookingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Booking.
     * @param {BookingUpsertArgs} args - Arguments to update or create a Booking.
     * @example
     * // Update or create a Booking
     * const booking = await prisma.booking.upsert({
     *   create: {
     *     // ... data to create a Booking
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Booking we want to update
     *   }
     * })
     */
    upsert<T extends BookingUpsertArgs>(args: SelectSubset<T, BookingUpsertArgs<ExtArgs>>): Prisma__BookingClient<$Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Bookings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingCountArgs} args - Arguments to filter Bookings to count.
     * @example
     * // Count the number of Bookings
     * const count = await prisma.booking.count({
     *   where: {
     *     // ... the filter for the Bookings we want to count
     *   }
     * })
    **/
    count<T extends BookingCountArgs>(
      args?: Subset<T, BookingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BookingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Booking.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BookingAggregateArgs>(args: Subset<T, BookingAggregateArgs>): Prisma.PrismaPromise<GetBookingAggregateType<T>>

    /**
     * Group by Booking.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingGroupByArgs} args - Group by arguments.
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
      T extends BookingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BookingGroupByArgs['orderBy'] }
        : { orderBy?: BookingGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, BookingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBookingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Booking model
   */
  readonly fields: BookingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Booking.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BookingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends Booking$userArgs<ExtArgs> = {}>(args?: Subset<T, Booking$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
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
   * Fields of the Booking model
   */ 
  interface BookingFieldRefs {
    readonly id: FieldRef<"Booking", 'String'>
    readonly name: FieldRef<"Booking", 'String'>
    readonly email: FieldRef<"Booking", 'String'>
    readonly phone: FieldRef<"Booking", 'String'>
    readonly date: FieldRef<"Booking", 'String'>
    readonly time: FieldRef<"Booking", 'String'>
    readonly propertyTitle: FieldRef<"Booking", 'String'>
    readonly propertyId: FieldRef<"Booking", 'String'>
    readonly userId: FieldRef<"Booking", 'String'>
    readonly createdAt: FieldRef<"Booking", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Booking findUnique
   */
  export type BookingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Booking to fetch.
     */
    where: BookingWhereUniqueInput
  }

  /**
   * Booking findUniqueOrThrow
   */
  export type BookingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Booking to fetch.
     */
    where: BookingWhereUniqueInput
  }

  /**
   * Booking findFirst
   */
  export type BookingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Booking to fetch.
     */
    where?: BookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookings to fetch.
     */
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bookings.
     */
    cursor?: BookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bookings.
     */
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * Booking findFirstOrThrow
   */
  export type BookingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Booking to fetch.
     */
    where?: BookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookings to fetch.
     */
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bookings.
     */
    cursor?: BookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bookings.
     */
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * Booking findMany
   */
  export type BookingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter, which Bookings to fetch.
     */
    where?: BookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookings to fetch.
     */
    orderBy?: BookingOrderByWithRelationInput | BookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Bookings.
     */
    cursor?: BookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookings.
     */
    skip?: number
    distinct?: BookingScalarFieldEnum | BookingScalarFieldEnum[]
  }

  /**
   * Booking create
   */
  export type BookingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * The data needed to create a Booking.
     */
    data: XOR<BookingCreateInput, BookingUncheckedCreateInput>
  }

  /**
   * Booking createMany
   */
  export type BookingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Bookings.
     */
    data: BookingCreateManyInput | BookingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Booking createManyAndReturn
   */
  export type BookingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Bookings.
     */
    data: BookingCreateManyInput | BookingCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Booking update
   */
  export type BookingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * The data needed to update a Booking.
     */
    data: XOR<BookingUpdateInput, BookingUncheckedUpdateInput>
    /**
     * Choose, which Booking to update.
     */
    where: BookingWhereUniqueInput
  }

  /**
   * Booking updateMany
   */
  export type BookingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Bookings.
     */
    data: XOR<BookingUpdateManyMutationInput, BookingUncheckedUpdateManyInput>
    /**
     * Filter which Bookings to update
     */
    where?: BookingWhereInput
  }

  /**
   * Booking upsert
   */
  export type BookingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * The filter to search for the Booking to update in case it exists.
     */
    where: BookingWhereUniqueInput
    /**
     * In case the Booking found by the `where` argument doesn't exist, create a new Booking with this data.
     */
    create: XOR<BookingCreateInput, BookingUncheckedCreateInput>
    /**
     * In case the Booking was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BookingUpdateInput, BookingUncheckedUpdateInput>
  }

  /**
   * Booking delete
   */
  export type BookingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
    /**
     * Filter which Booking to delete.
     */
    where: BookingWhereUniqueInput
  }

  /**
   * Booking deleteMany
   */
  export type BookingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Bookings to delete
     */
    where?: BookingWhereInput
  }

  /**
   * Booking.user
   */
  export type Booking$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Booking without action
   */
  export type BookingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: BookingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookingInclude<ExtArgs> | null
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


  export const BasicAmenityScalarFieldEnum: {
    id: 'id',
    name: 'name',
    normalized: 'normalized',
    propertyId: 'propertyId',
    createdAt: 'createdAt'
  };

  export type BasicAmenityScalarFieldEnum = (typeof BasicAmenityScalarFieldEnum)[keyof typeof BasicAmenityScalarFieldEnum]


  export const FullAmenityScalarFieldEnum: {
    id: 'id',
    name: 'name',
    normalized: 'normalized',
    propertyId: 'propertyId',
    createdAt: 'createdAt'
  };

  export type FullAmenityScalarFieldEnum = (typeof FullAmenityScalarFieldEnum)[keyof typeof FullAmenityScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    phone: 'phone',
    password: 'password',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const CartScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CartScalarFieldEnum = (typeof CartScalarFieldEnum)[keyof typeof CartScalarFieldEnum]


  export const CartItemScalarFieldEnum: {
    id: 'id',
    cartId: 'cartId',
    propertyId: 'propertyId',
    addedAt: 'addedAt'
  };

  export type CartItemScalarFieldEnum = (typeof CartItemScalarFieldEnum)[keyof typeof CartItemScalarFieldEnum]


  export const BookingScalarFieldEnum: {
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

  export type BookingScalarFieldEnum = (typeof BookingScalarFieldEnum)[keyof typeof BookingScalarFieldEnum]


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
    isSoldOut?: BoolFilter<"Property"> | boolean
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
    basicAmenities?: BasicAmenityListRelationFilter
    fullAmenities?: FullAmenityListRelationFilter
    cartItems?: CartItemListRelationFilter
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
    isSoldOut?: SortOrder
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
    basicAmenities?: BasicAmenityOrderByRelationAggregateInput
    fullAmenities?: FullAmenityOrderByRelationAggregateInput
    cartItems?: CartItemOrderByRelationAggregateInput
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
    isSoldOut?: BoolFilter<"Property"> | boolean
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
    basicAmenities?: BasicAmenityListRelationFilter
    fullAmenities?: FullAmenityListRelationFilter
    cartItems?: CartItemListRelationFilter
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
    isSoldOut?: SortOrder
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
    isSoldOut?: BoolWithAggregatesFilter<"Property"> | boolean
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

  export type BasicAmenityWhereInput = {
    AND?: BasicAmenityWhereInput | BasicAmenityWhereInput[]
    OR?: BasicAmenityWhereInput[]
    NOT?: BasicAmenityWhereInput | BasicAmenityWhereInput[]
    id?: StringFilter<"BasicAmenity"> | string
    name?: StringFilter<"BasicAmenity"> | string
    normalized?: StringFilter<"BasicAmenity"> | string
    propertyId?: StringFilter<"BasicAmenity"> | string
    createdAt?: DateTimeFilter<"BasicAmenity"> | Date | string
    property?: XOR<PropertyRelationFilter, PropertyWhereInput>
  }

  export type BasicAmenityOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    normalized?: SortOrder
    propertyId?: SortOrder
    createdAt?: SortOrder
    property?: PropertyOrderByWithRelationInput
  }

  export type BasicAmenityWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    propertyId_normalized?: BasicAmenityPropertyIdNormalizedCompoundUniqueInput
    AND?: BasicAmenityWhereInput | BasicAmenityWhereInput[]
    OR?: BasicAmenityWhereInput[]
    NOT?: BasicAmenityWhereInput | BasicAmenityWhereInput[]
    name?: StringFilter<"BasicAmenity"> | string
    normalized?: StringFilter<"BasicAmenity"> | string
    propertyId?: StringFilter<"BasicAmenity"> | string
    createdAt?: DateTimeFilter<"BasicAmenity"> | Date | string
    property?: XOR<PropertyRelationFilter, PropertyWhereInput>
  }, "id" | "propertyId_normalized">

  export type BasicAmenityOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    normalized?: SortOrder
    propertyId?: SortOrder
    createdAt?: SortOrder
    _count?: BasicAmenityCountOrderByAggregateInput
    _max?: BasicAmenityMaxOrderByAggregateInput
    _min?: BasicAmenityMinOrderByAggregateInput
  }

  export type BasicAmenityScalarWhereWithAggregatesInput = {
    AND?: BasicAmenityScalarWhereWithAggregatesInput | BasicAmenityScalarWhereWithAggregatesInput[]
    OR?: BasicAmenityScalarWhereWithAggregatesInput[]
    NOT?: BasicAmenityScalarWhereWithAggregatesInput | BasicAmenityScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BasicAmenity"> | string
    name?: StringWithAggregatesFilter<"BasicAmenity"> | string
    normalized?: StringWithAggregatesFilter<"BasicAmenity"> | string
    propertyId?: StringWithAggregatesFilter<"BasicAmenity"> | string
    createdAt?: DateTimeWithAggregatesFilter<"BasicAmenity"> | Date | string
  }

  export type FullAmenityWhereInput = {
    AND?: FullAmenityWhereInput | FullAmenityWhereInput[]
    OR?: FullAmenityWhereInput[]
    NOT?: FullAmenityWhereInput | FullAmenityWhereInput[]
    id?: StringFilter<"FullAmenity"> | string
    name?: StringFilter<"FullAmenity"> | string
    normalized?: StringFilter<"FullAmenity"> | string
    propertyId?: StringFilter<"FullAmenity"> | string
    createdAt?: DateTimeFilter<"FullAmenity"> | Date | string
    property?: XOR<PropertyRelationFilter, PropertyWhereInput>
  }

  export type FullAmenityOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    normalized?: SortOrder
    propertyId?: SortOrder
    createdAt?: SortOrder
    property?: PropertyOrderByWithRelationInput
  }

  export type FullAmenityWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    propertyId_normalized?: FullAmenityPropertyIdNormalizedCompoundUniqueInput
    AND?: FullAmenityWhereInput | FullAmenityWhereInput[]
    OR?: FullAmenityWhereInput[]
    NOT?: FullAmenityWhereInput | FullAmenityWhereInput[]
    name?: StringFilter<"FullAmenity"> | string
    normalized?: StringFilter<"FullAmenity"> | string
    propertyId?: StringFilter<"FullAmenity"> | string
    createdAt?: DateTimeFilter<"FullAmenity"> | Date | string
    property?: XOR<PropertyRelationFilter, PropertyWhereInput>
  }, "id" | "propertyId_normalized">

  export type FullAmenityOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    normalized?: SortOrder
    propertyId?: SortOrder
    createdAt?: SortOrder
    _count?: FullAmenityCountOrderByAggregateInput
    _max?: FullAmenityMaxOrderByAggregateInput
    _min?: FullAmenityMinOrderByAggregateInput
  }

  export type FullAmenityScalarWhereWithAggregatesInput = {
    AND?: FullAmenityScalarWhereWithAggregatesInput | FullAmenityScalarWhereWithAggregatesInput[]
    OR?: FullAmenityScalarWhereWithAggregatesInput[]
    NOT?: FullAmenityScalarWhereWithAggregatesInput | FullAmenityScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"FullAmenity"> | string
    name?: StringWithAggregatesFilter<"FullAmenity"> | string
    normalized?: StringWithAggregatesFilter<"FullAmenity"> | string
    propertyId?: StringWithAggregatesFilter<"FullAmenity"> | string
    createdAt?: DateTimeWithAggregatesFilter<"FullAmenity"> | Date | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    email?: StringFilter<"User"> | string
    phone?: StringNullableFilter<"User"> | string | null
    password?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    cart?: XOR<CartNullableRelationFilter, CartWhereInput> | null
    bookings?: BookingListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrder
    phone?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    cart?: CartOrderByWithRelationInput
    bookings?: BookingOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    phone?: StringNullableFilter<"User"> | string | null
    password?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    cart?: XOR<CartNullableRelationFilter, CartWhereInput> | null
    bookings?: BookingListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrder
    phone?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    email?: StringWithAggregatesFilter<"User"> | string
    phone?: StringNullableWithAggregatesFilter<"User"> | string | null
    password?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type CartWhereInput = {
    AND?: CartWhereInput | CartWhereInput[]
    OR?: CartWhereInput[]
    NOT?: CartWhereInput | CartWhereInput[]
    id?: StringFilter<"Cart"> | string
    userId?: StringFilter<"Cart"> | string
    createdAt?: DateTimeFilter<"Cart"> | Date | string
    updatedAt?: DateTimeFilter<"Cart"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    items?: CartItemListRelationFilter
  }

  export type CartOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    items?: CartItemOrderByRelationAggregateInput
  }

  export type CartWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: CartWhereInput | CartWhereInput[]
    OR?: CartWhereInput[]
    NOT?: CartWhereInput | CartWhereInput[]
    createdAt?: DateTimeFilter<"Cart"> | Date | string
    updatedAt?: DateTimeFilter<"Cart"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    items?: CartItemListRelationFilter
  }, "id" | "userId">

  export type CartOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CartCountOrderByAggregateInput
    _max?: CartMaxOrderByAggregateInput
    _min?: CartMinOrderByAggregateInput
  }

  export type CartScalarWhereWithAggregatesInput = {
    AND?: CartScalarWhereWithAggregatesInput | CartScalarWhereWithAggregatesInput[]
    OR?: CartScalarWhereWithAggregatesInput[]
    NOT?: CartScalarWhereWithAggregatesInput | CartScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Cart"> | string
    userId?: StringWithAggregatesFilter<"Cart"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Cart"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Cart"> | Date | string
  }

  export type CartItemWhereInput = {
    AND?: CartItemWhereInput | CartItemWhereInput[]
    OR?: CartItemWhereInput[]
    NOT?: CartItemWhereInput | CartItemWhereInput[]
    id?: StringFilter<"CartItem"> | string
    cartId?: StringFilter<"CartItem"> | string
    propertyId?: StringFilter<"CartItem"> | string
    addedAt?: DateTimeFilter<"CartItem"> | Date | string
    cart?: XOR<CartRelationFilter, CartWhereInput>
    property?: XOR<PropertyRelationFilter, PropertyWhereInput>
  }

  export type CartItemOrderByWithRelationInput = {
    id?: SortOrder
    cartId?: SortOrder
    propertyId?: SortOrder
    addedAt?: SortOrder
    cart?: CartOrderByWithRelationInput
    property?: PropertyOrderByWithRelationInput
  }

  export type CartItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    cartId_propertyId?: CartItemCartIdPropertyIdCompoundUniqueInput
    AND?: CartItemWhereInput | CartItemWhereInput[]
    OR?: CartItemWhereInput[]
    NOT?: CartItemWhereInput | CartItemWhereInput[]
    cartId?: StringFilter<"CartItem"> | string
    propertyId?: StringFilter<"CartItem"> | string
    addedAt?: DateTimeFilter<"CartItem"> | Date | string
    cart?: XOR<CartRelationFilter, CartWhereInput>
    property?: XOR<PropertyRelationFilter, PropertyWhereInput>
  }, "id" | "cartId_propertyId">

  export type CartItemOrderByWithAggregationInput = {
    id?: SortOrder
    cartId?: SortOrder
    propertyId?: SortOrder
    addedAt?: SortOrder
    _count?: CartItemCountOrderByAggregateInput
    _max?: CartItemMaxOrderByAggregateInput
    _min?: CartItemMinOrderByAggregateInput
  }

  export type CartItemScalarWhereWithAggregatesInput = {
    AND?: CartItemScalarWhereWithAggregatesInput | CartItemScalarWhereWithAggregatesInput[]
    OR?: CartItemScalarWhereWithAggregatesInput[]
    NOT?: CartItemScalarWhereWithAggregatesInput | CartItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CartItem"> | string
    cartId?: StringWithAggregatesFilter<"CartItem"> | string
    propertyId?: StringWithAggregatesFilter<"CartItem"> | string
    addedAt?: DateTimeWithAggregatesFilter<"CartItem"> | Date | string
  }

  export type BookingWhereInput = {
    AND?: BookingWhereInput | BookingWhereInput[]
    OR?: BookingWhereInput[]
    NOT?: BookingWhereInput | BookingWhereInput[]
    id?: StringFilter<"Booking"> | string
    name?: StringFilter<"Booking"> | string
    email?: StringFilter<"Booking"> | string
    phone?: StringFilter<"Booking"> | string
    date?: StringFilter<"Booking"> | string
    time?: StringFilter<"Booking"> | string
    propertyTitle?: StringFilter<"Booking"> | string
    propertyId?: StringFilter<"Booking"> | string
    userId?: StringNullableFilter<"Booking"> | string | null
    createdAt?: DateTimeFilter<"Booking"> | Date | string
    user?: XOR<UserNullableRelationFilter, UserWhereInput> | null
  }

  export type BookingOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    date?: SortOrder
    time?: SortOrder
    propertyTitle?: SortOrder
    propertyId?: SortOrder
    userId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type BookingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BookingWhereInput | BookingWhereInput[]
    OR?: BookingWhereInput[]
    NOT?: BookingWhereInput | BookingWhereInput[]
    name?: StringFilter<"Booking"> | string
    email?: StringFilter<"Booking"> | string
    phone?: StringFilter<"Booking"> | string
    date?: StringFilter<"Booking"> | string
    time?: StringFilter<"Booking"> | string
    propertyTitle?: StringFilter<"Booking"> | string
    propertyId?: StringFilter<"Booking"> | string
    userId?: StringNullableFilter<"Booking"> | string | null
    createdAt?: DateTimeFilter<"Booking"> | Date | string
    user?: XOR<UserNullableRelationFilter, UserWhereInput> | null
  }, "id">

  export type BookingOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    date?: SortOrder
    time?: SortOrder
    propertyTitle?: SortOrder
    propertyId?: SortOrder
    userId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: BookingCountOrderByAggregateInput
    _max?: BookingMaxOrderByAggregateInput
    _min?: BookingMinOrderByAggregateInput
  }

  export type BookingScalarWhereWithAggregatesInput = {
    AND?: BookingScalarWhereWithAggregatesInput | BookingScalarWhereWithAggregatesInput[]
    OR?: BookingScalarWhereWithAggregatesInput[]
    NOT?: BookingScalarWhereWithAggregatesInput | BookingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Booking"> | string
    name?: StringWithAggregatesFilter<"Booking"> | string
    email?: StringWithAggregatesFilter<"Booking"> | string
    phone?: StringWithAggregatesFilter<"Booking"> | string
    date?: StringWithAggregatesFilter<"Booking"> | string
    time?: StringWithAggregatesFilter<"Booking"> | string
    propertyTitle?: StringWithAggregatesFilter<"Booking"> | string
    propertyId?: StringWithAggregatesFilter<"Booking"> | string
    userId?: StringNullableWithAggregatesFilter<"Booking"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Booking"> | Date | string
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
    isSoldOut?: boolean
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
    basicAmenities?: BasicAmenityCreateNestedManyWithoutPropertyInput
    fullAmenities?: FullAmenityCreateNestedManyWithoutPropertyInput
    cartItems?: CartItemCreateNestedManyWithoutPropertyInput
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
    isSoldOut?: boolean
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
    basicAmenities?: BasicAmenityUncheckedCreateNestedManyWithoutPropertyInput
    fullAmenities?: FullAmenityUncheckedCreateNestedManyWithoutPropertyInput
    cartItems?: CartItemUncheckedCreateNestedManyWithoutPropertyInput
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
    isSoldOut?: BoolFieldUpdateOperationsInput | boolean
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
    basicAmenities?: BasicAmenityUpdateManyWithoutPropertyNestedInput
    fullAmenities?: FullAmenityUpdateManyWithoutPropertyNestedInput
    cartItems?: CartItemUpdateManyWithoutPropertyNestedInput
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
    isSoldOut?: BoolFieldUpdateOperationsInput | boolean
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
    basicAmenities?: BasicAmenityUncheckedUpdateManyWithoutPropertyNestedInput
    fullAmenities?: FullAmenityUncheckedUpdateManyWithoutPropertyNestedInput
    cartItems?: CartItemUncheckedUpdateManyWithoutPropertyNestedInput
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
    isSoldOut?: boolean
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
    isSoldOut?: BoolFieldUpdateOperationsInput | boolean
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
    isSoldOut?: BoolFieldUpdateOperationsInput | boolean
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

  export type BasicAmenityCreateInput = {
    id?: string
    name: string
    normalized: string
    createdAt?: Date | string
    property: PropertyCreateNestedOneWithoutBasicAmenitiesInput
  }

  export type BasicAmenityUncheckedCreateInput = {
    id?: string
    name: string
    normalized: string
    propertyId: string
    createdAt?: Date | string
  }

  export type BasicAmenityUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    normalized?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    property?: PropertyUpdateOneRequiredWithoutBasicAmenitiesNestedInput
  }

  export type BasicAmenityUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    normalized?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BasicAmenityCreateManyInput = {
    id?: string
    name: string
    normalized: string
    propertyId: string
    createdAt?: Date | string
  }

  export type BasicAmenityUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    normalized?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BasicAmenityUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    normalized?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FullAmenityCreateInput = {
    id?: string
    name: string
    normalized: string
    createdAt?: Date | string
    property: PropertyCreateNestedOneWithoutFullAmenitiesInput
  }

  export type FullAmenityUncheckedCreateInput = {
    id?: string
    name: string
    normalized: string
    propertyId: string
    createdAt?: Date | string
  }

  export type FullAmenityUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    normalized?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    property?: PropertyUpdateOneRequiredWithoutFullAmenitiesNestedInput
  }

  export type FullAmenityUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    normalized?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FullAmenityCreateManyInput = {
    id?: string
    name: string
    normalized: string
    propertyId: string
    createdAt?: Date | string
  }

  export type FullAmenityUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    normalized?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FullAmenityUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    normalized?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    id?: string
    name?: string | null
    email: string
    phone?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    cart?: CartCreateNestedOneWithoutUserInput
    bookings?: BookingCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name?: string | null
    email: string
    phone?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    cart?: CartUncheckedCreateNestedOneWithoutUserInput
    bookings?: BookingUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cart?: CartUpdateOneWithoutUserNestedInput
    bookings?: BookingUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cart?: CartUncheckedUpdateOneWithoutUserNestedInput
    bookings?: BookingUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name?: string | null
    email: string
    phone?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CartCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutCartInput
    items?: CartItemCreateNestedManyWithoutCartInput
  }

  export type CartUncheckedCreateInput = {
    id?: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: CartItemUncheckedCreateNestedManyWithoutCartInput
  }

  export type CartUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCartNestedInput
    items?: CartItemUpdateManyWithoutCartNestedInput
  }

  export type CartUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: CartItemUncheckedUpdateManyWithoutCartNestedInput
  }

  export type CartCreateManyInput = {
    id?: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CartUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CartUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CartItemCreateInput = {
    id?: string
    addedAt?: Date | string
    cart: CartCreateNestedOneWithoutItemsInput
    property: PropertyCreateNestedOneWithoutCartItemsInput
  }

  export type CartItemUncheckedCreateInput = {
    id?: string
    cartId: string
    propertyId: string
    addedAt?: Date | string
  }

  export type CartItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cart?: CartUpdateOneRequiredWithoutItemsNestedInput
    property?: PropertyUpdateOneRequiredWithoutCartItemsNestedInput
  }

  export type CartItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    cartId?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CartItemCreateManyInput = {
    id?: string
    cartId: string
    propertyId: string
    addedAt?: Date | string
  }

  export type CartItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CartItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    cartId?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingCreateInput = {
    id?: string
    name: string
    email: string
    phone: string
    date: string
    time: string
    propertyTitle: string
    propertyId: string
    createdAt?: Date | string
    user?: UserCreateNestedOneWithoutBookingsInput
  }

  export type BookingUncheckedCreateInput = {
    id?: string
    name: string
    email: string
    phone: string
    date: string
    time: string
    propertyTitle: string
    propertyId: string
    userId?: string | null
    createdAt?: Date | string
  }

  export type BookingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    time?: StringFieldUpdateOperationsInput | string
    propertyTitle?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutBookingsNestedInput
  }

  export type BookingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    time?: StringFieldUpdateOperationsInput | string
    propertyTitle?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingCreateManyInput = {
    id?: string
    name: string
    email: string
    phone: string
    date: string
    time: string
    propertyTitle: string
    propertyId: string
    userId?: string | null
    createdAt?: Date | string
  }

  export type BookingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    time?: StringFieldUpdateOperationsInput | string
    propertyTitle?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    time?: StringFieldUpdateOperationsInput | string
    propertyTitle?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type BasicAmenityListRelationFilter = {
    every?: BasicAmenityWhereInput
    some?: BasicAmenityWhereInput
    none?: BasicAmenityWhereInput
  }

  export type FullAmenityListRelationFilter = {
    every?: FullAmenityWhereInput
    some?: FullAmenityWhereInput
    none?: FullAmenityWhereInput
  }

  export type CartItemListRelationFilter = {
    every?: CartItemWhereInput
    some?: CartItemWhereInput
    none?: CartItemWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type PropertyImageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BasicAmenityOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FullAmenityOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CartItemOrderByRelationAggregateInput = {
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
    isSoldOut?: SortOrder
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
    isSoldOut?: SortOrder
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
    isSoldOut?: SortOrder
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

  export type BasicAmenityPropertyIdNormalizedCompoundUniqueInput = {
    propertyId: string
    normalized: string
  }

  export type BasicAmenityCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    normalized?: SortOrder
    propertyId?: SortOrder
    createdAt?: SortOrder
  }

  export type BasicAmenityMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    normalized?: SortOrder
    propertyId?: SortOrder
    createdAt?: SortOrder
  }

  export type BasicAmenityMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    normalized?: SortOrder
    propertyId?: SortOrder
    createdAt?: SortOrder
  }

  export type FullAmenityPropertyIdNormalizedCompoundUniqueInput = {
    propertyId: string
    normalized: string
  }

  export type FullAmenityCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    normalized?: SortOrder
    propertyId?: SortOrder
    createdAt?: SortOrder
  }

  export type FullAmenityMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    normalized?: SortOrder
    propertyId?: SortOrder
    createdAt?: SortOrder
  }

  export type FullAmenityMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    normalized?: SortOrder
    propertyId?: SortOrder
    createdAt?: SortOrder
  }

  export type CartNullableRelationFilter = {
    is?: CartWhereInput | null
    isNot?: CartWhereInput | null
  }

  export type BookingListRelationFilter = {
    every?: BookingWhereInput
    some?: BookingWhereInput
    none?: BookingWhereInput
  }

  export type BookingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type CartCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CartMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CartMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CartRelationFilter = {
    is?: CartWhereInput
    isNot?: CartWhereInput
  }

  export type CartItemCartIdPropertyIdCompoundUniqueInput = {
    cartId: string
    propertyId: string
  }

  export type CartItemCountOrderByAggregateInput = {
    id?: SortOrder
    cartId?: SortOrder
    propertyId?: SortOrder
    addedAt?: SortOrder
  }

  export type CartItemMaxOrderByAggregateInput = {
    id?: SortOrder
    cartId?: SortOrder
    propertyId?: SortOrder
    addedAt?: SortOrder
  }

  export type CartItemMinOrderByAggregateInput = {
    id?: SortOrder
    cartId?: SortOrder
    propertyId?: SortOrder
    addedAt?: SortOrder
  }

  export type UserNullableRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type BookingCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    date?: SortOrder
    time?: SortOrder
    propertyTitle?: SortOrder
    propertyId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type BookingMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    date?: SortOrder
    time?: SortOrder
    propertyTitle?: SortOrder
    propertyId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type BookingMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    date?: SortOrder
    time?: SortOrder
    propertyTitle?: SortOrder
    propertyId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
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

  export type BasicAmenityCreateNestedManyWithoutPropertyInput = {
    create?: XOR<BasicAmenityCreateWithoutPropertyInput, BasicAmenityUncheckedCreateWithoutPropertyInput> | BasicAmenityCreateWithoutPropertyInput[] | BasicAmenityUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: BasicAmenityCreateOrConnectWithoutPropertyInput | BasicAmenityCreateOrConnectWithoutPropertyInput[]
    createMany?: BasicAmenityCreateManyPropertyInputEnvelope
    connect?: BasicAmenityWhereUniqueInput | BasicAmenityWhereUniqueInput[]
  }

  export type FullAmenityCreateNestedManyWithoutPropertyInput = {
    create?: XOR<FullAmenityCreateWithoutPropertyInput, FullAmenityUncheckedCreateWithoutPropertyInput> | FullAmenityCreateWithoutPropertyInput[] | FullAmenityUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: FullAmenityCreateOrConnectWithoutPropertyInput | FullAmenityCreateOrConnectWithoutPropertyInput[]
    createMany?: FullAmenityCreateManyPropertyInputEnvelope
    connect?: FullAmenityWhereUniqueInput | FullAmenityWhereUniqueInput[]
  }

  export type CartItemCreateNestedManyWithoutPropertyInput = {
    create?: XOR<CartItemCreateWithoutPropertyInput, CartItemUncheckedCreateWithoutPropertyInput> | CartItemCreateWithoutPropertyInput[] | CartItemUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: CartItemCreateOrConnectWithoutPropertyInput | CartItemCreateOrConnectWithoutPropertyInput[]
    createMany?: CartItemCreateManyPropertyInputEnvelope
    connect?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
  }

  export type PropertyImageUncheckedCreateNestedManyWithoutPropertyInput = {
    create?: XOR<PropertyImageCreateWithoutPropertyInput, PropertyImageUncheckedCreateWithoutPropertyInput> | PropertyImageCreateWithoutPropertyInput[] | PropertyImageUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: PropertyImageCreateOrConnectWithoutPropertyInput | PropertyImageCreateOrConnectWithoutPropertyInput[]
    createMany?: PropertyImageCreateManyPropertyInputEnvelope
    connect?: PropertyImageWhereUniqueInput | PropertyImageWhereUniqueInput[]
  }

  export type BasicAmenityUncheckedCreateNestedManyWithoutPropertyInput = {
    create?: XOR<BasicAmenityCreateWithoutPropertyInput, BasicAmenityUncheckedCreateWithoutPropertyInput> | BasicAmenityCreateWithoutPropertyInput[] | BasicAmenityUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: BasicAmenityCreateOrConnectWithoutPropertyInput | BasicAmenityCreateOrConnectWithoutPropertyInput[]
    createMany?: BasicAmenityCreateManyPropertyInputEnvelope
    connect?: BasicAmenityWhereUniqueInput | BasicAmenityWhereUniqueInput[]
  }

  export type FullAmenityUncheckedCreateNestedManyWithoutPropertyInput = {
    create?: XOR<FullAmenityCreateWithoutPropertyInput, FullAmenityUncheckedCreateWithoutPropertyInput> | FullAmenityCreateWithoutPropertyInput[] | FullAmenityUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: FullAmenityCreateOrConnectWithoutPropertyInput | FullAmenityCreateOrConnectWithoutPropertyInput[]
    createMany?: FullAmenityCreateManyPropertyInputEnvelope
    connect?: FullAmenityWhereUniqueInput | FullAmenityWhereUniqueInput[]
  }

  export type CartItemUncheckedCreateNestedManyWithoutPropertyInput = {
    create?: XOR<CartItemCreateWithoutPropertyInput, CartItemUncheckedCreateWithoutPropertyInput> | CartItemCreateWithoutPropertyInput[] | CartItemUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: CartItemCreateOrConnectWithoutPropertyInput | CartItemCreateOrConnectWithoutPropertyInput[]
    createMany?: CartItemCreateManyPropertyInputEnvelope
    connect?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
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

  export type BasicAmenityUpdateManyWithoutPropertyNestedInput = {
    create?: XOR<BasicAmenityCreateWithoutPropertyInput, BasicAmenityUncheckedCreateWithoutPropertyInput> | BasicAmenityCreateWithoutPropertyInput[] | BasicAmenityUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: BasicAmenityCreateOrConnectWithoutPropertyInput | BasicAmenityCreateOrConnectWithoutPropertyInput[]
    upsert?: BasicAmenityUpsertWithWhereUniqueWithoutPropertyInput | BasicAmenityUpsertWithWhereUniqueWithoutPropertyInput[]
    createMany?: BasicAmenityCreateManyPropertyInputEnvelope
    set?: BasicAmenityWhereUniqueInput | BasicAmenityWhereUniqueInput[]
    disconnect?: BasicAmenityWhereUniqueInput | BasicAmenityWhereUniqueInput[]
    delete?: BasicAmenityWhereUniqueInput | BasicAmenityWhereUniqueInput[]
    connect?: BasicAmenityWhereUniqueInput | BasicAmenityWhereUniqueInput[]
    update?: BasicAmenityUpdateWithWhereUniqueWithoutPropertyInput | BasicAmenityUpdateWithWhereUniqueWithoutPropertyInput[]
    updateMany?: BasicAmenityUpdateManyWithWhereWithoutPropertyInput | BasicAmenityUpdateManyWithWhereWithoutPropertyInput[]
    deleteMany?: BasicAmenityScalarWhereInput | BasicAmenityScalarWhereInput[]
  }

  export type FullAmenityUpdateManyWithoutPropertyNestedInput = {
    create?: XOR<FullAmenityCreateWithoutPropertyInput, FullAmenityUncheckedCreateWithoutPropertyInput> | FullAmenityCreateWithoutPropertyInput[] | FullAmenityUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: FullAmenityCreateOrConnectWithoutPropertyInput | FullAmenityCreateOrConnectWithoutPropertyInput[]
    upsert?: FullAmenityUpsertWithWhereUniqueWithoutPropertyInput | FullAmenityUpsertWithWhereUniqueWithoutPropertyInput[]
    createMany?: FullAmenityCreateManyPropertyInputEnvelope
    set?: FullAmenityWhereUniqueInput | FullAmenityWhereUniqueInput[]
    disconnect?: FullAmenityWhereUniqueInput | FullAmenityWhereUniqueInput[]
    delete?: FullAmenityWhereUniqueInput | FullAmenityWhereUniqueInput[]
    connect?: FullAmenityWhereUniqueInput | FullAmenityWhereUniqueInput[]
    update?: FullAmenityUpdateWithWhereUniqueWithoutPropertyInput | FullAmenityUpdateWithWhereUniqueWithoutPropertyInput[]
    updateMany?: FullAmenityUpdateManyWithWhereWithoutPropertyInput | FullAmenityUpdateManyWithWhereWithoutPropertyInput[]
    deleteMany?: FullAmenityScalarWhereInput | FullAmenityScalarWhereInput[]
  }

  export type CartItemUpdateManyWithoutPropertyNestedInput = {
    create?: XOR<CartItemCreateWithoutPropertyInput, CartItemUncheckedCreateWithoutPropertyInput> | CartItemCreateWithoutPropertyInput[] | CartItemUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: CartItemCreateOrConnectWithoutPropertyInput | CartItemCreateOrConnectWithoutPropertyInput[]
    upsert?: CartItemUpsertWithWhereUniqueWithoutPropertyInput | CartItemUpsertWithWhereUniqueWithoutPropertyInput[]
    createMany?: CartItemCreateManyPropertyInputEnvelope
    set?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
    disconnect?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
    delete?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
    connect?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
    update?: CartItemUpdateWithWhereUniqueWithoutPropertyInput | CartItemUpdateWithWhereUniqueWithoutPropertyInput[]
    updateMany?: CartItemUpdateManyWithWhereWithoutPropertyInput | CartItemUpdateManyWithWhereWithoutPropertyInput[]
    deleteMany?: CartItemScalarWhereInput | CartItemScalarWhereInput[]
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

  export type BasicAmenityUncheckedUpdateManyWithoutPropertyNestedInput = {
    create?: XOR<BasicAmenityCreateWithoutPropertyInput, BasicAmenityUncheckedCreateWithoutPropertyInput> | BasicAmenityCreateWithoutPropertyInput[] | BasicAmenityUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: BasicAmenityCreateOrConnectWithoutPropertyInput | BasicAmenityCreateOrConnectWithoutPropertyInput[]
    upsert?: BasicAmenityUpsertWithWhereUniqueWithoutPropertyInput | BasicAmenityUpsertWithWhereUniqueWithoutPropertyInput[]
    createMany?: BasicAmenityCreateManyPropertyInputEnvelope
    set?: BasicAmenityWhereUniqueInput | BasicAmenityWhereUniqueInput[]
    disconnect?: BasicAmenityWhereUniqueInput | BasicAmenityWhereUniqueInput[]
    delete?: BasicAmenityWhereUniqueInput | BasicAmenityWhereUniqueInput[]
    connect?: BasicAmenityWhereUniqueInput | BasicAmenityWhereUniqueInput[]
    update?: BasicAmenityUpdateWithWhereUniqueWithoutPropertyInput | BasicAmenityUpdateWithWhereUniqueWithoutPropertyInput[]
    updateMany?: BasicAmenityUpdateManyWithWhereWithoutPropertyInput | BasicAmenityUpdateManyWithWhereWithoutPropertyInput[]
    deleteMany?: BasicAmenityScalarWhereInput | BasicAmenityScalarWhereInput[]
  }

  export type FullAmenityUncheckedUpdateManyWithoutPropertyNestedInput = {
    create?: XOR<FullAmenityCreateWithoutPropertyInput, FullAmenityUncheckedCreateWithoutPropertyInput> | FullAmenityCreateWithoutPropertyInput[] | FullAmenityUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: FullAmenityCreateOrConnectWithoutPropertyInput | FullAmenityCreateOrConnectWithoutPropertyInput[]
    upsert?: FullAmenityUpsertWithWhereUniqueWithoutPropertyInput | FullAmenityUpsertWithWhereUniqueWithoutPropertyInput[]
    createMany?: FullAmenityCreateManyPropertyInputEnvelope
    set?: FullAmenityWhereUniqueInput | FullAmenityWhereUniqueInput[]
    disconnect?: FullAmenityWhereUniqueInput | FullAmenityWhereUniqueInput[]
    delete?: FullAmenityWhereUniqueInput | FullAmenityWhereUniqueInput[]
    connect?: FullAmenityWhereUniqueInput | FullAmenityWhereUniqueInput[]
    update?: FullAmenityUpdateWithWhereUniqueWithoutPropertyInput | FullAmenityUpdateWithWhereUniqueWithoutPropertyInput[]
    updateMany?: FullAmenityUpdateManyWithWhereWithoutPropertyInput | FullAmenityUpdateManyWithWhereWithoutPropertyInput[]
    deleteMany?: FullAmenityScalarWhereInput | FullAmenityScalarWhereInput[]
  }

  export type CartItemUncheckedUpdateManyWithoutPropertyNestedInput = {
    create?: XOR<CartItemCreateWithoutPropertyInput, CartItemUncheckedCreateWithoutPropertyInput> | CartItemCreateWithoutPropertyInput[] | CartItemUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: CartItemCreateOrConnectWithoutPropertyInput | CartItemCreateOrConnectWithoutPropertyInput[]
    upsert?: CartItemUpsertWithWhereUniqueWithoutPropertyInput | CartItemUpsertWithWhereUniqueWithoutPropertyInput[]
    createMany?: CartItemCreateManyPropertyInputEnvelope
    set?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
    disconnect?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
    delete?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
    connect?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
    update?: CartItemUpdateWithWhereUniqueWithoutPropertyInput | CartItemUpdateWithWhereUniqueWithoutPropertyInput[]
    updateMany?: CartItemUpdateManyWithWhereWithoutPropertyInput | CartItemUpdateManyWithWhereWithoutPropertyInput[]
    deleteMany?: CartItemScalarWhereInput | CartItemScalarWhereInput[]
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

  export type PropertyCreateNestedOneWithoutBasicAmenitiesInput = {
    create?: XOR<PropertyCreateWithoutBasicAmenitiesInput, PropertyUncheckedCreateWithoutBasicAmenitiesInput>
    connectOrCreate?: PropertyCreateOrConnectWithoutBasicAmenitiesInput
    connect?: PropertyWhereUniqueInput
  }

  export type PropertyUpdateOneRequiredWithoutBasicAmenitiesNestedInput = {
    create?: XOR<PropertyCreateWithoutBasicAmenitiesInput, PropertyUncheckedCreateWithoutBasicAmenitiesInput>
    connectOrCreate?: PropertyCreateOrConnectWithoutBasicAmenitiesInput
    upsert?: PropertyUpsertWithoutBasicAmenitiesInput
    connect?: PropertyWhereUniqueInput
    update?: XOR<XOR<PropertyUpdateToOneWithWhereWithoutBasicAmenitiesInput, PropertyUpdateWithoutBasicAmenitiesInput>, PropertyUncheckedUpdateWithoutBasicAmenitiesInput>
  }

  export type PropertyCreateNestedOneWithoutFullAmenitiesInput = {
    create?: XOR<PropertyCreateWithoutFullAmenitiesInput, PropertyUncheckedCreateWithoutFullAmenitiesInput>
    connectOrCreate?: PropertyCreateOrConnectWithoutFullAmenitiesInput
    connect?: PropertyWhereUniqueInput
  }

  export type PropertyUpdateOneRequiredWithoutFullAmenitiesNestedInput = {
    create?: XOR<PropertyCreateWithoutFullAmenitiesInput, PropertyUncheckedCreateWithoutFullAmenitiesInput>
    connectOrCreate?: PropertyCreateOrConnectWithoutFullAmenitiesInput
    upsert?: PropertyUpsertWithoutFullAmenitiesInput
    connect?: PropertyWhereUniqueInput
    update?: XOR<XOR<PropertyUpdateToOneWithWhereWithoutFullAmenitiesInput, PropertyUpdateWithoutFullAmenitiesInput>, PropertyUncheckedUpdateWithoutFullAmenitiesInput>
  }

  export type CartCreateNestedOneWithoutUserInput = {
    create?: XOR<CartCreateWithoutUserInput, CartUncheckedCreateWithoutUserInput>
    connectOrCreate?: CartCreateOrConnectWithoutUserInput
    connect?: CartWhereUniqueInput
  }

  export type BookingCreateNestedManyWithoutUserInput = {
    create?: XOR<BookingCreateWithoutUserInput, BookingUncheckedCreateWithoutUserInput> | BookingCreateWithoutUserInput[] | BookingUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutUserInput | BookingCreateOrConnectWithoutUserInput[]
    createMany?: BookingCreateManyUserInputEnvelope
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
  }

  export type CartUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<CartCreateWithoutUserInput, CartUncheckedCreateWithoutUserInput>
    connectOrCreate?: CartCreateOrConnectWithoutUserInput
    connect?: CartWhereUniqueInput
  }

  export type BookingUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<BookingCreateWithoutUserInput, BookingUncheckedCreateWithoutUserInput> | BookingCreateWithoutUserInput[] | BookingUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutUserInput | BookingCreateOrConnectWithoutUserInput[]
    createMany?: BookingCreateManyUserInputEnvelope
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
  }

  export type CartUpdateOneWithoutUserNestedInput = {
    create?: XOR<CartCreateWithoutUserInput, CartUncheckedCreateWithoutUserInput>
    connectOrCreate?: CartCreateOrConnectWithoutUserInput
    upsert?: CartUpsertWithoutUserInput
    disconnect?: CartWhereInput | boolean
    delete?: CartWhereInput | boolean
    connect?: CartWhereUniqueInput
    update?: XOR<XOR<CartUpdateToOneWithWhereWithoutUserInput, CartUpdateWithoutUserInput>, CartUncheckedUpdateWithoutUserInput>
  }

  export type BookingUpdateManyWithoutUserNestedInput = {
    create?: XOR<BookingCreateWithoutUserInput, BookingUncheckedCreateWithoutUserInput> | BookingCreateWithoutUserInput[] | BookingUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutUserInput | BookingCreateOrConnectWithoutUserInput[]
    upsert?: BookingUpsertWithWhereUniqueWithoutUserInput | BookingUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: BookingCreateManyUserInputEnvelope
    set?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    disconnect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    delete?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    update?: BookingUpdateWithWhereUniqueWithoutUserInput | BookingUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: BookingUpdateManyWithWhereWithoutUserInput | BookingUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: BookingScalarWhereInput | BookingScalarWhereInput[]
  }

  export type CartUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<CartCreateWithoutUserInput, CartUncheckedCreateWithoutUserInput>
    connectOrCreate?: CartCreateOrConnectWithoutUserInput
    upsert?: CartUpsertWithoutUserInput
    disconnect?: CartWhereInput | boolean
    delete?: CartWhereInput | boolean
    connect?: CartWhereUniqueInput
    update?: XOR<XOR<CartUpdateToOneWithWhereWithoutUserInput, CartUpdateWithoutUserInput>, CartUncheckedUpdateWithoutUserInput>
  }

  export type BookingUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<BookingCreateWithoutUserInput, BookingUncheckedCreateWithoutUserInput> | BookingCreateWithoutUserInput[] | BookingUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BookingCreateOrConnectWithoutUserInput | BookingCreateOrConnectWithoutUserInput[]
    upsert?: BookingUpsertWithWhereUniqueWithoutUserInput | BookingUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: BookingCreateManyUserInputEnvelope
    set?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    disconnect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    delete?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    connect?: BookingWhereUniqueInput | BookingWhereUniqueInput[]
    update?: BookingUpdateWithWhereUniqueWithoutUserInput | BookingUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: BookingUpdateManyWithWhereWithoutUserInput | BookingUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: BookingScalarWhereInput | BookingScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutCartInput = {
    create?: XOR<UserCreateWithoutCartInput, UserUncheckedCreateWithoutCartInput>
    connectOrCreate?: UserCreateOrConnectWithoutCartInput
    connect?: UserWhereUniqueInput
  }

  export type CartItemCreateNestedManyWithoutCartInput = {
    create?: XOR<CartItemCreateWithoutCartInput, CartItemUncheckedCreateWithoutCartInput> | CartItemCreateWithoutCartInput[] | CartItemUncheckedCreateWithoutCartInput[]
    connectOrCreate?: CartItemCreateOrConnectWithoutCartInput | CartItemCreateOrConnectWithoutCartInput[]
    createMany?: CartItemCreateManyCartInputEnvelope
    connect?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
  }

  export type CartItemUncheckedCreateNestedManyWithoutCartInput = {
    create?: XOR<CartItemCreateWithoutCartInput, CartItemUncheckedCreateWithoutCartInput> | CartItemCreateWithoutCartInput[] | CartItemUncheckedCreateWithoutCartInput[]
    connectOrCreate?: CartItemCreateOrConnectWithoutCartInput | CartItemCreateOrConnectWithoutCartInput[]
    createMany?: CartItemCreateManyCartInputEnvelope
    connect?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutCartNestedInput = {
    create?: XOR<UserCreateWithoutCartInput, UserUncheckedCreateWithoutCartInput>
    connectOrCreate?: UserCreateOrConnectWithoutCartInput
    upsert?: UserUpsertWithoutCartInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCartInput, UserUpdateWithoutCartInput>, UserUncheckedUpdateWithoutCartInput>
  }

  export type CartItemUpdateManyWithoutCartNestedInput = {
    create?: XOR<CartItemCreateWithoutCartInput, CartItemUncheckedCreateWithoutCartInput> | CartItemCreateWithoutCartInput[] | CartItemUncheckedCreateWithoutCartInput[]
    connectOrCreate?: CartItemCreateOrConnectWithoutCartInput | CartItemCreateOrConnectWithoutCartInput[]
    upsert?: CartItemUpsertWithWhereUniqueWithoutCartInput | CartItemUpsertWithWhereUniqueWithoutCartInput[]
    createMany?: CartItemCreateManyCartInputEnvelope
    set?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
    disconnect?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
    delete?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
    connect?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
    update?: CartItemUpdateWithWhereUniqueWithoutCartInput | CartItemUpdateWithWhereUniqueWithoutCartInput[]
    updateMany?: CartItemUpdateManyWithWhereWithoutCartInput | CartItemUpdateManyWithWhereWithoutCartInput[]
    deleteMany?: CartItemScalarWhereInput | CartItemScalarWhereInput[]
  }

  export type CartItemUncheckedUpdateManyWithoutCartNestedInput = {
    create?: XOR<CartItemCreateWithoutCartInput, CartItemUncheckedCreateWithoutCartInput> | CartItemCreateWithoutCartInput[] | CartItemUncheckedCreateWithoutCartInput[]
    connectOrCreate?: CartItemCreateOrConnectWithoutCartInput | CartItemCreateOrConnectWithoutCartInput[]
    upsert?: CartItemUpsertWithWhereUniqueWithoutCartInput | CartItemUpsertWithWhereUniqueWithoutCartInput[]
    createMany?: CartItemCreateManyCartInputEnvelope
    set?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
    disconnect?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
    delete?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
    connect?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
    update?: CartItemUpdateWithWhereUniqueWithoutCartInput | CartItemUpdateWithWhereUniqueWithoutCartInput[]
    updateMany?: CartItemUpdateManyWithWhereWithoutCartInput | CartItemUpdateManyWithWhereWithoutCartInput[]
    deleteMany?: CartItemScalarWhereInput | CartItemScalarWhereInput[]
  }

  export type CartCreateNestedOneWithoutItemsInput = {
    create?: XOR<CartCreateWithoutItemsInput, CartUncheckedCreateWithoutItemsInput>
    connectOrCreate?: CartCreateOrConnectWithoutItemsInput
    connect?: CartWhereUniqueInput
  }

  export type PropertyCreateNestedOneWithoutCartItemsInput = {
    create?: XOR<PropertyCreateWithoutCartItemsInput, PropertyUncheckedCreateWithoutCartItemsInput>
    connectOrCreate?: PropertyCreateOrConnectWithoutCartItemsInput
    connect?: PropertyWhereUniqueInput
  }

  export type CartUpdateOneRequiredWithoutItemsNestedInput = {
    create?: XOR<CartCreateWithoutItemsInput, CartUncheckedCreateWithoutItemsInput>
    connectOrCreate?: CartCreateOrConnectWithoutItemsInput
    upsert?: CartUpsertWithoutItemsInput
    connect?: CartWhereUniqueInput
    update?: XOR<XOR<CartUpdateToOneWithWhereWithoutItemsInput, CartUpdateWithoutItemsInput>, CartUncheckedUpdateWithoutItemsInput>
  }

  export type PropertyUpdateOneRequiredWithoutCartItemsNestedInput = {
    create?: XOR<PropertyCreateWithoutCartItemsInput, PropertyUncheckedCreateWithoutCartItemsInput>
    connectOrCreate?: PropertyCreateOrConnectWithoutCartItemsInput
    upsert?: PropertyUpsertWithoutCartItemsInput
    connect?: PropertyWhereUniqueInput
    update?: XOR<XOR<PropertyUpdateToOneWithWhereWithoutCartItemsInput, PropertyUpdateWithoutCartItemsInput>, PropertyUncheckedUpdateWithoutCartItemsInput>
  }

  export type UserCreateNestedOneWithoutBookingsInput = {
    create?: XOR<UserCreateWithoutBookingsInput, UserUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutBookingsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneWithoutBookingsNestedInput = {
    create?: XOR<UserCreateWithoutBookingsInput, UserUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutBookingsInput
    upsert?: UserUpsertWithoutBookingsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutBookingsInput, UserUpdateWithoutBookingsInput>, UserUncheckedUpdateWithoutBookingsInput>
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

  export type BasicAmenityCreateWithoutPropertyInput = {
    id?: string
    name: string
    normalized: string
    createdAt?: Date | string
  }

  export type BasicAmenityUncheckedCreateWithoutPropertyInput = {
    id?: string
    name: string
    normalized: string
    createdAt?: Date | string
  }

  export type BasicAmenityCreateOrConnectWithoutPropertyInput = {
    where: BasicAmenityWhereUniqueInput
    create: XOR<BasicAmenityCreateWithoutPropertyInput, BasicAmenityUncheckedCreateWithoutPropertyInput>
  }

  export type BasicAmenityCreateManyPropertyInputEnvelope = {
    data: BasicAmenityCreateManyPropertyInput | BasicAmenityCreateManyPropertyInput[]
    skipDuplicates?: boolean
  }

  export type FullAmenityCreateWithoutPropertyInput = {
    id?: string
    name: string
    normalized: string
    createdAt?: Date | string
  }

  export type FullAmenityUncheckedCreateWithoutPropertyInput = {
    id?: string
    name: string
    normalized: string
    createdAt?: Date | string
  }

  export type FullAmenityCreateOrConnectWithoutPropertyInput = {
    where: FullAmenityWhereUniqueInput
    create: XOR<FullAmenityCreateWithoutPropertyInput, FullAmenityUncheckedCreateWithoutPropertyInput>
  }

  export type FullAmenityCreateManyPropertyInputEnvelope = {
    data: FullAmenityCreateManyPropertyInput | FullAmenityCreateManyPropertyInput[]
    skipDuplicates?: boolean
  }

  export type CartItemCreateWithoutPropertyInput = {
    id?: string
    addedAt?: Date | string
    cart: CartCreateNestedOneWithoutItemsInput
  }

  export type CartItemUncheckedCreateWithoutPropertyInput = {
    id?: string
    cartId: string
    addedAt?: Date | string
  }

  export type CartItemCreateOrConnectWithoutPropertyInput = {
    where: CartItemWhereUniqueInput
    create: XOR<CartItemCreateWithoutPropertyInput, CartItemUncheckedCreateWithoutPropertyInput>
  }

  export type CartItemCreateManyPropertyInputEnvelope = {
    data: CartItemCreateManyPropertyInput | CartItemCreateManyPropertyInput[]
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

  export type BasicAmenityUpsertWithWhereUniqueWithoutPropertyInput = {
    where: BasicAmenityWhereUniqueInput
    update: XOR<BasicAmenityUpdateWithoutPropertyInput, BasicAmenityUncheckedUpdateWithoutPropertyInput>
    create: XOR<BasicAmenityCreateWithoutPropertyInput, BasicAmenityUncheckedCreateWithoutPropertyInput>
  }

  export type BasicAmenityUpdateWithWhereUniqueWithoutPropertyInput = {
    where: BasicAmenityWhereUniqueInput
    data: XOR<BasicAmenityUpdateWithoutPropertyInput, BasicAmenityUncheckedUpdateWithoutPropertyInput>
  }

  export type BasicAmenityUpdateManyWithWhereWithoutPropertyInput = {
    where: BasicAmenityScalarWhereInput
    data: XOR<BasicAmenityUpdateManyMutationInput, BasicAmenityUncheckedUpdateManyWithoutPropertyInput>
  }

  export type BasicAmenityScalarWhereInput = {
    AND?: BasicAmenityScalarWhereInput | BasicAmenityScalarWhereInput[]
    OR?: BasicAmenityScalarWhereInput[]
    NOT?: BasicAmenityScalarWhereInput | BasicAmenityScalarWhereInput[]
    id?: StringFilter<"BasicAmenity"> | string
    name?: StringFilter<"BasicAmenity"> | string
    normalized?: StringFilter<"BasicAmenity"> | string
    propertyId?: StringFilter<"BasicAmenity"> | string
    createdAt?: DateTimeFilter<"BasicAmenity"> | Date | string
  }

  export type FullAmenityUpsertWithWhereUniqueWithoutPropertyInput = {
    where: FullAmenityWhereUniqueInput
    update: XOR<FullAmenityUpdateWithoutPropertyInput, FullAmenityUncheckedUpdateWithoutPropertyInput>
    create: XOR<FullAmenityCreateWithoutPropertyInput, FullAmenityUncheckedCreateWithoutPropertyInput>
  }

  export type FullAmenityUpdateWithWhereUniqueWithoutPropertyInput = {
    where: FullAmenityWhereUniqueInput
    data: XOR<FullAmenityUpdateWithoutPropertyInput, FullAmenityUncheckedUpdateWithoutPropertyInput>
  }

  export type FullAmenityUpdateManyWithWhereWithoutPropertyInput = {
    where: FullAmenityScalarWhereInput
    data: XOR<FullAmenityUpdateManyMutationInput, FullAmenityUncheckedUpdateManyWithoutPropertyInput>
  }

  export type FullAmenityScalarWhereInput = {
    AND?: FullAmenityScalarWhereInput | FullAmenityScalarWhereInput[]
    OR?: FullAmenityScalarWhereInput[]
    NOT?: FullAmenityScalarWhereInput | FullAmenityScalarWhereInput[]
    id?: StringFilter<"FullAmenity"> | string
    name?: StringFilter<"FullAmenity"> | string
    normalized?: StringFilter<"FullAmenity"> | string
    propertyId?: StringFilter<"FullAmenity"> | string
    createdAt?: DateTimeFilter<"FullAmenity"> | Date | string
  }

  export type CartItemUpsertWithWhereUniqueWithoutPropertyInput = {
    where: CartItemWhereUniqueInput
    update: XOR<CartItemUpdateWithoutPropertyInput, CartItemUncheckedUpdateWithoutPropertyInput>
    create: XOR<CartItemCreateWithoutPropertyInput, CartItemUncheckedCreateWithoutPropertyInput>
  }

  export type CartItemUpdateWithWhereUniqueWithoutPropertyInput = {
    where: CartItemWhereUniqueInput
    data: XOR<CartItemUpdateWithoutPropertyInput, CartItemUncheckedUpdateWithoutPropertyInput>
  }

  export type CartItemUpdateManyWithWhereWithoutPropertyInput = {
    where: CartItemScalarWhereInput
    data: XOR<CartItemUpdateManyMutationInput, CartItemUncheckedUpdateManyWithoutPropertyInput>
  }

  export type CartItemScalarWhereInput = {
    AND?: CartItemScalarWhereInput | CartItemScalarWhereInput[]
    OR?: CartItemScalarWhereInput[]
    NOT?: CartItemScalarWhereInput | CartItemScalarWhereInput[]
    id?: StringFilter<"CartItem"> | string
    cartId?: StringFilter<"CartItem"> | string
    propertyId?: StringFilter<"CartItem"> | string
    addedAt?: DateTimeFilter<"CartItem"> | Date | string
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
    isSoldOut?: boolean
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
    basicAmenities?: BasicAmenityCreateNestedManyWithoutPropertyInput
    fullAmenities?: FullAmenityCreateNestedManyWithoutPropertyInput
    cartItems?: CartItemCreateNestedManyWithoutPropertyInput
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
    isSoldOut?: boolean
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
    basicAmenities?: BasicAmenityUncheckedCreateNestedManyWithoutPropertyInput
    fullAmenities?: FullAmenityUncheckedCreateNestedManyWithoutPropertyInput
    cartItems?: CartItemUncheckedCreateNestedManyWithoutPropertyInput
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
    isSoldOut?: BoolFieldUpdateOperationsInput | boolean
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
    basicAmenities?: BasicAmenityUpdateManyWithoutPropertyNestedInput
    fullAmenities?: FullAmenityUpdateManyWithoutPropertyNestedInput
    cartItems?: CartItemUpdateManyWithoutPropertyNestedInput
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
    isSoldOut?: BoolFieldUpdateOperationsInput | boolean
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
    basicAmenities?: BasicAmenityUncheckedUpdateManyWithoutPropertyNestedInput
    fullAmenities?: FullAmenityUncheckedUpdateManyWithoutPropertyNestedInput
    cartItems?: CartItemUncheckedUpdateManyWithoutPropertyNestedInput
  }

  export type PropertyCreateWithoutBasicAmenitiesInput = {
    id?: string
    title: string
    location: string
    description: string
    price: number
    pricePerSqft?: number | null
    priceNote?: string | null
    callForPrice?: boolean
    isSoldOut?: boolean
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
    fullAmenities?: FullAmenityCreateNestedManyWithoutPropertyInput
    cartItems?: CartItemCreateNestedManyWithoutPropertyInput
  }

  export type PropertyUncheckedCreateWithoutBasicAmenitiesInput = {
    id?: string
    title: string
    location: string
    description: string
    price: number
    pricePerSqft?: number | null
    priceNote?: string | null
    callForPrice?: boolean
    isSoldOut?: boolean
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
    fullAmenities?: FullAmenityUncheckedCreateNestedManyWithoutPropertyInput
    cartItems?: CartItemUncheckedCreateNestedManyWithoutPropertyInput
  }

  export type PropertyCreateOrConnectWithoutBasicAmenitiesInput = {
    where: PropertyWhereUniqueInput
    create: XOR<PropertyCreateWithoutBasicAmenitiesInput, PropertyUncheckedCreateWithoutBasicAmenitiesInput>
  }

  export type PropertyUpsertWithoutBasicAmenitiesInput = {
    update: XOR<PropertyUpdateWithoutBasicAmenitiesInput, PropertyUncheckedUpdateWithoutBasicAmenitiesInput>
    create: XOR<PropertyCreateWithoutBasicAmenitiesInput, PropertyUncheckedCreateWithoutBasicAmenitiesInput>
    where?: PropertyWhereInput
  }

  export type PropertyUpdateToOneWithWhereWithoutBasicAmenitiesInput = {
    where?: PropertyWhereInput
    data: XOR<PropertyUpdateWithoutBasicAmenitiesInput, PropertyUncheckedUpdateWithoutBasicAmenitiesInput>
  }

  export type PropertyUpdateWithoutBasicAmenitiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    pricePerSqft?: NullableIntFieldUpdateOperationsInput | number | null
    priceNote?: NullableStringFieldUpdateOperationsInput | string | null
    callForPrice?: BoolFieldUpdateOperationsInput | boolean
    isSoldOut?: BoolFieldUpdateOperationsInput | boolean
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
    fullAmenities?: FullAmenityUpdateManyWithoutPropertyNestedInput
    cartItems?: CartItemUpdateManyWithoutPropertyNestedInput
  }

  export type PropertyUncheckedUpdateWithoutBasicAmenitiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    pricePerSqft?: NullableIntFieldUpdateOperationsInput | number | null
    priceNote?: NullableStringFieldUpdateOperationsInput | string | null
    callForPrice?: BoolFieldUpdateOperationsInput | boolean
    isSoldOut?: BoolFieldUpdateOperationsInput | boolean
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
    fullAmenities?: FullAmenityUncheckedUpdateManyWithoutPropertyNestedInput
    cartItems?: CartItemUncheckedUpdateManyWithoutPropertyNestedInput
  }

  export type PropertyCreateWithoutFullAmenitiesInput = {
    id?: string
    title: string
    location: string
    description: string
    price: number
    pricePerSqft?: number | null
    priceNote?: string | null
    callForPrice?: boolean
    isSoldOut?: boolean
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
    basicAmenities?: BasicAmenityCreateNestedManyWithoutPropertyInput
    cartItems?: CartItemCreateNestedManyWithoutPropertyInput
  }

  export type PropertyUncheckedCreateWithoutFullAmenitiesInput = {
    id?: string
    title: string
    location: string
    description: string
    price: number
    pricePerSqft?: number | null
    priceNote?: string | null
    callForPrice?: boolean
    isSoldOut?: boolean
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
    basicAmenities?: BasicAmenityUncheckedCreateNestedManyWithoutPropertyInput
    cartItems?: CartItemUncheckedCreateNestedManyWithoutPropertyInput
  }

  export type PropertyCreateOrConnectWithoutFullAmenitiesInput = {
    where: PropertyWhereUniqueInput
    create: XOR<PropertyCreateWithoutFullAmenitiesInput, PropertyUncheckedCreateWithoutFullAmenitiesInput>
  }

  export type PropertyUpsertWithoutFullAmenitiesInput = {
    update: XOR<PropertyUpdateWithoutFullAmenitiesInput, PropertyUncheckedUpdateWithoutFullAmenitiesInput>
    create: XOR<PropertyCreateWithoutFullAmenitiesInput, PropertyUncheckedCreateWithoutFullAmenitiesInput>
    where?: PropertyWhereInput
  }

  export type PropertyUpdateToOneWithWhereWithoutFullAmenitiesInput = {
    where?: PropertyWhereInput
    data: XOR<PropertyUpdateWithoutFullAmenitiesInput, PropertyUncheckedUpdateWithoutFullAmenitiesInput>
  }

  export type PropertyUpdateWithoutFullAmenitiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    pricePerSqft?: NullableIntFieldUpdateOperationsInput | number | null
    priceNote?: NullableStringFieldUpdateOperationsInput | string | null
    callForPrice?: BoolFieldUpdateOperationsInput | boolean
    isSoldOut?: BoolFieldUpdateOperationsInput | boolean
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
    basicAmenities?: BasicAmenityUpdateManyWithoutPropertyNestedInput
    cartItems?: CartItemUpdateManyWithoutPropertyNestedInput
  }

  export type PropertyUncheckedUpdateWithoutFullAmenitiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    pricePerSqft?: NullableIntFieldUpdateOperationsInput | number | null
    priceNote?: NullableStringFieldUpdateOperationsInput | string | null
    callForPrice?: BoolFieldUpdateOperationsInput | boolean
    isSoldOut?: BoolFieldUpdateOperationsInput | boolean
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
    basicAmenities?: BasicAmenityUncheckedUpdateManyWithoutPropertyNestedInput
    cartItems?: CartItemUncheckedUpdateManyWithoutPropertyNestedInput
  }

  export type CartCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: CartItemCreateNestedManyWithoutCartInput
  }

  export type CartUncheckedCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: CartItemUncheckedCreateNestedManyWithoutCartInput
  }

  export type CartCreateOrConnectWithoutUserInput = {
    where: CartWhereUniqueInput
    create: XOR<CartCreateWithoutUserInput, CartUncheckedCreateWithoutUserInput>
  }

  export type BookingCreateWithoutUserInput = {
    id?: string
    name: string
    email: string
    phone: string
    date: string
    time: string
    propertyTitle: string
    propertyId: string
    createdAt?: Date | string
  }

  export type BookingUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    email: string
    phone: string
    date: string
    time: string
    propertyTitle: string
    propertyId: string
    createdAt?: Date | string
  }

  export type BookingCreateOrConnectWithoutUserInput = {
    where: BookingWhereUniqueInput
    create: XOR<BookingCreateWithoutUserInput, BookingUncheckedCreateWithoutUserInput>
  }

  export type BookingCreateManyUserInputEnvelope = {
    data: BookingCreateManyUserInput | BookingCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type CartUpsertWithoutUserInput = {
    update: XOR<CartUpdateWithoutUserInput, CartUncheckedUpdateWithoutUserInput>
    create: XOR<CartCreateWithoutUserInput, CartUncheckedCreateWithoutUserInput>
    where?: CartWhereInput
  }

  export type CartUpdateToOneWithWhereWithoutUserInput = {
    where?: CartWhereInput
    data: XOR<CartUpdateWithoutUserInput, CartUncheckedUpdateWithoutUserInput>
  }

  export type CartUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: CartItemUpdateManyWithoutCartNestedInput
  }

  export type CartUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: CartItemUncheckedUpdateManyWithoutCartNestedInput
  }

  export type BookingUpsertWithWhereUniqueWithoutUserInput = {
    where: BookingWhereUniqueInput
    update: XOR<BookingUpdateWithoutUserInput, BookingUncheckedUpdateWithoutUserInput>
    create: XOR<BookingCreateWithoutUserInput, BookingUncheckedCreateWithoutUserInput>
  }

  export type BookingUpdateWithWhereUniqueWithoutUserInput = {
    where: BookingWhereUniqueInput
    data: XOR<BookingUpdateWithoutUserInput, BookingUncheckedUpdateWithoutUserInput>
  }

  export type BookingUpdateManyWithWhereWithoutUserInput = {
    where: BookingScalarWhereInput
    data: XOR<BookingUpdateManyMutationInput, BookingUncheckedUpdateManyWithoutUserInput>
  }

  export type BookingScalarWhereInput = {
    AND?: BookingScalarWhereInput | BookingScalarWhereInput[]
    OR?: BookingScalarWhereInput[]
    NOT?: BookingScalarWhereInput | BookingScalarWhereInput[]
    id?: StringFilter<"Booking"> | string
    name?: StringFilter<"Booking"> | string
    email?: StringFilter<"Booking"> | string
    phone?: StringFilter<"Booking"> | string
    date?: StringFilter<"Booking"> | string
    time?: StringFilter<"Booking"> | string
    propertyTitle?: StringFilter<"Booking"> | string
    propertyId?: StringFilter<"Booking"> | string
    userId?: StringNullableFilter<"Booking"> | string | null
    createdAt?: DateTimeFilter<"Booking"> | Date | string
  }

  export type UserCreateWithoutCartInput = {
    id?: string
    name?: string | null
    email: string
    phone?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    bookings?: BookingCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCartInput = {
    id?: string
    name?: string | null
    email: string
    phone?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    bookings?: BookingUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCartInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCartInput, UserUncheckedCreateWithoutCartInput>
  }

  export type CartItemCreateWithoutCartInput = {
    id?: string
    addedAt?: Date | string
    property: PropertyCreateNestedOneWithoutCartItemsInput
  }

  export type CartItemUncheckedCreateWithoutCartInput = {
    id?: string
    propertyId: string
    addedAt?: Date | string
  }

  export type CartItemCreateOrConnectWithoutCartInput = {
    where: CartItemWhereUniqueInput
    create: XOR<CartItemCreateWithoutCartInput, CartItemUncheckedCreateWithoutCartInput>
  }

  export type CartItemCreateManyCartInputEnvelope = {
    data: CartItemCreateManyCartInput | CartItemCreateManyCartInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutCartInput = {
    update: XOR<UserUpdateWithoutCartInput, UserUncheckedUpdateWithoutCartInput>
    create: XOR<UserCreateWithoutCartInput, UserUncheckedCreateWithoutCartInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCartInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCartInput, UserUncheckedUpdateWithoutCartInput>
  }

  export type UserUpdateWithoutCartInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookings?: BookingUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCartInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookings?: BookingUncheckedUpdateManyWithoutUserNestedInput
  }

  export type CartItemUpsertWithWhereUniqueWithoutCartInput = {
    where: CartItemWhereUniqueInput
    update: XOR<CartItemUpdateWithoutCartInput, CartItemUncheckedUpdateWithoutCartInput>
    create: XOR<CartItemCreateWithoutCartInput, CartItemUncheckedCreateWithoutCartInput>
  }

  export type CartItemUpdateWithWhereUniqueWithoutCartInput = {
    where: CartItemWhereUniqueInput
    data: XOR<CartItemUpdateWithoutCartInput, CartItemUncheckedUpdateWithoutCartInput>
  }

  export type CartItemUpdateManyWithWhereWithoutCartInput = {
    where: CartItemScalarWhereInput
    data: XOR<CartItemUpdateManyMutationInput, CartItemUncheckedUpdateManyWithoutCartInput>
  }

  export type CartCreateWithoutItemsInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutCartInput
  }

  export type CartUncheckedCreateWithoutItemsInput = {
    id?: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CartCreateOrConnectWithoutItemsInput = {
    where: CartWhereUniqueInput
    create: XOR<CartCreateWithoutItemsInput, CartUncheckedCreateWithoutItemsInput>
  }

  export type PropertyCreateWithoutCartItemsInput = {
    id?: string
    title: string
    location: string
    description: string
    price: number
    pricePerSqft?: number | null
    priceNote?: string | null
    callForPrice?: boolean
    isSoldOut?: boolean
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
    basicAmenities?: BasicAmenityCreateNestedManyWithoutPropertyInput
    fullAmenities?: FullAmenityCreateNestedManyWithoutPropertyInput
  }

  export type PropertyUncheckedCreateWithoutCartItemsInput = {
    id?: string
    title: string
    location: string
    description: string
    price: number
    pricePerSqft?: number | null
    priceNote?: string | null
    callForPrice?: boolean
    isSoldOut?: boolean
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
    basicAmenities?: BasicAmenityUncheckedCreateNestedManyWithoutPropertyInput
    fullAmenities?: FullAmenityUncheckedCreateNestedManyWithoutPropertyInput
  }

  export type PropertyCreateOrConnectWithoutCartItemsInput = {
    where: PropertyWhereUniqueInput
    create: XOR<PropertyCreateWithoutCartItemsInput, PropertyUncheckedCreateWithoutCartItemsInput>
  }

  export type CartUpsertWithoutItemsInput = {
    update: XOR<CartUpdateWithoutItemsInput, CartUncheckedUpdateWithoutItemsInput>
    create: XOR<CartCreateWithoutItemsInput, CartUncheckedCreateWithoutItemsInput>
    where?: CartWhereInput
  }

  export type CartUpdateToOneWithWhereWithoutItemsInput = {
    where?: CartWhereInput
    data: XOR<CartUpdateWithoutItemsInput, CartUncheckedUpdateWithoutItemsInput>
  }

  export type CartUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCartNestedInput
  }

  export type CartUncheckedUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PropertyUpsertWithoutCartItemsInput = {
    update: XOR<PropertyUpdateWithoutCartItemsInput, PropertyUncheckedUpdateWithoutCartItemsInput>
    create: XOR<PropertyCreateWithoutCartItemsInput, PropertyUncheckedCreateWithoutCartItemsInput>
    where?: PropertyWhereInput
  }

  export type PropertyUpdateToOneWithWhereWithoutCartItemsInput = {
    where?: PropertyWhereInput
    data: XOR<PropertyUpdateWithoutCartItemsInput, PropertyUncheckedUpdateWithoutCartItemsInput>
  }

  export type PropertyUpdateWithoutCartItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    pricePerSqft?: NullableIntFieldUpdateOperationsInput | number | null
    priceNote?: NullableStringFieldUpdateOperationsInput | string | null
    callForPrice?: BoolFieldUpdateOperationsInput | boolean
    isSoldOut?: BoolFieldUpdateOperationsInput | boolean
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
    basicAmenities?: BasicAmenityUpdateManyWithoutPropertyNestedInput
    fullAmenities?: FullAmenityUpdateManyWithoutPropertyNestedInput
  }

  export type PropertyUncheckedUpdateWithoutCartItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    pricePerSqft?: NullableIntFieldUpdateOperationsInput | number | null
    priceNote?: NullableStringFieldUpdateOperationsInput | string | null
    callForPrice?: BoolFieldUpdateOperationsInput | boolean
    isSoldOut?: BoolFieldUpdateOperationsInput | boolean
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
    basicAmenities?: BasicAmenityUncheckedUpdateManyWithoutPropertyNestedInput
    fullAmenities?: FullAmenityUncheckedUpdateManyWithoutPropertyNestedInput
  }

  export type UserCreateWithoutBookingsInput = {
    id?: string
    name?: string | null
    email: string
    phone?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    cart?: CartCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutBookingsInput = {
    id?: string
    name?: string | null
    email: string
    phone?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    cart?: CartUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutBookingsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutBookingsInput, UserUncheckedCreateWithoutBookingsInput>
  }

  export type UserUpsertWithoutBookingsInput = {
    update: XOR<UserUpdateWithoutBookingsInput, UserUncheckedUpdateWithoutBookingsInput>
    create: XOR<UserCreateWithoutBookingsInput, UserUncheckedCreateWithoutBookingsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutBookingsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutBookingsInput, UserUncheckedUpdateWithoutBookingsInput>
  }

  export type UserUpdateWithoutBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cart?: CartUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cart?: CartUncheckedUpdateOneWithoutUserNestedInput
  }

  export type PropertyImageCreateManyPropertyInput = {
    id?: string
    url: string
    isPrimary?: boolean
    order?: number
    createdAt?: Date | string
  }

  export type BasicAmenityCreateManyPropertyInput = {
    id?: string
    name: string
    normalized: string
    createdAt?: Date | string
  }

  export type FullAmenityCreateManyPropertyInput = {
    id?: string
    name: string
    normalized: string
    createdAt?: Date | string
  }

  export type CartItemCreateManyPropertyInput = {
    id?: string
    cartId: string
    addedAt?: Date | string
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

  export type BasicAmenityUpdateWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    normalized?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BasicAmenityUncheckedUpdateWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    normalized?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BasicAmenityUncheckedUpdateManyWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    normalized?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FullAmenityUpdateWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    normalized?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FullAmenityUncheckedUpdateWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    normalized?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FullAmenityUncheckedUpdateManyWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    normalized?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CartItemUpdateWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cart?: CartUpdateOneRequiredWithoutItemsNestedInput
  }

  export type CartItemUncheckedUpdateWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    cartId?: StringFieldUpdateOperationsInput | string
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CartItemUncheckedUpdateManyWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    cartId?: StringFieldUpdateOperationsInput | string
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingCreateManyUserInput = {
    id?: string
    name: string
    email: string
    phone: string
    date: string
    time: string
    propertyTitle: string
    propertyId: string
    createdAt?: Date | string
  }

  export type BookingUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    time?: StringFieldUpdateOperationsInput | string
    propertyTitle?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    time?: StringFieldUpdateOperationsInput | string
    propertyTitle?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookingUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    time?: StringFieldUpdateOperationsInput | string
    propertyTitle?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CartItemCreateManyCartInput = {
    id?: string
    propertyId: string
    addedAt?: Date | string
  }

  export type CartItemUpdateWithoutCartInput = {
    id?: StringFieldUpdateOperationsInput | string
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    property?: PropertyUpdateOneRequiredWithoutCartItemsNestedInput
  }

  export type CartItemUncheckedUpdateWithoutCartInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CartItemUncheckedUpdateManyWithoutCartInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use PropertyCountOutputTypeDefaultArgs instead
     */
    export type PropertyCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PropertyCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CartCountOutputTypeDefaultArgs instead
     */
    export type CartCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CartCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PropertyDefaultArgs instead
     */
    export type PropertyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PropertyDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PropertyImageDefaultArgs instead
     */
    export type PropertyImageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PropertyImageDefaultArgs<ExtArgs>
    /**
     * @deprecated Use BasicAmenityDefaultArgs instead
     */
    export type BasicAmenityArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BasicAmenityDefaultArgs<ExtArgs>
    /**
     * @deprecated Use FullAmenityDefaultArgs instead
     */
    export type FullAmenityArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = FullAmenityDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CartDefaultArgs instead
     */
    export type CartArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CartDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CartItemDefaultArgs instead
     */
    export type CartItemArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CartItemDefaultArgs<ExtArgs>
    /**
     * @deprecated Use BookingDefaultArgs instead
     */
    export type BookingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BookingDefaultArgs<ExtArgs>

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