
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
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Pool
 * 
 */
export type Pool = $Result.DefaultSelection<Prisma.$PoolPayload>
/**
 * Model PoolOption
 * 
 */
export type PoolOption = $Result.DefaultSelection<Prisma.$PoolOptionPayload>
/**
 * Model Joust
 * 
 */
export type Joust = $Result.DefaultSelection<Prisma.$JoustPayload>
/**
 * Model Notification
 * 
 */
export type Notification = $Result.DefaultSelection<Prisma.$NotificationPayload>
/**
 * Model HonorVote
 * 
 */
export type HonorVote = $Result.DefaultSelection<Prisma.$HonorVotePayload>
/**
 * Model HonorScore
 * 
 */
export type HonorScore = $Result.DefaultSelection<Prisma.$HonorScorePayload>
/**
 * Model WorldIdVerification
 * 
 */
export type WorldIdVerification = $Result.DefaultSelection<Prisma.$WorldIdVerificationPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const PoolState: {
  PENDING_ARBITER: 'PENDING_ARBITER',
  ACTIVE: 'ACTIVE',
  CLOSED: 'CLOSED',
  SETTLED: 'SETTLED',
  REFUNDED: 'REFUNDED'
};

export type PoolState = (typeof PoolState)[keyof typeof PoolState]


export const NotificationType: {
  ARBITER_INVITE: 'ARBITER_INVITE',
  ARBITER_ACCEPTED: 'ARBITER_ACCEPTED',
  POOL_SETTLED: 'POOL_SETTLED',
  JOUST_CREATED: 'JOUST_CREATED',
  POOL_REFUNDED: 'POOL_REFUNDED',
  PAYOUT_READY: 'PAYOUT_READY'
};

export type NotificationType = (typeof NotificationType)[keyof typeof NotificationType]


export const HonorVoteType: {
  UPVOTE: 'UPVOTE',
  DOWNVOTE: 'DOWNVOTE'
};

export type HonorVoteType = (typeof HonorVoteType)[keyof typeof HonorVoteType]

}

export type PoolState = $Enums.PoolState

export const PoolState: typeof $Enums.PoolState

export type NotificationType = $Enums.NotificationType

export const NotificationType: typeof $Enums.NotificationType

export type HonorVoteType = $Enums.HonorVoteType

export const HonorVoteType: typeof $Enums.HonorVoteType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
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
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

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


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pool`: Exposes CRUD operations for the **Pool** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Pools
    * const pools = await prisma.pool.findMany()
    * ```
    */
  get pool(): Prisma.PoolDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.poolOption`: Exposes CRUD operations for the **PoolOption** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PoolOptions
    * const poolOptions = await prisma.poolOption.findMany()
    * ```
    */
  get poolOption(): Prisma.PoolOptionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.joust`: Exposes CRUD operations for the **Joust** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Jousts
    * const jousts = await prisma.joust.findMany()
    * ```
    */
  get joust(): Prisma.JoustDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.notification`: Exposes CRUD operations for the **Notification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Notifications
    * const notifications = await prisma.notification.findMany()
    * ```
    */
  get notification(): Prisma.NotificationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.honorVote`: Exposes CRUD operations for the **HonorVote** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more HonorVotes
    * const honorVotes = await prisma.honorVote.findMany()
    * ```
    */
  get honorVote(): Prisma.HonorVoteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.honorScore`: Exposes CRUD operations for the **HonorScore** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more HonorScores
    * const honorScores = await prisma.honorScore.findMany()
    * ```
    */
  get honorScore(): Prisma.HonorScoreDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.worldIdVerification`: Exposes CRUD operations for the **WorldIdVerification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WorldIdVerifications
    * const worldIdVerifications = await prisma.worldIdVerification.findMany()
    * ```
    */
  get worldIdVerification(): Prisma.WorldIdVerificationDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
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
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
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
    User: 'User',
    Pool: 'Pool',
    PoolOption: 'PoolOption',
    Joust: 'Joust',
    Notification: 'Notification',
    HonorVote: 'HonorVote',
    HonorScore: 'HonorScore',
    WorldIdVerification: 'WorldIdVerification'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "pool" | "poolOption" | "joust" | "notification" | "honorVote" | "honorScore" | "worldIdVerification"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
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
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
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
      Pool: {
        payload: Prisma.$PoolPayload<ExtArgs>
        fields: Prisma.PoolFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PoolFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoolPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PoolFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoolPayload>
          }
          findFirst: {
            args: Prisma.PoolFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoolPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PoolFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoolPayload>
          }
          findMany: {
            args: Prisma.PoolFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoolPayload>[]
          }
          create: {
            args: Prisma.PoolCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoolPayload>
          }
          createMany: {
            args: Prisma.PoolCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PoolCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoolPayload>[]
          }
          delete: {
            args: Prisma.PoolDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoolPayload>
          }
          update: {
            args: Prisma.PoolUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoolPayload>
          }
          deleteMany: {
            args: Prisma.PoolDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PoolUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PoolUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoolPayload>[]
          }
          upsert: {
            args: Prisma.PoolUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoolPayload>
          }
          aggregate: {
            args: Prisma.PoolAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePool>
          }
          groupBy: {
            args: Prisma.PoolGroupByArgs<ExtArgs>
            result: $Utils.Optional<PoolGroupByOutputType>[]
          }
          count: {
            args: Prisma.PoolCountArgs<ExtArgs>
            result: $Utils.Optional<PoolCountAggregateOutputType> | number
          }
        }
      }
      PoolOption: {
        payload: Prisma.$PoolOptionPayload<ExtArgs>
        fields: Prisma.PoolOptionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PoolOptionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoolOptionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PoolOptionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoolOptionPayload>
          }
          findFirst: {
            args: Prisma.PoolOptionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoolOptionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PoolOptionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoolOptionPayload>
          }
          findMany: {
            args: Prisma.PoolOptionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoolOptionPayload>[]
          }
          create: {
            args: Prisma.PoolOptionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoolOptionPayload>
          }
          createMany: {
            args: Prisma.PoolOptionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PoolOptionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoolOptionPayload>[]
          }
          delete: {
            args: Prisma.PoolOptionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoolOptionPayload>
          }
          update: {
            args: Prisma.PoolOptionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoolOptionPayload>
          }
          deleteMany: {
            args: Prisma.PoolOptionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PoolOptionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PoolOptionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoolOptionPayload>[]
          }
          upsert: {
            args: Prisma.PoolOptionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoolOptionPayload>
          }
          aggregate: {
            args: Prisma.PoolOptionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePoolOption>
          }
          groupBy: {
            args: Prisma.PoolOptionGroupByArgs<ExtArgs>
            result: $Utils.Optional<PoolOptionGroupByOutputType>[]
          }
          count: {
            args: Prisma.PoolOptionCountArgs<ExtArgs>
            result: $Utils.Optional<PoolOptionCountAggregateOutputType> | number
          }
        }
      }
      Joust: {
        payload: Prisma.$JoustPayload<ExtArgs>
        fields: Prisma.JoustFieldRefs
        operations: {
          findUnique: {
            args: Prisma.JoustFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JoustPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.JoustFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JoustPayload>
          }
          findFirst: {
            args: Prisma.JoustFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JoustPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.JoustFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JoustPayload>
          }
          findMany: {
            args: Prisma.JoustFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JoustPayload>[]
          }
          create: {
            args: Prisma.JoustCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JoustPayload>
          }
          createMany: {
            args: Prisma.JoustCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.JoustCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JoustPayload>[]
          }
          delete: {
            args: Prisma.JoustDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JoustPayload>
          }
          update: {
            args: Prisma.JoustUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JoustPayload>
          }
          deleteMany: {
            args: Prisma.JoustDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.JoustUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.JoustUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JoustPayload>[]
          }
          upsert: {
            args: Prisma.JoustUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JoustPayload>
          }
          aggregate: {
            args: Prisma.JoustAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateJoust>
          }
          groupBy: {
            args: Prisma.JoustGroupByArgs<ExtArgs>
            result: $Utils.Optional<JoustGroupByOutputType>[]
          }
          count: {
            args: Prisma.JoustCountArgs<ExtArgs>
            result: $Utils.Optional<JoustCountAggregateOutputType> | number
          }
        }
      }
      Notification: {
        payload: Prisma.$NotificationPayload<ExtArgs>
        fields: Prisma.NotificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NotificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NotificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findFirst: {
            args: Prisma.NotificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NotificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findMany: {
            args: Prisma.NotificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          create: {
            args: Prisma.NotificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          createMany: {
            args: Prisma.NotificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NotificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          delete: {
            args: Prisma.NotificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          update: {
            args: Prisma.NotificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          deleteMany: {
            args: Prisma.NotificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NotificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NotificationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          upsert: {
            args: Prisma.NotificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          aggregate: {
            args: Prisma.NotificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotification>
          }
          groupBy: {
            args: Prisma.NotificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.NotificationCountArgs<ExtArgs>
            result: $Utils.Optional<NotificationCountAggregateOutputType> | number
          }
        }
      }
      HonorVote: {
        payload: Prisma.$HonorVotePayload<ExtArgs>
        fields: Prisma.HonorVoteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.HonorVoteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HonorVotePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.HonorVoteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HonorVotePayload>
          }
          findFirst: {
            args: Prisma.HonorVoteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HonorVotePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.HonorVoteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HonorVotePayload>
          }
          findMany: {
            args: Prisma.HonorVoteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HonorVotePayload>[]
          }
          create: {
            args: Prisma.HonorVoteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HonorVotePayload>
          }
          createMany: {
            args: Prisma.HonorVoteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.HonorVoteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HonorVotePayload>[]
          }
          delete: {
            args: Prisma.HonorVoteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HonorVotePayload>
          }
          update: {
            args: Prisma.HonorVoteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HonorVotePayload>
          }
          deleteMany: {
            args: Prisma.HonorVoteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.HonorVoteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.HonorVoteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HonorVotePayload>[]
          }
          upsert: {
            args: Prisma.HonorVoteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HonorVotePayload>
          }
          aggregate: {
            args: Prisma.HonorVoteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateHonorVote>
          }
          groupBy: {
            args: Prisma.HonorVoteGroupByArgs<ExtArgs>
            result: $Utils.Optional<HonorVoteGroupByOutputType>[]
          }
          count: {
            args: Prisma.HonorVoteCountArgs<ExtArgs>
            result: $Utils.Optional<HonorVoteCountAggregateOutputType> | number
          }
        }
      }
      HonorScore: {
        payload: Prisma.$HonorScorePayload<ExtArgs>
        fields: Prisma.HonorScoreFieldRefs
        operations: {
          findUnique: {
            args: Prisma.HonorScoreFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HonorScorePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.HonorScoreFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HonorScorePayload>
          }
          findFirst: {
            args: Prisma.HonorScoreFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HonorScorePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.HonorScoreFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HonorScorePayload>
          }
          findMany: {
            args: Prisma.HonorScoreFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HonorScorePayload>[]
          }
          create: {
            args: Prisma.HonorScoreCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HonorScorePayload>
          }
          createMany: {
            args: Prisma.HonorScoreCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.HonorScoreCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HonorScorePayload>[]
          }
          delete: {
            args: Prisma.HonorScoreDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HonorScorePayload>
          }
          update: {
            args: Prisma.HonorScoreUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HonorScorePayload>
          }
          deleteMany: {
            args: Prisma.HonorScoreDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.HonorScoreUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.HonorScoreUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HonorScorePayload>[]
          }
          upsert: {
            args: Prisma.HonorScoreUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HonorScorePayload>
          }
          aggregate: {
            args: Prisma.HonorScoreAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateHonorScore>
          }
          groupBy: {
            args: Prisma.HonorScoreGroupByArgs<ExtArgs>
            result: $Utils.Optional<HonorScoreGroupByOutputType>[]
          }
          count: {
            args: Prisma.HonorScoreCountArgs<ExtArgs>
            result: $Utils.Optional<HonorScoreCountAggregateOutputType> | number
          }
        }
      }
      WorldIdVerification: {
        payload: Prisma.$WorldIdVerificationPayload<ExtArgs>
        fields: Prisma.WorldIdVerificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WorldIdVerificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorldIdVerificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WorldIdVerificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorldIdVerificationPayload>
          }
          findFirst: {
            args: Prisma.WorldIdVerificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorldIdVerificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WorldIdVerificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorldIdVerificationPayload>
          }
          findMany: {
            args: Prisma.WorldIdVerificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorldIdVerificationPayload>[]
          }
          create: {
            args: Prisma.WorldIdVerificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorldIdVerificationPayload>
          }
          createMany: {
            args: Prisma.WorldIdVerificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WorldIdVerificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorldIdVerificationPayload>[]
          }
          delete: {
            args: Prisma.WorldIdVerificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorldIdVerificationPayload>
          }
          update: {
            args: Prisma.WorldIdVerificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorldIdVerificationPayload>
          }
          deleteMany: {
            args: Prisma.WorldIdVerificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WorldIdVerificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WorldIdVerificationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorldIdVerificationPayload>[]
          }
          upsert: {
            args: Prisma.WorldIdVerificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorldIdVerificationPayload>
          }
          aggregate: {
            args: Prisma.WorldIdVerificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWorldIdVerification>
          }
          groupBy: {
            args: Prisma.WorldIdVerificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<WorldIdVerificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.WorldIdVerificationCountArgs<ExtArgs>
            result: $Utils.Optional<WorldIdVerificationCountAggregateOutputType> | number
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
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
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
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    pool?: PoolOmit
    poolOption?: PoolOptionOmit
    joust?: JoustOmit
    notification?: NotificationOmit
    honorVote?: HonorVoteOmit
    honorScore?: HonorScoreOmit
    worldIdVerification?: WorldIdVerificationOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

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
    | 'updateManyAndReturn'
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
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    createdPools: number
    arbitratedPools: number
    jousts: number
    notifications: number
    votesCast: number
    votesReceived: number
    worldIdVerifications: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdPools?: boolean | UserCountOutputTypeCountCreatedPoolsArgs
    arbitratedPools?: boolean | UserCountOutputTypeCountArbitratedPoolsArgs
    jousts?: boolean | UserCountOutputTypeCountJoustsArgs
    notifications?: boolean | UserCountOutputTypeCountNotificationsArgs
    votesCast?: boolean | UserCountOutputTypeCountVotesCastArgs
    votesReceived?: boolean | UserCountOutputTypeCountVotesReceivedArgs
    worldIdVerifications?: boolean | UserCountOutputTypeCountWorldIdVerificationsArgs
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
  export type UserCountOutputTypeCountCreatedPoolsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PoolWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountArbitratedPoolsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PoolWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountJoustsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JoustWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountNotificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountVotesCastArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HonorVoteWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountVotesReceivedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HonorVoteWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountWorldIdVerificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorldIdVerificationWhereInput
  }


  /**
   * Count Type PoolCountOutputType
   */

  export type PoolCountOutputType = {
    jousts: number
    options: number
    notifications: number
    honorVotes: number
  }

  export type PoolCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    jousts?: boolean | PoolCountOutputTypeCountJoustsArgs
    options?: boolean | PoolCountOutputTypeCountOptionsArgs
    notifications?: boolean | PoolCountOutputTypeCountNotificationsArgs
    honorVotes?: boolean | PoolCountOutputTypeCountHonorVotesArgs
  }

  // Custom InputTypes
  /**
   * PoolCountOutputType without action
   */
  export type PoolCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PoolCountOutputType
     */
    select?: PoolCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PoolCountOutputType without action
   */
  export type PoolCountOutputTypeCountJoustsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JoustWhereInput
  }

  /**
   * PoolCountOutputType without action
   */
  export type PoolCountOutputTypeCountOptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PoolOptionWhereInput
  }

  /**
   * PoolCountOutputType without action
   */
  export type PoolCountOutputTypeCountNotificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
  }

  /**
   * PoolCountOutputType without action
   */
  export type PoolCountOutputTypeCountHonorVotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HonorVoteWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
    totalPoints: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
    totalPoints: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    username: string | null
    address: string | null
    pfp: string | null
    worldIdVerified: boolean | null
    worldIdLevel: string | null
    totalPoints: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    username: string | null
    address: string | null
    pfp: string | null
    worldIdVerified: boolean | null
    worldIdLevel: string | null
    totalPoints: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    username: number
    address: number
    pfp: number
    worldIdVerified: number
    worldIdLevel: number
    totalPoints: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
    totalPoints?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
    totalPoints?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    username?: true
    address?: true
    pfp?: true
    worldIdVerified?: true
    worldIdLevel?: true
    totalPoints?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    username?: true
    address?: true
    pfp?: true
    worldIdVerified?: true
    worldIdLevel?: true
    totalPoints?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    username?: true
    address?: true
    pfp?: true
    worldIdVerified?: true
    worldIdLevel?: true
    totalPoints?: true
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
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
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
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    username: string
    address: string
    pfp: string | null
    worldIdVerified: boolean
    worldIdLevel: string | null
    totalPoints: number
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
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
    username?: boolean
    address?: boolean
    pfp?: boolean
    worldIdVerified?: boolean
    worldIdLevel?: boolean
    totalPoints?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdPools?: boolean | User$createdPoolsArgs<ExtArgs>
    arbitratedPools?: boolean | User$arbitratedPoolsArgs<ExtArgs>
    jousts?: boolean | User$joustsArgs<ExtArgs>
    notifications?: boolean | User$notificationsArgs<ExtArgs>
    votesCast?: boolean | User$votesCastArgs<ExtArgs>
    votesReceived?: boolean | User$votesReceivedArgs<ExtArgs>
    honorScore?: boolean | User$honorScoreArgs<ExtArgs>
    worldIdVerifications?: boolean | User$worldIdVerificationsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    address?: boolean
    pfp?: boolean
    worldIdVerified?: boolean
    worldIdLevel?: boolean
    totalPoints?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    address?: boolean
    pfp?: boolean
    worldIdVerified?: boolean
    worldIdLevel?: boolean
    totalPoints?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    username?: boolean
    address?: boolean
    pfp?: boolean
    worldIdVerified?: boolean
    worldIdLevel?: boolean
    totalPoints?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "address" | "pfp" | "worldIdVerified" | "worldIdLevel" | "totalPoints" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdPools?: boolean | User$createdPoolsArgs<ExtArgs>
    arbitratedPools?: boolean | User$arbitratedPoolsArgs<ExtArgs>
    jousts?: boolean | User$joustsArgs<ExtArgs>
    notifications?: boolean | User$notificationsArgs<ExtArgs>
    votesCast?: boolean | User$votesCastArgs<ExtArgs>
    votesReceived?: boolean | User$votesReceivedArgs<ExtArgs>
    honorScore?: boolean | User$honorScoreArgs<ExtArgs>
    worldIdVerifications?: boolean | User$worldIdVerificationsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      createdPools: Prisma.$PoolPayload<ExtArgs>[]
      arbitratedPools: Prisma.$PoolPayload<ExtArgs>[]
      jousts: Prisma.$JoustPayload<ExtArgs>[]
      notifications: Prisma.$NotificationPayload<ExtArgs>[]
      votesCast: Prisma.$HonorVotePayload<ExtArgs>[]
      votesReceived: Prisma.$HonorVotePayload<ExtArgs>[]
      honorScore: Prisma.$HonorScorePayload<ExtArgs> | null
      worldIdVerifications: Prisma.$WorldIdVerificationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      username: string
      address: string
      pfp: string | null
      worldIdVerified: boolean
      worldIdLevel: string | null
      totalPoints: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
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
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

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
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

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
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

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
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

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
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

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
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


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
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    createdPools<T extends User$createdPoolsArgs<ExtArgs> = {}>(args?: Subset<T, User$createdPoolsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PoolPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    arbitratedPools<T extends User$arbitratedPoolsArgs<ExtArgs> = {}>(args?: Subset<T, User$arbitratedPoolsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PoolPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    jousts<T extends User$joustsArgs<ExtArgs> = {}>(args?: Subset<T, User$joustsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JoustPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    notifications<T extends User$notificationsArgs<ExtArgs> = {}>(args?: Subset<T, User$notificationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    votesCast<T extends User$votesCastArgs<ExtArgs> = {}>(args?: Subset<T, User$votesCastArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HonorVotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    votesReceived<T extends User$votesReceivedArgs<ExtArgs> = {}>(args?: Subset<T, User$votesReceivedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HonorVotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    honorScore<T extends User$honorScoreArgs<ExtArgs> = {}>(args?: Subset<T, User$honorScoreArgs<ExtArgs>>): Prisma__HonorScoreClient<$Result.GetResult<Prisma.$HonorScorePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    worldIdVerifications<T extends User$worldIdVerificationsArgs<ExtArgs> = {}>(args?: Subset<T, User$worldIdVerificationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorldIdVerificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
    readonly id: FieldRef<"User", 'Int'>
    readonly username: FieldRef<"User", 'String'>
    readonly address: FieldRef<"User", 'String'>
    readonly pfp: FieldRef<"User", 'String'>
    readonly worldIdVerified: FieldRef<"User", 'Boolean'>
    readonly worldIdLevel: FieldRef<"User", 'String'>
    readonly totalPoints: FieldRef<"User", 'Int'>
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.createdPools
   */
  export type User$createdPoolsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pool
     */
    select?: PoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pool
     */
    omit?: PoolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoolInclude<ExtArgs> | null
    where?: PoolWhereInput
    orderBy?: PoolOrderByWithRelationInput | PoolOrderByWithRelationInput[]
    cursor?: PoolWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PoolScalarFieldEnum | PoolScalarFieldEnum[]
  }

  /**
   * User.arbitratedPools
   */
  export type User$arbitratedPoolsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pool
     */
    select?: PoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pool
     */
    omit?: PoolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoolInclude<ExtArgs> | null
    where?: PoolWhereInput
    orderBy?: PoolOrderByWithRelationInput | PoolOrderByWithRelationInput[]
    cursor?: PoolWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PoolScalarFieldEnum | PoolScalarFieldEnum[]
  }

  /**
   * User.jousts
   */
  export type User$joustsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Joust
     */
    select?: JoustSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Joust
     */
    omit?: JoustOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JoustInclude<ExtArgs> | null
    where?: JoustWhereInput
    orderBy?: JoustOrderByWithRelationInput | JoustOrderByWithRelationInput[]
    cursor?: JoustWhereUniqueInput
    take?: number
    skip?: number
    distinct?: JoustScalarFieldEnum | JoustScalarFieldEnum[]
  }

  /**
   * User.notifications
   */
  export type User$notificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    cursor?: NotificationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * User.votesCast
   */
  export type User$votesCastArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HonorVote
     */
    select?: HonorVoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HonorVote
     */
    omit?: HonorVoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HonorVoteInclude<ExtArgs> | null
    where?: HonorVoteWhereInput
    orderBy?: HonorVoteOrderByWithRelationInput | HonorVoteOrderByWithRelationInput[]
    cursor?: HonorVoteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: HonorVoteScalarFieldEnum | HonorVoteScalarFieldEnum[]
  }

  /**
   * User.votesReceived
   */
  export type User$votesReceivedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HonorVote
     */
    select?: HonorVoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HonorVote
     */
    omit?: HonorVoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HonorVoteInclude<ExtArgs> | null
    where?: HonorVoteWhereInput
    orderBy?: HonorVoteOrderByWithRelationInput | HonorVoteOrderByWithRelationInput[]
    cursor?: HonorVoteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: HonorVoteScalarFieldEnum | HonorVoteScalarFieldEnum[]
  }

  /**
   * User.honorScore
   */
  export type User$honorScoreArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HonorScore
     */
    select?: HonorScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HonorScore
     */
    omit?: HonorScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HonorScoreInclude<ExtArgs> | null
    where?: HonorScoreWhereInput
  }

  /**
   * User.worldIdVerifications
   */
  export type User$worldIdVerificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorldIdVerification
     */
    select?: WorldIdVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorldIdVerification
     */
    omit?: WorldIdVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorldIdVerificationInclude<ExtArgs> | null
    where?: WorldIdVerificationWhereInput
    orderBy?: WorldIdVerificationOrderByWithRelationInput | WorldIdVerificationOrderByWithRelationInput[]
    cursor?: WorldIdVerificationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WorldIdVerificationScalarFieldEnum | WorldIdVerificationScalarFieldEnum[]
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Pool
   */

  export type AggregatePool = {
    _count: PoolCountAggregateOutputType | null
    _avg: PoolAvgAggregateOutputType | null
    _sum: PoolSumAggregateOutputType | null
    _min: PoolMinAggregateOutputType | null
    _max: PoolMaxAggregateOutputType | null
  }

  export type PoolAvgAggregateOutputType = {
    contractId: number | null
    creatorId: number | null
    arbiterId: number | null
    arbiterFee: number | null
    minJoustAmount: number | null
    totalAmountJousted: number | null
    supportedJoustTypes: number | null
    winningJoustType: number | null
    contractEndTime: number | null
  }

  export type PoolSumAggregateOutputType = {
    contractId: bigint | null
    creatorId: number | null
    arbiterId: number | null
    arbiterFee: number | null
    minJoustAmount: bigint | null
    totalAmountJousted: bigint | null
    supportedJoustTypes: number | null
    winningJoustType: number | null
    contractEndTime: number | null
  }

  export type PoolMinAggregateOutputType = {
    id: string | null
    contractId: bigint | null
    title: string | null
    description: string | null
    image: string | null
    creatorId: number | null
    arbiterId: number | null
    arbiterAddress: string | null
    arbiterAccepted: boolean | null
    arbiterFee: number | null
    collateral: string | null
    minJoustAmount: bigint | null
    totalAmountJousted: bigint | null
    supportedJoustTypes: number | null
    winningJoustType: number | null
    state: $Enums.PoolState | null
    endTime: Date | null
    contractEndTime: number | null
    deployedAt: Date | null
    closedAt: Date | null
    settledAt: Date | null
    refundedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PoolMaxAggregateOutputType = {
    id: string | null
    contractId: bigint | null
    title: string | null
    description: string | null
    image: string | null
    creatorId: number | null
    arbiterId: number | null
    arbiterAddress: string | null
    arbiterAccepted: boolean | null
    arbiterFee: number | null
    collateral: string | null
    minJoustAmount: bigint | null
    totalAmountJousted: bigint | null
    supportedJoustTypes: number | null
    winningJoustType: number | null
    state: $Enums.PoolState | null
    endTime: Date | null
    contractEndTime: number | null
    deployedAt: Date | null
    closedAt: Date | null
    settledAt: Date | null
    refundedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PoolCountAggregateOutputType = {
    id: number
    contractId: number
    title: number
    description: number
    image: number
    creatorId: number
    arbiterId: number
    arbiterAddress: number
    arbiterAccepted: number
    arbiterFee: number
    collateral: number
    minJoustAmount: number
    totalAmountJousted: number
    supportedJoustTypes: number
    winningJoustType: number
    state: number
    endTime: number
    contractEndTime: number
    deployedAt: number
    closedAt: number
    settledAt: number
    refundedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PoolAvgAggregateInputType = {
    contractId?: true
    creatorId?: true
    arbiterId?: true
    arbiterFee?: true
    minJoustAmount?: true
    totalAmountJousted?: true
    supportedJoustTypes?: true
    winningJoustType?: true
    contractEndTime?: true
  }

  export type PoolSumAggregateInputType = {
    contractId?: true
    creatorId?: true
    arbiterId?: true
    arbiterFee?: true
    minJoustAmount?: true
    totalAmountJousted?: true
    supportedJoustTypes?: true
    winningJoustType?: true
    contractEndTime?: true
  }

  export type PoolMinAggregateInputType = {
    id?: true
    contractId?: true
    title?: true
    description?: true
    image?: true
    creatorId?: true
    arbiterId?: true
    arbiterAddress?: true
    arbiterAccepted?: true
    arbiterFee?: true
    collateral?: true
    minJoustAmount?: true
    totalAmountJousted?: true
    supportedJoustTypes?: true
    winningJoustType?: true
    state?: true
    endTime?: true
    contractEndTime?: true
    deployedAt?: true
    closedAt?: true
    settledAt?: true
    refundedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PoolMaxAggregateInputType = {
    id?: true
    contractId?: true
    title?: true
    description?: true
    image?: true
    creatorId?: true
    arbiterId?: true
    arbiterAddress?: true
    arbiterAccepted?: true
    arbiterFee?: true
    collateral?: true
    minJoustAmount?: true
    totalAmountJousted?: true
    supportedJoustTypes?: true
    winningJoustType?: true
    state?: true
    endTime?: true
    contractEndTime?: true
    deployedAt?: true
    closedAt?: true
    settledAt?: true
    refundedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PoolCountAggregateInputType = {
    id?: true
    contractId?: true
    title?: true
    description?: true
    image?: true
    creatorId?: true
    arbiterId?: true
    arbiterAddress?: true
    arbiterAccepted?: true
    arbiterFee?: true
    collateral?: true
    minJoustAmount?: true
    totalAmountJousted?: true
    supportedJoustTypes?: true
    winningJoustType?: true
    state?: true
    endTime?: true
    contractEndTime?: true
    deployedAt?: true
    closedAt?: true
    settledAt?: true
    refundedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PoolAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pool to aggregate.
     */
    where?: PoolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pools to fetch.
     */
    orderBy?: PoolOrderByWithRelationInput | PoolOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PoolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pools from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pools.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Pools
    **/
    _count?: true | PoolCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PoolAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PoolSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PoolMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PoolMaxAggregateInputType
  }

  export type GetPoolAggregateType<T extends PoolAggregateArgs> = {
        [P in keyof T & keyof AggregatePool]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePool[P]>
      : GetScalarType<T[P], AggregatePool[P]>
  }




  export type PoolGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PoolWhereInput
    orderBy?: PoolOrderByWithAggregationInput | PoolOrderByWithAggregationInput[]
    by: PoolScalarFieldEnum[] | PoolScalarFieldEnum
    having?: PoolScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PoolCountAggregateInputType | true
    _avg?: PoolAvgAggregateInputType
    _sum?: PoolSumAggregateInputType
    _min?: PoolMinAggregateInputType
    _max?: PoolMaxAggregateInputType
  }

  export type PoolGroupByOutputType = {
    id: string
    contractId: bigint | null
    title: string
    description: string | null
    image: string | null
    creatorId: number
    arbiterId: number | null
    arbiterAddress: string
    arbiterAccepted: boolean
    arbiterFee: number
    collateral: string
    minJoustAmount: bigint
    totalAmountJousted: bigint
    supportedJoustTypes: number
    winningJoustType: number
    state: $Enums.PoolState
    endTime: Date
    contractEndTime: number
    deployedAt: Date | null
    closedAt: Date | null
    settledAt: Date | null
    refundedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: PoolCountAggregateOutputType | null
    _avg: PoolAvgAggregateOutputType | null
    _sum: PoolSumAggregateOutputType | null
    _min: PoolMinAggregateOutputType | null
    _max: PoolMaxAggregateOutputType | null
  }

  type GetPoolGroupByPayload<T extends PoolGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PoolGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PoolGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PoolGroupByOutputType[P]>
            : GetScalarType<T[P], PoolGroupByOutputType[P]>
        }
      >
    >


  export type PoolSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    contractId?: boolean
    title?: boolean
    description?: boolean
    image?: boolean
    creatorId?: boolean
    arbiterId?: boolean
    arbiterAddress?: boolean
    arbiterAccepted?: boolean
    arbiterFee?: boolean
    collateral?: boolean
    minJoustAmount?: boolean
    totalAmountJousted?: boolean
    supportedJoustTypes?: boolean
    winningJoustType?: boolean
    state?: boolean
    endTime?: boolean
    contractEndTime?: boolean
    deployedAt?: boolean
    closedAt?: boolean
    settledAt?: boolean
    refundedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    creator?: boolean | UserDefaultArgs<ExtArgs>
    arbiter?: boolean | Pool$arbiterArgs<ExtArgs>
    jousts?: boolean | Pool$joustsArgs<ExtArgs>
    options?: boolean | Pool$optionsArgs<ExtArgs>
    notifications?: boolean | Pool$notificationsArgs<ExtArgs>
    honorVotes?: boolean | Pool$honorVotesArgs<ExtArgs>
    _count?: boolean | PoolCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pool"]>

  export type PoolSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    contractId?: boolean
    title?: boolean
    description?: boolean
    image?: boolean
    creatorId?: boolean
    arbiterId?: boolean
    arbiterAddress?: boolean
    arbiterAccepted?: boolean
    arbiterFee?: boolean
    collateral?: boolean
    minJoustAmount?: boolean
    totalAmountJousted?: boolean
    supportedJoustTypes?: boolean
    winningJoustType?: boolean
    state?: boolean
    endTime?: boolean
    contractEndTime?: boolean
    deployedAt?: boolean
    closedAt?: boolean
    settledAt?: boolean
    refundedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    creator?: boolean | UserDefaultArgs<ExtArgs>
    arbiter?: boolean | Pool$arbiterArgs<ExtArgs>
  }, ExtArgs["result"]["pool"]>

  export type PoolSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    contractId?: boolean
    title?: boolean
    description?: boolean
    image?: boolean
    creatorId?: boolean
    arbiterId?: boolean
    arbiterAddress?: boolean
    arbiterAccepted?: boolean
    arbiterFee?: boolean
    collateral?: boolean
    minJoustAmount?: boolean
    totalAmountJousted?: boolean
    supportedJoustTypes?: boolean
    winningJoustType?: boolean
    state?: boolean
    endTime?: boolean
    contractEndTime?: boolean
    deployedAt?: boolean
    closedAt?: boolean
    settledAt?: boolean
    refundedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    creator?: boolean | UserDefaultArgs<ExtArgs>
    arbiter?: boolean | Pool$arbiterArgs<ExtArgs>
  }, ExtArgs["result"]["pool"]>

  export type PoolSelectScalar = {
    id?: boolean
    contractId?: boolean
    title?: boolean
    description?: boolean
    image?: boolean
    creatorId?: boolean
    arbiterId?: boolean
    arbiterAddress?: boolean
    arbiterAccepted?: boolean
    arbiterFee?: boolean
    collateral?: boolean
    minJoustAmount?: boolean
    totalAmountJousted?: boolean
    supportedJoustTypes?: boolean
    winningJoustType?: boolean
    state?: boolean
    endTime?: boolean
    contractEndTime?: boolean
    deployedAt?: boolean
    closedAt?: boolean
    settledAt?: boolean
    refundedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PoolOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "contractId" | "title" | "description" | "image" | "creatorId" | "arbiterId" | "arbiterAddress" | "arbiterAccepted" | "arbiterFee" | "collateral" | "minJoustAmount" | "totalAmountJousted" | "supportedJoustTypes" | "winningJoustType" | "state" | "endTime" | "contractEndTime" | "deployedAt" | "closedAt" | "settledAt" | "refundedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["pool"]>
  export type PoolInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creator?: boolean | UserDefaultArgs<ExtArgs>
    arbiter?: boolean | Pool$arbiterArgs<ExtArgs>
    jousts?: boolean | Pool$joustsArgs<ExtArgs>
    options?: boolean | Pool$optionsArgs<ExtArgs>
    notifications?: boolean | Pool$notificationsArgs<ExtArgs>
    honorVotes?: boolean | Pool$honorVotesArgs<ExtArgs>
    _count?: boolean | PoolCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PoolIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creator?: boolean | UserDefaultArgs<ExtArgs>
    arbiter?: boolean | Pool$arbiterArgs<ExtArgs>
  }
  export type PoolIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creator?: boolean | UserDefaultArgs<ExtArgs>
    arbiter?: boolean | Pool$arbiterArgs<ExtArgs>
  }

  export type $PoolPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Pool"
    objects: {
      creator: Prisma.$UserPayload<ExtArgs>
      arbiter: Prisma.$UserPayload<ExtArgs> | null
      jousts: Prisma.$JoustPayload<ExtArgs>[]
      options: Prisma.$PoolOptionPayload<ExtArgs>[]
      notifications: Prisma.$NotificationPayload<ExtArgs>[]
      honorVotes: Prisma.$HonorVotePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      contractId: bigint | null
      title: string
      description: string | null
      image: string | null
      creatorId: number
      arbiterId: number | null
      arbiterAddress: string
      arbiterAccepted: boolean
      arbiterFee: number
      collateral: string
      minJoustAmount: bigint
      totalAmountJousted: bigint
      supportedJoustTypes: number
      winningJoustType: number
      state: $Enums.PoolState
      endTime: Date
      contractEndTime: number
      deployedAt: Date | null
      closedAt: Date | null
      settledAt: Date | null
      refundedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["pool"]>
    composites: {}
  }

  type PoolGetPayload<S extends boolean | null | undefined | PoolDefaultArgs> = $Result.GetResult<Prisma.$PoolPayload, S>

  type PoolCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PoolFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PoolCountAggregateInputType | true
    }

  export interface PoolDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Pool'], meta: { name: 'Pool' } }
    /**
     * Find zero or one Pool that matches the filter.
     * @param {PoolFindUniqueArgs} args - Arguments to find a Pool
     * @example
     * // Get one Pool
     * const pool = await prisma.pool.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PoolFindUniqueArgs>(args: SelectSubset<T, PoolFindUniqueArgs<ExtArgs>>): Prisma__PoolClient<$Result.GetResult<Prisma.$PoolPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Pool that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PoolFindUniqueOrThrowArgs} args - Arguments to find a Pool
     * @example
     * // Get one Pool
     * const pool = await prisma.pool.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PoolFindUniqueOrThrowArgs>(args: SelectSubset<T, PoolFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PoolClient<$Result.GetResult<Prisma.$PoolPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pool that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PoolFindFirstArgs} args - Arguments to find a Pool
     * @example
     * // Get one Pool
     * const pool = await prisma.pool.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PoolFindFirstArgs>(args?: SelectSubset<T, PoolFindFirstArgs<ExtArgs>>): Prisma__PoolClient<$Result.GetResult<Prisma.$PoolPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pool that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PoolFindFirstOrThrowArgs} args - Arguments to find a Pool
     * @example
     * // Get one Pool
     * const pool = await prisma.pool.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PoolFindFirstOrThrowArgs>(args?: SelectSubset<T, PoolFindFirstOrThrowArgs<ExtArgs>>): Prisma__PoolClient<$Result.GetResult<Prisma.$PoolPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Pools that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PoolFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Pools
     * const pools = await prisma.pool.findMany()
     * 
     * // Get first 10 Pools
     * const pools = await prisma.pool.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const poolWithIdOnly = await prisma.pool.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PoolFindManyArgs>(args?: SelectSubset<T, PoolFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PoolPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Pool.
     * @param {PoolCreateArgs} args - Arguments to create a Pool.
     * @example
     * // Create one Pool
     * const Pool = await prisma.pool.create({
     *   data: {
     *     // ... data to create a Pool
     *   }
     * })
     * 
     */
    create<T extends PoolCreateArgs>(args: SelectSubset<T, PoolCreateArgs<ExtArgs>>): Prisma__PoolClient<$Result.GetResult<Prisma.$PoolPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Pools.
     * @param {PoolCreateManyArgs} args - Arguments to create many Pools.
     * @example
     * // Create many Pools
     * const pool = await prisma.pool.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PoolCreateManyArgs>(args?: SelectSubset<T, PoolCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Pools and returns the data saved in the database.
     * @param {PoolCreateManyAndReturnArgs} args - Arguments to create many Pools.
     * @example
     * // Create many Pools
     * const pool = await prisma.pool.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Pools and only return the `id`
     * const poolWithIdOnly = await prisma.pool.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PoolCreateManyAndReturnArgs>(args?: SelectSubset<T, PoolCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PoolPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Pool.
     * @param {PoolDeleteArgs} args - Arguments to delete one Pool.
     * @example
     * // Delete one Pool
     * const Pool = await prisma.pool.delete({
     *   where: {
     *     // ... filter to delete one Pool
     *   }
     * })
     * 
     */
    delete<T extends PoolDeleteArgs>(args: SelectSubset<T, PoolDeleteArgs<ExtArgs>>): Prisma__PoolClient<$Result.GetResult<Prisma.$PoolPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Pool.
     * @param {PoolUpdateArgs} args - Arguments to update one Pool.
     * @example
     * // Update one Pool
     * const pool = await prisma.pool.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PoolUpdateArgs>(args: SelectSubset<T, PoolUpdateArgs<ExtArgs>>): Prisma__PoolClient<$Result.GetResult<Prisma.$PoolPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Pools.
     * @param {PoolDeleteManyArgs} args - Arguments to filter Pools to delete.
     * @example
     * // Delete a few Pools
     * const { count } = await prisma.pool.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PoolDeleteManyArgs>(args?: SelectSubset<T, PoolDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pools.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PoolUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Pools
     * const pool = await prisma.pool.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PoolUpdateManyArgs>(args: SelectSubset<T, PoolUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pools and returns the data updated in the database.
     * @param {PoolUpdateManyAndReturnArgs} args - Arguments to update many Pools.
     * @example
     * // Update many Pools
     * const pool = await prisma.pool.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Pools and only return the `id`
     * const poolWithIdOnly = await prisma.pool.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PoolUpdateManyAndReturnArgs>(args: SelectSubset<T, PoolUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PoolPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Pool.
     * @param {PoolUpsertArgs} args - Arguments to update or create a Pool.
     * @example
     * // Update or create a Pool
     * const pool = await prisma.pool.upsert({
     *   create: {
     *     // ... data to create a Pool
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Pool we want to update
     *   }
     * })
     */
    upsert<T extends PoolUpsertArgs>(args: SelectSubset<T, PoolUpsertArgs<ExtArgs>>): Prisma__PoolClient<$Result.GetResult<Prisma.$PoolPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Pools.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PoolCountArgs} args - Arguments to filter Pools to count.
     * @example
     * // Count the number of Pools
     * const count = await prisma.pool.count({
     *   where: {
     *     // ... the filter for the Pools we want to count
     *   }
     * })
    **/
    count<T extends PoolCountArgs>(
      args?: Subset<T, PoolCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PoolCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Pool.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PoolAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PoolAggregateArgs>(args: Subset<T, PoolAggregateArgs>): Prisma.PrismaPromise<GetPoolAggregateType<T>>

    /**
     * Group by Pool.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PoolGroupByArgs} args - Group by arguments.
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
      T extends PoolGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PoolGroupByArgs['orderBy'] }
        : { orderBy?: PoolGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PoolGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPoolGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Pool model
   */
  readonly fields: PoolFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Pool.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PoolClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    creator<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    arbiter<T extends Pool$arbiterArgs<ExtArgs> = {}>(args?: Subset<T, Pool$arbiterArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    jousts<T extends Pool$joustsArgs<ExtArgs> = {}>(args?: Subset<T, Pool$joustsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JoustPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    options<T extends Pool$optionsArgs<ExtArgs> = {}>(args?: Subset<T, Pool$optionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PoolOptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    notifications<T extends Pool$notificationsArgs<ExtArgs> = {}>(args?: Subset<T, Pool$notificationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    honorVotes<T extends Pool$honorVotesArgs<ExtArgs> = {}>(args?: Subset<T, Pool$honorVotesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HonorVotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Pool model
   */
  interface PoolFieldRefs {
    readonly id: FieldRef<"Pool", 'String'>
    readonly contractId: FieldRef<"Pool", 'BigInt'>
    readonly title: FieldRef<"Pool", 'String'>
    readonly description: FieldRef<"Pool", 'String'>
    readonly image: FieldRef<"Pool", 'String'>
    readonly creatorId: FieldRef<"Pool", 'Int'>
    readonly arbiterId: FieldRef<"Pool", 'Int'>
    readonly arbiterAddress: FieldRef<"Pool", 'String'>
    readonly arbiterAccepted: FieldRef<"Pool", 'Boolean'>
    readonly arbiterFee: FieldRef<"Pool", 'Int'>
    readonly collateral: FieldRef<"Pool", 'String'>
    readonly minJoustAmount: FieldRef<"Pool", 'BigInt'>
    readonly totalAmountJousted: FieldRef<"Pool", 'BigInt'>
    readonly supportedJoustTypes: FieldRef<"Pool", 'Int'>
    readonly winningJoustType: FieldRef<"Pool", 'Int'>
    readonly state: FieldRef<"Pool", 'PoolState'>
    readonly endTime: FieldRef<"Pool", 'DateTime'>
    readonly contractEndTime: FieldRef<"Pool", 'Int'>
    readonly deployedAt: FieldRef<"Pool", 'DateTime'>
    readonly closedAt: FieldRef<"Pool", 'DateTime'>
    readonly settledAt: FieldRef<"Pool", 'DateTime'>
    readonly refundedAt: FieldRef<"Pool", 'DateTime'>
    readonly createdAt: FieldRef<"Pool", 'DateTime'>
    readonly updatedAt: FieldRef<"Pool", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Pool findUnique
   */
  export type PoolFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pool
     */
    select?: PoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pool
     */
    omit?: PoolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoolInclude<ExtArgs> | null
    /**
     * Filter, which Pool to fetch.
     */
    where: PoolWhereUniqueInput
  }

  /**
   * Pool findUniqueOrThrow
   */
  export type PoolFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pool
     */
    select?: PoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pool
     */
    omit?: PoolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoolInclude<ExtArgs> | null
    /**
     * Filter, which Pool to fetch.
     */
    where: PoolWhereUniqueInput
  }

  /**
   * Pool findFirst
   */
  export type PoolFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pool
     */
    select?: PoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pool
     */
    omit?: PoolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoolInclude<ExtArgs> | null
    /**
     * Filter, which Pool to fetch.
     */
    where?: PoolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pools to fetch.
     */
    orderBy?: PoolOrderByWithRelationInput | PoolOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pools.
     */
    cursor?: PoolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pools from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pools.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pools.
     */
    distinct?: PoolScalarFieldEnum | PoolScalarFieldEnum[]
  }

  /**
   * Pool findFirstOrThrow
   */
  export type PoolFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pool
     */
    select?: PoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pool
     */
    omit?: PoolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoolInclude<ExtArgs> | null
    /**
     * Filter, which Pool to fetch.
     */
    where?: PoolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pools to fetch.
     */
    orderBy?: PoolOrderByWithRelationInput | PoolOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pools.
     */
    cursor?: PoolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pools from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pools.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pools.
     */
    distinct?: PoolScalarFieldEnum | PoolScalarFieldEnum[]
  }

  /**
   * Pool findMany
   */
  export type PoolFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pool
     */
    select?: PoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pool
     */
    omit?: PoolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoolInclude<ExtArgs> | null
    /**
     * Filter, which Pools to fetch.
     */
    where?: PoolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pools to fetch.
     */
    orderBy?: PoolOrderByWithRelationInput | PoolOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Pools.
     */
    cursor?: PoolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pools from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pools.
     */
    skip?: number
    distinct?: PoolScalarFieldEnum | PoolScalarFieldEnum[]
  }

  /**
   * Pool create
   */
  export type PoolCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pool
     */
    select?: PoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pool
     */
    omit?: PoolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoolInclude<ExtArgs> | null
    /**
     * The data needed to create a Pool.
     */
    data: XOR<PoolCreateInput, PoolUncheckedCreateInput>
  }

  /**
   * Pool createMany
   */
  export type PoolCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Pools.
     */
    data: PoolCreateManyInput | PoolCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Pool createManyAndReturn
   */
  export type PoolCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pool
     */
    select?: PoolSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Pool
     */
    omit?: PoolOmit<ExtArgs> | null
    /**
     * The data used to create many Pools.
     */
    data: PoolCreateManyInput | PoolCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoolIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Pool update
   */
  export type PoolUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pool
     */
    select?: PoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pool
     */
    omit?: PoolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoolInclude<ExtArgs> | null
    /**
     * The data needed to update a Pool.
     */
    data: XOR<PoolUpdateInput, PoolUncheckedUpdateInput>
    /**
     * Choose, which Pool to update.
     */
    where: PoolWhereUniqueInput
  }

  /**
   * Pool updateMany
   */
  export type PoolUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Pools.
     */
    data: XOR<PoolUpdateManyMutationInput, PoolUncheckedUpdateManyInput>
    /**
     * Filter which Pools to update
     */
    where?: PoolWhereInput
    /**
     * Limit how many Pools to update.
     */
    limit?: number
  }

  /**
   * Pool updateManyAndReturn
   */
  export type PoolUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pool
     */
    select?: PoolSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Pool
     */
    omit?: PoolOmit<ExtArgs> | null
    /**
     * The data used to update Pools.
     */
    data: XOR<PoolUpdateManyMutationInput, PoolUncheckedUpdateManyInput>
    /**
     * Filter which Pools to update
     */
    where?: PoolWhereInput
    /**
     * Limit how many Pools to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoolIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Pool upsert
   */
  export type PoolUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pool
     */
    select?: PoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pool
     */
    omit?: PoolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoolInclude<ExtArgs> | null
    /**
     * The filter to search for the Pool to update in case it exists.
     */
    where: PoolWhereUniqueInput
    /**
     * In case the Pool found by the `where` argument doesn't exist, create a new Pool with this data.
     */
    create: XOR<PoolCreateInput, PoolUncheckedCreateInput>
    /**
     * In case the Pool was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PoolUpdateInput, PoolUncheckedUpdateInput>
  }

  /**
   * Pool delete
   */
  export type PoolDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pool
     */
    select?: PoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pool
     */
    omit?: PoolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoolInclude<ExtArgs> | null
    /**
     * Filter which Pool to delete.
     */
    where: PoolWhereUniqueInput
  }

  /**
   * Pool deleteMany
   */
  export type PoolDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pools to delete
     */
    where?: PoolWhereInput
    /**
     * Limit how many Pools to delete.
     */
    limit?: number
  }

  /**
   * Pool.arbiter
   */
  export type Pool$arbiterArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Pool.jousts
   */
  export type Pool$joustsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Joust
     */
    select?: JoustSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Joust
     */
    omit?: JoustOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JoustInclude<ExtArgs> | null
    where?: JoustWhereInput
    orderBy?: JoustOrderByWithRelationInput | JoustOrderByWithRelationInput[]
    cursor?: JoustWhereUniqueInput
    take?: number
    skip?: number
    distinct?: JoustScalarFieldEnum | JoustScalarFieldEnum[]
  }

  /**
   * Pool.options
   */
  export type Pool$optionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PoolOption
     */
    select?: PoolOptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PoolOption
     */
    omit?: PoolOptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoolOptionInclude<ExtArgs> | null
    where?: PoolOptionWhereInput
    orderBy?: PoolOptionOrderByWithRelationInput | PoolOptionOrderByWithRelationInput[]
    cursor?: PoolOptionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PoolOptionScalarFieldEnum | PoolOptionScalarFieldEnum[]
  }

  /**
   * Pool.notifications
   */
  export type Pool$notificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    cursor?: NotificationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Pool.honorVotes
   */
  export type Pool$honorVotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HonorVote
     */
    select?: HonorVoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HonorVote
     */
    omit?: HonorVoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HonorVoteInclude<ExtArgs> | null
    where?: HonorVoteWhereInput
    orderBy?: HonorVoteOrderByWithRelationInput | HonorVoteOrderByWithRelationInput[]
    cursor?: HonorVoteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: HonorVoteScalarFieldEnum | HonorVoteScalarFieldEnum[]
  }

  /**
   * Pool without action
   */
  export type PoolDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pool
     */
    select?: PoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pool
     */
    omit?: PoolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoolInclude<ExtArgs> | null
  }


  /**
   * Model PoolOption
   */

  export type AggregatePoolOption = {
    _count: PoolOptionCountAggregateOutputType | null
    _avg: PoolOptionAvgAggregateOutputType | null
    _sum: PoolOptionSumAggregateOutputType | null
    _min: PoolOptionMinAggregateOutputType | null
    _max: PoolOptionMaxAggregateOutputType | null
  }

  export type PoolOptionAvgAggregateOutputType = {
    id: number | null
    joustType: number | null
    orderIndex: number | null
  }

  export type PoolOptionSumAggregateOutputType = {
    id: number | null
    joustType: number | null
    orderIndex: number | null
  }

  export type PoolOptionMinAggregateOutputType = {
    id: number | null
    poolId: string | null
    joustType: number | null
    label: string | null
    orderIndex: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PoolOptionMaxAggregateOutputType = {
    id: number | null
    poolId: string | null
    joustType: number | null
    label: string | null
    orderIndex: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PoolOptionCountAggregateOutputType = {
    id: number
    poolId: number
    joustType: number
    label: number
    orderIndex: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PoolOptionAvgAggregateInputType = {
    id?: true
    joustType?: true
    orderIndex?: true
  }

  export type PoolOptionSumAggregateInputType = {
    id?: true
    joustType?: true
    orderIndex?: true
  }

  export type PoolOptionMinAggregateInputType = {
    id?: true
    poolId?: true
    joustType?: true
    label?: true
    orderIndex?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PoolOptionMaxAggregateInputType = {
    id?: true
    poolId?: true
    joustType?: true
    label?: true
    orderIndex?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PoolOptionCountAggregateInputType = {
    id?: true
    poolId?: true
    joustType?: true
    label?: true
    orderIndex?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PoolOptionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PoolOption to aggregate.
     */
    where?: PoolOptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PoolOptions to fetch.
     */
    orderBy?: PoolOptionOrderByWithRelationInput | PoolOptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PoolOptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PoolOptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PoolOptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PoolOptions
    **/
    _count?: true | PoolOptionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PoolOptionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PoolOptionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PoolOptionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PoolOptionMaxAggregateInputType
  }

  export type GetPoolOptionAggregateType<T extends PoolOptionAggregateArgs> = {
        [P in keyof T & keyof AggregatePoolOption]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePoolOption[P]>
      : GetScalarType<T[P], AggregatePoolOption[P]>
  }




  export type PoolOptionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PoolOptionWhereInput
    orderBy?: PoolOptionOrderByWithAggregationInput | PoolOptionOrderByWithAggregationInput[]
    by: PoolOptionScalarFieldEnum[] | PoolOptionScalarFieldEnum
    having?: PoolOptionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PoolOptionCountAggregateInputType | true
    _avg?: PoolOptionAvgAggregateInputType
    _sum?: PoolOptionSumAggregateInputType
    _min?: PoolOptionMinAggregateInputType
    _max?: PoolOptionMaxAggregateInputType
  }

  export type PoolOptionGroupByOutputType = {
    id: number
    poolId: string
    joustType: number
    label: string
    orderIndex: number
    createdAt: Date
    updatedAt: Date
    _count: PoolOptionCountAggregateOutputType | null
    _avg: PoolOptionAvgAggregateOutputType | null
    _sum: PoolOptionSumAggregateOutputType | null
    _min: PoolOptionMinAggregateOutputType | null
    _max: PoolOptionMaxAggregateOutputType | null
  }

  type GetPoolOptionGroupByPayload<T extends PoolOptionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PoolOptionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PoolOptionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PoolOptionGroupByOutputType[P]>
            : GetScalarType<T[P], PoolOptionGroupByOutputType[P]>
        }
      >
    >


  export type PoolOptionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    poolId?: boolean
    joustType?: boolean
    label?: boolean
    orderIndex?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    pool?: boolean | PoolDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["poolOption"]>

  export type PoolOptionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    poolId?: boolean
    joustType?: boolean
    label?: boolean
    orderIndex?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    pool?: boolean | PoolDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["poolOption"]>

  export type PoolOptionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    poolId?: boolean
    joustType?: boolean
    label?: boolean
    orderIndex?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    pool?: boolean | PoolDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["poolOption"]>

  export type PoolOptionSelectScalar = {
    id?: boolean
    poolId?: boolean
    joustType?: boolean
    label?: boolean
    orderIndex?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PoolOptionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "poolId" | "joustType" | "label" | "orderIndex" | "createdAt" | "updatedAt", ExtArgs["result"]["poolOption"]>
  export type PoolOptionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pool?: boolean | PoolDefaultArgs<ExtArgs>
  }
  export type PoolOptionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pool?: boolean | PoolDefaultArgs<ExtArgs>
  }
  export type PoolOptionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pool?: boolean | PoolDefaultArgs<ExtArgs>
  }

  export type $PoolOptionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PoolOption"
    objects: {
      pool: Prisma.$PoolPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      poolId: string
      joustType: number
      label: string
      orderIndex: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["poolOption"]>
    composites: {}
  }

  type PoolOptionGetPayload<S extends boolean | null | undefined | PoolOptionDefaultArgs> = $Result.GetResult<Prisma.$PoolOptionPayload, S>

  type PoolOptionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PoolOptionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PoolOptionCountAggregateInputType | true
    }

  export interface PoolOptionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PoolOption'], meta: { name: 'PoolOption' } }
    /**
     * Find zero or one PoolOption that matches the filter.
     * @param {PoolOptionFindUniqueArgs} args - Arguments to find a PoolOption
     * @example
     * // Get one PoolOption
     * const poolOption = await prisma.poolOption.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PoolOptionFindUniqueArgs>(args: SelectSubset<T, PoolOptionFindUniqueArgs<ExtArgs>>): Prisma__PoolOptionClient<$Result.GetResult<Prisma.$PoolOptionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PoolOption that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PoolOptionFindUniqueOrThrowArgs} args - Arguments to find a PoolOption
     * @example
     * // Get one PoolOption
     * const poolOption = await prisma.poolOption.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PoolOptionFindUniqueOrThrowArgs>(args: SelectSubset<T, PoolOptionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PoolOptionClient<$Result.GetResult<Prisma.$PoolOptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PoolOption that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PoolOptionFindFirstArgs} args - Arguments to find a PoolOption
     * @example
     * // Get one PoolOption
     * const poolOption = await prisma.poolOption.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PoolOptionFindFirstArgs>(args?: SelectSubset<T, PoolOptionFindFirstArgs<ExtArgs>>): Prisma__PoolOptionClient<$Result.GetResult<Prisma.$PoolOptionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PoolOption that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PoolOptionFindFirstOrThrowArgs} args - Arguments to find a PoolOption
     * @example
     * // Get one PoolOption
     * const poolOption = await prisma.poolOption.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PoolOptionFindFirstOrThrowArgs>(args?: SelectSubset<T, PoolOptionFindFirstOrThrowArgs<ExtArgs>>): Prisma__PoolOptionClient<$Result.GetResult<Prisma.$PoolOptionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PoolOptions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PoolOptionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PoolOptions
     * const poolOptions = await prisma.poolOption.findMany()
     * 
     * // Get first 10 PoolOptions
     * const poolOptions = await prisma.poolOption.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const poolOptionWithIdOnly = await prisma.poolOption.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PoolOptionFindManyArgs>(args?: SelectSubset<T, PoolOptionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PoolOptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PoolOption.
     * @param {PoolOptionCreateArgs} args - Arguments to create a PoolOption.
     * @example
     * // Create one PoolOption
     * const PoolOption = await prisma.poolOption.create({
     *   data: {
     *     // ... data to create a PoolOption
     *   }
     * })
     * 
     */
    create<T extends PoolOptionCreateArgs>(args: SelectSubset<T, PoolOptionCreateArgs<ExtArgs>>): Prisma__PoolOptionClient<$Result.GetResult<Prisma.$PoolOptionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PoolOptions.
     * @param {PoolOptionCreateManyArgs} args - Arguments to create many PoolOptions.
     * @example
     * // Create many PoolOptions
     * const poolOption = await prisma.poolOption.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PoolOptionCreateManyArgs>(args?: SelectSubset<T, PoolOptionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PoolOptions and returns the data saved in the database.
     * @param {PoolOptionCreateManyAndReturnArgs} args - Arguments to create many PoolOptions.
     * @example
     * // Create many PoolOptions
     * const poolOption = await prisma.poolOption.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PoolOptions and only return the `id`
     * const poolOptionWithIdOnly = await prisma.poolOption.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PoolOptionCreateManyAndReturnArgs>(args?: SelectSubset<T, PoolOptionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PoolOptionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PoolOption.
     * @param {PoolOptionDeleteArgs} args - Arguments to delete one PoolOption.
     * @example
     * // Delete one PoolOption
     * const PoolOption = await prisma.poolOption.delete({
     *   where: {
     *     // ... filter to delete one PoolOption
     *   }
     * })
     * 
     */
    delete<T extends PoolOptionDeleteArgs>(args: SelectSubset<T, PoolOptionDeleteArgs<ExtArgs>>): Prisma__PoolOptionClient<$Result.GetResult<Prisma.$PoolOptionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PoolOption.
     * @param {PoolOptionUpdateArgs} args - Arguments to update one PoolOption.
     * @example
     * // Update one PoolOption
     * const poolOption = await prisma.poolOption.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PoolOptionUpdateArgs>(args: SelectSubset<T, PoolOptionUpdateArgs<ExtArgs>>): Prisma__PoolOptionClient<$Result.GetResult<Prisma.$PoolOptionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PoolOptions.
     * @param {PoolOptionDeleteManyArgs} args - Arguments to filter PoolOptions to delete.
     * @example
     * // Delete a few PoolOptions
     * const { count } = await prisma.poolOption.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PoolOptionDeleteManyArgs>(args?: SelectSubset<T, PoolOptionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PoolOptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PoolOptionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PoolOptions
     * const poolOption = await prisma.poolOption.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PoolOptionUpdateManyArgs>(args: SelectSubset<T, PoolOptionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PoolOptions and returns the data updated in the database.
     * @param {PoolOptionUpdateManyAndReturnArgs} args - Arguments to update many PoolOptions.
     * @example
     * // Update many PoolOptions
     * const poolOption = await prisma.poolOption.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PoolOptions and only return the `id`
     * const poolOptionWithIdOnly = await prisma.poolOption.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PoolOptionUpdateManyAndReturnArgs>(args: SelectSubset<T, PoolOptionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PoolOptionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PoolOption.
     * @param {PoolOptionUpsertArgs} args - Arguments to update or create a PoolOption.
     * @example
     * // Update or create a PoolOption
     * const poolOption = await prisma.poolOption.upsert({
     *   create: {
     *     // ... data to create a PoolOption
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PoolOption we want to update
     *   }
     * })
     */
    upsert<T extends PoolOptionUpsertArgs>(args: SelectSubset<T, PoolOptionUpsertArgs<ExtArgs>>): Prisma__PoolOptionClient<$Result.GetResult<Prisma.$PoolOptionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PoolOptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PoolOptionCountArgs} args - Arguments to filter PoolOptions to count.
     * @example
     * // Count the number of PoolOptions
     * const count = await prisma.poolOption.count({
     *   where: {
     *     // ... the filter for the PoolOptions we want to count
     *   }
     * })
    **/
    count<T extends PoolOptionCountArgs>(
      args?: Subset<T, PoolOptionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PoolOptionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PoolOption.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PoolOptionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PoolOptionAggregateArgs>(args: Subset<T, PoolOptionAggregateArgs>): Prisma.PrismaPromise<GetPoolOptionAggregateType<T>>

    /**
     * Group by PoolOption.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PoolOptionGroupByArgs} args - Group by arguments.
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
      T extends PoolOptionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PoolOptionGroupByArgs['orderBy'] }
        : { orderBy?: PoolOptionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PoolOptionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPoolOptionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PoolOption model
   */
  readonly fields: PoolOptionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PoolOption.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PoolOptionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    pool<T extends PoolDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PoolDefaultArgs<ExtArgs>>): Prisma__PoolClient<$Result.GetResult<Prisma.$PoolPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the PoolOption model
   */
  interface PoolOptionFieldRefs {
    readonly id: FieldRef<"PoolOption", 'Int'>
    readonly poolId: FieldRef<"PoolOption", 'String'>
    readonly joustType: FieldRef<"PoolOption", 'Int'>
    readonly label: FieldRef<"PoolOption", 'String'>
    readonly orderIndex: FieldRef<"PoolOption", 'Int'>
    readonly createdAt: FieldRef<"PoolOption", 'DateTime'>
    readonly updatedAt: FieldRef<"PoolOption", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PoolOption findUnique
   */
  export type PoolOptionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PoolOption
     */
    select?: PoolOptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PoolOption
     */
    omit?: PoolOptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoolOptionInclude<ExtArgs> | null
    /**
     * Filter, which PoolOption to fetch.
     */
    where: PoolOptionWhereUniqueInput
  }

  /**
   * PoolOption findUniqueOrThrow
   */
  export type PoolOptionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PoolOption
     */
    select?: PoolOptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PoolOption
     */
    omit?: PoolOptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoolOptionInclude<ExtArgs> | null
    /**
     * Filter, which PoolOption to fetch.
     */
    where: PoolOptionWhereUniqueInput
  }

  /**
   * PoolOption findFirst
   */
  export type PoolOptionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PoolOption
     */
    select?: PoolOptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PoolOption
     */
    omit?: PoolOptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoolOptionInclude<ExtArgs> | null
    /**
     * Filter, which PoolOption to fetch.
     */
    where?: PoolOptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PoolOptions to fetch.
     */
    orderBy?: PoolOptionOrderByWithRelationInput | PoolOptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PoolOptions.
     */
    cursor?: PoolOptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PoolOptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PoolOptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PoolOptions.
     */
    distinct?: PoolOptionScalarFieldEnum | PoolOptionScalarFieldEnum[]
  }

  /**
   * PoolOption findFirstOrThrow
   */
  export type PoolOptionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PoolOption
     */
    select?: PoolOptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PoolOption
     */
    omit?: PoolOptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoolOptionInclude<ExtArgs> | null
    /**
     * Filter, which PoolOption to fetch.
     */
    where?: PoolOptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PoolOptions to fetch.
     */
    orderBy?: PoolOptionOrderByWithRelationInput | PoolOptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PoolOptions.
     */
    cursor?: PoolOptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PoolOptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PoolOptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PoolOptions.
     */
    distinct?: PoolOptionScalarFieldEnum | PoolOptionScalarFieldEnum[]
  }

  /**
   * PoolOption findMany
   */
  export type PoolOptionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PoolOption
     */
    select?: PoolOptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PoolOption
     */
    omit?: PoolOptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoolOptionInclude<ExtArgs> | null
    /**
     * Filter, which PoolOptions to fetch.
     */
    where?: PoolOptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PoolOptions to fetch.
     */
    orderBy?: PoolOptionOrderByWithRelationInput | PoolOptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PoolOptions.
     */
    cursor?: PoolOptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PoolOptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PoolOptions.
     */
    skip?: number
    distinct?: PoolOptionScalarFieldEnum | PoolOptionScalarFieldEnum[]
  }

  /**
   * PoolOption create
   */
  export type PoolOptionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PoolOption
     */
    select?: PoolOptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PoolOption
     */
    omit?: PoolOptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoolOptionInclude<ExtArgs> | null
    /**
     * The data needed to create a PoolOption.
     */
    data: XOR<PoolOptionCreateInput, PoolOptionUncheckedCreateInput>
  }

  /**
   * PoolOption createMany
   */
  export type PoolOptionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PoolOptions.
     */
    data: PoolOptionCreateManyInput | PoolOptionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PoolOption createManyAndReturn
   */
  export type PoolOptionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PoolOption
     */
    select?: PoolOptionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PoolOption
     */
    omit?: PoolOptionOmit<ExtArgs> | null
    /**
     * The data used to create many PoolOptions.
     */
    data: PoolOptionCreateManyInput | PoolOptionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoolOptionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PoolOption update
   */
  export type PoolOptionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PoolOption
     */
    select?: PoolOptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PoolOption
     */
    omit?: PoolOptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoolOptionInclude<ExtArgs> | null
    /**
     * The data needed to update a PoolOption.
     */
    data: XOR<PoolOptionUpdateInput, PoolOptionUncheckedUpdateInput>
    /**
     * Choose, which PoolOption to update.
     */
    where: PoolOptionWhereUniqueInput
  }

  /**
   * PoolOption updateMany
   */
  export type PoolOptionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PoolOptions.
     */
    data: XOR<PoolOptionUpdateManyMutationInput, PoolOptionUncheckedUpdateManyInput>
    /**
     * Filter which PoolOptions to update
     */
    where?: PoolOptionWhereInput
    /**
     * Limit how many PoolOptions to update.
     */
    limit?: number
  }

  /**
   * PoolOption updateManyAndReturn
   */
  export type PoolOptionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PoolOption
     */
    select?: PoolOptionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PoolOption
     */
    omit?: PoolOptionOmit<ExtArgs> | null
    /**
     * The data used to update PoolOptions.
     */
    data: XOR<PoolOptionUpdateManyMutationInput, PoolOptionUncheckedUpdateManyInput>
    /**
     * Filter which PoolOptions to update
     */
    where?: PoolOptionWhereInput
    /**
     * Limit how many PoolOptions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoolOptionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PoolOption upsert
   */
  export type PoolOptionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PoolOption
     */
    select?: PoolOptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PoolOption
     */
    omit?: PoolOptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoolOptionInclude<ExtArgs> | null
    /**
     * The filter to search for the PoolOption to update in case it exists.
     */
    where: PoolOptionWhereUniqueInput
    /**
     * In case the PoolOption found by the `where` argument doesn't exist, create a new PoolOption with this data.
     */
    create: XOR<PoolOptionCreateInput, PoolOptionUncheckedCreateInput>
    /**
     * In case the PoolOption was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PoolOptionUpdateInput, PoolOptionUncheckedUpdateInput>
  }

  /**
   * PoolOption delete
   */
  export type PoolOptionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PoolOption
     */
    select?: PoolOptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PoolOption
     */
    omit?: PoolOptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoolOptionInclude<ExtArgs> | null
    /**
     * Filter which PoolOption to delete.
     */
    where: PoolOptionWhereUniqueInput
  }

  /**
   * PoolOption deleteMany
   */
  export type PoolOptionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PoolOptions to delete
     */
    where?: PoolOptionWhereInput
    /**
     * Limit how many PoolOptions to delete.
     */
    limit?: number
  }

  /**
   * PoolOption without action
   */
  export type PoolOptionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PoolOption
     */
    select?: PoolOptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PoolOption
     */
    omit?: PoolOptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoolOptionInclude<ExtArgs> | null
  }


  /**
   * Model Joust
   */

  export type AggregateJoust = {
    _count: JoustCountAggregateOutputType | null
    _avg: JoustAvgAggregateOutputType | null
    _sum: JoustSumAggregateOutputType | null
    _min: JoustMinAggregateOutputType | null
    _max: JoustMaxAggregateOutputType | null
  }

  export type JoustAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    joustType: number | null
    amount: number | null
  }

  export type JoustSumAggregateOutputType = {
    id: number | null
    userId: number | null
    joustType: number | null
    amount: bigint | null
  }

  export type JoustMinAggregateOutputType = {
    id: number | null
    userId: number | null
    poolId: string | null
    joustType: number | null
    amount: bigint | null
    isWinner: boolean | null
    txHash: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type JoustMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    poolId: string | null
    joustType: number | null
    amount: bigint | null
    isWinner: boolean | null
    txHash: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type JoustCountAggregateOutputType = {
    id: number
    userId: number
    poolId: number
    joustType: number
    amount: number
    isWinner: number
    txHash: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type JoustAvgAggregateInputType = {
    id?: true
    userId?: true
    joustType?: true
    amount?: true
  }

  export type JoustSumAggregateInputType = {
    id?: true
    userId?: true
    joustType?: true
    amount?: true
  }

  export type JoustMinAggregateInputType = {
    id?: true
    userId?: true
    poolId?: true
    joustType?: true
    amount?: true
    isWinner?: true
    txHash?: true
    createdAt?: true
    updatedAt?: true
  }

  export type JoustMaxAggregateInputType = {
    id?: true
    userId?: true
    poolId?: true
    joustType?: true
    amount?: true
    isWinner?: true
    txHash?: true
    createdAt?: true
    updatedAt?: true
  }

  export type JoustCountAggregateInputType = {
    id?: true
    userId?: true
    poolId?: true
    joustType?: true
    amount?: true
    isWinner?: true
    txHash?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type JoustAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Joust to aggregate.
     */
    where?: JoustWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jousts to fetch.
     */
    orderBy?: JoustOrderByWithRelationInput | JoustOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: JoustWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jousts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jousts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Jousts
    **/
    _count?: true | JoustCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: JoustAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: JoustSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: JoustMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: JoustMaxAggregateInputType
  }

  export type GetJoustAggregateType<T extends JoustAggregateArgs> = {
        [P in keyof T & keyof AggregateJoust]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateJoust[P]>
      : GetScalarType<T[P], AggregateJoust[P]>
  }




  export type JoustGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JoustWhereInput
    orderBy?: JoustOrderByWithAggregationInput | JoustOrderByWithAggregationInput[]
    by: JoustScalarFieldEnum[] | JoustScalarFieldEnum
    having?: JoustScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: JoustCountAggregateInputType | true
    _avg?: JoustAvgAggregateInputType
    _sum?: JoustSumAggregateInputType
    _min?: JoustMinAggregateInputType
    _max?: JoustMaxAggregateInputType
  }

  export type JoustGroupByOutputType = {
    id: number
    userId: number
    poolId: string
    joustType: number
    amount: bigint
    isWinner: boolean
    txHash: string | null
    createdAt: Date
    updatedAt: Date
    _count: JoustCountAggregateOutputType | null
    _avg: JoustAvgAggregateOutputType | null
    _sum: JoustSumAggregateOutputType | null
    _min: JoustMinAggregateOutputType | null
    _max: JoustMaxAggregateOutputType | null
  }

  type GetJoustGroupByPayload<T extends JoustGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<JoustGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof JoustGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], JoustGroupByOutputType[P]>
            : GetScalarType<T[P], JoustGroupByOutputType[P]>
        }
      >
    >


  export type JoustSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    poolId?: boolean
    joustType?: boolean
    amount?: boolean
    isWinner?: boolean
    txHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    pool?: boolean | PoolDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["joust"]>

  export type JoustSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    poolId?: boolean
    joustType?: boolean
    amount?: boolean
    isWinner?: boolean
    txHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    pool?: boolean | PoolDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["joust"]>

  export type JoustSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    poolId?: boolean
    joustType?: boolean
    amount?: boolean
    isWinner?: boolean
    txHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    pool?: boolean | PoolDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["joust"]>

  export type JoustSelectScalar = {
    id?: boolean
    userId?: boolean
    poolId?: boolean
    joustType?: boolean
    amount?: boolean
    isWinner?: boolean
    txHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type JoustOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "poolId" | "joustType" | "amount" | "isWinner" | "txHash" | "createdAt" | "updatedAt", ExtArgs["result"]["joust"]>
  export type JoustInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    pool?: boolean | PoolDefaultArgs<ExtArgs>
  }
  export type JoustIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    pool?: boolean | PoolDefaultArgs<ExtArgs>
  }
  export type JoustIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    pool?: boolean | PoolDefaultArgs<ExtArgs>
  }

  export type $JoustPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Joust"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      pool: Prisma.$PoolPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      poolId: string
      joustType: number
      amount: bigint
      isWinner: boolean
      txHash: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["joust"]>
    composites: {}
  }

  type JoustGetPayload<S extends boolean | null | undefined | JoustDefaultArgs> = $Result.GetResult<Prisma.$JoustPayload, S>

  type JoustCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<JoustFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: JoustCountAggregateInputType | true
    }

  export interface JoustDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Joust'], meta: { name: 'Joust' } }
    /**
     * Find zero or one Joust that matches the filter.
     * @param {JoustFindUniqueArgs} args - Arguments to find a Joust
     * @example
     * // Get one Joust
     * const joust = await prisma.joust.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends JoustFindUniqueArgs>(args: SelectSubset<T, JoustFindUniqueArgs<ExtArgs>>): Prisma__JoustClient<$Result.GetResult<Prisma.$JoustPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Joust that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {JoustFindUniqueOrThrowArgs} args - Arguments to find a Joust
     * @example
     * // Get one Joust
     * const joust = await prisma.joust.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends JoustFindUniqueOrThrowArgs>(args: SelectSubset<T, JoustFindUniqueOrThrowArgs<ExtArgs>>): Prisma__JoustClient<$Result.GetResult<Prisma.$JoustPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Joust that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JoustFindFirstArgs} args - Arguments to find a Joust
     * @example
     * // Get one Joust
     * const joust = await prisma.joust.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends JoustFindFirstArgs>(args?: SelectSubset<T, JoustFindFirstArgs<ExtArgs>>): Prisma__JoustClient<$Result.GetResult<Prisma.$JoustPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Joust that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JoustFindFirstOrThrowArgs} args - Arguments to find a Joust
     * @example
     * // Get one Joust
     * const joust = await prisma.joust.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends JoustFindFirstOrThrowArgs>(args?: SelectSubset<T, JoustFindFirstOrThrowArgs<ExtArgs>>): Prisma__JoustClient<$Result.GetResult<Prisma.$JoustPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Jousts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JoustFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Jousts
     * const jousts = await prisma.joust.findMany()
     * 
     * // Get first 10 Jousts
     * const jousts = await prisma.joust.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const joustWithIdOnly = await prisma.joust.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends JoustFindManyArgs>(args?: SelectSubset<T, JoustFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JoustPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Joust.
     * @param {JoustCreateArgs} args - Arguments to create a Joust.
     * @example
     * // Create one Joust
     * const Joust = await prisma.joust.create({
     *   data: {
     *     // ... data to create a Joust
     *   }
     * })
     * 
     */
    create<T extends JoustCreateArgs>(args: SelectSubset<T, JoustCreateArgs<ExtArgs>>): Prisma__JoustClient<$Result.GetResult<Prisma.$JoustPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Jousts.
     * @param {JoustCreateManyArgs} args - Arguments to create many Jousts.
     * @example
     * // Create many Jousts
     * const joust = await prisma.joust.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends JoustCreateManyArgs>(args?: SelectSubset<T, JoustCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Jousts and returns the data saved in the database.
     * @param {JoustCreateManyAndReturnArgs} args - Arguments to create many Jousts.
     * @example
     * // Create many Jousts
     * const joust = await prisma.joust.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Jousts and only return the `id`
     * const joustWithIdOnly = await prisma.joust.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends JoustCreateManyAndReturnArgs>(args?: SelectSubset<T, JoustCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JoustPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Joust.
     * @param {JoustDeleteArgs} args - Arguments to delete one Joust.
     * @example
     * // Delete one Joust
     * const Joust = await prisma.joust.delete({
     *   where: {
     *     // ... filter to delete one Joust
     *   }
     * })
     * 
     */
    delete<T extends JoustDeleteArgs>(args: SelectSubset<T, JoustDeleteArgs<ExtArgs>>): Prisma__JoustClient<$Result.GetResult<Prisma.$JoustPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Joust.
     * @param {JoustUpdateArgs} args - Arguments to update one Joust.
     * @example
     * // Update one Joust
     * const joust = await prisma.joust.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends JoustUpdateArgs>(args: SelectSubset<T, JoustUpdateArgs<ExtArgs>>): Prisma__JoustClient<$Result.GetResult<Prisma.$JoustPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Jousts.
     * @param {JoustDeleteManyArgs} args - Arguments to filter Jousts to delete.
     * @example
     * // Delete a few Jousts
     * const { count } = await prisma.joust.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends JoustDeleteManyArgs>(args?: SelectSubset<T, JoustDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Jousts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JoustUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Jousts
     * const joust = await prisma.joust.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends JoustUpdateManyArgs>(args: SelectSubset<T, JoustUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Jousts and returns the data updated in the database.
     * @param {JoustUpdateManyAndReturnArgs} args - Arguments to update many Jousts.
     * @example
     * // Update many Jousts
     * const joust = await prisma.joust.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Jousts and only return the `id`
     * const joustWithIdOnly = await prisma.joust.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends JoustUpdateManyAndReturnArgs>(args: SelectSubset<T, JoustUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JoustPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Joust.
     * @param {JoustUpsertArgs} args - Arguments to update or create a Joust.
     * @example
     * // Update or create a Joust
     * const joust = await prisma.joust.upsert({
     *   create: {
     *     // ... data to create a Joust
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Joust we want to update
     *   }
     * })
     */
    upsert<T extends JoustUpsertArgs>(args: SelectSubset<T, JoustUpsertArgs<ExtArgs>>): Prisma__JoustClient<$Result.GetResult<Prisma.$JoustPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Jousts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JoustCountArgs} args - Arguments to filter Jousts to count.
     * @example
     * // Count the number of Jousts
     * const count = await prisma.joust.count({
     *   where: {
     *     // ... the filter for the Jousts we want to count
     *   }
     * })
    **/
    count<T extends JoustCountArgs>(
      args?: Subset<T, JoustCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], JoustCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Joust.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JoustAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends JoustAggregateArgs>(args: Subset<T, JoustAggregateArgs>): Prisma.PrismaPromise<GetJoustAggregateType<T>>

    /**
     * Group by Joust.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JoustGroupByArgs} args - Group by arguments.
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
      T extends JoustGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: JoustGroupByArgs['orderBy'] }
        : { orderBy?: JoustGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, JoustGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJoustGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Joust model
   */
  readonly fields: JoustFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Joust.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__JoustClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    pool<T extends PoolDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PoolDefaultArgs<ExtArgs>>): Prisma__PoolClient<$Result.GetResult<Prisma.$PoolPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Joust model
   */
  interface JoustFieldRefs {
    readonly id: FieldRef<"Joust", 'Int'>
    readonly userId: FieldRef<"Joust", 'Int'>
    readonly poolId: FieldRef<"Joust", 'String'>
    readonly joustType: FieldRef<"Joust", 'Int'>
    readonly amount: FieldRef<"Joust", 'BigInt'>
    readonly isWinner: FieldRef<"Joust", 'Boolean'>
    readonly txHash: FieldRef<"Joust", 'String'>
    readonly createdAt: FieldRef<"Joust", 'DateTime'>
    readonly updatedAt: FieldRef<"Joust", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Joust findUnique
   */
  export type JoustFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Joust
     */
    select?: JoustSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Joust
     */
    omit?: JoustOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JoustInclude<ExtArgs> | null
    /**
     * Filter, which Joust to fetch.
     */
    where: JoustWhereUniqueInput
  }

  /**
   * Joust findUniqueOrThrow
   */
  export type JoustFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Joust
     */
    select?: JoustSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Joust
     */
    omit?: JoustOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JoustInclude<ExtArgs> | null
    /**
     * Filter, which Joust to fetch.
     */
    where: JoustWhereUniqueInput
  }

  /**
   * Joust findFirst
   */
  export type JoustFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Joust
     */
    select?: JoustSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Joust
     */
    omit?: JoustOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JoustInclude<ExtArgs> | null
    /**
     * Filter, which Joust to fetch.
     */
    where?: JoustWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jousts to fetch.
     */
    orderBy?: JoustOrderByWithRelationInput | JoustOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Jousts.
     */
    cursor?: JoustWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jousts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jousts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Jousts.
     */
    distinct?: JoustScalarFieldEnum | JoustScalarFieldEnum[]
  }

  /**
   * Joust findFirstOrThrow
   */
  export type JoustFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Joust
     */
    select?: JoustSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Joust
     */
    omit?: JoustOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JoustInclude<ExtArgs> | null
    /**
     * Filter, which Joust to fetch.
     */
    where?: JoustWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jousts to fetch.
     */
    orderBy?: JoustOrderByWithRelationInput | JoustOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Jousts.
     */
    cursor?: JoustWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jousts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jousts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Jousts.
     */
    distinct?: JoustScalarFieldEnum | JoustScalarFieldEnum[]
  }

  /**
   * Joust findMany
   */
  export type JoustFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Joust
     */
    select?: JoustSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Joust
     */
    omit?: JoustOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JoustInclude<ExtArgs> | null
    /**
     * Filter, which Jousts to fetch.
     */
    where?: JoustWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jousts to fetch.
     */
    orderBy?: JoustOrderByWithRelationInput | JoustOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Jousts.
     */
    cursor?: JoustWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jousts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jousts.
     */
    skip?: number
    distinct?: JoustScalarFieldEnum | JoustScalarFieldEnum[]
  }

  /**
   * Joust create
   */
  export type JoustCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Joust
     */
    select?: JoustSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Joust
     */
    omit?: JoustOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JoustInclude<ExtArgs> | null
    /**
     * The data needed to create a Joust.
     */
    data: XOR<JoustCreateInput, JoustUncheckedCreateInput>
  }

  /**
   * Joust createMany
   */
  export type JoustCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Jousts.
     */
    data: JoustCreateManyInput | JoustCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Joust createManyAndReturn
   */
  export type JoustCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Joust
     */
    select?: JoustSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Joust
     */
    omit?: JoustOmit<ExtArgs> | null
    /**
     * The data used to create many Jousts.
     */
    data: JoustCreateManyInput | JoustCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JoustIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Joust update
   */
  export type JoustUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Joust
     */
    select?: JoustSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Joust
     */
    omit?: JoustOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JoustInclude<ExtArgs> | null
    /**
     * The data needed to update a Joust.
     */
    data: XOR<JoustUpdateInput, JoustUncheckedUpdateInput>
    /**
     * Choose, which Joust to update.
     */
    where: JoustWhereUniqueInput
  }

  /**
   * Joust updateMany
   */
  export type JoustUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Jousts.
     */
    data: XOR<JoustUpdateManyMutationInput, JoustUncheckedUpdateManyInput>
    /**
     * Filter which Jousts to update
     */
    where?: JoustWhereInput
    /**
     * Limit how many Jousts to update.
     */
    limit?: number
  }

  /**
   * Joust updateManyAndReturn
   */
  export type JoustUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Joust
     */
    select?: JoustSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Joust
     */
    omit?: JoustOmit<ExtArgs> | null
    /**
     * The data used to update Jousts.
     */
    data: XOR<JoustUpdateManyMutationInput, JoustUncheckedUpdateManyInput>
    /**
     * Filter which Jousts to update
     */
    where?: JoustWhereInput
    /**
     * Limit how many Jousts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JoustIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Joust upsert
   */
  export type JoustUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Joust
     */
    select?: JoustSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Joust
     */
    omit?: JoustOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JoustInclude<ExtArgs> | null
    /**
     * The filter to search for the Joust to update in case it exists.
     */
    where: JoustWhereUniqueInput
    /**
     * In case the Joust found by the `where` argument doesn't exist, create a new Joust with this data.
     */
    create: XOR<JoustCreateInput, JoustUncheckedCreateInput>
    /**
     * In case the Joust was found with the provided `where` argument, update it with this data.
     */
    update: XOR<JoustUpdateInput, JoustUncheckedUpdateInput>
  }

  /**
   * Joust delete
   */
  export type JoustDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Joust
     */
    select?: JoustSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Joust
     */
    omit?: JoustOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JoustInclude<ExtArgs> | null
    /**
     * Filter which Joust to delete.
     */
    where: JoustWhereUniqueInput
  }

  /**
   * Joust deleteMany
   */
  export type JoustDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Jousts to delete
     */
    where?: JoustWhereInput
    /**
     * Limit how many Jousts to delete.
     */
    limit?: number
  }

  /**
   * Joust without action
   */
  export type JoustDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Joust
     */
    select?: JoustSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Joust
     */
    omit?: JoustOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JoustInclude<ExtArgs> | null
  }


  /**
   * Model Notification
   */

  export type AggregateNotification = {
    _count: NotificationCountAggregateOutputType | null
    _avg: NotificationAvgAggregateOutputType | null
    _sum: NotificationSumAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  export type NotificationAvgAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type NotificationSumAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type NotificationMinAggregateOutputType = {
    id: number | null
    userId: number | null
    type: $Enums.NotificationType | null
    title: string | null
    body: string | null
    poolId: string | null
    read: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NotificationMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    type: $Enums.NotificationType | null
    title: string | null
    body: string | null
    poolId: string | null
    read: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NotificationCountAggregateOutputType = {
    id: number
    userId: number
    type: number
    title: number
    body: number
    poolId: number
    read: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type NotificationAvgAggregateInputType = {
    id?: true
    userId?: true
  }

  export type NotificationSumAggregateInputType = {
    id?: true
    userId?: true
  }

  export type NotificationMinAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    title?: true
    body?: true
    poolId?: true
    read?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NotificationMaxAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    title?: true
    body?: true
    poolId?: true
    read?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NotificationCountAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    title?: true
    body?: true
    poolId?: true
    read?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type NotificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notification to aggregate.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Notifications
    **/
    _count?: true | NotificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: NotificationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: NotificationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificationMaxAggregateInputType
  }

  export type GetNotificationAggregateType<T extends NotificationAggregateArgs> = {
        [P in keyof T & keyof AggregateNotification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotification[P]>
      : GetScalarType<T[P], AggregateNotification[P]>
  }




  export type NotificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithAggregationInput | NotificationOrderByWithAggregationInput[]
    by: NotificationScalarFieldEnum[] | NotificationScalarFieldEnum
    having?: NotificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificationCountAggregateInputType | true
    _avg?: NotificationAvgAggregateInputType
    _sum?: NotificationSumAggregateInputType
    _min?: NotificationMinAggregateInputType
    _max?: NotificationMaxAggregateInputType
  }

  export type NotificationGroupByOutputType = {
    id: number
    userId: number
    type: $Enums.NotificationType
    title: string
    body: string | null
    poolId: string | null
    read: boolean
    createdAt: Date
    updatedAt: Date
    _count: NotificationCountAggregateOutputType | null
    _avg: NotificationAvgAggregateOutputType | null
    _sum: NotificationSumAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  type GetNotificationGroupByPayload<T extends NotificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificationGroupByOutputType[P]>
            : GetScalarType<T[P], NotificationGroupByOutputType[P]>
        }
      >
    >


  export type NotificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    title?: boolean
    body?: boolean
    poolId?: boolean
    read?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    pool?: boolean | Notification$poolArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    title?: boolean
    body?: boolean
    poolId?: boolean
    read?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    pool?: boolean | Notification$poolArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    title?: boolean
    body?: boolean
    poolId?: boolean
    read?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    pool?: boolean | Notification$poolArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectScalar = {
    id?: boolean
    userId?: boolean
    type?: boolean
    title?: boolean
    body?: boolean
    poolId?: boolean
    read?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type NotificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "type" | "title" | "body" | "poolId" | "read" | "createdAt" | "updatedAt", ExtArgs["result"]["notification"]>
  export type NotificationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    pool?: boolean | Notification$poolArgs<ExtArgs>
  }
  export type NotificationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    pool?: boolean | Notification$poolArgs<ExtArgs>
  }
  export type NotificationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    pool?: boolean | Notification$poolArgs<ExtArgs>
  }

  export type $NotificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Notification"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      pool: Prisma.$PoolPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      type: $Enums.NotificationType
      title: string
      body: string | null
      poolId: string | null
      read: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["notification"]>
    composites: {}
  }

  type NotificationGetPayload<S extends boolean | null | undefined | NotificationDefaultArgs> = $Result.GetResult<Prisma.$NotificationPayload, S>

  type NotificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NotificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NotificationCountAggregateInputType | true
    }

  export interface NotificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Notification'], meta: { name: 'Notification' } }
    /**
     * Find zero or one Notification that matches the filter.
     * @param {NotificationFindUniqueArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotificationFindUniqueArgs>(args: SelectSubset<T, NotificationFindUniqueArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Notification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NotificationFindUniqueOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotificationFindUniqueOrThrowArgs>(args: SelectSubset<T, NotificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotificationFindFirstArgs>(args?: SelectSubset<T, NotificationFindFirstArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotificationFindFirstOrThrowArgs>(args?: SelectSubset<T, NotificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Notifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notifications
     * const notifications = await prisma.notification.findMany()
     * 
     * // Get first 10 Notifications
     * const notifications = await prisma.notification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const notificationWithIdOnly = await prisma.notification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NotificationFindManyArgs>(args?: SelectSubset<T, NotificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Notification.
     * @param {NotificationCreateArgs} args - Arguments to create a Notification.
     * @example
     * // Create one Notification
     * const Notification = await prisma.notification.create({
     *   data: {
     *     // ... data to create a Notification
     *   }
     * })
     * 
     */
    create<T extends NotificationCreateArgs>(args: SelectSubset<T, NotificationCreateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Notifications.
     * @param {NotificationCreateManyArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NotificationCreateManyArgs>(args?: SelectSubset<T, NotificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Notifications and returns the data saved in the database.
     * @param {NotificationCreateManyAndReturnArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Notifications and only return the `id`
     * const notificationWithIdOnly = await prisma.notification.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NotificationCreateManyAndReturnArgs>(args?: SelectSubset<T, NotificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Notification.
     * @param {NotificationDeleteArgs} args - Arguments to delete one Notification.
     * @example
     * // Delete one Notification
     * const Notification = await prisma.notification.delete({
     *   where: {
     *     // ... filter to delete one Notification
     *   }
     * })
     * 
     */
    delete<T extends NotificationDeleteArgs>(args: SelectSubset<T, NotificationDeleteArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Notification.
     * @param {NotificationUpdateArgs} args - Arguments to update one Notification.
     * @example
     * // Update one Notification
     * const notification = await prisma.notification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NotificationUpdateArgs>(args: SelectSubset<T, NotificationUpdateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Notifications.
     * @param {NotificationDeleteManyArgs} args - Arguments to filter Notifications to delete.
     * @example
     * // Delete a few Notifications
     * const { count } = await prisma.notification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NotificationDeleteManyArgs>(args?: SelectSubset<T, NotificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NotificationUpdateManyArgs>(args: SelectSubset<T, NotificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications and returns the data updated in the database.
     * @param {NotificationUpdateManyAndReturnArgs} args - Arguments to update many Notifications.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Notifications and only return the `id`
     * const notificationWithIdOnly = await prisma.notification.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends NotificationUpdateManyAndReturnArgs>(args: SelectSubset<T, NotificationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Notification.
     * @param {NotificationUpsertArgs} args - Arguments to update or create a Notification.
     * @example
     * // Update or create a Notification
     * const notification = await prisma.notification.upsert({
     *   create: {
     *     // ... data to create a Notification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Notification we want to update
     *   }
     * })
     */
    upsert<T extends NotificationUpsertArgs>(args: SelectSubset<T, NotificationUpsertArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationCountArgs} args - Arguments to filter Notifications to count.
     * @example
     * // Count the number of Notifications
     * const count = await prisma.notification.count({
     *   where: {
     *     // ... the filter for the Notifications we want to count
     *   }
     * })
    **/
    count<T extends NotificationCountArgs>(
      args?: Subset<T, NotificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends NotificationAggregateArgs>(args: Subset<T, NotificationAggregateArgs>): Prisma.PrismaPromise<GetNotificationAggregateType<T>>

    /**
     * Group by Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationGroupByArgs} args - Group by arguments.
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
      T extends NotificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotificationGroupByArgs['orderBy'] }
        : { orderBy?: NotificationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, NotificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Notification model
   */
  readonly fields: NotificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Notification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NotificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    pool<T extends Notification$poolArgs<ExtArgs> = {}>(args?: Subset<T, Notification$poolArgs<ExtArgs>>): Prisma__PoolClient<$Result.GetResult<Prisma.$PoolPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Notification model
   */
  interface NotificationFieldRefs {
    readonly id: FieldRef<"Notification", 'Int'>
    readonly userId: FieldRef<"Notification", 'Int'>
    readonly type: FieldRef<"Notification", 'NotificationType'>
    readonly title: FieldRef<"Notification", 'String'>
    readonly body: FieldRef<"Notification", 'String'>
    readonly poolId: FieldRef<"Notification", 'String'>
    readonly read: FieldRef<"Notification", 'Boolean'>
    readonly createdAt: FieldRef<"Notification", 'DateTime'>
    readonly updatedAt: FieldRef<"Notification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Notification findUnique
   */
  export type NotificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findUniqueOrThrow
   */
  export type NotificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findFirst
   */
  export type NotificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findFirstOrThrow
   */
  export type NotificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findMany
   */
  export type NotificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notifications to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification create
   */
  export type NotificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The data needed to create a Notification.
     */
    data: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
  }

  /**
   * Notification createMany
   */
  export type NotificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Notification createManyAndReturn
   */
  export type NotificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Notification update
   */
  export type NotificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The data needed to update a Notification.
     */
    data: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
    /**
     * Choose, which Notification to update.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification updateMany
   */
  export type NotificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to update.
     */
    limit?: number
  }

  /**
   * Notification updateManyAndReturn
   */
  export type NotificationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Notification upsert
   */
  export type NotificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The filter to search for the Notification to update in case it exists.
     */
    where: NotificationWhereUniqueInput
    /**
     * In case the Notification found by the `where` argument doesn't exist, create a new Notification with this data.
     */
    create: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
    /**
     * In case the Notification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
  }

  /**
   * Notification delete
   */
  export type NotificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter which Notification to delete.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification deleteMany
   */
  export type NotificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notifications to delete
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to delete.
     */
    limit?: number
  }

  /**
   * Notification.pool
   */
  export type Notification$poolArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pool
     */
    select?: PoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pool
     */
    omit?: PoolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoolInclude<ExtArgs> | null
    where?: PoolWhereInput
  }

  /**
   * Notification without action
   */
  export type NotificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
  }


  /**
   * Model HonorVote
   */

  export type AggregateHonorVote = {
    _count: HonorVoteCountAggregateOutputType | null
    _avg: HonorVoteAvgAggregateOutputType | null
    _sum: HonorVoteSumAggregateOutputType | null
    _min: HonorVoteMinAggregateOutputType | null
    _max: HonorVoteMaxAggregateOutputType | null
  }

  export type HonorVoteAvgAggregateOutputType = {
    id: number | null
    voterId: number | null
    arbiterId: number | null
  }

  export type HonorVoteSumAggregateOutputType = {
    id: number | null
    voterId: number | null
    arbiterId: number | null
  }

  export type HonorVoteMinAggregateOutputType = {
    id: number | null
    voterId: number | null
    arbiterId: number | null
    poolId: string | null
    voteType: $Enums.HonorVoteType | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type HonorVoteMaxAggregateOutputType = {
    id: number | null
    voterId: number | null
    arbiterId: number | null
    poolId: string | null
    voteType: $Enums.HonorVoteType | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type HonorVoteCountAggregateOutputType = {
    id: number
    voterId: number
    arbiterId: number
    poolId: number
    voteType: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type HonorVoteAvgAggregateInputType = {
    id?: true
    voterId?: true
    arbiterId?: true
  }

  export type HonorVoteSumAggregateInputType = {
    id?: true
    voterId?: true
    arbiterId?: true
  }

  export type HonorVoteMinAggregateInputType = {
    id?: true
    voterId?: true
    arbiterId?: true
    poolId?: true
    voteType?: true
    createdAt?: true
    updatedAt?: true
  }

  export type HonorVoteMaxAggregateInputType = {
    id?: true
    voterId?: true
    arbiterId?: true
    poolId?: true
    voteType?: true
    createdAt?: true
    updatedAt?: true
  }

  export type HonorVoteCountAggregateInputType = {
    id?: true
    voterId?: true
    arbiterId?: true
    poolId?: true
    voteType?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type HonorVoteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HonorVote to aggregate.
     */
    where?: HonorVoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HonorVotes to fetch.
     */
    orderBy?: HonorVoteOrderByWithRelationInput | HonorVoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: HonorVoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HonorVotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HonorVotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned HonorVotes
    **/
    _count?: true | HonorVoteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: HonorVoteAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: HonorVoteSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HonorVoteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HonorVoteMaxAggregateInputType
  }

  export type GetHonorVoteAggregateType<T extends HonorVoteAggregateArgs> = {
        [P in keyof T & keyof AggregateHonorVote]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHonorVote[P]>
      : GetScalarType<T[P], AggregateHonorVote[P]>
  }




  export type HonorVoteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HonorVoteWhereInput
    orderBy?: HonorVoteOrderByWithAggregationInput | HonorVoteOrderByWithAggregationInput[]
    by: HonorVoteScalarFieldEnum[] | HonorVoteScalarFieldEnum
    having?: HonorVoteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HonorVoteCountAggregateInputType | true
    _avg?: HonorVoteAvgAggregateInputType
    _sum?: HonorVoteSumAggregateInputType
    _min?: HonorVoteMinAggregateInputType
    _max?: HonorVoteMaxAggregateInputType
  }

  export type HonorVoteGroupByOutputType = {
    id: number
    voterId: number
    arbiterId: number
    poolId: string
    voteType: $Enums.HonorVoteType
    createdAt: Date
    updatedAt: Date
    _count: HonorVoteCountAggregateOutputType | null
    _avg: HonorVoteAvgAggregateOutputType | null
    _sum: HonorVoteSumAggregateOutputType | null
    _min: HonorVoteMinAggregateOutputType | null
    _max: HonorVoteMaxAggregateOutputType | null
  }

  type GetHonorVoteGroupByPayload<T extends HonorVoteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<HonorVoteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HonorVoteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HonorVoteGroupByOutputType[P]>
            : GetScalarType<T[P], HonorVoteGroupByOutputType[P]>
        }
      >
    >


  export type HonorVoteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    voterId?: boolean
    arbiterId?: boolean
    poolId?: boolean
    voteType?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    voter?: boolean | UserDefaultArgs<ExtArgs>
    arbiter?: boolean | UserDefaultArgs<ExtArgs>
    pool?: boolean | PoolDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["honorVote"]>

  export type HonorVoteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    voterId?: boolean
    arbiterId?: boolean
    poolId?: boolean
    voteType?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    voter?: boolean | UserDefaultArgs<ExtArgs>
    arbiter?: boolean | UserDefaultArgs<ExtArgs>
    pool?: boolean | PoolDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["honorVote"]>

  export type HonorVoteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    voterId?: boolean
    arbiterId?: boolean
    poolId?: boolean
    voteType?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    voter?: boolean | UserDefaultArgs<ExtArgs>
    arbiter?: boolean | UserDefaultArgs<ExtArgs>
    pool?: boolean | PoolDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["honorVote"]>

  export type HonorVoteSelectScalar = {
    id?: boolean
    voterId?: boolean
    arbiterId?: boolean
    poolId?: boolean
    voteType?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type HonorVoteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "voterId" | "arbiterId" | "poolId" | "voteType" | "createdAt" | "updatedAt", ExtArgs["result"]["honorVote"]>
  export type HonorVoteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    voter?: boolean | UserDefaultArgs<ExtArgs>
    arbiter?: boolean | UserDefaultArgs<ExtArgs>
    pool?: boolean | PoolDefaultArgs<ExtArgs>
  }
  export type HonorVoteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    voter?: boolean | UserDefaultArgs<ExtArgs>
    arbiter?: boolean | UserDefaultArgs<ExtArgs>
    pool?: boolean | PoolDefaultArgs<ExtArgs>
  }
  export type HonorVoteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    voter?: boolean | UserDefaultArgs<ExtArgs>
    arbiter?: boolean | UserDefaultArgs<ExtArgs>
    pool?: boolean | PoolDefaultArgs<ExtArgs>
  }

  export type $HonorVotePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "HonorVote"
    objects: {
      voter: Prisma.$UserPayload<ExtArgs>
      arbiter: Prisma.$UserPayload<ExtArgs>
      pool: Prisma.$PoolPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      voterId: number
      arbiterId: number
      poolId: string
      voteType: $Enums.HonorVoteType
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["honorVote"]>
    composites: {}
  }

  type HonorVoteGetPayload<S extends boolean | null | undefined | HonorVoteDefaultArgs> = $Result.GetResult<Prisma.$HonorVotePayload, S>

  type HonorVoteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<HonorVoteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: HonorVoteCountAggregateInputType | true
    }

  export interface HonorVoteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['HonorVote'], meta: { name: 'HonorVote' } }
    /**
     * Find zero or one HonorVote that matches the filter.
     * @param {HonorVoteFindUniqueArgs} args - Arguments to find a HonorVote
     * @example
     * // Get one HonorVote
     * const honorVote = await prisma.honorVote.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HonorVoteFindUniqueArgs>(args: SelectSubset<T, HonorVoteFindUniqueArgs<ExtArgs>>): Prisma__HonorVoteClient<$Result.GetResult<Prisma.$HonorVotePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one HonorVote that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {HonorVoteFindUniqueOrThrowArgs} args - Arguments to find a HonorVote
     * @example
     * // Get one HonorVote
     * const honorVote = await prisma.honorVote.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HonorVoteFindUniqueOrThrowArgs>(args: SelectSubset<T, HonorVoteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__HonorVoteClient<$Result.GetResult<Prisma.$HonorVotePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first HonorVote that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HonorVoteFindFirstArgs} args - Arguments to find a HonorVote
     * @example
     * // Get one HonorVote
     * const honorVote = await prisma.honorVote.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HonorVoteFindFirstArgs>(args?: SelectSubset<T, HonorVoteFindFirstArgs<ExtArgs>>): Prisma__HonorVoteClient<$Result.GetResult<Prisma.$HonorVotePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first HonorVote that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HonorVoteFindFirstOrThrowArgs} args - Arguments to find a HonorVote
     * @example
     * // Get one HonorVote
     * const honorVote = await prisma.honorVote.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HonorVoteFindFirstOrThrowArgs>(args?: SelectSubset<T, HonorVoteFindFirstOrThrowArgs<ExtArgs>>): Prisma__HonorVoteClient<$Result.GetResult<Prisma.$HonorVotePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more HonorVotes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HonorVoteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all HonorVotes
     * const honorVotes = await prisma.honorVote.findMany()
     * 
     * // Get first 10 HonorVotes
     * const honorVotes = await prisma.honorVote.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const honorVoteWithIdOnly = await prisma.honorVote.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends HonorVoteFindManyArgs>(args?: SelectSubset<T, HonorVoteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HonorVotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a HonorVote.
     * @param {HonorVoteCreateArgs} args - Arguments to create a HonorVote.
     * @example
     * // Create one HonorVote
     * const HonorVote = await prisma.honorVote.create({
     *   data: {
     *     // ... data to create a HonorVote
     *   }
     * })
     * 
     */
    create<T extends HonorVoteCreateArgs>(args: SelectSubset<T, HonorVoteCreateArgs<ExtArgs>>): Prisma__HonorVoteClient<$Result.GetResult<Prisma.$HonorVotePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many HonorVotes.
     * @param {HonorVoteCreateManyArgs} args - Arguments to create many HonorVotes.
     * @example
     * // Create many HonorVotes
     * const honorVote = await prisma.honorVote.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends HonorVoteCreateManyArgs>(args?: SelectSubset<T, HonorVoteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many HonorVotes and returns the data saved in the database.
     * @param {HonorVoteCreateManyAndReturnArgs} args - Arguments to create many HonorVotes.
     * @example
     * // Create many HonorVotes
     * const honorVote = await prisma.honorVote.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many HonorVotes and only return the `id`
     * const honorVoteWithIdOnly = await prisma.honorVote.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends HonorVoteCreateManyAndReturnArgs>(args?: SelectSubset<T, HonorVoteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HonorVotePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a HonorVote.
     * @param {HonorVoteDeleteArgs} args - Arguments to delete one HonorVote.
     * @example
     * // Delete one HonorVote
     * const HonorVote = await prisma.honorVote.delete({
     *   where: {
     *     // ... filter to delete one HonorVote
     *   }
     * })
     * 
     */
    delete<T extends HonorVoteDeleteArgs>(args: SelectSubset<T, HonorVoteDeleteArgs<ExtArgs>>): Prisma__HonorVoteClient<$Result.GetResult<Prisma.$HonorVotePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one HonorVote.
     * @param {HonorVoteUpdateArgs} args - Arguments to update one HonorVote.
     * @example
     * // Update one HonorVote
     * const honorVote = await prisma.honorVote.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends HonorVoteUpdateArgs>(args: SelectSubset<T, HonorVoteUpdateArgs<ExtArgs>>): Prisma__HonorVoteClient<$Result.GetResult<Prisma.$HonorVotePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more HonorVotes.
     * @param {HonorVoteDeleteManyArgs} args - Arguments to filter HonorVotes to delete.
     * @example
     * // Delete a few HonorVotes
     * const { count } = await prisma.honorVote.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends HonorVoteDeleteManyArgs>(args?: SelectSubset<T, HonorVoteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HonorVotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HonorVoteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many HonorVotes
     * const honorVote = await prisma.honorVote.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends HonorVoteUpdateManyArgs>(args: SelectSubset<T, HonorVoteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HonorVotes and returns the data updated in the database.
     * @param {HonorVoteUpdateManyAndReturnArgs} args - Arguments to update many HonorVotes.
     * @example
     * // Update many HonorVotes
     * const honorVote = await prisma.honorVote.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more HonorVotes and only return the `id`
     * const honorVoteWithIdOnly = await prisma.honorVote.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends HonorVoteUpdateManyAndReturnArgs>(args: SelectSubset<T, HonorVoteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HonorVotePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one HonorVote.
     * @param {HonorVoteUpsertArgs} args - Arguments to update or create a HonorVote.
     * @example
     * // Update or create a HonorVote
     * const honorVote = await prisma.honorVote.upsert({
     *   create: {
     *     // ... data to create a HonorVote
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the HonorVote we want to update
     *   }
     * })
     */
    upsert<T extends HonorVoteUpsertArgs>(args: SelectSubset<T, HonorVoteUpsertArgs<ExtArgs>>): Prisma__HonorVoteClient<$Result.GetResult<Prisma.$HonorVotePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of HonorVotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HonorVoteCountArgs} args - Arguments to filter HonorVotes to count.
     * @example
     * // Count the number of HonorVotes
     * const count = await prisma.honorVote.count({
     *   where: {
     *     // ... the filter for the HonorVotes we want to count
     *   }
     * })
    **/
    count<T extends HonorVoteCountArgs>(
      args?: Subset<T, HonorVoteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HonorVoteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a HonorVote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HonorVoteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends HonorVoteAggregateArgs>(args: Subset<T, HonorVoteAggregateArgs>): Prisma.PrismaPromise<GetHonorVoteAggregateType<T>>

    /**
     * Group by HonorVote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HonorVoteGroupByArgs} args - Group by arguments.
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
      T extends HonorVoteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HonorVoteGroupByArgs['orderBy'] }
        : { orderBy?: HonorVoteGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, HonorVoteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHonorVoteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the HonorVote model
   */
  readonly fields: HonorVoteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for HonorVote.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__HonorVoteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    voter<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    arbiter<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    pool<T extends PoolDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PoolDefaultArgs<ExtArgs>>): Prisma__PoolClient<$Result.GetResult<Prisma.$PoolPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the HonorVote model
   */
  interface HonorVoteFieldRefs {
    readonly id: FieldRef<"HonorVote", 'Int'>
    readonly voterId: FieldRef<"HonorVote", 'Int'>
    readonly arbiterId: FieldRef<"HonorVote", 'Int'>
    readonly poolId: FieldRef<"HonorVote", 'String'>
    readonly voteType: FieldRef<"HonorVote", 'HonorVoteType'>
    readonly createdAt: FieldRef<"HonorVote", 'DateTime'>
    readonly updatedAt: FieldRef<"HonorVote", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * HonorVote findUnique
   */
  export type HonorVoteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HonorVote
     */
    select?: HonorVoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HonorVote
     */
    omit?: HonorVoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HonorVoteInclude<ExtArgs> | null
    /**
     * Filter, which HonorVote to fetch.
     */
    where: HonorVoteWhereUniqueInput
  }

  /**
   * HonorVote findUniqueOrThrow
   */
  export type HonorVoteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HonorVote
     */
    select?: HonorVoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HonorVote
     */
    omit?: HonorVoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HonorVoteInclude<ExtArgs> | null
    /**
     * Filter, which HonorVote to fetch.
     */
    where: HonorVoteWhereUniqueInput
  }

  /**
   * HonorVote findFirst
   */
  export type HonorVoteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HonorVote
     */
    select?: HonorVoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HonorVote
     */
    omit?: HonorVoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HonorVoteInclude<ExtArgs> | null
    /**
     * Filter, which HonorVote to fetch.
     */
    where?: HonorVoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HonorVotes to fetch.
     */
    orderBy?: HonorVoteOrderByWithRelationInput | HonorVoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HonorVotes.
     */
    cursor?: HonorVoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HonorVotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HonorVotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HonorVotes.
     */
    distinct?: HonorVoteScalarFieldEnum | HonorVoteScalarFieldEnum[]
  }

  /**
   * HonorVote findFirstOrThrow
   */
  export type HonorVoteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HonorVote
     */
    select?: HonorVoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HonorVote
     */
    omit?: HonorVoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HonorVoteInclude<ExtArgs> | null
    /**
     * Filter, which HonorVote to fetch.
     */
    where?: HonorVoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HonorVotes to fetch.
     */
    orderBy?: HonorVoteOrderByWithRelationInput | HonorVoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HonorVotes.
     */
    cursor?: HonorVoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HonorVotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HonorVotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HonorVotes.
     */
    distinct?: HonorVoteScalarFieldEnum | HonorVoteScalarFieldEnum[]
  }

  /**
   * HonorVote findMany
   */
  export type HonorVoteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HonorVote
     */
    select?: HonorVoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HonorVote
     */
    omit?: HonorVoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HonorVoteInclude<ExtArgs> | null
    /**
     * Filter, which HonorVotes to fetch.
     */
    where?: HonorVoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HonorVotes to fetch.
     */
    orderBy?: HonorVoteOrderByWithRelationInput | HonorVoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing HonorVotes.
     */
    cursor?: HonorVoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HonorVotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HonorVotes.
     */
    skip?: number
    distinct?: HonorVoteScalarFieldEnum | HonorVoteScalarFieldEnum[]
  }

  /**
   * HonorVote create
   */
  export type HonorVoteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HonorVote
     */
    select?: HonorVoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HonorVote
     */
    omit?: HonorVoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HonorVoteInclude<ExtArgs> | null
    /**
     * The data needed to create a HonorVote.
     */
    data: XOR<HonorVoteCreateInput, HonorVoteUncheckedCreateInput>
  }

  /**
   * HonorVote createMany
   */
  export type HonorVoteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many HonorVotes.
     */
    data: HonorVoteCreateManyInput | HonorVoteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * HonorVote createManyAndReturn
   */
  export type HonorVoteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HonorVote
     */
    select?: HonorVoteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the HonorVote
     */
    omit?: HonorVoteOmit<ExtArgs> | null
    /**
     * The data used to create many HonorVotes.
     */
    data: HonorVoteCreateManyInput | HonorVoteCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HonorVoteIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * HonorVote update
   */
  export type HonorVoteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HonorVote
     */
    select?: HonorVoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HonorVote
     */
    omit?: HonorVoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HonorVoteInclude<ExtArgs> | null
    /**
     * The data needed to update a HonorVote.
     */
    data: XOR<HonorVoteUpdateInput, HonorVoteUncheckedUpdateInput>
    /**
     * Choose, which HonorVote to update.
     */
    where: HonorVoteWhereUniqueInput
  }

  /**
   * HonorVote updateMany
   */
  export type HonorVoteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update HonorVotes.
     */
    data: XOR<HonorVoteUpdateManyMutationInput, HonorVoteUncheckedUpdateManyInput>
    /**
     * Filter which HonorVotes to update
     */
    where?: HonorVoteWhereInput
    /**
     * Limit how many HonorVotes to update.
     */
    limit?: number
  }

  /**
   * HonorVote updateManyAndReturn
   */
  export type HonorVoteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HonorVote
     */
    select?: HonorVoteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the HonorVote
     */
    omit?: HonorVoteOmit<ExtArgs> | null
    /**
     * The data used to update HonorVotes.
     */
    data: XOR<HonorVoteUpdateManyMutationInput, HonorVoteUncheckedUpdateManyInput>
    /**
     * Filter which HonorVotes to update
     */
    where?: HonorVoteWhereInput
    /**
     * Limit how many HonorVotes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HonorVoteIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * HonorVote upsert
   */
  export type HonorVoteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HonorVote
     */
    select?: HonorVoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HonorVote
     */
    omit?: HonorVoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HonorVoteInclude<ExtArgs> | null
    /**
     * The filter to search for the HonorVote to update in case it exists.
     */
    where: HonorVoteWhereUniqueInput
    /**
     * In case the HonorVote found by the `where` argument doesn't exist, create a new HonorVote with this data.
     */
    create: XOR<HonorVoteCreateInput, HonorVoteUncheckedCreateInput>
    /**
     * In case the HonorVote was found with the provided `where` argument, update it with this data.
     */
    update: XOR<HonorVoteUpdateInput, HonorVoteUncheckedUpdateInput>
  }

  /**
   * HonorVote delete
   */
  export type HonorVoteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HonorVote
     */
    select?: HonorVoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HonorVote
     */
    omit?: HonorVoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HonorVoteInclude<ExtArgs> | null
    /**
     * Filter which HonorVote to delete.
     */
    where: HonorVoteWhereUniqueInput
  }

  /**
   * HonorVote deleteMany
   */
  export type HonorVoteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HonorVotes to delete
     */
    where?: HonorVoteWhereInput
    /**
     * Limit how many HonorVotes to delete.
     */
    limit?: number
  }

  /**
   * HonorVote without action
   */
  export type HonorVoteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HonorVote
     */
    select?: HonorVoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HonorVote
     */
    omit?: HonorVoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HonorVoteInclude<ExtArgs> | null
  }


  /**
   * Model HonorScore
   */

  export type AggregateHonorScore = {
    _count: HonorScoreCountAggregateOutputType | null
    _avg: HonorScoreAvgAggregateOutputType | null
    _sum: HonorScoreSumAggregateOutputType | null
    _min: HonorScoreMinAggregateOutputType | null
    _max: HonorScoreMaxAggregateOutputType | null
  }

  export type HonorScoreAvgAggregateOutputType = {
    arbiterId: number | null
    totalUpvotes: number | null
    totalDownvotes: number | null
    score: number | null
  }

  export type HonorScoreSumAggregateOutputType = {
    arbiterId: number | null
    totalUpvotes: number | null
    totalDownvotes: number | null
    score: number | null
  }

  export type HonorScoreMinAggregateOutputType = {
    arbiterId: number | null
    totalUpvotes: number | null
    totalDownvotes: number | null
    score: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type HonorScoreMaxAggregateOutputType = {
    arbiterId: number | null
    totalUpvotes: number | null
    totalDownvotes: number | null
    score: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type HonorScoreCountAggregateOutputType = {
    arbiterId: number
    totalUpvotes: number
    totalDownvotes: number
    score: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type HonorScoreAvgAggregateInputType = {
    arbiterId?: true
    totalUpvotes?: true
    totalDownvotes?: true
    score?: true
  }

  export type HonorScoreSumAggregateInputType = {
    arbiterId?: true
    totalUpvotes?: true
    totalDownvotes?: true
    score?: true
  }

  export type HonorScoreMinAggregateInputType = {
    arbiterId?: true
    totalUpvotes?: true
    totalDownvotes?: true
    score?: true
    createdAt?: true
    updatedAt?: true
  }

  export type HonorScoreMaxAggregateInputType = {
    arbiterId?: true
    totalUpvotes?: true
    totalDownvotes?: true
    score?: true
    createdAt?: true
    updatedAt?: true
  }

  export type HonorScoreCountAggregateInputType = {
    arbiterId?: true
    totalUpvotes?: true
    totalDownvotes?: true
    score?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type HonorScoreAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HonorScore to aggregate.
     */
    where?: HonorScoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HonorScores to fetch.
     */
    orderBy?: HonorScoreOrderByWithRelationInput | HonorScoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: HonorScoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HonorScores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HonorScores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned HonorScores
    **/
    _count?: true | HonorScoreCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: HonorScoreAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: HonorScoreSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HonorScoreMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HonorScoreMaxAggregateInputType
  }

  export type GetHonorScoreAggregateType<T extends HonorScoreAggregateArgs> = {
        [P in keyof T & keyof AggregateHonorScore]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHonorScore[P]>
      : GetScalarType<T[P], AggregateHonorScore[P]>
  }




  export type HonorScoreGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HonorScoreWhereInput
    orderBy?: HonorScoreOrderByWithAggregationInput | HonorScoreOrderByWithAggregationInput[]
    by: HonorScoreScalarFieldEnum[] | HonorScoreScalarFieldEnum
    having?: HonorScoreScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HonorScoreCountAggregateInputType | true
    _avg?: HonorScoreAvgAggregateInputType
    _sum?: HonorScoreSumAggregateInputType
    _min?: HonorScoreMinAggregateInputType
    _max?: HonorScoreMaxAggregateInputType
  }

  export type HonorScoreGroupByOutputType = {
    arbiterId: number
    totalUpvotes: number
    totalDownvotes: number
    score: number
    createdAt: Date
    updatedAt: Date
    _count: HonorScoreCountAggregateOutputType | null
    _avg: HonorScoreAvgAggregateOutputType | null
    _sum: HonorScoreSumAggregateOutputType | null
    _min: HonorScoreMinAggregateOutputType | null
    _max: HonorScoreMaxAggregateOutputType | null
  }

  type GetHonorScoreGroupByPayload<T extends HonorScoreGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<HonorScoreGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HonorScoreGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HonorScoreGroupByOutputType[P]>
            : GetScalarType<T[P], HonorScoreGroupByOutputType[P]>
        }
      >
    >


  export type HonorScoreSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    arbiterId?: boolean
    totalUpvotes?: boolean
    totalDownvotes?: boolean
    score?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    arbiter?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["honorScore"]>

  export type HonorScoreSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    arbiterId?: boolean
    totalUpvotes?: boolean
    totalDownvotes?: boolean
    score?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    arbiter?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["honorScore"]>

  export type HonorScoreSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    arbiterId?: boolean
    totalUpvotes?: boolean
    totalDownvotes?: boolean
    score?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    arbiter?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["honorScore"]>

  export type HonorScoreSelectScalar = {
    arbiterId?: boolean
    totalUpvotes?: boolean
    totalDownvotes?: boolean
    score?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type HonorScoreOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"arbiterId" | "totalUpvotes" | "totalDownvotes" | "score" | "createdAt" | "updatedAt", ExtArgs["result"]["honorScore"]>
  export type HonorScoreInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    arbiter?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type HonorScoreIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    arbiter?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type HonorScoreIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    arbiter?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $HonorScorePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "HonorScore"
    objects: {
      arbiter: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      arbiterId: number
      totalUpvotes: number
      totalDownvotes: number
      score: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["honorScore"]>
    composites: {}
  }

  type HonorScoreGetPayload<S extends boolean | null | undefined | HonorScoreDefaultArgs> = $Result.GetResult<Prisma.$HonorScorePayload, S>

  type HonorScoreCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<HonorScoreFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: HonorScoreCountAggregateInputType | true
    }

  export interface HonorScoreDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['HonorScore'], meta: { name: 'HonorScore' } }
    /**
     * Find zero or one HonorScore that matches the filter.
     * @param {HonorScoreFindUniqueArgs} args - Arguments to find a HonorScore
     * @example
     * // Get one HonorScore
     * const honorScore = await prisma.honorScore.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HonorScoreFindUniqueArgs>(args: SelectSubset<T, HonorScoreFindUniqueArgs<ExtArgs>>): Prisma__HonorScoreClient<$Result.GetResult<Prisma.$HonorScorePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one HonorScore that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {HonorScoreFindUniqueOrThrowArgs} args - Arguments to find a HonorScore
     * @example
     * // Get one HonorScore
     * const honorScore = await prisma.honorScore.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HonorScoreFindUniqueOrThrowArgs>(args: SelectSubset<T, HonorScoreFindUniqueOrThrowArgs<ExtArgs>>): Prisma__HonorScoreClient<$Result.GetResult<Prisma.$HonorScorePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first HonorScore that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HonorScoreFindFirstArgs} args - Arguments to find a HonorScore
     * @example
     * // Get one HonorScore
     * const honorScore = await prisma.honorScore.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HonorScoreFindFirstArgs>(args?: SelectSubset<T, HonorScoreFindFirstArgs<ExtArgs>>): Prisma__HonorScoreClient<$Result.GetResult<Prisma.$HonorScorePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first HonorScore that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HonorScoreFindFirstOrThrowArgs} args - Arguments to find a HonorScore
     * @example
     * // Get one HonorScore
     * const honorScore = await prisma.honorScore.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HonorScoreFindFirstOrThrowArgs>(args?: SelectSubset<T, HonorScoreFindFirstOrThrowArgs<ExtArgs>>): Prisma__HonorScoreClient<$Result.GetResult<Prisma.$HonorScorePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more HonorScores that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HonorScoreFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all HonorScores
     * const honorScores = await prisma.honorScore.findMany()
     * 
     * // Get first 10 HonorScores
     * const honorScores = await prisma.honorScore.findMany({ take: 10 })
     * 
     * // Only select the `arbiterId`
     * const honorScoreWithArbiterIdOnly = await prisma.honorScore.findMany({ select: { arbiterId: true } })
     * 
     */
    findMany<T extends HonorScoreFindManyArgs>(args?: SelectSubset<T, HonorScoreFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HonorScorePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a HonorScore.
     * @param {HonorScoreCreateArgs} args - Arguments to create a HonorScore.
     * @example
     * // Create one HonorScore
     * const HonorScore = await prisma.honorScore.create({
     *   data: {
     *     // ... data to create a HonorScore
     *   }
     * })
     * 
     */
    create<T extends HonorScoreCreateArgs>(args: SelectSubset<T, HonorScoreCreateArgs<ExtArgs>>): Prisma__HonorScoreClient<$Result.GetResult<Prisma.$HonorScorePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many HonorScores.
     * @param {HonorScoreCreateManyArgs} args - Arguments to create many HonorScores.
     * @example
     * // Create many HonorScores
     * const honorScore = await prisma.honorScore.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends HonorScoreCreateManyArgs>(args?: SelectSubset<T, HonorScoreCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many HonorScores and returns the data saved in the database.
     * @param {HonorScoreCreateManyAndReturnArgs} args - Arguments to create many HonorScores.
     * @example
     * // Create many HonorScores
     * const honorScore = await prisma.honorScore.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many HonorScores and only return the `arbiterId`
     * const honorScoreWithArbiterIdOnly = await prisma.honorScore.createManyAndReturn({
     *   select: { arbiterId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends HonorScoreCreateManyAndReturnArgs>(args?: SelectSubset<T, HonorScoreCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HonorScorePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a HonorScore.
     * @param {HonorScoreDeleteArgs} args - Arguments to delete one HonorScore.
     * @example
     * // Delete one HonorScore
     * const HonorScore = await prisma.honorScore.delete({
     *   where: {
     *     // ... filter to delete one HonorScore
     *   }
     * })
     * 
     */
    delete<T extends HonorScoreDeleteArgs>(args: SelectSubset<T, HonorScoreDeleteArgs<ExtArgs>>): Prisma__HonorScoreClient<$Result.GetResult<Prisma.$HonorScorePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one HonorScore.
     * @param {HonorScoreUpdateArgs} args - Arguments to update one HonorScore.
     * @example
     * // Update one HonorScore
     * const honorScore = await prisma.honorScore.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends HonorScoreUpdateArgs>(args: SelectSubset<T, HonorScoreUpdateArgs<ExtArgs>>): Prisma__HonorScoreClient<$Result.GetResult<Prisma.$HonorScorePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more HonorScores.
     * @param {HonorScoreDeleteManyArgs} args - Arguments to filter HonorScores to delete.
     * @example
     * // Delete a few HonorScores
     * const { count } = await prisma.honorScore.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends HonorScoreDeleteManyArgs>(args?: SelectSubset<T, HonorScoreDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HonorScores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HonorScoreUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many HonorScores
     * const honorScore = await prisma.honorScore.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends HonorScoreUpdateManyArgs>(args: SelectSubset<T, HonorScoreUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HonorScores and returns the data updated in the database.
     * @param {HonorScoreUpdateManyAndReturnArgs} args - Arguments to update many HonorScores.
     * @example
     * // Update many HonorScores
     * const honorScore = await prisma.honorScore.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more HonorScores and only return the `arbiterId`
     * const honorScoreWithArbiterIdOnly = await prisma.honorScore.updateManyAndReturn({
     *   select: { arbiterId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends HonorScoreUpdateManyAndReturnArgs>(args: SelectSubset<T, HonorScoreUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HonorScorePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one HonorScore.
     * @param {HonorScoreUpsertArgs} args - Arguments to update or create a HonorScore.
     * @example
     * // Update or create a HonorScore
     * const honorScore = await prisma.honorScore.upsert({
     *   create: {
     *     // ... data to create a HonorScore
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the HonorScore we want to update
     *   }
     * })
     */
    upsert<T extends HonorScoreUpsertArgs>(args: SelectSubset<T, HonorScoreUpsertArgs<ExtArgs>>): Prisma__HonorScoreClient<$Result.GetResult<Prisma.$HonorScorePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of HonorScores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HonorScoreCountArgs} args - Arguments to filter HonorScores to count.
     * @example
     * // Count the number of HonorScores
     * const count = await prisma.honorScore.count({
     *   where: {
     *     // ... the filter for the HonorScores we want to count
     *   }
     * })
    **/
    count<T extends HonorScoreCountArgs>(
      args?: Subset<T, HonorScoreCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HonorScoreCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a HonorScore.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HonorScoreAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends HonorScoreAggregateArgs>(args: Subset<T, HonorScoreAggregateArgs>): Prisma.PrismaPromise<GetHonorScoreAggregateType<T>>

    /**
     * Group by HonorScore.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HonorScoreGroupByArgs} args - Group by arguments.
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
      T extends HonorScoreGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HonorScoreGroupByArgs['orderBy'] }
        : { orderBy?: HonorScoreGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, HonorScoreGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHonorScoreGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the HonorScore model
   */
  readonly fields: HonorScoreFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for HonorScore.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__HonorScoreClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    arbiter<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the HonorScore model
   */
  interface HonorScoreFieldRefs {
    readonly arbiterId: FieldRef<"HonorScore", 'Int'>
    readonly totalUpvotes: FieldRef<"HonorScore", 'Int'>
    readonly totalDownvotes: FieldRef<"HonorScore", 'Int'>
    readonly score: FieldRef<"HonorScore", 'Float'>
    readonly createdAt: FieldRef<"HonorScore", 'DateTime'>
    readonly updatedAt: FieldRef<"HonorScore", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * HonorScore findUnique
   */
  export type HonorScoreFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HonorScore
     */
    select?: HonorScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HonorScore
     */
    omit?: HonorScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HonorScoreInclude<ExtArgs> | null
    /**
     * Filter, which HonorScore to fetch.
     */
    where: HonorScoreWhereUniqueInput
  }

  /**
   * HonorScore findUniqueOrThrow
   */
  export type HonorScoreFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HonorScore
     */
    select?: HonorScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HonorScore
     */
    omit?: HonorScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HonorScoreInclude<ExtArgs> | null
    /**
     * Filter, which HonorScore to fetch.
     */
    where: HonorScoreWhereUniqueInput
  }

  /**
   * HonorScore findFirst
   */
  export type HonorScoreFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HonorScore
     */
    select?: HonorScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HonorScore
     */
    omit?: HonorScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HonorScoreInclude<ExtArgs> | null
    /**
     * Filter, which HonorScore to fetch.
     */
    where?: HonorScoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HonorScores to fetch.
     */
    orderBy?: HonorScoreOrderByWithRelationInput | HonorScoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HonorScores.
     */
    cursor?: HonorScoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HonorScores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HonorScores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HonorScores.
     */
    distinct?: HonorScoreScalarFieldEnum | HonorScoreScalarFieldEnum[]
  }

  /**
   * HonorScore findFirstOrThrow
   */
  export type HonorScoreFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HonorScore
     */
    select?: HonorScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HonorScore
     */
    omit?: HonorScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HonorScoreInclude<ExtArgs> | null
    /**
     * Filter, which HonorScore to fetch.
     */
    where?: HonorScoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HonorScores to fetch.
     */
    orderBy?: HonorScoreOrderByWithRelationInput | HonorScoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HonorScores.
     */
    cursor?: HonorScoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HonorScores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HonorScores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HonorScores.
     */
    distinct?: HonorScoreScalarFieldEnum | HonorScoreScalarFieldEnum[]
  }

  /**
   * HonorScore findMany
   */
  export type HonorScoreFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HonorScore
     */
    select?: HonorScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HonorScore
     */
    omit?: HonorScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HonorScoreInclude<ExtArgs> | null
    /**
     * Filter, which HonorScores to fetch.
     */
    where?: HonorScoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HonorScores to fetch.
     */
    orderBy?: HonorScoreOrderByWithRelationInput | HonorScoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing HonorScores.
     */
    cursor?: HonorScoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HonorScores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HonorScores.
     */
    skip?: number
    distinct?: HonorScoreScalarFieldEnum | HonorScoreScalarFieldEnum[]
  }

  /**
   * HonorScore create
   */
  export type HonorScoreCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HonorScore
     */
    select?: HonorScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HonorScore
     */
    omit?: HonorScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HonorScoreInclude<ExtArgs> | null
    /**
     * The data needed to create a HonorScore.
     */
    data: XOR<HonorScoreCreateInput, HonorScoreUncheckedCreateInput>
  }

  /**
   * HonorScore createMany
   */
  export type HonorScoreCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many HonorScores.
     */
    data: HonorScoreCreateManyInput | HonorScoreCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * HonorScore createManyAndReturn
   */
  export type HonorScoreCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HonorScore
     */
    select?: HonorScoreSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the HonorScore
     */
    omit?: HonorScoreOmit<ExtArgs> | null
    /**
     * The data used to create many HonorScores.
     */
    data: HonorScoreCreateManyInput | HonorScoreCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HonorScoreIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * HonorScore update
   */
  export type HonorScoreUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HonorScore
     */
    select?: HonorScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HonorScore
     */
    omit?: HonorScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HonorScoreInclude<ExtArgs> | null
    /**
     * The data needed to update a HonorScore.
     */
    data: XOR<HonorScoreUpdateInput, HonorScoreUncheckedUpdateInput>
    /**
     * Choose, which HonorScore to update.
     */
    where: HonorScoreWhereUniqueInput
  }

  /**
   * HonorScore updateMany
   */
  export type HonorScoreUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update HonorScores.
     */
    data: XOR<HonorScoreUpdateManyMutationInput, HonorScoreUncheckedUpdateManyInput>
    /**
     * Filter which HonorScores to update
     */
    where?: HonorScoreWhereInput
    /**
     * Limit how many HonorScores to update.
     */
    limit?: number
  }

  /**
   * HonorScore updateManyAndReturn
   */
  export type HonorScoreUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HonorScore
     */
    select?: HonorScoreSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the HonorScore
     */
    omit?: HonorScoreOmit<ExtArgs> | null
    /**
     * The data used to update HonorScores.
     */
    data: XOR<HonorScoreUpdateManyMutationInput, HonorScoreUncheckedUpdateManyInput>
    /**
     * Filter which HonorScores to update
     */
    where?: HonorScoreWhereInput
    /**
     * Limit how many HonorScores to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HonorScoreIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * HonorScore upsert
   */
  export type HonorScoreUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HonorScore
     */
    select?: HonorScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HonorScore
     */
    omit?: HonorScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HonorScoreInclude<ExtArgs> | null
    /**
     * The filter to search for the HonorScore to update in case it exists.
     */
    where: HonorScoreWhereUniqueInput
    /**
     * In case the HonorScore found by the `where` argument doesn't exist, create a new HonorScore with this data.
     */
    create: XOR<HonorScoreCreateInput, HonorScoreUncheckedCreateInput>
    /**
     * In case the HonorScore was found with the provided `where` argument, update it with this data.
     */
    update: XOR<HonorScoreUpdateInput, HonorScoreUncheckedUpdateInput>
  }

  /**
   * HonorScore delete
   */
  export type HonorScoreDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HonorScore
     */
    select?: HonorScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HonorScore
     */
    omit?: HonorScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HonorScoreInclude<ExtArgs> | null
    /**
     * Filter which HonorScore to delete.
     */
    where: HonorScoreWhereUniqueInput
  }

  /**
   * HonorScore deleteMany
   */
  export type HonorScoreDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HonorScores to delete
     */
    where?: HonorScoreWhereInput
    /**
     * Limit how many HonorScores to delete.
     */
    limit?: number
  }

  /**
   * HonorScore without action
   */
  export type HonorScoreDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HonorScore
     */
    select?: HonorScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HonorScore
     */
    omit?: HonorScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HonorScoreInclude<ExtArgs> | null
  }


  /**
   * Model WorldIdVerification
   */

  export type AggregateWorldIdVerification = {
    _count: WorldIdVerificationCountAggregateOutputType | null
    _avg: WorldIdVerificationAvgAggregateOutputType | null
    _sum: WorldIdVerificationSumAggregateOutputType | null
    _min: WorldIdVerificationMinAggregateOutputType | null
    _max: WorldIdVerificationMaxAggregateOutputType | null
  }

  export type WorldIdVerificationAvgAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type WorldIdVerificationSumAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type WorldIdVerificationMinAggregateOutputType = {
    id: number | null
    userId: number | null
    action: string | null
    nullifierHash: string | null
    verificationLevel: string | null
    createdAt: Date | null
  }

  export type WorldIdVerificationMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    action: string | null
    nullifierHash: string | null
    verificationLevel: string | null
    createdAt: Date | null
  }

  export type WorldIdVerificationCountAggregateOutputType = {
    id: number
    userId: number
    action: number
    nullifierHash: number
    verificationLevel: number
    createdAt: number
    _all: number
  }


  export type WorldIdVerificationAvgAggregateInputType = {
    id?: true
    userId?: true
  }

  export type WorldIdVerificationSumAggregateInputType = {
    id?: true
    userId?: true
  }

  export type WorldIdVerificationMinAggregateInputType = {
    id?: true
    userId?: true
    action?: true
    nullifierHash?: true
    verificationLevel?: true
    createdAt?: true
  }

  export type WorldIdVerificationMaxAggregateInputType = {
    id?: true
    userId?: true
    action?: true
    nullifierHash?: true
    verificationLevel?: true
    createdAt?: true
  }

  export type WorldIdVerificationCountAggregateInputType = {
    id?: true
    userId?: true
    action?: true
    nullifierHash?: true
    verificationLevel?: true
    createdAt?: true
    _all?: true
  }

  export type WorldIdVerificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorldIdVerification to aggregate.
     */
    where?: WorldIdVerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorldIdVerifications to fetch.
     */
    orderBy?: WorldIdVerificationOrderByWithRelationInput | WorldIdVerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WorldIdVerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorldIdVerifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorldIdVerifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WorldIdVerifications
    **/
    _count?: true | WorldIdVerificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WorldIdVerificationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WorldIdVerificationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WorldIdVerificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WorldIdVerificationMaxAggregateInputType
  }

  export type GetWorldIdVerificationAggregateType<T extends WorldIdVerificationAggregateArgs> = {
        [P in keyof T & keyof AggregateWorldIdVerification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWorldIdVerification[P]>
      : GetScalarType<T[P], AggregateWorldIdVerification[P]>
  }




  export type WorldIdVerificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorldIdVerificationWhereInput
    orderBy?: WorldIdVerificationOrderByWithAggregationInput | WorldIdVerificationOrderByWithAggregationInput[]
    by: WorldIdVerificationScalarFieldEnum[] | WorldIdVerificationScalarFieldEnum
    having?: WorldIdVerificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WorldIdVerificationCountAggregateInputType | true
    _avg?: WorldIdVerificationAvgAggregateInputType
    _sum?: WorldIdVerificationSumAggregateInputType
    _min?: WorldIdVerificationMinAggregateInputType
    _max?: WorldIdVerificationMaxAggregateInputType
  }

  export type WorldIdVerificationGroupByOutputType = {
    id: number
    userId: number
    action: string
    nullifierHash: string
    verificationLevel: string
    createdAt: Date
    _count: WorldIdVerificationCountAggregateOutputType | null
    _avg: WorldIdVerificationAvgAggregateOutputType | null
    _sum: WorldIdVerificationSumAggregateOutputType | null
    _min: WorldIdVerificationMinAggregateOutputType | null
    _max: WorldIdVerificationMaxAggregateOutputType | null
  }

  type GetWorldIdVerificationGroupByPayload<T extends WorldIdVerificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WorldIdVerificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WorldIdVerificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WorldIdVerificationGroupByOutputType[P]>
            : GetScalarType<T[P], WorldIdVerificationGroupByOutputType[P]>
        }
      >
    >


  export type WorldIdVerificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    action?: boolean
    nullifierHash?: boolean
    verificationLevel?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["worldIdVerification"]>

  export type WorldIdVerificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    action?: boolean
    nullifierHash?: boolean
    verificationLevel?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["worldIdVerification"]>

  export type WorldIdVerificationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    action?: boolean
    nullifierHash?: boolean
    verificationLevel?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["worldIdVerification"]>

  export type WorldIdVerificationSelectScalar = {
    id?: boolean
    userId?: boolean
    action?: boolean
    nullifierHash?: boolean
    verificationLevel?: boolean
    createdAt?: boolean
  }

  export type WorldIdVerificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "action" | "nullifierHash" | "verificationLevel" | "createdAt", ExtArgs["result"]["worldIdVerification"]>
  export type WorldIdVerificationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type WorldIdVerificationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type WorldIdVerificationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $WorldIdVerificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WorldIdVerification"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      action: string
      nullifierHash: string
      verificationLevel: string
      createdAt: Date
    }, ExtArgs["result"]["worldIdVerification"]>
    composites: {}
  }

  type WorldIdVerificationGetPayload<S extends boolean | null | undefined | WorldIdVerificationDefaultArgs> = $Result.GetResult<Prisma.$WorldIdVerificationPayload, S>

  type WorldIdVerificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WorldIdVerificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WorldIdVerificationCountAggregateInputType | true
    }

  export interface WorldIdVerificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WorldIdVerification'], meta: { name: 'WorldIdVerification' } }
    /**
     * Find zero or one WorldIdVerification that matches the filter.
     * @param {WorldIdVerificationFindUniqueArgs} args - Arguments to find a WorldIdVerification
     * @example
     * // Get one WorldIdVerification
     * const worldIdVerification = await prisma.worldIdVerification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WorldIdVerificationFindUniqueArgs>(args: SelectSubset<T, WorldIdVerificationFindUniqueArgs<ExtArgs>>): Prisma__WorldIdVerificationClient<$Result.GetResult<Prisma.$WorldIdVerificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WorldIdVerification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WorldIdVerificationFindUniqueOrThrowArgs} args - Arguments to find a WorldIdVerification
     * @example
     * // Get one WorldIdVerification
     * const worldIdVerification = await prisma.worldIdVerification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WorldIdVerificationFindUniqueOrThrowArgs>(args: SelectSubset<T, WorldIdVerificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WorldIdVerificationClient<$Result.GetResult<Prisma.$WorldIdVerificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WorldIdVerification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorldIdVerificationFindFirstArgs} args - Arguments to find a WorldIdVerification
     * @example
     * // Get one WorldIdVerification
     * const worldIdVerification = await prisma.worldIdVerification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WorldIdVerificationFindFirstArgs>(args?: SelectSubset<T, WorldIdVerificationFindFirstArgs<ExtArgs>>): Prisma__WorldIdVerificationClient<$Result.GetResult<Prisma.$WorldIdVerificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WorldIdVerification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorldIdVerificationFindFirstOrThrowArgs} args - Arguments to find a WorldIdVerification
     * @example
     * // Get one WorldIdVerification
     * const worldIdVerification = await prisma.worldIdVerification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WorldIdVerificationFindFirstOrThrowArgs>(args?: SelectSubset<T, WorldIdVerificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__WorldIdVerificationClient<$Result.GetResult<Prisma.$WorldIdVerificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WorldIdVerifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorldIdVerificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WorldIdVerifications
     * const worldIdVerifications = await prisma.worldIdVerification.findMany()
     * 
     * // Get first 10 WorldIdVerifications
     * const worldIdVerifications = await prisma.worldIdVerification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const worldIdVerificationWithIdOnly = await prisma.worldIdVerification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WorldIdVerificationFindManyArgs>(args?: SelectSubset<T, WorldIdVerificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorldIdVerificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WorldIdVerification.
     * @param {WorldIdVerificationCreateArgs} args - Arguments to create a WorldIdVerification.
     * @example
     * // Create one WorldIdVerification
     * const WorldIdVerification = await prisma.worldIdVerification.create({
     *   data: {
     *     // ... data to create a WorldIdVerification
     *   }
     * })
     * 
     */
    create<T extends WorldIdVerificationCreateArgs>(args: SelectSubset<T, WorldIdVerificationCreateArgs<ExtArgs>>): Prisma__WorldIdVerificationClient<$Result.GetResult<Prisma.$WorldIdVerificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WorldIdVerifications.
     * @param {WorldIdVerificationCreateManyArgs} args - Arguments to create many WorldIdVerifications.
     * @example
     * // Create many WorldIdVerifications
     * const worldIdVerification = await prisma.worldIdVerification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WorldIdVerificationCreateManyArgs>(args?: SelectSubset<T, WorldIdVerificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WorldIdVerifications and returns the data saved in the database.
     * @param {WorldIdVerificationCreateManyAndReturnArgs} args - Arguments to create many WorldIdVerifications.
     * @example
     * // Create many WorldIdVerifications
     * const worldIdVerification = await prisma.worldIdVerification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WorldIdVerifications and only return the `id`
     * const worldIdVerificationWithIdOnly = await prisma.worldIdVerification.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WorldIdVerificationCreateManyAndReturnArgs>(args?: SelectSubset<T, WorldIdVerificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorldIdVerificationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WorldIdVerification.
     * @param {WorldIdVerificationDeleteArgs} args - Arguments to delete one WorldIdVerification.
     * @example
     * // Delete one WorldIdVerification
     * const WorldIdVerification = await prisma.worldIdVerification.delete({
     *   where: {
     *     // ... filter to delete one WorldIdVerification
     *   }
     * })
     * 
     */
    delete<T extends WorldIdVerificationDeleteArgs>(args: SelectSubset<T, WorldIdVerificationDeleteArgs<ExtArgs>>): Prisma__WorldIdVerificationClient<$Result.GetResult<Prisma.$WorldIdVerificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WorldIdVerification.
     * @param {WorldIdVerificationUpdateArgs} args - Arguments to update one WorldIdVerification.
     * @example
     * // Update one WorldIdVerification
     * const worldIdVerification = await prisma.worldIdVerification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WorldIdVerificationUpdateArgs>(args: SelectSubset<T, WorldIdVerificationUpdateArgs<ExtArgs>>): Prisma__WorldIdVerificationClient<$Result.GetResult<Prisma.$WorldIdVerificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WorldIdVerifications.
     * @param {WorldIdVerificationDeleteManyArgs} args - Arguments to filter WorldIdVerifications to delete.
     * @example
     * // Delete a few WorldIdVerifications
     * const { count } = await prisma.worldIdVerification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WorldIdVerificationDeleteManyArgs>(args?: SelectSubset<T, WorldIdVerificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WorldIdVerifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorldIdVerificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WorldIdVerifications
     * const worldIdVerification = await prisma.worldIdVerification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WorldIdVerificationUpdateManyArgs>(args: SelectSubset<T, WorldIdVerificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WorldIdVerifications and returns the data updated in the database.
     * @param {WorldIdVerificationUpdateManyAndReturnArgs} args - Arguments to update many WorldIdVerifications.
     * @example
     * // Update many WorldIdVerifications
     * const worldIdVerification = await prisma.worldIdVerification.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WorldIdVerifications and only return the `id`
     * const worldIdVerificationWithIdOnly = await prisma.worldIdVerification.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WorldIdVerificationUpdateManyAndReturnArgs>(args: SelectSubset<T, WorldIdVerificationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorldIdVerificationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WorldIdVerification.
     * @param {WorldIdVerificationUpsertArgs} args - Arguments to update or create a WorldIdVerification.
     * @example
     * // Update or create a WorldIdVerification
     * const worldIdVerification = await prisma.worldIdVerification.upsert({
     *   create: {
     *     // ... data to create a WorldIdVerification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WorldIdVerification we want to update
     *   }
     * })
     */
    upsert<T extends WorldIdVerificationUpsertArgs>(args: SelectSubset<T, WorldIdVerificationUpsertArgs<ExtArgs>>): Prisma__WorldIdVerificationClient<$Result.GetResult<Prisma.$WorldIdVerificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WorldIdVerifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorldIdVerificationCountArgs} args - Arguments to filter WorldIdVerifications to count.
     * @example
     * // Count the number of WorldIdVerifications
     * const count = await prisma.worldIdVerification.count({
     *   where: {
     *     // ... the filter for the WorldIdVerifications we want to count
     *   }
     * })
    **/
    count<T extends WorldIdVerificationCountArgs>(
      args?: Subset<T, WorldIdVerificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WorldIdVerificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WorldIdVerification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorldIdVerificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends WorldIdVerificationAggregateArgs>(args: Subset<T, WorldIdVerificationAggregateArgs>): Prisma.PrismaPromise<GetWorldIdVerificationAggregateType<T>>

    /**
     * Group by WorldIdVerification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorldIdVerificationGroupByArgs} args - Group by arguments.
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
      T extends WorldIdVerificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WorldIdVerificationGroupByArgs['orderBy'] }
        : { orderBy?: WorldIdVerificationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, WorldIdVerificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorldIdVerificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WorldIdVerification model
   */
  readonly fields: WorldIdVerificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WorldIdVerification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WorldIdVerificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the WorldIdVerification model
   */
  interface WorldIdVerificationFieldRefs {
    readonly id: FieldRef<"WorldIdVerification", 'Int'>
    readonly userId: FieldRef<"WorldIdVerification", 'Int'>
    readonly action: FieldRef<"WorldIdVerification", 'String'>
    readonly nullifierHash: FieldRef<"WorldIdVerification", 'String'>
    readonly verificationLevel: FieldRef<"WorldIdVerification", 'String'>
    readonly createdAt: FieldRef<"WorldIdVerification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WorldIdVerification findUnique
   */
  export type WorldIdVerificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorldIdVerification
     */
    select?: WorldIdVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorldIdVerification
     */
    omit?: WorldIdVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorldIdVerificationInclude<ExtArgs> | null
    /**
     * Filter, which WorldIdVerification to fetch.
     */
    where: WorldIdVerificationWhereUniqueInput
  }

  /**
   * WorldIdVerification findUniqueOrThrow
   */
  export type WorldIdVerificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorldIdVerification
     */
    select?: WorldIdVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorldIdVerification
     */
    omit?: WorldIdVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorldIdVerificationInclude<ExtArgs> | null
    /**
     * Filter, which WorldIdVerification to fetch.
     */
    where: WorldIdVerificationWhereUniqueInput
  }

  /**
   * WorldIdVerification findFirst
   */
  export type WorldIdVerificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorldIdVerification
     */
    select?: WorldIdVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorldIdVerification
     */
    omit?: WorldIdVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorldIdVerificationInclude<ExtArgs> | null
    /**
     * Filter, which WorldIdVerification to fetch.
     */
    where?: WorldIdVerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorldIdVerifications to fetch.
     */
    orderBy?: WorldIdVerificationOrderByWithRelationInput | WorldIdVerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorldIdVerifications.
     */
    cursor?: WorldIdVerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorldIdVerifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorldIdVerifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorldIdVerifications.
     */
    distinct?: WorldIdVerificationScalarFieldEnum | WorldIdVerificationScalarFieldEnum[]
  }

  /**
   * WorldIdVerification findFirstOrThrow
   */
  export type WorldIdVerificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorldIdVerification
     */
    select?: WorldIdVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorldIdVerification
     */
    omit?: WorldIdVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorldIdVerificationInclude<ExtArgs> | null
    /**
     * Filter, which WorldIdVerification to fetch.
     */
    where?: WorldIdVerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorldIdVerifications to fetch.
     */
    orderBy?: WorldIdVerificationOrderByWithRelationInput | WorldIdVerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorldIdVerifications.
     */
    cursor?: WorldIdVerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorldIdVerifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorldIdVerifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorldIdVerifications.
     */
    distinct?: WorldIdVerificationScalarFieldEnum | WorldIdVerificationScalarFieldEnum[]
  }

  /**
   * WorldIdVerification findMany
   */
  export type WorldIdVerificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorldIdVerification
     */
    select?: WorldIdVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorldIdVerification
     */
    omit?: WorldIdVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorldIdVerificationInclude<ExtArgs> | null
    /**
     * Filter, which WorldIdVerifications to fetch.
     */
    where?: WorldIdVerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorldIdVerifications to fetch.
     */
    orderBy?: WorldIdVerificationOrderByWithRelationInput | WorldIdVerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WorldIdVerifications.
     */
    cursor?: WorldIdVerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorldIdVerifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorldIdVerifications.
     */
    skip?: number
    distinct?: WorldIdVerificationScalarFieldEnum | WorldIdVerificationScalarFieldEnum[]
  }

  /**
   * WorldIdVerification create
   */
  export type WorldIdVerificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorldIdVerification
     */
    select?: WorldIdVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorldIdVerification
     */
    omit?: WorldIdVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorldIdVerificationInclude<ExtArgs> | null
    /**
     * The data needed to create a WorldIdVerification.
     */
    data: XOR<WorldIdVerificationCreateInput, WorldIdVerificationUncheckedCreateInput>
  }

  /**
   * WorldIdVerification createMany
   */
  export type WorldIdVerificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WorldIdVerifications.
     */
    data: WorldIdVerificationCreateManyInput | WorldIdVerificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WorldIdVerification createManyAndReturn
   */
  export type WorldIdVerificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorldIdVerification
     */
    select?: WorldIdVerificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WorldIdVerification
     */
    omit?: WorldIdVerificationOmit<ExtArgs> | null
    /**
     * The data used to create many WorldIdVerifications.
     */
    data: WorldIdVerificationCreateManyInput | WorldIdVerificationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorldIdVerificationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * WorldIdVerification update
   */
  export type WorldIdVerificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorldIdVerification
     */
    select?: WorldIdVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorldIdVerification
     */
    omit?: WorldIdVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorldIdVerificationInclude<ExtArgs> | null
    /**
     * The data needed to update a WorldIdVerification.
     */
    data: XOR<WorldIdVerificationUpdateInput, WorldIdVerificationUncheckedUpdateInput>
    /**
     * Choose, which WorldIdVerification to update.
     */
    where: WorldIdVerificationWhereUniqueInput
  }

  /**
   * WorldIdVerification updateMany
   */
  export type WorldIdVerificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WorldIdVerifications.
     */
    data: XOR<WorldIdVerificationUpdateManyMutationInput, WorldIdVerificationUncheckedUpdateManyInput>
    /**
     * Filter which WorldIdVerifications to update
     */
    where?: WorldIdVerificationWhereInput
    /**
     * Limit how many WorldIdVerifications to update.
     */
    limit?: number
  }

  /**
   * WorldIdVerification updateManyAndReturn
   */
  export type WorldIdVerificationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorldIdVerification
     */
    select?: WorldIdVerificationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WorldIdVerification
     */
    omit?: WorldIdVerificationOmit<ExtArgs> | null
    /**
     * The data used to update WorldIdVerifications.
     */
    data: XOR<WorldIdVerificationUpdateManyMutationInput, WorldIdVerificationUncheckedUpdateManyInput>
    /**
     * Filter which WorldIdVerifications to update
     */
    where?: WorldIdVerificationWhereInput
    /**
     * Limit how many WorldIdVerifications to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorldIdVerificationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * WorldIdVerification upsert
   */
  export type WorldIdVerificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorldIdVerification
     */
    select?: WorldIdVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorldIdVerification
     */
    omit?: WorldIdVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorldIdVerificationInclude<ExtArgs> | null
    /**
     * The filter to search for the WorldIdVerification to update in case it exists.
     */
    where: WorldIdVerificationWhereUniqueInput
    /**
     * In case the WorldIdVerification found by the `where` argument doesn't exist, create a new WorldIdVerification with this data.
     */
    create: XOR<WorldIdVerificationCreateInput, WorldIdVerificationUncheckedCreateInput>
    /**
     * In case the WorldIdVerification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WorldIdVerificationUpdateInput, WorldIdVerificationUncheckedUpdateInput>
  }

  /**
   * WorldIdVerification delete
   */
  export type WorldIdVerificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorldIdVerification
     */
    select?: WorldIdVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorldIdVerification
     */
    omit?: WorldIdVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorldIdVerificationInclude<ExtArgs> | null
    /**
     * Filter which WorldIdVerification to delete.
     */
    where: WorldIdVerificationWhereUniqueInput
  }

  /**
   * WorldIdVerification deleteMany
   */
  export type WorldIdVerificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorldIdVerifications to delete
     */
    where?: WorldIdVerificationWhereInput
    /**
     * Limit how many WorldIdVerifications to delete.
     */
    limit?: number
  }

  /**
   * WorldIdVerification without action
   */
  export type WorldIdVerificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorldIdVerification
     */
    select?: WorldIdVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorldIdVerification
     */
    omit?: WorldIdVerificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorldIdVerificationInclude<ExtArgs> | null
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


  export const UserScalarFieldEnum: {
    id: 'id',
    username: 'username',
    address: 'address',
    pfp: 'pfp',
    worldIdVerified: 'worldIdVerified',
    worldIdLevel: 'worldIdLevel',
    totalPoints: 'totalPoints',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const PoolScalarFieldEnum: {
    id: 'id',
    contractId: 'contractId',
    title: 'title',
    description: 'description',
    image: 'image',
    creatorId: 'creatorId',
    arbiterId: 'arbiterId',
    arbiterAddress: 'arbiterAddress',
    arbiterAccepted: 'arbiterAccepted',
    arbiterFee: 'arbiterFee',
    collateral: 'collateral',
    minJoustAmount: 'minJoustAmount',
    totalAmountJousted: 'totalAmountJousted',
    supportedJoustTypes: 'supportedJoustTypes',
    winningJoustType: 'winningJoustType',
    state: 'state',
    endTime: 'endTime',
    contractEndTime: 'contractEndTime',
    deployedAt: 'deployedAt',
    closedAt: 'closedAt',
    settledAt: 'settledAt',
    refundedAt: 'refundedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PoolScalarFieldEnum = (typeof PoolScalarFieldEnum)[keyof typeof PoolScalarFieldEnum]


  export const PoolOptionScalarFieldEnum: {
    id: 'id',
    poolId: 'poolId',
    joustType: 'joustType',
    label: 'label',
    orderIndex: 'orderIndex',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PoolOptionScalarFieldEnum = (typeof PoolOptionScalarFieldEnum)[keyof typeof PoolOptionScalarFieldEnum]


  export const JoustScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    poolId: 'poolId',
    joustType: 'joustType',
    amount: 'amount',
    isWinner: 'isWinner',
    txHash: 'txHash',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type JoustScalarFieldEnum = (typeof JoustScalarFieldEnum)[keyof typeof JoustScalarFieldEnum]


  export const NotificationScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    type: 'type',
    title: 'title',
    body: 'body',
    poolId: 'poolId',
    read: 'read',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum]


  export const HonorVoteScalarFieldEnum: {
    id: 'id',
    voterId: 'voterId',
    arbiterId: 'arbiterId',
    poolId: 'poolId',
    voteType: 'voteType',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type HonorVoteScalarFieldEnum = (typeof HonorVoteScalarFieldEnum)[keyof typeof HonorVoteScalarFieldEnum]


  export const HonorScoreScalarFieldEnum: {
    arbiterId: 'arbiterId',
    totalUpvotes: 'totalUpvotes',
    totalDownvotes: 'totalDownvotes',
    score: 'score',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type HonorScoreScalarFieldEnum = (typeof HonorScoreScalarFieldEnum)[keyof typeof HonorScoreScalarFieldEnum]


  export const WorldIdVerificationScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    action: 'action',
    nullifierHash: 'nullifierHash',
    verificationLevel: 'verificationLevel',
    createdAt: 'createdAt'
  };

  export type WorldIdVerificationScalarFieldEnum = (typeof WorldIdVerificationScalarFieldEnum)[keyof typeof WorldIdVerificationScalarFieldEnum]


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
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'PoolState'
   */
  export type EnumPoolStateFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PoolState'>
    


  /**
   * Reference to a field of type 'PoolState[]'
   */
  export type ListEnumPoolStateFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PoolState[]'>
    


  /**
   * Reference to a field of type 'NotificationType'
   */
  export type EnumNotificationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationType'>
    


  /**
   * Reference to a field of type 'NotificationType[]'
   */
  export type ListEnumNotificationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationType[]'>
    


  /**
   * Reference to a field of type 'HonorVoteType'
   */
  export type EnumHonorVoteTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'HonorVoteType'>
    


  /**
   * Reference to a field of type 'HonorVoteType[]'
   */
  export type ListEnumHonorVoteTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'HonorVoteType[]'>
    


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


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    username?: StringFilter<"User"> | string
    address?: StringFilter<"User"> | string
    pfp?: StringNullableFilter<"User"> | string | null
    worldIdVerified?: BoolFilter<"User"> | boolean
    worldIdLevel?: StringNullableFilter<"User"> | string | null
    totalPoints?: IntFilter<"User"> | number
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    createdPools?: PoolListRelationFilter
    arbitratedPools?: PoolListRelationFilter
    jousts?: JoustListRelationFilter
    notifications?: NotificationListRelationFilter
    votesCast?: HonorVoteListRelationFilter
    votesReceived?: HonorVoteListRelationFilter
    honorScore?: XOR<HonorScoreNullableScalarRelationFilter, HonorScoreWhereInput> | null
    worldIdVerifications?: WorldIdVerificationListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    address?: SortOrder
    pfp?: SortOrderInput | SortOrder
    worldIdVerified?: SortOrder
    worldIdLevel?: SortOrderInput | SortOrder
    totalPoints?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdPools?: PoolOrderByRelationAggregateInput
    arbitratedPools?: PoolOrderByRelationAggregateInput
    jousts?: JoustOrderByRelationAggregateInput
    notifications?: NotificationOrderByRelationAggregateInput
    votesCast?: HonorVoteOrderByRelationAggregateInput
    votesReceived?: HonorVoteOrderByRelationAggregateInput
    honorScore?: HonorScoreOrderByWithRelationInput
    worldIdVerifications?: WorldIdVerificationOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    username?: string
    address?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    pfp?: StringNullableFilter<"User"> | string | null
    worldIdVerified?: BoolFilter<"User"> | boolean
    worldIdLevel?: StringNullableFilter<"User"> | string | null
    totalPoints?: IntFilter<"User"> | number
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    createdPools?: PoolListRelationFilter
    arbitratedPools?: PoolListRelationFilter
    jousts?: JoustListRelationFilter
    notifications?: NotificationListRelationFilter
    votesCast?: HonorVoteListRelationFilter
    votesReceived?: HonorVoteListRelationFilter
    honorScore?: XOR<HonorScoreNullableScalarRelationFilter, HonorScoreWhereInput> | null
    worldIdVerifications?: WorldIdVerificationListRelationFilter
  }, "id" | "username" | "address">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    address?: SortOrder
    pfp?: SortOrderInput | SortOrder
    worldIdVerified?: SortOrder
    worldIdLevel?: SortOrderInput | SortOrder
    totalPoints?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    username?: StringWithAggregatesFilter<"User"> | string
    address?: StringWithAggregatesFilter<"User"> | string
    pfp?: StringNullableWithAggregatesFilter<"User"> | string | null
    worldIdVerified?: BoolWithAggregatesFilter<"User"> | boolean
    worldIdLevel?: StringNullableWithAggregatesFilter<"User"> | string | null
    totalPoints?: IntWithAggregatesFilter<"User"> | number
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type PoolWhereInput = {
    AND?: PoolWhereInput | PoolWhereInput[]
    OR?: PoolWhereInput[]
    NOT?: PoolWhereInput | PoolWhereInput[]
    id?: UuidFilter<"Pool"> | string
    contractId?: BigIntNullableFilter<"Pool"> | bigint | number | null
    title?: StringFilter<"Pool"> | string
    description?: StringNullableFilter<"Pool"> | string | null
    image?: StringNullableFilter<"Pool"> | string | null
    creatorId?: IntFilter<"Pool"> | number
    arbiterId?: IntNullableFilter<"Pool"> | number | null
    arbiterAddress?: StringFilter<"Pool"> | string
    arbiterAccepted?: BoolFilter<"Pool"> | boolean
    arbiterFee?: IntFilter<"Pool"> | number
    collateral?: StringFilter<"Pool"> | string
    minJoustAmount?: BigIntFilter<"Pool"> | bigint | number
    totalAmountJousted?: BigIntFilter<"Pool"> | bigint | number
    supportedJoustTypes?: IntFilter<"Pool"> | number
    winningJoustType?: IntFilter<"Pool"> | number
    state?: EnumPoolStateFilter<"Pool"> | $Enums.PoolState
    endTime?: DateTimeFilter<"Pool"> | Date | string
    contractEndTime?: IntFilter<"Pool"> | number
    deployedAt?: DateTimeNullableFilter<"Pool"> | Date | string | null
    closedAt?: DateTimeNullableFilter<"Pool"> | Date | string | null
    settledAt?: DateTimeNullableFilter<"Pool"> | Date | string | null
    refundedAt?: DateTimeNullableFilter<"Pool"> | Date | string | null
    createdAt?: DateTimeFilter<"Pool"> | Date | string
    updatedAt?: DateTimeFilter<"Pool"> | Date | string
    creator?: XOR<UserScalarRelationFilter, UserWhereInput>
    arbiter?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    jousts?: JoustListRelationFilter
    options?: PoolOptionListRelationFilter
    notifications?: NotificationListRelationFilter
    honorVotes?: HonorVoteListRelationFilter
  }

  export type PoolOrderByWithRelationInput = {
    id?: SortOrder
    contractId?: SortOrderInput | SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    creatorId?: SortOrder
    arbiterId?: SortOrderInput | SortOrder
    arbiterAddress?: SortOrder
    arbiterAccepted?: SortOrder
    arbiterFee?: SortOrder
    collateral?: SortOrder
    minJoustAmount?: SortOrder
    totalAmountJousted?: SortOrder
    supportedJoustTypes?: SortOrder
    winningJoustType?: SortOrder
    state?: SortOrder
    endTime?: SortOrder
    contractEndTime?: SortOrder
    deployedAt?: SortOrderInput | SortOrder
    closedAt?: SortOrderInput | SortOrder
    settledAt?: SortOrderInput | SortOrder
    refundedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    creator?: UserOrderByWithRelationInput
    arbiter?: UserOrderByWithRelationInput
    jousts?: JoustOrderByRelationAggregateInput
    options?: PoolOptionOrderByRelationAggregateInput
    notifications?: NotificationOrderByRelationAggregateInput
    honorVotes?: HonorVoteOrderByRelationAggregateInput
  }

  export type PoolWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    contractId?: bigint | number
    AND?: PoolWhereInput | PoolWhereInput[]
    OR?: PoolWhereInput[]
    NOT?: PoolWhereInput | PoolWhereInput[]
    title?: StringFilter<"Pool"> | string
    description?: StringNullableFilter<"Pool"> | string | null
    image?: StringNullableFilter<"Pool"> | string | null
    creatorId?: IntFilter<"Pool"> | number
    arbiterId?: IntNullableFilter<"Pool"> | number | null
    arbiterAddress?: StringFilter<"Pool"> | string
    arbiterAccepted?: BoolFilter<"Pool"> | boolean
    arbiterFee?: IntFilter<"Pool"> | number
    collateral?: StringFilter<"Pool"> | string
    minJoustAmount?: BigIntFilter<"Pool"> | bigint | number
    totalAmountJousted?: BigIntFilter<"Pool"> | bigint | number
    supportedJoustTypes?: IntFilter<"Pool"> | number
    winningJoustType?: IntFilter<"Pool"> | number
    state?: EnumPoolStateFilter<"Pool"> | $Enums.PoolState
    endTime?: DateTimeFilter<"Pool"> | Date | string
    contractEndTime?: IntFilter<"Pool"> | number
    deployedAt?: DateTimeNullableFilter<"Pool"> | Date | string | null
    closedAt?: DateTimeNullableFilter<"Pool"> | Date | string | null
    settledAt?: DateTimeNullableFilter<"Pool"> | Date | string | null
    refundedAt?: DateTimeNullableFilter<"Pool"> | Date | string | null
    createdAt?: DateTimeFilter<"Pool"> | Date | string
    updatedAt?: DateTimeFilter<"Pool"> | Date | string
    creator?: XOR<UserScalarRelationFilter, UserWhereInput>
    arbiter?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    jousts?: JoustListRelationFilter
    options?: PoolOptionListRelationFilter
    notifications?: NotificationListRelationFilter
    honorVotes?: HonorVoteListRelationFilter
  }, "id" | "contractId">

  export type PoolOrderByWithAggregationInput = {
    id?: SortOrder
    contractId?: SortOrderInput | SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    creatorId?: SortOrder
    arbiterId?: SortOrderInput | SortOrder
    arbiterAddress?: SortOrder
    arbiterAccepted?: SortOrder
    arbiterFee?: SortOrder
    collateral?: SortOrder
    minJoustAmount?: SortOrder
    totalAmountJousted?: SortOrder
    supportedJoustTypes?: SortOrder
    winningJoustType?: SortOrder
    state?: SortOrder
    endTime?: SortOrder
    contractEndTime?: SortOrder
    deployedAt?: SortOrderInput | SortOrder
    closedAt?: SortOrderInput | SortOrder
    settledAt?: SortOrderInput | SortOrder
    refundedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PoolCountOrderByAggregateInput
    _avg?: PoolAvgOrderByAggregateInput
    _max?: PoolMaxOrderByAggregateInput
    _min?: PoolMinOrderByAggregateInput
    _sum?: PoolSumOrderByAggregateInput
  }

  export type PoolScalarWhereWithAggregatesInput = {
    AND?: PoolScalarWhereWithAggregatesInput | PoolScalarWhereWithAggregatesInput[]
    OR?: PoolScalarWhereWithAggregatesInput[]
    NOT?: PoolScalarWhereWithAggregatesInput | PoolScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Pool"> | string
    contractId?: BigIntNullableWithAggregatesFilter<"Pool"> | bigint | number | null
    title?: StringWithAggregatesFilter<"Pool"> | string
    description?: StringNullableWithAggregatesFilter<"Pool"> | string | null
    image?: StringNullableWithAggregatesFilter<"Pool"> | string | null
    creatorId?: IntWithAggregatesFilter<"Pool"> | number
    arbiterId?: IntNullableWithAggregatesFilter<"Pool"> | number | null
    arbiterAddress?: StringWithAggregatesFilter<"Pool"> | string
    arbiterAccepted?: BoolWithAggregatesFilter<"Pool"> | boolean
    arbiterFee?: IntWithAggregatesFilter<"Pool"> | number
    collateral?: StringWithAggregatesFilter<"Pool"> | string
    minJoustAmount?: BigIntWithAggregatesFilter<"Pool"> | bigint | number
    totalAmountJousted?: BigIntWithAggregatesFilter<"Pool"> | bigint | number
    supportedJoustTypes?: IntWithAggregatesFilter<"Pool"> | number
    winningJoustType?: IntWithAggregatesFilter<"Pool"> | number
    state?: EnumPoolStateWithAggregatesFilter<"Pool"> | $Enums.PoolState
    endTime?: DateTimeWithAggregatesFilter<"Pool"> | Date | string
    contractEndTime?: IntWithAggregatesFilter<"Pool"> | number
    deployedAt?: DateTimeNullableWithAggregatesFilter<"Pool"> | Date | string | null
    closedAt?: DateTimeNullableWithAggregatesFilter<"Pool"> | Date | string | null
    settledAt?: DateTimeNullableWithAggregatesFilter<"Pool"> | Date | string | null
    refundedAt?: DateTimeNullableWithAggregatesFilter<"Pool"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Pool"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Pool"> | Date | string
  }

  export type PoolOptionWhereInput = {
    AND?: PoolOptionWhereInput | PoolOptionWhereInput[]
    OR?: PoolOptionWhereInput[]
    NOT?: PoolOptionWhereInput | PoolOptionWhereInput[]
    id?: IntFilter<"PoolOption"> | number
    poolId?: UuidFilter<"PoolOption"> | string
    joustType?: IntFilter<"PoolOption"> | number
    label?: StringFilter<"PoolOption"> | string
    orderIndex?: IntFilter<"PoolOption"> | number
    createdAt?: DateTimeFilter<"PoolOption"> | Date | string
    updatedAt?: DateTimeFilter<"PoolOption"> | Date | string
    pool?: XOR<PoolScalarRelationFilter, PoolWhereInput>
  }

  export type PoolOptionOrderByWithRelationInput = {
    id?: SortOrder
    poolId?: SortOrder
    joustType?: SortOrder
    label?: SortOrder
    orderIndex?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    pool?: PoolOrderByWithRelationInput
  }

  export type PoolOptionWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    poolId_joustType?: PoolOptionPoolIdJoustTypeCompoundUniqueInput
    poolId_orderIndex?: PoolOptionPoolIdOrderIndexCompoundUniqueInput
    AND?: PoolOptionWhereInput | PoolOptionWhereInput[]
    OR?: PoolOptionWhereInput[]
    NOT?: PoolOptionWhereInput | PoolOptionWhereInput[]
    poolId?: UuidFilter<"PoolOption"> | string
    joustType?: IntFilter<"PoolOption"> | number
    label?: StringFilter<"PoolOption"> | string
    orderIndex?: IntFilter<"PoolOption"> | number
    createdAt?: DateTimeFilter<"PoolOption"> | Date | string
    updatedAt?: DateTimeFilter<"PoolOption"> | Date | string
    pool?: XOR<PoolScalarRelationFilter, PoolWhereInput>
  }, "id" | "poolId_joustType" | "poolId_orderIndex">

  export type PoolOptionOrderByWithAggregationInput = {
    id?: SortOrder
    poolId?: SortOrder
    joustType?: SortOrder
    label?: SortOrder
    orderIndex?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PoolOptionCountOrderByAggregateInput
    _avg?: PoolOptionAvgOrderByAggregateInput
    _max?: PoolOptionMaxOrderByAggregateInput
    _min?: PoolOptionMinOrderByAggregateInput
    _sum?: PoolOptionSumOrderByAggregateInput
  }

  export type PoolOptionScalarWhereWithAggregatesInput = {
    AND?: PoolOptionScalarWhereWithAggregatesInput | PoolOptionScalarWhereWithAggregatesInput[]
    OR?: PoolOptionScalarWhereWithAggregatesInput[]
    NOT?: PoolOptionScalarWhereWithAggregatesInput | PoolOptionScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"PoolOption"> | number
    poolId?: UuidWithAggregatesFilter<"PoolOption"> | string
    joustType?: IntWithAggregatesFilter<"PoolOption"> | number
    label?: StringWithAggregatesFilter<"PoolOption"> | string
    orderIndex?: IntWithAggregatesFilter<"PoolOption"> | number
    createdAt?: DateTimeWithAggregatesFilter<"PoolOption"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PoolOption"> | Date | string
  }

  export type JoustWhereInput = {
    AND?: JoustWhereInput | JoustWhereInput[]
    OR?: JoustWhereInput[]
    NOT?: JoustWhereInput | JoustWhereInput[]
    id?: IntFilter<"Joust"> | number
    userId?: IntFilter<"Joust"> | number
    poolId?: UuidFilter<"Joust"> | string
    joustType?: IntFilter<"Joust"> | number
    amount?: BigIntFilter<"Joust"> | bigint | number
    isWinner?: BoolFilter<"Joust"> | boolean
    txHash?: StringNullableFilter<"Joust"> | string | null
    createdAt?: DateTimeFilter<"Joust"> | Date | string
    updatedAt?: DateTimeFilter<"Joust"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    pool?: XOR<PoolScalarRelationFilter, PoolWhereInput>
  }

  export type JoustOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    poolId?: SortOrder
    joustType?: SortOrder
    amount?: SortOrder
    isWinner?: SortOrder
    txHash?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    pool?: PoolOrderByWithRelationInput
  }

  export type JoustWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: JoustWhereInput | JoustWhereInput[]
    OR?: JoustWhereInput[]
    NOT?: JoustWhereInput | JoustWhereInput[]
    userId?: IntFilter<"Joust"> | number
    poolId?: UuidFilter<"Joust"> | string
    joustType?: IntFilter<"Joust"> | number
    amount?: BigIntFilter<"Joust"> | bigint | number
    isWinner?: BoolFilter<"Joust"> | boolean
    txHash?: StringNullableFilter<"Joust"> | string | null
    createdAt?: DateTimeFilter<"Joust"> | Date | string
    updatedAt?: DateTimeFilter<"Joust"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    pool?: XOR<PoolScalarRelationFilter, PoolWhereInput>
  }, "id">

  export type JoustOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    poolId?: SortOrder
    joustType?: SortOrder
    amount?: SortOrder
    isWinner?: SortOrder
    txHash?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: JoustCountOrderByAggregateInput
    _avg?: JoustAvgOrderByAggregateInput
    _max?: JoustMaxOrderByAggregateInput
    _min?: JoustMinOrderByAggregateInput
    _sum?: JoustSumOrderByAggregateInput
  }

  export type JoustScalarWhereWithAggregatesInput = {
    AND?: JoustScalarWhereWithAggregatesInput | JoustScalarWhereWithAggregatesInput[]
    OR?: JoustScalarWhereWithAggregatesInput[]
    NOT?: JoustScalarWhereWithAggregatesInput | JoustScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Joust"> | number
    userId?: IntWithAggregatesFilter<"Joust"> | number
    poolId?: UuidWithAggregatesFilter<"Joust"> | string
    joustType?: IntWithAggregatesFilter<"Joust"> | number
    amount?: BigIntWithAggregatesFilter<"Joust"> | bigint | number
    isWinner?: BoolWithAggregatesFilter<"Joust"> | boolean
    txHash?: StringNullableWithAggregatesFilter<"Joust"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Joust"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Joust"> | Date | string
  }

  export type NotificationWhereInput = {
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    id?: IntFilter<"Notification"> | number
    userId?: IntFilter<"Notification"> | number
    type?: EnumNotificationTypeFilter<"Notification"> | $Enums.NotificationType
    title?: StringFilter<"Notification"> | string
    body?: StringNullableFilter<"Notification"> | string | null
    poolId?: UuidNullableFilter<"Notification"> | string | null
    read?: BoolFilter<"Notification"> | boolean
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    updatedAt?: DateTimeFilter<"Notification"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    pool?: XOR<PoolNullableScalarRelationFilter, PoolWhereInput> | null
  }

  export type NotificationOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    body?: SortOrderInput | SortOrder
    poolId?: SortOrderInput | SortOrder
    read?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    pool?: PoolOrderByWithRelationInput
  }

  export type NotificationWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    userId?: IntFilter<"Notification"> | number
    type?: EnumNotificationTypeFilter<"Notification"> | $Enums.NotificationType
    title?: StringFilter<"Notification"> | string
    body?: StringNullableFilter<"Notification"> | string | null
    poolId?: UuidNullableFilter<"Notification"> | string | null
    read?: BoolFilter<"Notification"> | boolean
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    updatedAt?: DateTimeFilter<"Notification"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    pool?: XOR<PoolNullableScalarRelationFilter, PoolWhereInput> | null
  }, "id">

  export type NotificationOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    body?: SortOrderInput | SortOrder
    poolId?: SortOrderInput | SortOrder
    read?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: NotificationCountOrderByAggregateInput
    _avg?: NotificationAvgOrderByAggregateInput
    _max?: NotificationMaxOrderByAggregateInput
    _min?: NotificationMinOrderByAggregateInput
    _sum?: NotificationSumOrderByAggregateInput
  }

  export type NotificationScalarWhereWithAggregatesInput = {
    AND?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    OR?: NotificationScalarWhereWithAggregatesInput[]
    NOT?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Notification"> | number
    userId?: IntWithAggregatesFilter<"Notification"> | number
    type?: EnumNotificationTypeWithAggregatesFilter<"Notification"> | $Enums.NotificationType
    title?: StringWithAggregatesFilter<"Notification"> | string
    body?: StringNullableWithAggregatesFilter<"Notification"> | string | null
    poolId?: UuidNullableWithAggregatesFilter<"Notification"> | string | null
    read?: BoolWithAggregatesFilter<"Notification"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Notification"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Notification"> | Date | string
  }

  export type HonorVoteWhereInput = {
    AND?: HonorVoteWhereInput | HonorVoteWhereInput[]
    OR?: HonorVoteWhereInput[]
    NOT?: HonorVoteWhereInput | HonorVoteWhereInput[]
    id?: IntFilter<"HonorVote"> | number
    voterId?: IntFilter<"HonorVote"> | number
    arbiterId?: IntFilter<"HonorVote"> | number
    poolId?: UuidFilter<"HonorVote"> | string
    voteType?: EnumHonorVoteTypeFilter<"HonorVote"> | $Enums.HonorVoteType
    createdAt?: DateTimeFilter<"HonorVote"> | Date | string
    updatedAt?: DateTimeFilter<"HonorVote"> | Date | string
    voter?: XOR<UserScalarRelationFilter, UserWhereInput>
    arbiter?: XOR<UserScalarRelationFilter, UserWhereInput>
    pool?: XOR<PoolScalarRelationFilter, PoolWhereInput>
  }

  export type HonorVoteOrderByWithRelationInput = {
    id?: SortOrder
    voterId?: SortOrder
    arbiterId?: SortOrder
    poolId?: SortOrder
    voteType?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    voter?: UserOrderByWithRelationInput
    arbiter?: UserOrderByWithRelationInput
    pool?: PoolOrderByWithRelationInput
  }

  export type HonorVoteWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    voterId_arbiterId_poolId?: HonorVoteVoterIdArbiterIdPoolIdCompoundUniqueInput
    AND?: HonorVoteWhereInput | HonorVoteWhereInput[]
    OR?: HonorVoteWhereInput[]
    NOT?: HonorVoteWhereInput | HonorVoteWhereInput[]
    voterId?: IntFilter<"HonorVote"> | number
    arbiterId?: IntFilter<"HonorVote"> | number
    poolId?: UuidFilter<"HonorVote"> | string
    voteType?: EnumHonorVoteTypeFilter<"HonorVote"> | $Enums.HonorVoteType
    createdAt?: DateTimeFilter<"HonorVote"> | Date | string
    updatedAt?: DateTimeFilter<"HonorVote"> | Date | string
    voter?: XOR<UserScalarRelationFilter, UserWhereInput>
    arbiter?: XOR<UserScalarRelationFilter, UserWhereInput>
    pool?: XOR<PoolScalarRelationFilter, PoolWhereInput>
  }, "id" | "voterId_arbiterId_poolId">

  export type HonorVoteOrderByWithAggregationInput = {
    id?: SortOrder
    voterId?: SortOrder
    arbiterId?: SortOrder
    poolId?: SortOrder
    voteType?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: HonorVoteCountOrderByAggregateInput
    _avg?: HonorVoteAvgOrderByAggregateInput
    _max?: HonorVoteMaxOrderByAggregateInput
    _min?: HonorVoteMinOrderByAggregateInput
    _sum?: HonorVoteSumOrderByAggregateInput
  }

  export type HonorVoteScalarWhereWithAggregatesInput = {
    AND?: HonorVoteScalarWhereWithAggregatesInput | HonorVoteScalarWhereWithAggregatesInput[]
    OR?: HonorVoteScalarWhereWithAggregatesInput[]
    NOT?: HonorVoteScalarWhereWithAggregatesInput | HonorVoteScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"HonorVote"> | number
    voterId?: IntWithAggregatesFilter<"HonorVote"> | number
    arbiterId?: IntWithAggregatesFilter<"HonorVote"> | number
    poolId?: UuidWithAggregatesFilter<"HonorVote"> | string
    voteType?: EnumHonorVoteTypeWithAggregatesFilter<"HonorVote"> | $Enums.HonorVoteType
    createdAt?: DateTimeWithAggregatesFilter<"HonorVote"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"HonorVote"> | Date | string
  }

  export type HonorScoreWhereInput = {
    AND?: HonorScoreWhereInput | HonorScoreWhereInput[]
    OR?: HonorScoreWhereInput[]
    NOT?: HonorScoreWhereInput | HonorScoreWhereInput[]
    arbiterId?: IntFilter<"HonorScore"> | number
    totalUpvotes?: IntFilter<"HonorScore"> | number
    totalDownvotes?: IntFilter<"HonorScore"> | number
    score?: FloatFilter<"HonorScore"> | number
    createdAt?: DateTimeFilter<"HonorScore"> | Date | string
    updatedAt?: DateTimeFilter<"HonorScore"> | Date | string
    arbiter?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type HonorScoreOrderByWithRelationInput = {
    arbiterId?: SortOrder
    totalUpvotes?: SortOrder
    totalDownvotes?: SortOrder
    score?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    arbiter?: UserOrderByWithRelationInput
  }

  export type HonorScoreWhereUniqueInput = Prisma.AtLeast<{
    arbiterId?: number
    AND?: HonorScoreWhereInput | HonorScoreWhereInput[]
    OR?: HonorScoreWhereInput[]
    NOT?: HonorScoreWhereInput | HonorScoreWhereInput[]
    totalUpvotes?: IntFilter<"HonorScore"> | number
    totalDownvotes?: IntFilter<"HonorScore"> | number
    score?: FloatFilter<"HonorScore"> | number
    createdAt?: DateTimeFilter<"HonorScore"> | Date | string
    updatedAt?: DateTimeFilter<"HonorScore"> | Date | string
    arbiter?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "arbiterId">

  export type HonorScoreOrderByWithAggregationInput = {
    arbiterId?: SortOrder
    totalUpvotes?: SortOrder
    totalDownvotes?: SortOrder
    score?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: HonorScoreCountOrderByAggregateInput
    _avg?: HonorScoreAvgOrderByAggregateInput
    _max?: HonorScoreMaxOrderByAggregateInput
    _min?: HonorScoreMinOrderByAggregateInput
    _sum?: HonorScoreSumOrderByAggregateInput
  }

  export type HonorScoreScalarWhereWithAggregatesInput = {
    AND?: HonorScoreScalarWhereWithAggregatesInput | HonorScoreScalarWhereWithAggregatesInput[]
    OR?: HonorScoreScalarWhereWithAggregatesInput[]
    NOT?: HonorScoreScalarWhereWithAggregatesInput | HonorScoreScalarWhereWithAggregatesInput[]
    arbiterId?: IntWithAggregatesFilter<"HonorScore"> | number
    totalUpvotes?: IntWithAggregatesFilter<"HonorScore"> | number
    totalDownvotes?: IntWithAggregatesFilter<"HonorScore"> | number
    score?: FloatWithAggregatesFilter<"HonorScore"> | number
    createdAt?: DateTimeWithAggregatesFilter<"HonorScore"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"HonorScore"> | Date | string
  }

  export type WorldIdVerificationWhereInput = {
    AND?: WorldIdVerificationWhereInput | WorldIdVerificationWhereInput[]
    OR?: WorldIdVerificationWhereInput[]
    NOT?: WorldIdVerificationWhereInput | WorldIdVerificationWhereInput[]
    id?: IntFilter<"WorldIdVerification"> | number
    userId?: IntFilter<"WorldIdVerification"> | number
    action?: StringFilter<"WorldIdVerification"> | string
    nullifierHash?: StringFilter<"WorldIdVerification"> | string
    verificationLevel?: StringFilter<"WorldIdVerification"> | string
    createdAt?: DateTimeFilter<"WorldIdVerification"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type WorldIdVerificationOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    nullifierHash?: SortOrder
    verificationLevel?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type WorldIdVerificationWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    nullifierHash?: string
    AND?: WorldIdVerificationWhereInput | WorldIdVerificationWhereInput[]
    OR?: WorldIdVerificationWhereInput[]
    NOT?: WorldIdVerificationWhereInput | WorldIdVerificationWhereInput[]
    userId?: IntFilter<"WorldIdVerification"> | number
    action?: StringFilter<"WorldIdVerification"> | string
    verificationLevel?: StringFilter<"WorldIdVerification"> | string
    createdAt?: DateTimeFilter<"WorldIdVerification"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "nullifierHash">

  export type WorldIdVerificationOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    nullifierHash?: SortOrder
    verificationLevel?: SortOrder
    createdAt?: SortOrder
    _count?: WorldIdVerificationCountOrderByAggregateInput
    _avg?: WorldIdVerificationAvgOrderByAggregateInput
    _max?: WorldIdVerificationMaxOrderByAggregateInput
    _min?: WorldIdVerificationMinOrderByAggregateInput
    _sum?: WorldIdVerificationSumOrderByAggregateInput
  }

  export type WorldIdVerificationScalarWhereWithAggregatesInput = {
    AND?: WorldIdVerificationScalarWhereWithAggregatesInput | WorldIdVerificationScalarWhereWithAggregatesInput[]
    OR?: WorldIdVerificationScalarWhereWithAggregatesInput[]
    NOT?: WorldIdVerificationScalarWhereWithAggregatesInput | WorldIdVerificationScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"WorldIdVerification"> | number
    userId?: IntWithAggregatesFilter<"WorldIdVerification"> | number
    action?: StringWithAggregatesFilter<"WorldIdVerification"> | string
    nullifierHash?: StringWithAggregatesFilter<"WorldIdVerification"> | string
    verificationLevel?: StringWithAggregatesFilter<"WorldIdVerification"> | string
    createdAt?: DateTimeWithAggregatesFilter<"WorldIdVerification"> | Date | string
  }

  export type UserCreateInput = {
    username: string
    address: string
    pfp?: string | null
    worldIdVerified?: boolean
    worldIdLevel?: string | null
    totalPoints?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    createdPools?: PoolCreateNestedManyWithoutCreatorInput
    arbitratedPools?: PoolCreateNestedManyWithoutArbiterInput
    jousts?: JoustCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    votesCast?: HonorVoteCreateNestedManyWithoutVoterInput
    votesReceived?: HonorVoteCreateNestedManyWithoutArbiterInput
    honorScore?: HonorScoreCreateNestedOneWithoutArbiterInput
    worldIdVerifications?: WorldIdVerificationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    username: string
    address: string
    pfp?: string | null
    worldIdVerified?: boolean
    worldIdLevel?: string | null
    totalPoints?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    createdPools?: PoolUncheckedCreateNestedManyWithoutCreatorInput
    arbitratedPools?: PoolUncheckedCreateNestedManyWithoutArbiterInput
    jousts?: JoustUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    votesCast?: HonorVoteUncheckedCreateNestedManyWithoutVoterInput
    votesReceived?: HonorVoteUncheckedCreateNestedManyWithoutArbiterInput
    honorScore?: HonorScoreUncheckedCreateNestedOneWithoutArbiterInput
    worldIdVerifications?: WorldIdVerificationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    username?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    pfp?: NullableStringFieldUpdateOperationsInput | string | null
    worldIdVerified?: BoolFieldUpdateOperationsInput | boolean
    worldIdLevel?: NullableStringFieldUpdateOperationsInput | string | null
    totalPoints?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdPools?: PoolUpdateManyWithoutCreatorNestedInput
    arbitratedPools?: PoolUpdateManyWithoutArbiterNestedInput
    jousts?: JoustUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    votesCast?: HonorVoteUpdateManyWithoutVoterNestedInput
    votesReceived?: HonorVoteUpdateManyWithoutArbiterNestedInput
    honorScore?: HonorScoreUpdateOneWithoutArbiterNestedInput
    worldIdVerifications?: WorldIdVerificationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    pfp?: NullableStringFieldUpdateOperationsInput | string | null
    worldIdVerified?: BoolFieldUpdateOperationsInput | boolean
    worldIdLevel?: NullableStringFieldUpdateOperationsInput | string | null
    totalPoints?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdPools?: PoolUncheckedUpdateManyWithoutCreatorNestedInput
    arbitratedPools?: PoolUncheckedUpdateManyWithoutArbiterNestedInput
    jousts?: JoustUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    votesCast?: HonorVoteUncheckedUpdateManyWithoutVoterNestedInput
    votesReceived?: HonorVoteUncheckedUpdateManyWithoutArbiterNestedInput
    honorScore?: HonorScoreUncheckedUpdateOneWithoutArbiterNestedInput
    worldIdVerifications?: WorldIdVerificationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    username: string
    address: string
    pfp?: string | null
    worldIdVerified?: boolean
    worldIdLevel?: string | null
    totalPoints?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    username?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    pfp?: NullableStringFieldUpdateOperationsInput | string | null
    worldIdVerified?: BoolFieldUpdateOperationsInput | boolean
    worldIdLevel?: NullableStringFieldUpdateOperationsInput | string | null
    totalPoints?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    pfp?: NullableStringFieldUpdateOperationsInput | string | null
    worldIdVerified?: BoolFieldUpdateOperationsInput | boolean
    worldIdLevel?: NullableStringFieldUpdateOperationsInput | string | null
    totalPoints?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PoolCreateInput = {
    id?: string
    contractId?: bigint | number | null
    title: string
    description?: string | null
    image?: string | null
    arbiterAddress: string
    arbiterAccepted?: boolean
    arbiterFee: number
    collateral: string
    minJoustAmount: bigint | number
    totalAmountJousted?: bigint | number
    supportedJoustTypes?: number
    winningJoustType?: number
    state?: $Enums.PoolState
    endTime: Date | string
    contractEndTime?: number
    deployedAt?: Date | string | null
    closedAt?: Date | string | null
    settledAt?: Date | string | null
    refundedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    creator: UserCreateNestedOneWithoutCreatedPoolsInput
    arbiter?: UserCreateNestedOneWithoutArbitratedPoolsInput
    jousts?: JoustCreateNestedManyWithoutPoolInput
    options?: PoolOptionCreateNestedManyWithoutPoolInput
    notifications?: NotificationCreateNestedManyWithoutPoolInput
    honorVotes?: HonorVoteCreateNestedManyWithoutPoolInput
  }

  export type PoolUncheckedCreateInput = {
    id?: string
    contractId?: bigint | number | null
    title: string
    description?: string | null
    image?: string | null
    creatorId: number
    arbiterId?: number | null
    arbiterAddress: string
    arbiterAccepted?: boolean
    arbiterFee: number
    collateral: string
    minJoustAmount: bigint | number
    totalAmountJousted?: bigint | number
    supportedJoustTypes?: number
    winningJoustType?: number
    state?: $Enums.PoolState
    endTime: Date | string
    contractEndTime?: number
    deployedAt?: Date | string | null
    closedAt?: Date | string | null
    settledAt?: Date | string | null
    refundedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    jousts?: JoustUncheckedCreateNestedManyWithoutPoolInput
    options?: PoolOptionUncheckedCreateNestedManyWithoutPoolInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutPoolInput
    honorVotes?: HonorVoteUncheckedCreateNestedManyWithoutPoolInput
  }

  export type PoolUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    contractId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    arbiterAddress?: StringFieldUpdateOperationsInput | string
    arbiterAccepted?: BoolFieldUpdateOperationsInput | boolean
    arbiterFee?: IntFieldUpdateOperationsInput | number
    collateral?: StringFieldUpdateOperationsInput | string
    minJoustAmount?: BigIntFieldUpdateOperationsInput | bigint | number
    totalAmountJousted?: BigIntFieldUpdateOperationsInput | bigint | number
    supportedJoustTypes?: IntFieldUpdateOperationsInput | number
    winningJoustType?: IntFieldUpdateOperationsInput | number
    state?: EnumPoolStateFieldUpdateOperationsInput | $Enums.PoolState
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    contractEndTime?: IntFieldUpdateOperationsInput | number
    deployedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    settledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refundedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creator?: UserUpdateOneRequiredWithoutCreatedPoolsNestedInput
    arbiter?: UserUpdateOneWithoutArbitratedPoolsNestedInput
    jousts?: JoustUpdateManyWithoutPoolNestedInput
    options?: PoolOptionUpdateManyWithoutPoolNestedInput
    notifications?: NotificationUpdateManyWithoutPoolNestedInput
    honorVotes?: HonorVoteUpdateManyWithoutPoolNestedInput
  }

  export type PoolUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    contractId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    creatorId?: IntFieldUpdateOperationsInput | number
    arbiterId?: NullableIntFieldUpdateOperationsInput | number | null
    arbiterAddress?: StringFieldUpdateOperationsInput | string
    arbiterAccepted?: BoolFieldUpdateOperationsInput | boolean
    arbiterFee?: IntFieldUpdateOperationsInput | number
    collateral?: StringFieldUpdateOperationsInput | string
    minJoustAmount?: BigIntFieldUpdateOperationsInput | bigint | number
    totalAmountJousted?: BigIntFieldUpdateOperationsInput | bigint | number
    supportedJoustTypes?: IntFieldUpdateOperationsInput | number
    winningJoustType?: IntFieldUpdateOperationsInput | number
    state?: EnumPoolStateFieldUpdateOperationsInput | $Enums.PoolState
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    contractEndTime?: IntFieldUpdateOperationsInput | number
    deployedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    settledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refundedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    jousts?: JoustUncheckedUpdateManyWithoutPoolNestedInput
    options?: PoolOptionUncheckedUpdateManyWithoutPoolNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutPoolNestedInput
    honorVotes?: HonorVoteUncheckedUpdateManyWithoutPoolNestedInput
  }

  export type PoolCreateManyInput = {
    id?: string
    contractId?: bigint | number | null
    title: string
    description?: string | null
    image?: string | null
    creatorId: number
    arbiterId?: number | null
    arbiterAddress: string
    arbiterAccepted?: boolean
    arbiterFee: number
    collateral: string
    minJoustAmount: bigint | number
    totalAmountJousted?: bigint | number
    supportedJoustTypes?: number
    winningJoustType?: number
    state?: $Enums.PoolState
    endTime: Date | string
    contractEndTime?: number
    deployedAt?: Date | string | null
    closedAt?: Date | string | null
    settledAt?: Date | string | null
    refundedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PoolUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    contractId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    arbiterAddress?: StringFieldUpdateOperationsInput | string
    arbiterAccepted?: BoolFieldUpdateOperationsInput | boolean
    arbiterFee?: IntFieldUpdateOperationsInput | number
    collateral?: StringFieldUpdateOperationsInput | string
    minJoustAmount?: BigIntFieldUpdateOperationsInput | bigint | number
    totalAmountJousted?: BigIntFieldUpdateOperationsInput | bigint | number
    supportedJoustTypes?: IntFieldUpdateOperationsInput | number
    winningJoustType?: IntFieldUpdateOperationsInput | number
    state?: EnumPoolStateFieldUpdateOperationsInput | $Enums.PoolState
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    contractEndTime?: IntFieldUpdateOperationsInput | number
    deployedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    settledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refundedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PoolUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    contractId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    creatorId?: IntFieldUpdateOperationsInput | number
    arbiterId?: NullableIntFieldUpdateOperationsInput | number | null
    arbiterAddress?: StringFieldUpdateOperationsInput | string
    arbiterAccepted?: BoolFieldUpdateOperationsInput | boolean
    arbiterFee?: IntFieldUpdateOperationsInput | number
    collateral?: StringFieldUpdateOperationsInput | string
    minJoustAmount?: BigIntFieldUpdateOperationsInput | bigint | number
    totalAmountJousted?: BigIntFieldUpdateOperationsInput | bigint | number
    supportedJoustTypes?: IntFieldUpdateOperationsInput | number
    winningJoustType?: IntFieldUpdateOperationsInput | number
    state?: EnumPoolStateFieldUpdateOperationsInput | $Enums.PoolState
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    contractEndTime?: IntFieldUpdateOperationsInput | number
    deployedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    settledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refundedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PoolOptionCreateInput = {
    joustType: number
    label: string
    orderIndex: number
    createdAt?: Date | string
    updatedAt?: Date | string
    pool: PoolCreateNestedOneWithoutOptionsInput
  }

  export type PoolOptionUncheckedCreateInput = {
    id?: number
    poolId: string
    joustType: number
    label: string
    orderIndex: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PoolOptionUpdateInput = {
    joustType?: IntFieldUpdateOperationsInput | number
    label?: StringFieldUpdateOperationsInput | string
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pool?: PoolUpdateOneRequiredWithoutOptionsNestedInput
  }

  export type PoolOptionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    poolId?: StringFieldUpdateOperationsInput | string
    joustType?: IntFieldUpdateOperationsInput | number
    label?: StringFieldUpdateOperationsInput | string
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PoolOptionCreateManyInput = {
    id?: number
    poolId: string
    joustType: number
    label: string
    orderIndex: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PoolOptionUpdateManyMutationInput = {
    joustType?: IntFieldUpdateOperationsInput | number
    label?: StringFieldUpdateOperationsInput | string
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PoolOptionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    poolId?: StringFieldUpdateOperationsInput | string
    joustType?: IntFieldUpdateOperationsInput | number
    label?: StringFieldUpdateOperationsInput | string
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JoustCreateInput = {
    joustType: number
    amount: bigint | number
    isWinner?: boolean
    txHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutJoustsInput
    pool: PoolCreateNestedOneWithoutJoustsInput
  }

  export type JoustUncheckedCreateInput = {
    id?: number
    userId: number
    poolId: string
    joustType: number
    amount: bigint | number
    isWinner?: boolean
    txHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type JoustUpdateInput = {
    joustType?: IntFieldUpdateOperationsInput | number
    amount?: BigIntFieldUpdateOperationsInput | bigint | number
    isWinner?: BoolFieldUpdateOperationsInput | boolean
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutJoustsNestedInput
    pool?: PoolUpdateOneRequiredWithoutJoustsNestedInput
  }

  export type JoustUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    poolId?: StringFieldUpdateOperationsInput | string
    joustType?: IntFieldUpdateOperationsInput | number
    amount?: BigIntFieldUpdateOperationsInput | bigint | number
    isWinner?: BoolFieldUpdateOperationsInput | boolean
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JoustCreateManyInput = {
    id?: number
    userId: number
    poolId: string
    joustType: number
    amount: bigint | number
    isWinner?: boolean
    txHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type JoustUpdateManyMutationInput = {
    joustType?: IntFieldUpdateOperationsInput | number
    amount?: BigIntFieldUpdateOperationsInput | bigint | number
    isWinner?: BoolFieldUpdateOperationsInput | boolean
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JoustUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    poolId?: StringFieldUpdateOperationsInput | string
    joustType?: IntFieldUpdateOperationsInput | number
    amount?: BigIntFieldUpdateOperationsInput | bigint | number
    isWinner?: BoolFieldUpdateOperationsInput | boolean
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateInput = {
    type: $Enums.NotificationType
    title: string
    body?: string | null
    read?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutNotificationsInput
    pool?: PoolCreateNestedOneWithoutNotificationsInput
  }

  export type NotificationUncheckedCreateInput = {
    id?: number
    userId: number
    type: $Enums.NotificationType
    title: string
    body?: string | null
    poolId?: string | null
    read?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NotificationUpdateInput = {
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    title?: StringFieldUpdateOperationsInput | string
    body?: NullableStringFieldUpdateOperationsInput | string | null
    read?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutNotificationsNestedInput
    pool?: PoolUpdateOneWithoutNotificationsNestedInput
  }

  export type NotificationUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    title?: StringFieldUpdateOperationsInput | string
    body?: NullableStringFieldUpdateOperationsInput | string | null
    poolId?: NullableStringFieldUpdateOperationsInput | string | null
    read?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateManyInput = {
    id?: number
    userId: number
    type: $Enums.NotificationType
    title: string
    body?: string | null
    poolId?: string | null
    read?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NotificationUpdateManyMutationInput = {
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    title?: StringFieldUpdateOperationsInput | string
    body?: NullableStringFieldUpdateOperationsInput | string | null
    read?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    title?: StringFieldUpdateOperationsInput | string
    body?: NullableStringFieldUpdateOperationsInput | string | null
    poolId?: NullableStringFieldUpdateOperationsInput | string | null
    read?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HonorVoteCreateInput = {
    voteType: $Enums.HonorVoteType
    createdAt?: Date | string
    updatedAt?: Date | string
    voter: UserCreateNestedOneWithoutVotesCastInput
    arbiter: UserCreateNestedOneWithoutVotesReceivedInput
    pool: PoolCreateNestedOneWithoutHonorVotesInput
  }

  export type HonorVoteUncheckedCreateInput = {
    id?: number
    voterId: number
    arbiterId: number
    poolId: string
    voteType: $Enums.HonorVoteType
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HonorVoteUpdateInput = {
    voteType?: EnumHonorVoteTypeFieldUpdateOperationsInput | $Enums.HonorVoteType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    voter?: UserUpdateOneRequiredWithoutVotesCastNestedInput
    arbiter?: UserUpdateOneRequiredWithoutVotesReceivedNestedInput
    pool?: PoolUpdateOneRequiredWithoutHonorVotesNestedInput
  }

  export type HonorVoteUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    voterId?: IntFieldUpdateOperationsInput | number
    arbiterId?: IntFieldUpdateOperationsInput | number
    poolId?: StringFieldUpdateOperationsInput | string
    voteType?: EnumHonorVoteTypeFieldUpdateOperationsInput | $Enums.HonorVoteType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HonorVoteCreateManyInput = {
    id?: number
    voterId: number
    arbiterId: number
    poolId: string
    voteType: $Enums.HonorVoteType
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HonorVoteUpdateManyMutationInput = {
    voteType?: EnumHonorVoteTypeFieldUpdateOperationsInput | $Enums.HonorVoteType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HonorVoteUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    voterId?: IntFieldUpdateOperationsInput | number
    arbiterId?: IntFieldUpdateOperationsInput | number
    poolId?: StringFieldUpdateOperationsInput | string
    voteType?: EnumHonorVoteTypeFieldUpdateOperationsInput | $Enums.HonorVoteType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HonorScoreCreateInput = {
    totalUpvotes?: number
    totalDownvotes?: number
    score?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    arbiter: UserCreateNestedOneWithoutHonorScoreInput
  }

  export type HonorScoreUncheckedCreateInput = {
    arbiterId: number
    totalUpvotes?: number
    totalDownvotes?: number
    score?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HonorScoreUpdateInput = {
    totalUpvotes?: IntFieldUpdateOperationsInput | number
    totalDownvotes?: IntFieldUpdateOperationsInput | number
    score?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    arbiter?: UserUpdateOneRequiredWithoutHonorScoreNestedInput
  }

  export type HonorScoreUncheckedUpdateInput = {
    arbiterId?: IntFieldUpdateOperationsInput | number
    totalUpvotes?: IntFieldUpdateOperationsInput | number
    totalDownvotes?: IntFieldUpdateOperationsInput | number
    score?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HonorScoreCreateManyInput = {
    arbiterId: number
    totalUpvotes?: number
    totalDownvotes?: number
    score?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HonorScoreUpdateManyMutationInput = {
    totalUpvotes?: IntFieldUpdateOperationsInput | number
    totalDownvotes?: IntFieldUpdateOperationsInput | number
    score?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HonorScoreUncheckedUpdateManyInput = {
    arbiterId?: IntFieldUpdateOperationsInput | number
    totalUpvotes?: IntFieldUpdateOperationsInput | number
    totalDownvotes?: IntFieldUpdateOperationsInput | number
    score?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorldIdVerificationCreateInput = {
    action: string
    nullifierHash: string
    verificationLevel: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutWorldIdVerificationsInput
  }

  export type WorldIdVerificationUncheckedCreateInput = {
    id?: number
    userId: number
    action: string
    nullifierHash: string
    verificationLevel: string
    createdAt?: Date | string
  }

  export type WorldIdVerificationUpdateInput = {
    action?: StringFieldUpdateOperationsInput | string
    nullifierHash?: StringFieldUpdateOperationsInput | string
    verificationLevel?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutWorldIdVerificationsNestedInput
  }

  export type WorldIdVerificationUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    action?: StringFieldUpdateOperationsInput | string
    nullifierHash?: StringFieldUpdateOperationsInput | string
    verificationLevel?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorldIdVerificationCreateManyInput = {
    id?: number
    userId: number
    action: string
    nullifierHash: string
    verificationLevel: string
    createdAt?: Date | string
  }

  export type WorldIdVerificationUpdateManyMutationInput = {
    action?: StringFieldUpdateOperationsInput | string
    nullifierHash?: StringFieldUpdateOperationsInput | string
    verificationLevel?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorldIdVerificationUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    action?: StringFieldUpdateOperationsInput | string
    nullifierHash?: StringFieldUpdateOperationsInput | string
    verificationLevel?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type PoolListRelationFilter = {
    every?: PoolWhereInput
    some?: PoolWhereInput
    none?: PoolWhereInput
  }

  export type JoustListRelationFilter = {
    every?: JoustWhereInput
    some?: JoustWhereInput
    none?: JoustWhereInput
  }

  export type NotificationListRelationFilter = {
    every?: NotificationWhereInput
    some?: NotificationWhereInput
    none?: NotificationWhereInput
  }

  export type HonorVoteListRelationFilter = {
    every?: HonorVoteWhereInput
    some?: HonorVoteWhereInput
    none?: HonorVoteWhereInput
  }

  export type HonorScoreNullableScalarRelationFilter = {
    is?: HonorScoreWhereInput | null
    isNot?: HonorScoreWhereInput | null
  }

  export type WorldIdVerificationListRelationFilter = {
    every?: WorldIdVerificationWhereInput
    some?: WorldIdVerificationWhereInput
    none?: WorldIdVerificationWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type PoolOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type JoustOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type NotificationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type HonorVoteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WorldIdVerificationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    address?: SortOrder
    pfp?: SortOrder
    worldIdVerified?: SortOrder
    worldIdLevel?: SortOrder
    totalPoints?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
    totalPoints?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    address?: SortOrder
    pfp?: SortOrder
    worldIdVerified?: SortOrder
    worldIdLevel?: SortOrder
    totalPoints?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    address?: SortOrder
    pfp?: SortOrder
    worldIdVerified?: SortOrder
    worldIdLevel?: SortOrder
    totalPoints?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
    totalPoints?: SortOrder
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

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type BigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
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

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type EnumPoolStateFilter<$PrismaModel = never> = {
    equals?: $Enums.PoolState | EnumPoolStateFieldRefInput<$PrismaModel>
    in?: $Enums.PoolState[] | ListEnumPoolStateFieldRefInput<$PrismaModel>
    notIn?: $Enums.PoolState[] | ListEnumPoolStateFieldRefInput<$PrismaModel>
    not?: NestedEnumPoolStateFilter<$PrismaModel> | $Enums.PoolState
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type PoolOptionListRelationFilter = {
    every?: PoolOptionWhereInput
    some?: PoolOptionWhereInput
    none?: PoolOptionWhereInput
  }

  export type PoolOptionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PoolCountOrderByAggregateInput = {
    id?: SortOrder
    contractId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    image?: SortOrder
    creatorId?: SortOrder
    arbiterId?: SortOrder
    arbiterAddress?: SortOrder
    arbiterAccepted?: SortOrder
    arbiterFee?: SortOrder
    collateral?: SortOrder
    minJoustAmount?: SortOrder
    totalAmountJousted?: SortOrder
    supportedJoustTypes?: SortOrder
    winningJoustType?: SortOrder
    state?: SortOrder
    endTime?: SortOrder
    contractEndTime?: SortOrder
    deployedAt?: SortOrder
    closedAt?: SortOrder
    settledAt?: SortOrder
    refundedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PoolAvgOrderByAggregateInput = {
    contractId?: SortOrder
    creatorId?: SortOrder
    arbiterId?: SortOrder
    arbiterFee?: SortOrder
    minJoustAmount?: SortOrder
    totalAmountJousted?: SortOrder
    supportedJoustTypes?: SortOrder
    winningJoustType?: SortOrder
    contractEndTime?: SortOrder
  }

  export type PoolMaxOrderByAggregateInput = {
    id?: SortOrder
    contractId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    image?: SortOrder
    creatorId?: SortOrder
    arbiterId?: SortOrder
    arbiterAddress?: SortOrder
    arbiterAccepted?: SortOrder
    arbiterFee?: SortOrder
    collateral?: SortOrder
    minJoustAmount?: SortOrder
    totalAmountJousted?: SortOrder
    supportedJoustTypes?: SortOrder
    winningJoustType?: SortOrder
    state?: SortOrder
    endTime?: SortOrder
    contractEndTime?: SortOrder
    deployedAt?: SortOrder
    closedAt?: SortOrder
    settledAt?: SortOrder
    refundedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PoolMinOrderByAggregateInput = {
    id?: SortOrder
    contractId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    image?: SortOrder
    creatorId?: SortOrder
    arbiterId?: SortOrder
    arbiterAddress?: SortOrder
    arbiterAccepted?: SortOrder
    arbiterFee?: SortOrder
    collateral?: SortOrder
    minJoustAmount?: SortOrder
    totalAmountJousted?: SortOrder
    supportedJoustTypes?: SortOrder
    winningJoustType?: SortOrder
    state?: SortOrder
    endTime?: SortOrder
    contractEndTime?: SortOrder
    deployedAt?: SortOrder
    closedAt?: SortOrder
    settledAt?: SortOrder
    refundedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PoolSumOrderByAggregateInput = {
    contractId?: SortOrder
    creatorId?: SortOrder
    arbiterId?: SortOrder
    arbiterFee?: SortOrder
    minJoustAmount?: SortOrder
    totalAmountJousted?: SortOrder
    supportedJoustTypes?: SortOrder
    winningJoustType?: SortOrder
    contractEndTime?: SortOrder
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
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

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type EnumPoolStateWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PoolState | EnumPoolStateFieldRefInput<$PrismaModel>
    in?: $Enums.PoolState[] | ListEnumPoolStateFieldRefInput<$PrismaModel>
    notIn?: $Enums.PoolState[] | ListEnumPoolStateFieldRefInput<$PrismaModel>
    not?: NestedEnumPoolStateWithAggregatesFilter<$PrismaModel> | $Enums.PoolState
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPoolStateFilter<$PrismaModel>
    _max?: NestedEnumPoolStateFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type PoolScalarRelationFilter = {
    is?: PoolWhereInput
    isNot?: PoolWhereInput
  }

  export type PoolOptionPoolIdJoustTypeCompoundUniqueInput = {
    poolId: string
    joustType: number
  }

  export type PoolOptionPoolIdOrderIndexCompoundUniqueInput = {
    poolId: string
    orderIndex: number
  }

  export type PoolOptionCountOrderByAggregateInput = {
    id?: SortOrder
    poolId?: SortOrder
    joustType?: SortOrder
    label?: SortOrder
    orderIndex?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PoolOptionAvgOrderByAggregateInput = {
    id?: SortOrder
    joustType?: SortOrder
    orderIndex?: SortOrder
  }

  export type PoolOptionMaxOrderByAggregateInput = {
    id?: SortOrder
    poolId?: SortOrder
    joustType?: SortOrder
    label?: SortOrder
    orderIndex?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PoolOptionMinOrderByAggregateInput = {
    id?: SortOrder
    poolId?: SortOrder
    joustType?: SortOrder
    label?: SortOrder
    orderIndex?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PoolOptionSumOrderByAggregateInput = {
    id?: SortOrder
    joustType?: SortOrder
    orderIndex?: SortOrder
  }

  export type JoustCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    poolId?: SortOrder
    joustType?: SortOrder
    amount?: SortOrder
    isWinner?: SortOrder
    txHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type JoustAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    joustType?: SortOrder
    amount?: SortOrder
  }

  export type JoustMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    poolId?: SortOrder
    joustType?: SortOrder
    amount?: SortOrder
    isWinner?: SortOrder
    txHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type JoustMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    poolId?: SortOrder
    joustType?: SortOrder
    amount?: SortOrder
    isWinner?: SortOrder
    txHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type JoustSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    joustType?: SortOrder
    amount?: SortOrder
  }

  export type EnumNotificationTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | EnumNotificationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationTypeFilter<$PrismaModel> | $Enums.NotificationType
  }

  export type UuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type PoolNullableScalarRelationFilter = {
    is?: PoolWhereInput | null
    isNot?: PoolWhereInput | null
  }

  export type NotificationCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    body?: SortOrder
    poolId?: SortOrder
    read?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NotificationAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type NotificationMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    body?: SortOrder
    poolId?: SortOrder
    read?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NotificationMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    body?: SortOrder
    poolId?: SortOrder
    read?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NotificationSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type EnumNotificationTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | EnumNotificationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationTypeWithAggregatesFilter<$PrismaModel> | $Enums.NotificationType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNotificationTypeFilter<$PrismaModel>
    _max?: NestedEnumNotificationTypeFilter<$PrismaModel>
  }

  export type UuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumHonorVoteTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.HonorVoteType | EnumHonorVoteTypeFieldRefInput<$PrismaModel>
    in?: $Enums.HonorVoteType[] | ListEnumHonorVoteTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.HonorVoteType[] | ListEnumHonorVoteTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumHonorVoteTypeFilter<$PrismaModel> | $Enums.HonorVoteType
  }

  export type HonorVoteVoterIdArbiterIdPoolIdCompoundUniqueInput = {
    voterId: number
    arbiterId: number
    poolId: string
  }

  export type HonorVoteCountOrderByAggregateInput = {
    id?: SortOrder
    voterId?: SortOrder
    arbiterId?: SortOrder
    poolId?: SortOrder
    voteType?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type HonorVoteAvgOrderByAggregateInput = {
    id?: SortOrder
    voterId?: SortOrder
    arbiterId?: SortOrder
  }

  export type HonorVoteMaxOrderByAggregateInput = {
    id?: SortOrder
    voterId?: SortOrder
    arbiterId?: SortOrder
    poolId?: SortOrder
    voteType?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type HonorVoteMinOrderByAggregateInput = {
    id?: SortOrder
    voterId?: SortOrder
    arbiterId?: SortOrder
    poolId?: SortOrder
    voteType?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type HonorVoteSumOrderByAggregateInput = {
    id?: SortOrder
    voterId?: SortOrder
    arbiterId?: SortOrder
  }

  export type EnumHonorVoteTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.HonorVoteType | EnumHonorVoteTypeFieldRefInput<$PrismaModel>
    in?: $Enums.HonorVoteType[] | ListEnumHonorVoteTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.HonorVoteType[] | ListEnumHonorVoteTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumHonorVoteTypeWithAggregatesFilter<$PrismaModel> | $Enums.HonorVoteType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumHonorVoteTypeFilter<$PrismaModel>
    _max?: NestedEnumHonorVoteTypeFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type HonorScoreCountOrderByAggregateInput = {
    arbiterId?: SortOrder
    totalUpvotes?: SortOrder
    totalDownvotes?: SortOrder
    score?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type HonorScoreAvgOrderByAggregateInput = {
    arbiterId?: SortOrder
    totalUpvotes?: SortOrder
    totalDownvotes?: SortOrder
    score?: SortOrder
  }

  export type HonorScoreMaxOrderByAggregateInput = {
    arbiterId?: SortOrder
    totalUpvotes?: SortOrder
    totalDownvotes?: SortOrder
    score?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type HonorScoreMinOrderByAggregateInput = {
    arbiterId?: SortOrder
    totalUpvotes?: SortOrder
    totalDownvotes?: SortOrder
    score?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type HonorScoreSumOrderByAggregateInput = {
    arbiterId?: SortOrder
    totalUpvotes?: SortOrder
    totalDownvotes?: SortOrder
    score?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type WorldIdVerificationCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    nullifierHash?: SortOrder
    verificationLevel?: SortOrder
    createdAt?: SortOrder
  }

  export type WorldIdVerificationAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type WorldIdVerificationMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    nullifierHash?: SortOrder
    verificationLevel?: SortOrder
    createdAt?: SortOrder
  }

  export type WorldIdVerificationMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    nullifierHash?: SortOrder
    verificationLevel?: SortOrder
    createdAt?: SortOrder
  }

  export type WorldIdVerificationSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type PoolCreateNestedManyWithoutCreatorInput = {
    create?: XOR<PoolCreateWithoutCreatorInput, PoolUncheckedCreateWithoutCreatorInput> | PoolCreateWithoutCreatorInput[] | PoolUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: PoolCreateOrConnectWithoutCreatorInput | PoolCreateOrConnectWithoutCreatorInput[]
    createMany?: PoolCreateManyCreatorInputEnvelope
    connect?: PoolWhereUniqueInput | PoolWhereUniqueInput[]
  }

  export type PoolCreateNestedManyWithoutArbiterInput = {
    create?: XOR<PoolCreateWithoutArbiterInput, PoolUncheckedCreateWithoutArbiterInput> | PoolCreateWithoutArbiterInput[] | PoolUncheckedCreateWithoutArbiterInput[]
    connectOrCreate?: PoolCreateOrConnectWithoutArbiterInput | PoolCreateOrConnectWithoutArbiterInput[]
    createMany?: PoolCreateManyArbiterInputEnvelope
    connect?: PoolWhereUniqueInput | PoolWhereUniqueInput[]
  }

  export type JoustCreateNestedManyWithoutUserInput = {
    create?: XOR<JoustCreateWithoutUserInput, JoustUncheckedCreateWithoutUserInput> | JoustCreateWithoutUserInput[] | JoustUncheckedCreateWithoutUserInput[]
    connectOrCreate?: JoustCreateOrConnectWithoutUserInput | JoustCreateOrConnectWithoutUserInput[]
    createMany?: JoustCreateManyUserInputEnvelope
    connect?: JoustWhereUniqueInput | JoustWhereUniqueInput[]
  }

  export type NotificationCreateNestedManyWithoutUserInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type HonorVoteCreateNestedManyWithoutVoterInput = {
    create?: XOR<HonorVoteCreateWithoutVoterInput, HonorVoteUncheckedCreateWithoutVoterInput> | HonorVoteCreateWithoutVoterInput[] | HonorVoteUncheckedCreateWithoutVoterInput[]
    connectOrCreate?: HonorVoteCreateOrConnectWithoutVoterInput | HonorVoteCreateOrConnectWithoutVoterInput[]
    createMany?: HonorVoteCreateManyVoterInputEnvelope
    connect?: HonorVoteWhereUniqueInput | HonorVoteWhereUniqueInput[]
  }

  export type HonorVoteCreateNestedManyWithoutArbiterInput = {
    create?: XOR<HonorVoteCreateWithoutArbiterInput, HonorVoteUncheckedCreateWithoutArbiterInput> | HonorVoteCreateWithoutArbiterInput[] | HonorVoteUncheckedCreateWithoutArbiterInput[]
    connectOrCreate?: HonorVoteCreateOrConnectWithoutArbiterInput | HonorVoteCreateOrConnectWithoutArbiterInput[]
    createMany?: HonorVoteCreateManyArbiterInputEnvelope
    connect?: HonorVoteWhereUniqueInput | HonorVoteWhereUniqueInput[]
  }

  export type HonorScoreCreateNestedOneWithoutArbiterInput = {
    create?: XOR<HonorScoreCreateWithoutArbiterInput, HonorScoreUncheckedCreateWithoutArbiterInput>
    connectOrCreate?: HonorScoreCreateOrConnectWithoutArbiterInput
    connect?: HonorScoreWhereUniqueInput
  }

  export type WorldIdVerificationCreateNestedManyWithoutUserInput = {
    create?: XOR<WorldIdVerificationCreateWithoutUserInput, WorldIdVerificationUncheckedCreateWithoutUserInput> | WorldIdVerificationCreateWithoutUserInput[] | WorldIdVerificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WorldIdVerificationCreateOrConnectWithoutUserInput | WorldIdVerificationCreateOrConnectWithoutUserInput[]
    createMany?: WorldIdVerificationCreateManyUserInputEnvelope
    connect?: WorldIdVerificationWhereUniqueInput | WorldIdVerificationWhereUniqueInput[]
  }

  export type PoolUncheckedCreateNestedManyWithoutCreatorInput = {
    create?: XOR<PoolCreateWithoutCreatorInput, PoolUncheckedCreateWithoutCreatorInput> | PoolCreateWithoutCreatorInput[] | PoolUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: PoolCreateOrConnectWithoutCreatorInput | PoolCreateOrConnectWithoutCreatorInput[]
    createMany?: PoolCreateManyCreatorInputEnvelope
    connect?: PoolWhereUniqueInput | PoolWhereUniqueInput[]
  }

  export type PoolUncheckedCreateNestedManyWithoutArbiterInput = {
    create?: XOR<PoolCreateWithoutArbiterInput, PoolUncheckedCreateWithoutArbiterInput> | PoolCreateWithoutArbiterInput[] | PoolUncheckedCreateWithoutArbiterInput[]
    connectOrCreate?: PoolCreateOrConnectWithoutArbiterInput | PoolCreateOrConnectWithoutArbiterInput[]
    createMany?: PoolCreateManyArbiterInputEnvelope
    connect?: PoolWhereUniqueInput | PoolWhereUniqueInput[]
  }

  export type JoustUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<JoustCreateWithoutUserInput, JoustUncheckedCreateWithoutUserInput> | JoustCreateWithoutUserInput[] | JoustUncheckedCreateWithoutUserInput[]
    connectOrCreate?: JoustCreateOrConnectWithoutUserInput | JoustCreateOrConnectWithoutUserInput[]
    createMany?: JoustCreateManyUserInputEnvelope
    connect?: JoustWhereUniqueInput | JoustWhereUniqueInput[]
  }

  export type NotificationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type HonorVoteUncheckedCreateNestedManyWithoutVoterInput = {
    create?: XOR<HonorVoteCreateWithoutVoterInput, HonorVoteUncheckedCreateWithoutVoterInput> | HonorVoteCreateWithoutVoterInput[] | HonorVoteUncheckedCreateWithoutVoterInput[]
    connectOrCreate?: HonorVoteCreateOrConnectWithoutVoterInput | HonorVoteCreateOrConnectWithoutVoterInput[]
    createMany?: HonorVoteCreateManyVoterInputEnvelope
    connect?: HonorVoteWhereUniqueInput | HonorVoteWhereUniqueInput[]
  }

  export type HonorVoteUncheckedCreateNestedManyWithoutArbiterInput = {
    create?: XOR<HonorVoteCreateWithoutArbiterInput, HonorVoteUncheckedCreateWithoutArbiterInput> | HonorVoteCreateWithoutArbiterInput[] | HonorVoteUncheckedCreateWithoutArbiterInput[]
    connectOrCreate?: HonorVoteCreateOrConnectWithoutArbiterInput | HonorVoteCreateOrConnectWithoutArbiterInput[]
    createMany?: HonorVoteCreateManyArbiterInputEnvelope
    connect?: HonorVoteWhereUniqueInput | HonorVoteWhereUniqueInput[]
  }

  export type HonorScoreUncheckedCreateNestedOneWithoutArbiterInput = {
    create?: XOR<HonorScoreCreateWithoutArbiterInput, HonorScoreUncheckedCreateWithoutArbiterInput>
    connectOrCreate?: HonorScoreCreateOrConnectWithoutArbiterInput
    connect?: HonorScoreWhereUniqueInput
  }

  export type WorldIdVerificationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<WorldIdVerificationCreateWithoutUserInput, WorldIdVerificationUncheckedCreateWithoutUserInput> | WorldIdVerificationCreateWithoutUserInput[] | WorldIdVerificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WorldIdVerificationCreateOrConnectWithoutUserInput | WorldIdVerificationCreateOrConnectWithoutUserInput[]
    createMany?: WorldIdVerificationCreateManyUserInputEnvelope
    connect?: WorldIdVerificationWhereUniqueInput | WorldIdVerificationWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type PoolUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<PoolCreateWithoutCreatorInput, PoolUncheckedCreateWithoutCreatorInput> | PoolCreateWithoutCreatorInput[] | PoolUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: PoolCreateOrConnectWithoutCreatorInput | PoolCreateOrConnectWithoutCreatorInput[]
    upsert?: PoolUpsertWithWhereUniqueWithoutCreatorInput | PoolUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: PoolCreateManyCreatorInputEnvelope
    set?: PoolWhereUniqueInput | PoolWhereUniqueInput[]
    disconnect?: PoolWhereUniqueInput | PoolWhereUniqueInput[]
    delete?: PoolWhereUniqueInput | PoolWhereUniqueInput[]
    connect?: PoolWhereUniqueInput | PoolWhereUniqueInput[]
    update?: PoolUpdateWithWhereUniqueWithoutCreatorInput | PoolUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: PoolUpdateManyWithWhereWithoutCreatorInput | PoolUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: PoolScalarWhereInput | PoolScalarWhereInput[]
  }

  export type PoolUpdateManyWithoutArbiterNestedInput = {
    create?: XOR<PoolCreateWithoutArbiterInput, PoolUncheckedCreateWithoutArbiterInput> | PoolCreateWithoutArbiterInput[] | PoolUncheckedCreateWithoutArbiterInput[]
    connectOrCreate?: PoolCreateOrConnectWithoutArbiterInput | PoolCreateOrConnectWithoutArbiterInput[]
    upsert?: PoolUpsertWithWhereUniqueWithoutArbiterInput | PoolUpsertWithWhereUniqueWithoutArbiterInput[]
    createMany?: PoolCreateManyArbiterInputEnvelope
    set?: PoolWhereUniqueInput | PoolWhereUniqueInput[]
    disconnect?: PoolWhereUniqueInput | PoolWhereUniqueInput[]
    delete?: PoolWhereUniqueInput | PoolWhereUniqueInput[]
    connect?: PoolWhereUniqueInput | PoolWhereUniqueInput[]
    update?: PoolUpdateWithWhereUniqueWithoutArbiterInput | PoolUpdateWithWhereUniqueWithoutArbiterInput[]
    updateMany?: PoolUpdateManyWithWhereWithoutArbiterInput | PoolUpdateManyWithWhereWithoutArbiterInput[]
    deleteMany?: PoolScalarWhereInput | PoolScalarWhereInput[]
  }

  export type JoustUpdateManyWithoutUserNestedInput = {
    create?: XOR<JoustCreateWithoutUserInput, JoustUncheckedCreateWithoutUserInput> | JoustCreateWithoutUserInput[] | JoustUncheckedCreateWithoutUserInput[]
    connectOrCreate?: JoustCreateOrConnectWithoutUserInput | JoustCreateOrConnectWithoutUserInput[]
    upsert?: JoustUpsertWithWhereUniqueWithoutUserInput | JoustUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: JoustCreateManyUserInputEnvelope
    set?: JoustWhereUniqueInput | JoustWhereUniqueInput[]
    disconnect?: JoustWhereUniqueInput | JoustWhereUniqueInput[]
    delete?: JoustWhereUniqueInput | JoustWhereUniqueInput[]
    connect?: JoustWhereUniqueInput | JoustWhereUniqueInput[]
    update?: JoustUpdateWithWhereUniqueWithoutUserInput | JoustUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: JoustUpdateManyWithWhereWithoutUserInput | JoustUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: JoustScalarWhereInput | JoustScalarWhereInput[]
  }

  export type NotificationUpdateManyWithoutUserNestedInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutUserInput | NotificationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutUserInput | NotificationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutUserInput | NotificationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type HonorVoteUpdateManyWithoutVoterNestedInput = {
    create?: XOR<HonorVoteCreateWithoutVoterInput, HonorVoteUncheckedCreateWithoutVoterInput> | HonorVoteCreateWithoutVoterInput[] | HonorVoteUncheckedCreateWithoutVoterInput[]
    connectOrCreate?: HonorVoteCreateOrConnectWithoutVoterInput | HonorVoteCreateOrConnectWithoutVoterInput[]
    upsert?: HonorVoteUpsertWithWhereUniqueWithoutVoterInput | HonorVoteUpsertWithWhereUniqueWithoutVoterInput[]
    createMany?: HonorVoteCreateManyVoterInputEnvelope
    set?: HonorVoteWhereUniqueInput | HonorVoteWhereUniqueInput[]
    disconnect?: HonorVoteWhereUniqueInput | HonorVoteWhereUniqueInput[]
    delete?: HonorVoteWhereUniqueInput | HonorVoteWhereUniqueInput[]
    connect?: HonorVoteWhereUniqueInput | HonorVoteWhereUniqueInput[]
    update?: HonorVoteUpdateWithWhereUniqueWithoutVoterInput | HonorVoteUpdateWithWhereUniqueWithoutVoterInput[]
    updateMany?: HonorVoteUpdateManyWithWhereWithoutVoterInput | HonorVoteUpdateManyWithWhereWithoutVoterInput[]
    deleteMany?: HonorVoteScalarWhereInput | HonorVoteScalarWhereInput[]
  }

  export type HonorVoteUpdateManyWithoutArbiterNestedInput = {
    create?: XOR<HonorVoteCreateWithoutArbiterInput, HonorVoteUncheckedCreateWithoutArbiterInput> | HonorVoteCreateWithoutArbiterInput[] | HonorVoteUncheckedCreateWithoutArbiterInput[]
    connectOrCreate?: HonorVoteCreateOrConnectWithoutArbiterInput | HonorVoteCreateOrConnectWithoutArbiterInput[]
    upsert?: HonorVoteUpsertWithWhereUniqueWithoutArbiterInput | HonorVoteUpsertWithWhereUniqueWithoutArbiterInput[]
    createMany?: HonorVoteCreateManyArbiterInputEnvelope
    set?: HonorVoteWhereUniqueInput | HonorVoteWhereUniqueInput[]
    disconnect?: HonorVoteWhereUniqueInput | HonorVoteWhereUniqueInput[]
    delete?: HonorVoteWhereUniqueInput | HonorVoteWhereUniqueInput[]
    connect?: HonorVoteWhereUniqueInput | HonorVoteWhereUniqueInput[]
    update?: HonorVoteUpdateWithWhereUniqueWithoutArbiterInput | HonorVoteUpdateWithWhereUniqueWithoutArbiterInput[]
    updateMany?: HonorVoteUpdateManyWithWhereWithoutArbiterInput | HonorVoteUpdateManyWithWhereWithoutArbiterInput[]
    deleteMany?: HonorVoteScalarWhereInput | HonorVoteScalarWhereInput[]
  }

  export type HonorScoreUpdateOneWithoutArbiterNestedInput = {
    create?: XOR<HonorScoreCreateWithoutArbiterInput, HonorScoreUncheckedCreateWithoutArbiterInput>
    connectOrCreate?: HonorScoreCreateOrConnectWithoutArbiterInput
    upsert?: HonorScoreUpsertWithoutArbiterInput
    disconnect?: HonorScoreWhereInput | boolean
    delete?: HonorScoreWhereInput | boolean
    connect?: HonorScoreWhereUniqueInput
    update?: XOR<XOR<HonorScoreUpdateToOneWithWhereWithoutArbiterInput, HonorScoreUpdateWithoutArbiterInput>, HonorScoreUncheckedUpdateWithoutArbiterInput>
  }

  export type WorldIdVerificationUpdateManyWithoutUserNestedInput = {
    create?: XOR<WorldIdVerificationCreateWithoutUserInput, WorldIdVerificationUncheckedCreateWithoutUserInput> | WorldIdVerificationCreateWithoutUserInput[] | WorldIdVerificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WorldIdVerificationCreateOrConnectWithoutUserInput | WorldIdVerificationCreateOrConnectWithoutUserInput[]
    upsert?: WorldIdVerificationUpsertWithWhereUniqueWithoutUserInput | WorldIdVerificationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WorldIdVerificationCreateManyUserInputEnvelope
    set?: WorldIdVerificationWhereUniqueInput | WorldIdVerificationWhereUniqueInput[]
    disconnect?: WorldIdVerificationWhereUniqueInput | WorldIdVerificationWhereUniqueInput[]
    delete?: WorldIdVerificationWhereUniqueInput | WorldIdVerificationWhereUniqueInput[]
    connect?: WorldIdVerificationWhereUniqueInput | WorldIdVerificationWhereUniqueInput[]
    update?: WorldIdVerificationUpdateWithWhereUniqueWithoutUserInput | WorldIdVerificationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WorldIdVerificationUpdateManyWithWhereWithoutUserInput | WorldIdVerificationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WorldIdVerificationScalarWhereInput | WorldIdVerificationScalarWhereInput[]
  }

  export type PoolUncheckedUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<PoolCreateWithoutCreatorInput, PoolUncheckedCreateWithoutCreatorInput> | PoolCreateWithoutCreatorInput[] | PoolUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: PoolCreateOrConnectWithoutCreatorInput | PoolCreateOrConnectWithoutCreatorInput[]
    upsert?: PoolUpsertWithWhereUniqueWithoutCreatorInput | PoolUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: PoolCreateManyCreatorInputEnvelope
    set?: PoolWhereUniqueInput | PoolWhereUniqueInput[]
    disconnect?: PoolWhereUniqueInput | PoolWhereUniqueInput[]
    delete?: PoolWhereUniqueInput | PoolWhereUniqueInput[]
    connect?: PoolWhereUniqueInput | PoolWhereUniqueInput[]
    update?: PoolUpdateWithWhereUniqueWithoutCreatorInput | PoolUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: PoolUpdateManyWithWhereWithoutCreatorInput | PoolUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: PoolScalarWhereInput | PoolScalarWhereInput[]
  }

  export type PoolUncheckedUpdateManyWithoutArbiterNestedInput = {
    create?: XOR<PoolCreateWithoutArbiterInput, PoolUncheckedCreateWithoutArbiterInput> | PoolCreateWithoutArbiterInput[] | PoolUncheckedCreateWithoutArbiterInput[]
    connectOrCreate?: PoolCreateOrConnectWithoutArbiterInput | PoolCreateOrConnectWithoutArbiterInput[]
    upsert?: PoolUpsertWithWhereUniqueWithoutArbiterInput | PoolUpsertWithWhereUniqueWithoutArbiterInput[]
    createMany?: PoolCreateManyArbiterInputEnvelope
    set?: PoolWhereUniqueInput | PoolWhereUniqueInput[]
    disconnect?: PoolWhereUniqueInput | PoolWhereUniqueInput[]
    delete?: PoolWhereUniqueInput | PoolWhereUniqueInput[]
    connect?: PoolWhereUniqueInput | PoolWhereUniqueInput[]
    update?: PoolUpdateWithWhereUniqueWithoutArbiterInput | PoolUpdateWithWhereUniqueWithoutArbiterInput[]
    updateMany?: PoolUpdateManyWithWhereWithoutArbiterInput | PoolUpdateManyWithWhereWithoutArbiterInput[]
    deleteMany?: PoolScalarWhereInput | PoolScalarWhereInput[]
  }

  export type JoustUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<JoustCreateWithoutUserInput, JoustUncheckedCreateWithoutUserInput> | JoustCreateWithoutUserInput[] | JoustUncheckedCreateWithoutUserInput[]
    connectOrCreate?: JoustCreateOrConnectWithoutUserInput | JoustCreateOrConnectWithoutUserInput[]
    upsert?: JoustUpsertWithWhereUniqueWithoutUserInput | JoustUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: JoustCreateManyUserInputEnvelope
    set?: JoustWhereUniqueInput | JoustWhereUniqueInput[]
    disconnect?: JoustWhereUniqueInput | JoustWhereUniqueInput[]
    delete?: JoustWhereUniqueInput | JoustWhereUniqueInput[]
    connect?: JoustWhereUniqueInput | JoustWhereUniqueInput[]
    update?: JoustUpdateWithWhereUniqueWithoutUserInput | JoustUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: JoustUpdateManyWithWhereWithoutUserInput | JoustUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: JoustScalarWhereInput | JoustScalarWhereInput[]
  }

  export type NotificationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutUserInput | NotificationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutUserInput | NotificationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutUserInput | NotificationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type HonorVoteUncheckedUpdateManyWithoutVoterNestedInput = {
    create?: XOR<HonorVoteCreateWithoutVoterInput, HonorVoteUncheckedCreateWithoutVoterInput> | HonorVoteCreateWithoutVoterInput[] | HonorVoteUncheckedCreateWithoutVoterInput[]
    connectOrCreate?: HonorVoteCreateOrConnectWithoutVoterInput | HonorVoteCreateOrConnectWithoutVoterInput[]
    upsert?: HonorVoteUpsertWithWhereUniqueWithoutVoterInput | HonorVoteUpsertWithWhereUniqueWithoutVoterInput[]
    createMany?: HonorVoteCreateManyVoterInputEnvelope
    set?: HonorVoteWhereUniqueInput | HonorVoteWhereUniqueInput[]
    disconnect?: HonorVoteWhereUniqueInput | HonorVoteWhereUniqueInput[]
    delete?: HonorVoteWhereUniqueInput | HonorVoteWhereUniqueInput[]
    connect?: HonorVoteWhereUniqueInput | HonorVoteWhereUniqueInput[]
    update?: HonorVoteUpdateWithWhereUniqueWithoutVoterInput | HonorVoteUpdateWithWhereUniqueWithoutVoterInput[]
    updateMany?: HonorVoteUpdateManyWithWhereWithoutVoterInput | HonorVoteUpdateManyWithWhereWithoutVoterInput[]
    deleteMany?: HonorVoteScalarWhereInput | HonorVoteScalarWhereInput[]
  }

  export type HonorVoteUncheckedUpdateManyWithoutArbiterNestedInput = {
    create?: XOR<HonorVoteCreateWithoutArbiterInput, HonorVoteUncheckedCreateWithoutArbiterInput> | HonorVoteCreateWithoutArbiterInput[] | HonorVoteUncheckedCreateWithoutArbiterInput[]
    connectOrCreate?: HonorVoteCreateOrConnectWithoutArbiterInput | HonorVoteCreateOrConnectWithoutArbiterInput[]
    upsert?: HonorVoteUpsertWithWhereUniqueWithoutArbiterInput | HonorVoteUpsertWithWhereUniqueWithoutArbiterInput[]
    createMany?: HonorVoteCreateManyArbiterInputEnvelope
    set?: HonorVoteWhereUniqueInput | HonorVoteWhereUniqueInput[]
    disconnect?: HonorVoteWhereUniqueInput | HonorVoteWhereUniqueInput[]
    delete?: HonorVoteWhereUniqueInput | HonorVoteWhereUniqueInput[]
    connect?: HonorVoteWhereUniqueInput | HonorVoteWhereUniqueInput[]
    update?: HonorVoteUpdateWithWhereUniqueWithoutArbiterInput | HonorVoteUpdateWithWhereUniqueWithoutArbiterInput[]
    updateMany?: HonorVoteUpdateManyWithWhereWithoutArbiterInput | HonorVoteUpdateManyWithWhereWithoutArbiterInput[]
    deleteMany?: HonorVoteScalarWhereInput | HonorVoteScalarWhereInput[]
  }

  export type HonorScoreUncheckedUpdateOneWithoutArbiterNestedInput = {
    create?: XOR<HonorScoreCreateWithoutArbiterInput, HonorScoreUncheckedCreateWithoutArbiterInput>
    connectOrCreate?: HonorScoreCreateOrConnectWithoutArbiterInput
    upsert?: HonorScoreUpsertWithoutArbiterInput
    disconnect?: HonorScoreWhereInput | boolean
    delete?: HonorScoreWhereInput | boolean
    connect?: HonorScoreWhereUniqueInput
    update?: XOR<XOR<HonorScoreUpdateToOneWithWhereWithoutArbiterInput, HonorScoreUpdateWithoutArbiterInput>, HonorScoreUncheckedUpdateWithoutArbiterInput>
  }

  export type WorldIdVerificationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<WorldIdVerificationCreateWithoutUserInput, WorldIdVerificationUncheckedCreateWithoutUserInput> | WorldIdVerificationCreateWithoutUserInput[] | WorldIdVerificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WorldIdVerificationCreateOrConnectWithoutUserInput | WorldIdVerificationCreateOrConnectWithoutUserInput[]
    upsert?: WorldIdVerificationUpsertWithWhereUniqueWithoutUserInput | WorldIdVerificationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WorldIdVerificationCreateManyUserInputEnvelope
    set?: WorldIdVerificationWhereUniqueInput | WorldIdVerificationWhereUniqueInput[]
    disconnect?: WorldIdVerificationWhereUniqueInput | WorldIdVerificationWhereUniqueInput[]
    delete?: WorldIdVerificationWhereUniqueInput | WorldIdVerificationWhereUniqueInput[]
    connect?: WorldIdVerificationWhereUniqueInput | WorldIdVerificationWhereUniqueInput[]
    update?: WorldIdVerificationUpdateWithWhereUniqueWithoutUserInput | WorldIdVerificationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WorldIdVerificationUpdateManyWithWhereWithoutUserInput | WorldIdVerificationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WorldIdVerificationScalarWhereInput | WorldIdVerificationScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutCreatedPoolsInput = {
    create?: XOR<UserCreateWithoutCreatedPoolsInput, UserUncheckedCreateWithoutCreatedPoolsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedPoolsInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutArbitratedPoolsInput = {
    create?: XOR<UserCreateWithoutArbitratedPoolsInput, UserUncheckedCreateWithoutArbitratedPoolsInput>
    connectOrCreate?: UserCreateOrConnectWithoutArbitratedPoolsInput
    connect?: UserWhereUniqueInput
  }

  export type JoustCreateNestedManyWithoutPoolInput = {
    create?: XOR<JoustCreateWithoutPoolInput, JoustUncheckedCreateWithoutPoolInput> | JoustCreateWithoutPoolInput[] | JoustUncheckedCreateWithoutPoolInput[]
    connectOrCreate?: JoustCreateOrConnectWithoutPoolInput | JoustCreateOrConnectWithoutPoolInput[]
    createMany?: JoustCreateManyPoolInputEnvelope
    connect?: JoustWhereUniqueInput | JoustWhereUniqueInput[]
  }

  export type PoolOptionCreateNestedManyWithoutPoolInput = {
    create?: XOR<PoolOptionCreateWithoutPoolInput, PoolOptionUncheckedCreateWithoutPoolInput> | PoolOptionCreateWithoutPoolInput[] | PoolOptionUncheckedCreateWithoutPoolInput[]
    connectOrCreate?: PoolOptionCreateOrConnectWithoutPoolInput | PoolOptionCreateOrConnectWithoutPoolInput[]
    createMany?: PoolOptionCreateManyPoolInputEnvelope
    connect?: PoolOptionWhereUniqueInput | PoolOptionWhereUniqueInput[]
  }

  export type NotificationCreateNestedManyWithoutPoolInput = {
    create?: XOR<NotificationCreateWithoutPoolInput, NotificationUncheckedCreateWithoutPoolInput> | NotificationCreateWithoutPoolInput[] | NotificationUncheckedCreateWithoutPoolInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutPoolInput | NotificationCreateOrConnectWithoutPoolInput[]
    createMany?: NotificationCreateManyPoolInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type HonorVoteCreateNestedManyWithoutPoolInput = {
    create?: XOR<HonorVoteCreateWithoutPoolInput, HonorVoteUncheckedCreateWithoutPoolInput> | HonorVoteCreateWithoutPoolInput[] | HonorVoteUncheckedCreateWithoutPoolInput[]
    connectOrCreate?: HonorVoteCreateOrConnectWithoutPoolInput | HonorVoteCreateOrConnectWithoutPoolInput[]
    createMany?: HonorVoteCreateManyPoolInputEnvelope
    connect?: HonorVoteWhereUniqueInput | HonorVoteWhereUniqueInput[]
  }

  export type JoustUncheckedCreateNestedManyWithoutPoolInput = {
    create?: XOR<JoustCreateWithoutPoolInput, JoustUncheckedCreateWithoutPoolInput> | JoustCreateWithoutPoolInput[] | JoustUncheckedCreateWithoutPoolInput[]
    connectOrCreate?: JoustCreateOrConnectWithoutPoolInput | JoustCreateOrConnectWithoutPoolInput[]
    createMany?: JoustCreateManyPoolInputEnvelope
    connect?: JoustWhereUniqueInput | JoustWhereUniqueInput[]
  }

  export type PoolOptionUncheckedCreateNestedManyWithoutPoolInput = {
    create?: XOR<PoolOptionCreateWithoutPoolInput, PoolOptionUncheckedCreateWithoutPoolInput> | PoolOptionCreateWithoutPoolInput[] | PoolOptionUncheckedCreateWithoutPoolInput[]
    connectOrCreate?: PoolOptionCreateOrConnectWithoutPoolInput | PoolOptionCreateOrConnectWithoutPoolInput[]
    createMany?: PoolOptionCreateManyPoolInputEnvelope
    connect?: PoolOptionWhereUniqueInput | PoolOptionWhereUniqueInput[]
  }

  export type NotificationUncheckedCreateNestedManyWithoutPoolInput = {
    create?: XOR<NotificationCreateWithoutPoolInput, NotificationUncheckedCreateWithoutPoolInput> | NotificationCreateWithoutPoolInput[] | NotificationUncheckedCreateWithoutPoolInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutPoolInput | NotificationCreateOrConnectWithoutPoolInput[]
    createMany?: NotificationCreateManyPoolInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type HonorVoteUncheckedCreateNestedManyWithoutPoolInput = {
    create?: XOR<HonorVoteCreateWithoutPoolInput, HonorVoteUncheckedCreateWithoutPoolInput> | HonorVoteCreateWithoutPoolInput[] | HonorVoteUncheckedCreateWithoutPoolInput[]
    connectOrCreate?: HonorVoteCreateOrConnectWithoutPoolInput | HonorVoteCreateOrConnectWithoutPoolInput[]
    createMany?: HonorVoteCreateManyPoolInputEnvelope
    connect?: HonorVoteWhereUniqueInput | HonorVoteWhereUniqueInput[]
  }

  export type NullableBigIntFieldUpdateOperationsInput = {
    set?: bigint | number | null
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type EnumPoolStateFieldUpdateOperationsInput = {
    set?: $Enums.PoolState
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutCreatedPoolsNestedInput = {
    create?: XOR<UserCreateWithoutCreatedPoolsInput, UserUncheckedCreateWithoutCreatedPoolsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedPoolsInput
    upsert?: UserUpsertWithoutCreatedPoolsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCreatedPoolsInput, UserUpdateWithoutCreatedPoolsInput>, UserUncheckedUpdateWithoutCreatedPoolsInput>
  }

  export type UserUpdateOneWithoutArbitratedPoolsNestedInput = {
    create?: XOR<UserCreateWithoutArbitratedPoolsInput, UserUncheckedCreateWithoutArbitratedPoolsInput>
    connectOrCreate?: UserCreateOrConnectWithoutArbitratedPoolsInput
    upsert?: UserUpsertWithoutArbitratedPoolsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutArbitratedPoolsInput, UserUpdateWithoutArbitratedPoolsInput>, UserUncheckedUpdateWithoutArbitratedPoolsInput>
  }

  export type JoustUpdateManyWithoutPoolNestedInput = {
    create?: XOR<JoustCreateWithoutPoolInput, JoustUncheckedCreateWithoutPoolInput> | JoustCreateWithoutPoolInput[] | JoustUncheckedCreateWithoutPoolInput[]
    connectOrCreate?: JoustCreateOrConnectWithoutPoolInput | JoustCreateOrConnectWithoutPoolInput[]
    upsert?: JoustUpsertWithWhereUniqueWithoutPoolInput | JoustUpsertWithWhereUniqueWithoutPoolInput[]
    createMany?: JoustCreateManyPoolInputEnvelope
    set?: JoustWhereUniqueInput | JoustWhereUniqueInput[]
    disconnect?: JoustWhereUniqueInput | JoustWhereUniqueInput[]
    delete?: JoustWhereUniqueInput | JoustWhereUniqueInput[]
    connect?: JoustWhereUniqueInput | JoustWhereUniqueInput[]
    update?: JoustUpdateWithWhereUniqueWithoutPoolInput | JoustUpdateWithWhereUniqueWithoutPoolInput[]
    updateMany?: JoustUpdateManyWithWhereWithoutPoolInput | JoustUpdateManyWithWhereWithoutPoolInput[]
    deleteMany?: JoustScalarWhereInput | JoustScalarWhereInput[]
  }

  export type PoolOptionUpdateManyWithoutPoolNestedInput = {
    create?: XOR<PoolOptionCreateWithoutPoolInput, PoolOptionUncheckedCreateWithoutPoolInput> | PoolOptionCreateWithoutPoolInput[] | PoolOptionUncheckedCreateWithoutPoolInput[]
    connectOrCreate?: PoolOptionCreateOrConnectWithoutPoolInput | PoolOptionCreateOrConnectWithoutPoolInput[]
    upsert?: PoolOptionUpsertWithWhereUniqueWithoutPoolInput | PoolOptionUpsertWithWhereUniqueWithoutPoolInput[]
    createMany?: PoolOptionCreateManyPoolInputEnvelope
    set?: PoolOptionWhereUniqueInput | PoolOptionWhereUniqueInput[]
    disconnect?: PoolOptionWhereUniqueInput | PoolOptionWhereUniqueInput[]
    delete?: PoolOptionWhereUniqueInput | PoolOptionWhereUniqueInput[]
    connect?: PoolOptionWhereUniqueInput | PoolOptionWhereUniqueInput[]
    update?: PoolOptionUpdateWithWhereUniqueWithoutPoolInput | PoolOptionUpdateWithWhereUniqueWithoutPoolInput[]
    updateMany?: PoolOptionUpdateManyWithWhereWithoutPoolInput | PoolOptionUpdateManyWithWhereWithoutPoolInput[]
    deleteMany?: PoolOptionScalarWhereInput | PoolOptionScalarWhereInput[]
  }

  export type NotificationUpdateManyWithoutPoolNestedInput = {
    create?: XOR<NotificationCreateWithoutPoolInput, NotificationUncheckedCreateWithoutPoolInput> | NotificationCreateWithoutPoolInput[] | NotificationUncheckedCreateWithoutPoolInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutPoolInput | NotificationCreateOrConnectWithoutPoolInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutPoolInput | NotificationUpsertWithWhereUniqueWithoutPoolInput[]
    createMany?: NotificationCreateManyPoolInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutPoolInput | NotificationUpdateWithWhereUniqueWithoutPoolInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutPoolInput | NotificationUpdateManyWithWhereWithoutPoolInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type HonorVoteUpdateManyWithoutPoolNestedInput = {
    create?: XOR<HonorVoteCreateWithoutPoolInput, HonorVoteUncheckedCreateWithoutPoolInput> | HonorVoteCreateWithoutPoolInput[] | HonorVoteUncheckedCreateWithoutPoolInput[]
    connectOrCreate?: HonorVoteCreateOrConnectWithoutPoolInput | HonorVoteCreateOrConnectWithoutPoolInput[]
    upsert?: HonorVoteUpsertWithWhereUniqueWithoutPoolInput | HonorVoteUpsertWithWhereUniqueWithoutPoolInput[]
    createMany?: HonorVoteCreateManyPoolInputEnvelope
    set?: HonorVoteWhereUniqueInput | HonorVoteWhereUniqueInput[]
    disconnect?: HonorVoteWhereUniqueInput | HonorVoteWhereUniqueInput[]
    delete?: HonorVoteWhereUniqueInput | HonorVoteWhereUniqueInput[]
    connect?: HonorVoteWhereUniqueInput | HonorVoteWhereUniqueInput[]
    update?: HonorVoteUpdateWithWhereUniqueWithoutPoolInput | HonorVoteUpdateWithWhereUniqueWithoutPoolInput[]
    updateMany?: HonorVoteUpdateManyWithWhereWithoutPoolInput | HonorVoteUpdateManyWithWhereWithoutPoolInput[]
    deleteMany?: HonorVoteScalarWhereInput | HonorVoteScalarWhereInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type JoustUncheckedUpdateManyWithoutPoolNestedInput = {
    create?: XOR<JoustCreateWithoutPoolInput, JoustUncheckedCreateWithoutPoolInput> | JoustCreateWithoutPoolInput[] | JoustUncheckedCreateWithoutPoolInput[]
    connectOrCreate?: JoustCreateOrConnectWithoutPoolInput | JoustCreateOrConnectWithoutPoolInput[]
    upsert?: JoustUpsertWithWhereUniqueWithoutPoolInput | JoustUpsertWithWhereUniqueWithoutPoolInput[]
    createMany?: JoustCreateManyPoolInputEnvelope
    set?: JoustWhereUniqueInput | JoustWhereUniqueInput[]
    disconnect?: JoustWhereUniqueInput | JoustWhereUniqueInput[]
    delete?: JoustWhereUniqueInput | JoustWhereUniqueInput[]
    connect?: JoustWhereUniqueInput | JoustWhereUniqueInput[]
    update?: JoustUpdateWithWhereUniqueWithoutPoolInput | JoustUpdateWithWhereUniqueWithoutPoolInput[]
    updateMany?: JoustUpdateManyWithWhereWithoutPoolInput | JoustUpdateManyWithWhereWithoutPoolInput[]
    deleteMany?: JoustScalarWhereInput | JoustScalarWhereInput[]
  }

  export type PoolOptionUncheckedUpdateManyWithoutPoolNestedInput = {
    create?: XOR<PoolOptionCreateWithoutPoolInput, PoolOptionUncheckedCreateWithoutPoolInput> | PoolOptionCreateWithoutPoolInput[] | PoolOptionUncheckedCreateWithoutPoolInput[]
    connectOrCreate?: PoolOptionCreateOrConnectWithoutPoolInput | PoolOptionCreateOrConnectWithoutPoolInput[]
    upsert?: PoolOptionUpsertWithWhereUniqueWithoutPoolInput | PoolOptionUpsertWithWhereUniqueWithoutPoolInput[]
    createMany?: PoolOptionCreateManyPoolInputEnvelope
    set?: PoolOptionWhereUniqueInput | PoolOptionWhereUniqueInput[]
    disconnect?: PoolOptionWhereUniqueInput | PoolOptionWhereUniqueInput[]
    delete?: PoolOptionWhereUniqueInput | PoolOptionWhereUniqueInput[]
    connect?: PoolOptionWhereUniqueInput | PoolOptionWhereUniqueInput[]
    update?: PoolOptionUpdateWithWhereUniqueWithoutPoolInput | PoolOptionUpdateWithWhereUniqueWithoutPoolInput[]
    updateMany?: PoolOptionUpdateManyWithWhereWithoutPoolInput | PoolOptionUpdateManyWithWhereWithoutPoolInput[]
    deleteMany?: PoolOptionScalarWhereInput | PoolOptionScalarWhereInput[]
  }

  export type NotificationUncheckedUpdateManyWithoutPoolNestedInput = {
    create?: XOR<NotificationCreateWithoutPoolInput, NotificationUncheckedCreateWithoutPoolInput> | NotificationCreateWithoutPoolInput[] | NotificationUncheckedCreateWithoutPoolInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutPoolInput | NotificationCreateOrConnectWithoutPoolInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutPoolInput | NotificationUpsertWithWhereUniqueWithoutPoolInput[]
    createMany?: NotificationCreateManyPoolInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutPoolInput | NotificationUpdateWithWhereUniqueWithoutPoolInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutPoolInput | NotificationUpdateManyWithWhereWithoutPoolInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type HonorVoteUncheckedUpdateManyWithoutPoolNestedInput = {
    create?: XOR<HonorVoteCreateWithoutPoolInput, HonorVoteUncheckedCreateWithoutPoolInput> | HonorVoteCreateWithoutPoolInput[] | HonorVoteUncheckedCreateWithoutPoolInput[]
    connectOrCreate?: HonorVoteCreateOrConnectWithoutPoolInput | HonorVoteCreateOrConnectWithoutPoolInput[]
    upsert?: HonorVoteUpsertWithWhereUniqueWithoutPoolInput | HonorVoteUpsertWithWhereUniqueWithoutPoolInput[]
    createMany?: HonorVoteCreateManyPoolInputEnvelope
    set?: HonorVoteWhereUniqueInput | HonorVoteWhereUniqueInput[]
    disconnect?: HonorVoteWhereUniqueInput | HonorVoteWhereUniqueInput[]
    delete?: HonorVoteWhereUniqueInput | HonorVoteWhereUniqueInput[]
    connect?: HonorVoteWhereUniqueInput | HonorVoteWhereUniqueInput[]
    update?: HonorVoteUpdateWithWhereUniqueWithoutPoolInput | HonorVoteUpdateWithWhereUniqueWithoutPoolInput[]
    updateMany?: HonorVoteUpdateManyWithWhereWithoutPoolInput | HonorVoteUpdateManyWithWhereWithoutPoolInput[]
    deleteMany?: HonorVoteScalarWhereInput | HonorVoteScalarWhereInput[]
  }

  export type PoolCreateNestedOneWithoutOptionsInput = {
    create?: XOR<PoolCreateWithoutOptionsInput, PoolUncheckedCreateWithoutOptionsInput>
    connectOrCreate?: PoolCreateOrConnectWithoutOptionsInput
    connect?: PoolWhereUniqueInput
  }

  export type PoolUpdateOneRequiredWithoutOptionsNestedInput = {
    create?: XOR<PoolCreateWithoutOptionsInput, PoolUncheckedCreateWithoutOptionsInput>
    connectOrCreate?: PoolCreateOrConnectWithoutOptionsInput
    upsert?: PoolUpsertWithoutOptionsInput
    connect?: PoolWhereUniqueInput
    update?: XOR<XOR<PoolUpdateToOneWithWhereWithoutOptionsInput, PoolUpdateWithoutOptionsInput>, PoolUncheckedUpdateWithoutOptionsInput>
  }

  export type UserCreateNestedOneWithoutJoustsInput = {
    create?: XOR<UserCreateWithoutJoustsInput, UserUncheckedCreateWithoutJoustsInput>
    connectOrCreate?: UserCreateOrConnectWithoutJoustsInput
    connect?: UserWhereUniqueInput
  }

  export type PoolCreateNestedOneWithoutJoustsInput = {
    create?: XOR<PoolCreateWithoutJoustsInput, PoolUncheckedCreateWithoutJoustsInput>
    connectOrCreate?: PoolCreateOrConnectWithoutJoustsInput
    connect?: PoolWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutJoustsNestedInput = {
    create?: XOR<UserCreateWithoutJoustsInput, UserUncheckedCreateWithoutJoustsInput>
    connectOrCreate?: UserCreateOrConnectWithoutJoustsInput
    upsert?: UserUpsertWithoutJoustsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutJoustsInput, UserUpdateWithoutJoustsInput>, UserUncheckedUpdateWithoutJoustsInput>
  }

  export type PoolUpdateOneRequiredWithoutJoustsNestedInput = {
    create?: XOR<PoolCreateWithoutJoustsInput, PoolUncheckedCreateWithoutJoustsInput>
    connectOrCreate?: PoolCreateOrConnectWithoutJoustsInput
    upsert?: PoolUpsertWithoutJoustsInput
    connect?: PoolWhereUniqueInput
    update?: XOR<XOR<PoolUpdateToOneWithWhereWithoutJoustsInput, PoolUpdateWithoutJoustsInput>, PoolUncheckedUpdateWithoutJoustsInput>
  }

  export type UserCreateNestedOneWithoutNotificationsInput = {
    create?: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotificationsInput
    connect?: UserWhereUniqueInput
  }

  export type PoolCreateNestedOneWithoutNotificationsInput = {
    create?: XOR<PoolCreateWithoutNotificationsInput, PoolUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: PoolCreateOrConnectWithoutNotificationsInput
    connect?: PoolWhereUniqueInput
  }

  export type EnumNotificationTypeFieldUpdateOperationsInput = {
    set?: $Enums.NotificationType
  }

  export type UserUpdateOneRequiredWithoutNotificationsNestedInput = {
    create?: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotificationsInput
    upsert?: UserUpsertWithoutNotificationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutNotificationsInput, UserUpdateWithoutNotificationsInput>, UserUncheckedUpdateWithoutNotificationsInput>
  }

  export type PoolUpdateOneWithoutNotificationsNestedInput = {
    create?: XOR<PoolCreateWithoutNotificationsInput, PoolUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: PoolCreateOrConnectWithoutNotificationsInput
    upsert?: PoolUpsertWithoutNotificationsInput
    disconnect?: PoolWhereInput | boolean
    delete?: PoolWhereInput | boolean
    connect?: PoolWhereUniqueInput
    update?: XOR<XOR<PoolUpdateToOneWithWhereWithoutNotificationsInput, PoolUpdateWithoutNotificationsInput>, PoolUncheckedUpdateWithoutNotificationsInput>
  }

  export type UserCreateNestedOneWithoutVotesCastInput = {
    create?: XOR<UserCreateWithoutVotesCastInput, UserUncheckedCreateWithoutVotesCastInput>
    connectOrCreate?: UserCreateOrConnectWithoutVotesCastInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutVotesReceivedInput = {
    create?: XOR<UserCreateWithoutVotesReceivedInput, UserUncheckedCreateWithoutVotesReceivedInput>
    connectOrCreate?: UserCreateOrConnectWithoutVotesReceivedInput
    connect?: UserWhereUniqueInput
  }

  export type PoolCreateNestedOneWithoutHonorVotesInput = {
    create?: XOR<PoolCreateWithoutHonorVotesInput, PoolUncheckedCreateWithoutHonorVotesInput>
    connectOrCreate?: PoolCreateOrConnectWithoutHonorVotesInput
    connect?: PoolWhereUniqueInput
  }

  export type EnumHonorVoteTypeFieldUpdateOperationsInput = {
    set?: $Enums.HonorVoteType
  }

  export type UserUpdateOneRequiredWithoutVotesCastNestedInput = {
    create?: XOR<UserCreateWithoutVotesCastInput, UserUncheckedCreateWithoutVotesCastInput>
    connectOrCreate?: UserCreateOrConnectWithoutVotesCastInput
    upsert?: UserUpsertWithoutVotesCastInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutVotesCastInput, UserUpdateWithoutVotesCastInput>, UserUncheckedUpdateWithoutVotesCastInput>
  }

  export type UserUpdateOneRequiredWithoutVotesReceivedNestedInput = {
    create?: XOR<UserCreateWithoutVotesReceivedInput, UserUncheckedCreateWithoutVotesReceivedInput>
    connectOrCreate?: UserCreateOrConnectWithoutVotesReceivedInput
    upsert?: UserUpsertWithoutVotesReceivedInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutVotesReceivedInput, UserUpdateWithoutVotesReceivedInput>, UserUncheckedUpdateWithoutVotesReceivedInput>
  }

  export type PoolUpdateOneRequiredWithoutHonorVotesNestedInput = {
    create?: XOR<PoolCreateWithoutHonorVotesInput, PoolUncheckedCreateWithoutHonorVotesInput>
    connectOrCreate?: PoolCreateOrConnectWithoutHonorVotesInput
    upsert?: PoolUpsertWithoutHonorVotesInput
    connect?: PoolWhereUniqueInput
    update?: XOR<XOR<PoolUpdateToOneWithWhereWithoutHonorVotesInput, PoolUpdateWithoutHonorVotesInput>, PoolUncheckedUpdateWithoutHonorVotesInput>
  }

  export type UserCreateNestedOneWithoutHonorScoreInput = {
    create?: XOR<UserCreateWithoutHonorScoreInput, UserUncheckedCreateWithoutHonorScoreInput>
    connectOrCreate?: UserCreateOrConnectWithoutHonorScoreInput
    connect?: UserWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutHonorScoreNestedInput = {
    create?: XOR<UserCreateWithoutHonorScoreInput, UserUncheckedCreateWithoutHonorScoreInput>
    connectOrCreate?: UserCreateOrConnectWithoutHonorScoreInput
    upsert?: UserUpsertWithoutHonorScoreInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutHonorScoreInput, UserUpdateWithoutHonorScoreInput>, UserUncheckedUpdateWithoutHonorScoreInput>
  }

  export type UserCreateNestedOneWithoutWorldIdVerificationsInput = {
    create?: XOR<UserCreateWithoutWorldIdVerificationsInput, UserUncheckedCreateWithoutWorldIdVerificationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutWorldIdVerificationsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutWorldIdVerificationsNestedInput = {
    create?: XOR<UserCreateWithoutWorldIdVerificationsInput, UserUncheckedCreateWithoutWorldIdVerificationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutWorldIdVerificationsInput
    upsert?: UserUpsertWithoutWorldIdVerificationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutWorldIdVerificationsInput, UserUpdateWithoutWorldIdVerificationsInput>, UserUncheckedUpdateWithoutWorldIdVerificationsInput>
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

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type NestedBigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type NestedEnumPoolStateFilter<$PrismaModel = never> = {
    equals?: $Enums.PoolState | EnumPoolStateFieldRefInput<$PrismaModel>
    in?: $Enums.PoolState[] | ListEnumPoolStateFieldRefInput<$PrismaModel>
    notIn?: $Enums.PoolState[] | ListEnumPoolStateFieldRefInput<$PrismaModel>
    not?: NestedEnumPoolStateFilter<$PrismaModel> | $Enums.PoolState
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedBigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
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

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type NestedEnumPoolStateWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PoolState | EnumPoolStateFieldRefInput<$PrismaModel>
    in?: $Enums.PoolState[] | ListEnumPoolStateFieldRefInput<$PrismaModel>
    notIn?: $Enums.PoolState[] | ListEnumPoolStateFieldRefInput<$PrismaModel>
    not?: NestedEnumPoolStateWithAggregatesFilter<$PrismaModel> | $Enums.PoolState
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPoolStateFilter<$PrismaModel>
    _max?: NestedEnumPoolStateFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumNotificationTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | EnumNotificationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationTypeFilter<$PrismaModel> | $Enums.NotificationType
  }

  export type NestedUuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumNotificationTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | EnumNotificationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationTypeWithAggregatesFilter<$PrismaModel> | $Enums.NotificationType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNotificationTypeFilter<$PrismaModel>
    _max?: NestedEnumNotificationTypeFilter<$PrismaModel>
  }

  export type NestedUuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedEnumHonorVoteTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.HonorVoteType | EnumHonorVoteTypeFieldRefInput<$PrismaModel>
    in?: $Enums.HonorVoteType[] | ListEnumHonorVoteTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.HonorVoteType[] | ListEnumHonorVoteTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumHonorVoteTypeFilter<$PrismaModel> | $Enums.HonorVoteType
  }

  export type NestedEnumHonorVoteTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.HonorVoteType | EnumHonorVoteTypeFieldRefInput<$PrismaModel>
    in?: $Enums.HonorVoteType[] | ListEnumHonorVoteTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.HonorVoteType[] | ListEnumHonorVoteTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumHonorVoteTypeWithAggregatesFilter<$PrismaModel> | $Enums.HonorVoteType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumHonorVoteTypeFilter<$PrismaModel>
    _max?: NestedEnumHonorVoteTypeFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type PoolCreateWithoutCreatorInput = {
    id?: string
    contractId?: bigint | number | null
    title: string
    description?: string | null
    image?: string | null
    arbiterAddress: string
    arbiterAccepted?: boolean
    arbiterFee: number
    collateral: string
    minJoustAmount: bigint | number
    totalAmountJousted?: bigint | number
    supportedJoustTypes?: number
    winningJoustType?: number
    state?: $Enums.PoolState
    endTime: Date | string
    contractEndTime?: number
    deployedAt?: Date | string | null
    closedAt?: Date | string | null
    settledAt?: Date | string | null
    refundedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    arbiter?: UserCreateNestedOneWithoutArbitratedPoolsInput
    jousts?: JoustCreateNestedManyWithoutPoolInput
    options?: PoolOptionCreateNestedManyWithoutPoolInput
    notifications?: NotificationCreateNestedManyWithoutPoolInput
    honorVotes?: HonorVoteCreateNestedManyWithoutPoolInput
  }

  export type PoolUncheckedCreateWithoutCreatorInput = {
    id?: string
    contractId?: bigint | number | null
    title: string
    description?: string | null
    image?: string | null
    arbiterId?: number | null
    arbiterAddress: string
    arbiterAccepted?: boolean
    arbiterFee: number
    collateral: string
    minJoustAmount: bigint | number
    totalAmountJousted?: bigint | number
    supportedJoustTypes?: number
    winningJoustType?: number
    state?: $Enums.PoolState
    endTime: Date | string
    contractEndTime?: number
    deployedAt?: Date | string | null
    closedAt?: Date | string | null
    settledAt?: Date | string | null
    refundedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    jousts?: JoustUncheckedCreateNestedManyWithoutPoolInput
    options?: PoolOptionUncheckedCreateNestedManyWithoutPoolInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutPoolInput
    honorVotes?: HonorVoteUncheckedCreateNestedManyWithoutPoolInput
  }

  export type PoolCreateOrConnectWithoutCreatorInput = {
    where: PoolWhereUniqueInput
    create: XOR<PoolCreateWithoutCreatorInput, PoolUncheckedCreateWithoutCreatorInput>
  }

  export type PoolCreateManyCreatorInputEnvelope = {
    data: PoolCreateManyCreatorInput | PoolCreateManyCreatorInput[]
    skipDuplicates?: boolean
  }

  export type PoolCreateWithoutArbiterInput = {
    id?: string
    contractId?: bigint | number | null
    title: string
    description?: string | null
    image?: string | null
    arbiterAddress: string
    arbiterAccepted?: boolean
    arbiterFee: number
    collateral: string
    minJoustAmount: bigint | number
    totalAmountJousted?: bigint | number
    supportedJoustTypes?: number
    winningJoustType?: number
    state?: $Enums.PoolState
    endTime: Date | string
    contractEndTime?: number
    deployedAt?: Date | string | null
    closedAt?: Date | string | null
    settledAt?: Date | string | null
    refundedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    creator: UserCreateNestedOneWithoutCreatedPoolsInput
    jousts?: JoustCreateNestedManyWithoutPoolInput
    options?: PoolOptionCreateNestedManyWithoutPoolInput
    notifications?: NotificationCreateNestedManyWithoutPoolInput
    honorVotes?: HonorVoteCreateNestedManyWithoutPoolInput
  }

  export type PoolUncheckedCreateWithoutArbiterInput = {
    id?: string
    contractId?: bigint | number | null
    title: string
    description?: string | null
    image?: string | null
    creatorId: number
    arbiterAddress: string
    arbiterAccepted?: boolean
    arbiterFee: number
    collateral: string
    minJoustAmount: bigint | number
    totalAmountJousted?: bigint | number
    supportedJoustTypes?: number
    winningJoustType?: number
    state?: $Enums.PoolState
    endTime: Date | string
    contractEndTime?: number
    deployedAt?: Date | string | null
    closedAt?: Date | string | null
    settledAt?: Date | string | null
    refundedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    jousts?: JoustUncheckedCreateNestedManyWithoutPoolInput
    options?: PoolOptionUncheckedCreateNestedManyWithoutPoolInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutPoolInput
    honorVotes?: HonorVoteUncheckedCreateNestedManyWithoutPoolInput
  }

  export type PoolCreateOrConnectWithoutArbiterInput = {
    where: PoolWhereUniqueInput
    create: XOR<PoolCreateWithoutArbiterInput, PoolUncheckedCreateWithoutArbiterInput>
  }

  export type PoolCreateManyArbiterInputEnvelope = {
    data: PoolCreateManyArbiterInput | PoolCreateManyArbiterInput[]
    skipDuplicates?: boolean
  }

  export type JoustCreateWithoutUserInput = {
    joustType: number
    amount: bigint | number
    isWinner?: boolean
    txHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    pool: PoolCreateNestedOneWithoutJoustsInput
  }

  export type JoustUncheckedCreateWithoutUserInput = {
    id?: number
    poolId: string
    joustType: number
    amount: bigint | number
    isWinner?: boolean
    txHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type JoustCreateOrConnectWithoutUserInput = {
    where: JoustWhereUniqueInput
    create: XOR<JoustCreateWithoutUserInput, JoustUncheckedCreateWithoutUserInput>
  }

  export type JoustCreateManyUserInputEnvelope = {
    data: JoustCreateManyUserInput | JoustCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type NotificationCreateWithoutUserInput = {
    type: $Enums.NotificationType
    title: string
    body?: string | null
    read?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    pool?: PoolCreateNestedOneWithoutNotificationsInput
  }

  export type NotificationUncheckedCreateWithoutUserInput = {
    id?: number
    type: $Enums.NotificationType
    title: string
    body?: string | null
    poolId?: string | null
    read?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NotificationCreateOrConnectWithoutUserInput = {
    where: NotificationWhereUniqueInput
    create: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput>
  }

  export type NotificationCreateManyUserInputEnvelope = {
    data: NotificationCreateManyUserInput | NotificationCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type HonorVoteCreateWithoutVoterInput = {
    voteType: $Enums.HonorVoteType
    createdAt?: Date | string
    updatedAt?: Date | string
    arbiter: UserCreateNestedOneWithoutVotesReceivedInput
    pool: PoolCreateNestedOneWithoutHonorVotesInput
  }

  export type HonorVoteUncheckedCreateWithoutVoterInput = {
    id?: number
    arbiterId: number
    poolId: string
    voteType: $Enums.HonorVoteType
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HonorVoteCreateOrConnectWithoutVoterInput = {
    where: HonorVoteWhereUniqueInput
    create: XOR<HonorVoteCreateWithoutVoterInput, HonorVoteUncheckedCreateWithoutVoterInput>
  }

  export type HonorVoteCreateManyVoterInputEnvelope = {
    data: HonorVoteCreateManyVoterInput | HonorVoteCreateManyVoterInput[]
    skipDuplicates?: boolean
  }

  export type HonorVoteCreateWithoutArbiterInput = {
    voteType: $Enums.HonorVoteType
    createdAt?: Date | string
    updatedAt?: Date | string
    voter: UserCreateNestedOneWithoutVotesCastInput
    pool: PoolCreateNestedOneWithoutHonorVotesInput
  }

  export type HonorVoteUncheckedCreateWithoutArbiterInput = {
    id?: number
    voterId: number
    poolId: string
    voteType: $Enums.HonorVoteType
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HonorVoteCreateOrConnectWithoutArbiterInput = {
    where: HonorVoteWhereUniqueInput
    create: XOR<HonorVoteCreateWithoutArbiterInput, HonorVoteUncheckedCreateWithoutArbiterInput>
  }

  export type HonorVoteCreateManyArbiterInputEnvelope = {
    data: HonorVoteCreateManyArbiterInput | HonorVoteCreateManyArbiterInput[]
    skipDuplicates?: boolean
  }

  export type HonorScoreCreateWithoutArbiterInput = {
    totalUpvotes?: number
    totalDownvotes?: number
    score?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HonorScoreUncheckedCreateWithoutArbiterInput = {
    totalUpvotes?: number
    totalDownvotes?: number
    score?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HonorScoreCreateOrConnectWithoutArbiterInput = {
    where: HonorScoreWhereUniqueInput
    create: XOR<HonorScoreCreateWithoutArbiterInput, HonorScoreUncheckedCreateWithoutArbiterInput>
  }

  export type WorldIdVerificationCreateWithoutUserInput = {
    action: string
    nullifierHash: string
    verificationLevel: string
    createdAt?: Date | string
  }

  export type WorldIdVerificationUncheckedCreateWithoutUserInput = {
    id?: number
    action: string
    nullifierHash: string
    verificationLevel: string
    createdAt?: Date | string
  }

  export type WorldIdVerificationCreateOrConnectWithoutUserInput = {
    where: WorldIdVerificationWhereUniqueInput
    create: XOR<WorldIdVerificationCreateWithoutUserInput, WorldIdVerificationUncheckedCreateWithoutUserInput>
  }

  export type WorldIdVerificationCreateManyUserInputEnvelope = {
    data: WorldIdVerificationCreateManyUserInput | WorldIdVerificationCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type PoolUpsertWithWhereUniqueWithoutCreatorInput = {
    where: PoolWhereUniqueInput
    update: XOR<PoolUpdateWithoutCreatorInput, PoolUncheckedUpdateWithoutCreatorInput>
    create: XOR<PoolCreateWithoutCreatorInput, PoolUncheckedCreateWithoutCreatorInput>
  }

  export type PoolUpdateWithWhereUniqueWithoutCreatorInput = {
    where: PoolWhereUniqueInput
    data: XOR<PoolUpdateWithoutCreatorInput, PoolUncheckedUpdateWithoutCreatorInput>
  }

  export type PoolUpdateManyWithWhereWithoutCreatorInput = {
    where: PoolScalarWhereInput
    data: XOR<PoolUpdateManyMutationInput, PoolUncheckedUpdateManyWithoutCreatorInput>
  }

  export type PoolScalarWhereInput = {
    AND?: PoolScalarWhereInput | PoolScalarWhereInput[]
    OR?: PoolScalarWhereInput[]
    NOT?: PoolScalarWhereInput | PoolScalarWhereInput[]
    id?: UuidFilter<"Pool"> | string
    contractId?: BigIntNullableFilter<"Pool"> | bigint | number | null
    title?: StringFilter<"Pool"> | string
    description?: StringNullableFilter<"Pool"> | string | null
    image?: StringNullableFilter<"Pool"> | string | null
    creatorId?: IntFilter<"Pool"> | number
    arbiterId?: IntNullableFilter<"Pool"> | number | null
    arbiterAddress?: StringFilter<"Pool"> | string
    arbiterAccepted?: BoolFilter<"Pool"> | boolean
    arbiterFee?: IntFilter<"Pool"> | number
    collateral?: StringFilter<"Pool"> | string
    minJoustAmount?: BigIntFilter<"Pool"> | bigint | number
    totalAmountJousted?: BigIntFilter<"Pool"> | bigint | number
    supportedJoustTypes?: IntFilter<"Pool"> | number
    winningJoustType?: IntFilter<"Pool"> | number
    state?: EnumPoolStateFilter<"Pool"> | $Enums.PoolState
    endTime?: DateTimeFilter<"Pool"> | Date | string
    contractEndTime?: IntFilter<"Pool"> | number
    deployedAt?: DateTimeNullableFilter<"Pool"> | Date | string | null
    closedAt?: DateTimeNullableFilter<"Pool"> | Date | string | null
    settledAt?: DateTimeNullableFilter<"Pool"> | Date | string | null
    refundedAt?: DateTimeNullableFilter<"Pool"> | Date | string | null
    createdAt?: DateTimeFilter<"Pool"> | Date | string
    updatedAt?: DateTimeFilter<"Pool"> | Date | string
  }

  export type PoolUpsertWithWhereUniqueWithoutArbiterInput = {
    where: PoolWhereUniqueInput
    update: XOR<PoolUpdateWithoutArbiterInput, PoolUncheckedUpdateWithoutArbiterInput>
    create: XOR<PoolCreateWithoutArbiterInput, PoolUncheckedCreateWithoutArbiterInput>
  }

  export type PoolUpdateWithWhereUniqueWithoutArbiterInput = {
    where: PoolWhereUniqueInput
    data: XOR<PoolUpdateWithoutArbiterInput, PoolUncheckedUpdateWithoutArbiterInput>
  }

  export type PoolUpdateManyWithWhereWithoutArbiterInput = {
    where: PoolScalarWhereInput
    data: XOR<PoolUpdateManyMutationInput, PoolUncheckedUpdateManyWithoutArbiterInput>
  }

  export type JoustUpsertWithWhereUniqueWithoutUserInput = {
    where: JoustWhereUniqueInput
    update: XOR<JoustUpdateWithoutUserInput, JoustUncheckedUpdateWithoutUserInput>
    create: XOR<JoustCreateWithoutUserInput, JoustUncheckedCreateWithoutUserInput>
  }

  export type JoustUpdateWithWhereUniqueWithoutUserInput = {
    where: JoustWhereUniqueInput
    data: XOR<JoustUpdateWithoutUserInput, JoustUncheckedUpdateWithoutUserInput>
  }

  export type JoustUpdateManyWithWhereWithoutUserInput = {
    where: JoustScalarWhereInput
    data: XOR<JoustUpdateManyMutationInput, JoustUncheckedUpdateManyWithoutUserInput>
  }

  export type JoustScalarWhereInput = {
    AND?: JoustScalarWhereInput | JoustScalarWhereInput[]
    OR?: JoustScalarWhereInput[]
    NOT?: JoustScalarWhereInput | JoustScalarWhereInput[]
    id?: IntFilter<"Joust"> | number
    userId?: IntFilter<"Joust"> | number
    poolId?: UuidFilter<"Joust"> | string
    joustType?: IntFilter<"Joust"> | number
    amount?: BigIntFilter<"Joust"> | bigint | number
    isWinner?: BoolFilter<"Joust"> | boolean
    txHash?: StringNullableFilter<"Joust"> | string | null
    createdAt?: DateTimeFilter<"Joust"> | Date | string
    updatedAt?: DateTimeFilter<"Joust"> | Date | string
  }

  export type NotificationUpsertWithWhereUniqueWithoutUserInput = {
    where: NotificationWhereUniqueInput
    update: XOR<NotificationUpdateWithoutUserInput, NotificationUncheckedUpdateWithoutUserInput>
    create: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput>
  }

  export type NotificationUpdateWithWhereUniqueWithoutUserInput = {
    where: NotificationWhereUniqueInput
    data: XOR<NotificationUpdateWithoutUserInput, NotificationUncheckedUpdateWithoutUserInput>
  }

  export type NotificationUpdateManyWithWhereWithoutUserInput = {
    where: NotificationScalarWhereInput
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyWithoutUserInput>
  }

  export type NotificationScalarWhereInput = {
    AND?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
    OR?: NotificationScalarWhereInput[]
    NOT?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
    id?: IntFilter<"Notification"> | number
    userId?: IntFilter<"Notification"> | number
    type?: EnumNotificationTypeFilter<"Notification"> | $Enums.NotificationType
    title?: StringFilter<"Notification"> | string
    body?: StringNullableFilter<"Notification"> | string | null
    poolId?: UuidNullableFilter<"Notification"> | string | null
    read?: BoolFilter<"Notification"> | boolean
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    updatedAt?: DateTimeFilter<"Notification"> | Date | string
  }

  export type HonorVoteUpsertWithWhereUniqueWithoutVoterInput = {
    where: HonorVoteWhereUniqueInput
    update: XOR<HonorVoteUpdateWithoutVoterInput, HonorVoteUncheckedUpdateWithoutVoterInput>
    create: XOR<HonorVoteCreateWithoutVoterInput, HonorVoteUncheckedCreateWithoutVoterInput>
  }

  export type HonorVoteUpdateWithWhereUniqueWithoutVoterInput = {
    where: HonorVoteWhereUniqueInput
    data: XOR<HonorVoteUpdateWithoutVoterInput, HonorVoteUncheckedUpdateWithoutVoterInput>
  }

  export type HonorVoteUpdateManyWithWhereWithoutVoterInput = {
    where: HonorVoteScalarWhereInput
    data: XOR<HonorVoteUpdateManyMutationInput, HonorVoteUncheckedUpdateManyWithoutVoterInput>
  }

  export type HonorVoteScalarWhereInput = {
    AND?: HonorVoteScalarWhereInput | HonorVoteScalarWhereInput[]
    OR?: HonorVoteScalarWhereInput[]
    NOT?: HonorVoteScalarWhereInput | HonorVoteScalarWhereInput[]
    id?: IntFilter<"HonorVote"> | number
    voterId?: IntFilter<"HonorVote"> | number
    arbiterId?: IntFilter<"HonorVote"> | number
    poolId?: UuidFilter<"HonorVote"> | string
    voteType?: EnumHonorVoteTypeFilter<"HonorVote"> | $Enums.HonorVoteType
    createdAt?: DateTimeFilter<"HonorVote"> | Date | string
    updatedAt?: DateTimeFilter<"HonorVote"> | Date | string
  }

  export type HonorVoteUpsertWithWhereUniqueWithoutArbiterInput = {
    where: HonorVoteWhereUniqueInput
    update: XOR<HonorVoteUpdateWithoutArbiterInput, HonorVoteUncheckedUpdateWithoutArbiterInput>
    create: XOR<HonorVoteCreateWithoutArbiterInput, HonorVoteUncheckedCreateWithoutArbiterInput>
  }

  export type HonorVoteUpdateWithWhereUniqueWithoutArbiterInput = {
    where: HonorVoteWhereUniqueInput
    data: XOR<HonorVoteUpdateWithoutArbiterInput, HonorVoteUncheckedUpdateWithoutArbiterInput>
  }

  export type HonorVoteUpdateManyWithWhereWithoutArbiterInput = {
    where: HonorVoteScalarWhereInput
    data: XOR<HonorVoteUpdateManyMutationInput, HonorVoteUncheckedUpdateManyWithoutArbiterInput>
  }

  export type HonorScoreUpsertWithoutArbiterInput = {
    update: XOR<HonorScoreUpdateWithoutArbiterInput, HonorScoreUncheckedUpdateWithoutArbiterInput>
    create: XOR<HonorScoreCreateWithoutArbiterInput, HonorScoreUncheckedCreateWithoutArbiterInput>
    where?: HonorScoreWhereInput
  }

  export type HonorScoreUpdateToOneWithWhereWithoutArbiterInput = {
    where?: HonorScoreWhereInput
    data: XOR<HonorScoreUpdateWithoutArbiterInput, HonorScoreUncheckedUpdateWithoutArbiterInput>
  }

  export type HonorScoreUpdateWithoutArbiterInput = {
    totalUpvotes?: IntFieldUpdateOperationsInput | number
    totalDownvotes?: IntFieldUpdateOperationsInput | number
    score?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HonorScoreUncheckedUpdateWithoutArbiterInput = {
    totalUpvotes?: IntFieldUpdateOperationsInput | number
    totalDownvotes?: IntFieldUpdateOperationsInput | number
    score?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorldIdVerificationUpsertWithWhereUniqueWithoutUserInput = {
    where: WorldIdVerificationWhereUniqueInput
    update: XOR<WorldIdVerificationUpdateWithoutUserInput, WorldIdVerificationUncheckedUpdateWithoutUserInput>
    create: XOR<WorldIdVerificationCreateWithoutUserInput, WorldIdVerificationUncheckedCreateWithoutUserInput>
  }

  export type WorldIdVerificationUpdateWithWhereUniqueWithoutUserInput = {
    where: WorldIdVerificationWhereUniqueInput
    data: XOR<WorldIdVerificationUpdateWithoutUserInput, WorldIdVerificationUncheckedUpdateWithoutUserInput>
  }

  export type WorldIdVerificationUpdateManyWithWhereWithoutUserInput = {
    where: WorldIdVerificationScalarWhereInput
    data: XOR<WorldIdVerificationUpdateManyMutationInput, WorldIdVerificationUncheckedUpdateManyWithoutUserInput>
  }

  export type WorldIdVerificationScalarWhereInput = {
    AND?: WorldIdVerificationScalarWhereInput | WorldIdVerificationScalarWhereInput[]
    OR?: WorldIdVerificationScalarWhereInput[]
    NOT?: WorldIdVerificationScalarWhereInput | WorldIdVerificationScalarWhereInput[]
    id?: IntFilter<"WorldIdVerification"> | number
    userId?: IntFilter<"WorldIdVerification"> | number
    action?: StringFilter<"WorldIdVerification"> | string
    nullifierHash?: StringFilter<"WorldIdVerification"> | string
    verificationLevel?: StringFilter<"WorldIdVerification"> | string
    createdAt?: DateTimeFilter<"WorldIdVerification"> | Date | string
  }

  export type UserCreateWithoutCreatedPoolsInput = {
    username: string
    address: string
    pfp?: string | null
    worldIdVerified?: boolean
    worldIdLevel?: string | null
    totalPoints?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    arbitratedPools?: PoolCreateNestedManyWithoutArbiterInput
    jousts?: JoustCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    votesCast?: HonorVoteCreateNestedManyWithoutVoterInput
    votesReceived?: HonorVoteCreateNestedManyWithoutArbiterInput
    honorScore?: HonorScoreCreateNestedOneWithoutArbiterInput
    worldIdVerifications?: WorldIdVerificationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCreatedPoolsInput = {
    id?: number
    username: string
    address: string
    pfp?: string | null
    worldIdVerified?: boolean
    worldIdLevel?: string | null
    totalPoints?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    arbitratedPools?: PoolUncheckedCreateNestedManyWithoutArbiterInput
    jousts?: JoustUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    votesCast?: HonorVoteUncheckedCreateNestedManyWithoutVoterInput
    votesReceived?: HonorVoteUncheckedCreateNestedManyWithoutArbiterInput
    honorScore?: HonorScoreUncheckedCreateNestedOneWithoutArbiterInput
    worldIdVerifications?: WorldIdVerificationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCreatedPoolsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCreatedPoolsInput, UserUncheckedCreateWithoutCreatedPoolsInput>
  }

  export type UserCreateWithoutArbitratedPoolsInput = {
    username: string
    address: string
    pfp?: string | null
    worldIdVerified?: boolean
    worldIdLevel?: string | null
    totalPoints?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    createdPools?: PoolCreateNestedManyWithoutCreatorInput
    jousts?: JoustCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    votesCast?: HonorVoteCreateNestedManyWithoutVoterInput
    votesReceived?: HonorVoteCreateNestedManyWithoutArbiterInput
    honorScore?: HonorScoreCreateNestedOneWithoutArbiterInput
    worldIdVerifications?: WorldIdVerificationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutArbitratedPoolsInput = {
    id?: number
    username: string
    address: string
    pfp?: string | null
    worldIdVerified?: boolean
    worldIdLevel?: string | null
    totalPoints?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    createdPools?: PoolUncheckedCreateNestedManyWithoutCreatorInput
    jousts?: JoustUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    votesCast?: HonorVoteUncheckedCreateNestedManyWithoutVoterInput
    votesReceived?: HonorVoteUncheckedCreateNestedManyWithoutArbiterInput
    honorScore?: HonorScoreUncheckedCreateNestedOneWithoutArbiterInput
    worldIdVerifications?: WorldIdVerificationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutArbitratedPoolsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutArbitratedPoolsInput, UserUncheckedCreateWithoutArbitratedPoolsInput>
  }

  export type JoustCreateWithoutPoolInput = {
    joustType: number
    amount: bigint | number
    isWinner?: boolean
    txHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutJoustsInput
  }

  export type JoustUncheckedCreateWithoutPoolInput = {
    id?: number
    userId: number
    joustType: number
    amount: bigint | number
    isWinner?: boolean
    txHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type JoustCreateOrConnectWithoutPoolInput = {
    where: JoustWhereUniqueInput
    create: XOR<JoustCreateWithoutPoolInput, JoustUncheckedCreateWithoutPoolInput>
  }

  export type JoustCreateManyPoolInputEnvelope = {
    data: JoustCreateManyPoolInput | JoustCreateManyPoolInput[]
    skipDuplicates?: boolean
  }

  export type PoolOptionCreateWithoutPoolInput = {
    joustType: number
    label: string
    orderIndex: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PoolOptionUncheckedCreateWithoutPoolInput = {
    id?: number
    joustType: number
    label: string
    orderIndex: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PoolOptionCreateOrConnectWithoutPoolInput = {
    where: PoolOptionWhereUniqueInput
    create: XOR<PoolOptionCreateWithoutPoolInput, PoolOptionUncheckedCreateWithoutPoolInput>
  }

  export type PoolOptionCreateManyPoolInputEnvelope = {
    data: PoolOptionCreateManyPoolInput | PoolOptionCreateManyPoolInput[]
    skipDuplicates?: boolean
  }

  export type NotificationCreateWithoutPoolInput = {
    type: $Enums.NotificationType
    title: string
    body?: string | null
    read?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutNotificationsInput
  }

  export type NotificationUncheckedCreateWithoutPoolInput = {
    id?: number
    userId: number
    type: $Enums.NotificationType
    title: string
    body?: string | null
    read?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NotificationCreateOrConnectWithoutPoolInput = {
    where: NotificationWhereUniqueInput
    create: XOR<NotificationCreateWithoutPoolInput, NotificationUncheckedCreateWithoutPoolInput>
  }

  export type NotificationCreateManyPoolInputEnvelope = {
    data: NotificationCreateManyPoolInput | NotificationCreateManyPoolInput[]
    skipDuplicates?: boolean
  }

  export type HonorVoteCreateWithoutPoolInput = {
    voteType: $Enums.HonorVoteType
    createdAt?: Date | string
    updatedAt?: Date | string
    voter: UserCreateNestedOneWithoutVotesCastInput
    arbiter: UserCreateNestedOneWithoutVotesReceivedInput
  }

  export type HonorVoteUncheckedCreateWithoutPoolInput = {
    id?: number
    voterId: number
    arbiterId: number
    voteType: $Enums.HonorVoteType
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HonorVoteCreateOrConnectWithoutPoolInput = {
    where: HonorVoteWhereUniqueInput
    create: XOR<HonorVoteCreateWithoutPoolInput, HonorVoteUncheckedCreateWithoutPoolInput>
  }

  export type HonorVoteCreateManyPoolInputEnvelope = {
    data: HonorVoteCreateManyPoolInput | HonorVoteCreateManyPoolInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutCreatedPoolsInput = {
    update: XOR<UserUpdateWithoutCreatedPoolsInput, UserUncheckedUpdateWithoutCreatedPoolsInput>
    create: XOR<UserCreateWithoutCreatedPoolsInput, UserUncheckedCreateWithoutCreatedPoolsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCreatedPoolsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCreatedPoolsInput, UserUncheckedUpdateWithoutCreatedPoolsInput>
  }

  export type UserUpdateWithoutCreatedPoolsInput = {
    username?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    pfp?: NullableStringFieldUpdateOperationsInput | string | null
    worldIdVerified?: BoolFieldUpdateOperationsInput | boolean
    worldIdLevel?: NullableStringFieldUpdateOperationsInput | string | null
    totalPoints?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    arbitratedPools?: PoolUpdateManyWithoutArbiterNestedInput
    jousts?: JoustUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    votesCast?: HonorVoteUpdateManyWithoutVoterNestedInput
    votesReceived?: HonorVoteUpdateManyWithoutArbiterNestedInput
    honorScore?: HonorScoreUpdateOneWithoutArbiterNestedInput
    worldIdVerifications?: WorldIdVerificationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCreatedPoolsInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    pfp?: NullableStringFieldUpdateOperationsInput | string | null
    worldIdVerified?: BoolFieldUpdateOperationsInput | boolean
    worldIdLevel?: NullableStringFieldUpdateOperationsInput | string | null
    totalPoints?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    arbitratedPools?: PoolUncheckedUpdateManyWithoutArbiterNestedInput
    jousts?: JoustUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    votesCast?: HonorVoteUncheckedUpdateManyWithoutVoterNestedInput
    votesReceived?: HonorVoteUncheckedUpdateManyWithoutArbiterNestedInput
    honorScore?: HonorScoreUncheckedUpdateOneWithoutArbiterNestedInput
    worldIdVerifications?: WorldIdVerificationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUpsertWithoutArbitratedPoolsInput = {
    update: XOR<UserUpdateWithoutArbitratedPoolsInput, UserUncheckedUpdateWithoutArbitratedPoolsInput>
    create: XOR<UserCreateWithoutArbitratedPoolsInput, UserUncheckedCreateWithoutArbitratedPoolsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutArbitratedPoolsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutArbitratedPoolsInput, UserUncheckedUpdateWithoutArbitratedPoolsInput>
  }

  export type UserUpdateWithoutArbitratedPoolsInput = {
    username?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    pfp?: NullableStringFieldUpdateOperationsInput | string | null
    worldIdVerified?: BoolFieldUpdateOperationsInput | boolean
    worldIdLevel?: NullableStringFieldUpdateOperationsInput | string | null
    totalPoints?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdPools?: PoolUpdateManyWithoutCreatorNestedInput
    jousts?: JoustUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    votesCast?: HonorVoteUpdateManyWithoutVoterNestedInput
    votesReceived?: HonorVoteUpdateManyWithoutArbiterNestedInput
    honorScore?: HonorScoreUpdateOneWithoutArbiterNestedInput
    worldIdVerifications?: WorldIdVerificationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutArbitratedPoolsInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    pfp?: NullableStringFieldUpdateOperationsInput | string | null
    worldIdVerified?: BoolFieldUpdateOperationsInput | boolean
    worldIdLevel?: NullableStringFieldUpdateOperationsInput | string | null
    totalPoints?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdPools?: PoolUncheckedUpdateManyWithoutCreatorNestedInput
    jousts?: JoustUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    votesCast?: HonorVoteUncheckedUpdateManyWithoutVoterNestedInput
    votesReceived?: HonorVoteUncheckedUpdateManyWithoutArbiterNestedInput
    honorScore?: HonorScoreUncheckedUpdateOneWithoutArbiterNestedInput
    worldIdVerifications?: WorldIdVerificationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type JoustUpsertWithWhereUniqueWithoutPoolInput = {
    where: JoustWhereUniqueInput
    update: XOR<JoustUpdateWithoutPoolInput, JoustUncheckedUpdateWithoutPoolInput>
    create: XOR<JoustCreateWithoutPoolInput, JoustUncheckedCreateWithoutPoolInput>
  }

  export type JoustUpdateWithWhereUniqueWithoutPoolInput = {
    where: JoustWhereUniqueInput
    data: XOR<JoustUpdateWithoutPoolInput, JoustUncheckedUpdateWithoutPoolInput>
  }

  export type JoustUpdateManyWithWhereWithoutPoolInput = {
    where: JoustScalarWhereInput
    data: XOR<JoustUpdateManyMutationInput, JoustUncheckedUpdateManyWithoutPoolInput>
  }

  export type PoolOptionUpsertWithWhereUniqueWithoutPoolInput = {
    where: PoolOptionWhereUniqueInput
    update: XOR<PoolOptionUpdateWithoutPoolInput, PoolOptionUncheckedUpdateWithoutPoolInput>
    create: XOR<PoolOptionCreateWithoutPoolInput, PoolOptionUncheckedCreateWithoutPoolInput>
  }

  export type PoolOptionUpdateWithWhereUniqueWithoutPoolInput = {
    where: PoolOptionWhereUniqueInput
    data: XOR<PoolOptionUpdateWithoutPoolInput, PoolOptionUncheckedUpdateWithoutPoolInput>
  }

  export type PoolOptionUpdateManyWithWhereWithoutPoolInput = {
    where: PoolOptionScalarWhereInput
    data: XOR<PoolOptionUpdateManyMutationInput, PoolOptionUncheckedUpdateManyWithoutPoolInput>
  }

  export type PoolOptionScalarWhereInput = {
    AND?: PoolOptionScalarWhereInput | PoolOptionScalarWhereInput[]
    OR?: PoolOptionScalarWhereInput[]
    NOT?: PoolOptionScalarWhereInput | PoolOptionScalarWhereInput[]
    id?: IntFilter<"PoolOption"> | number
    poolId?: UuidFilter<"PoolOption"> | string
    joustType?: IntFilter<"PoolOption"> | number
    label?: StringFilter<"PoolOption"> | string
    orderIndex?: IntFilter<"PoolOption"> | number
    createdAt?: DateTimeFilter<"PoolOption"> | Date | string
    updatedAt?: DateTimeFilter<"PoolOption"> | Date | string
  }

  export type NotificationUpsertWithWhereUniqueWithoutPoolInput = {
    where: NotificationWhereUniqueInput
    update: XOR<NotificationUpdateWithoutPoolInput, NotificationUncheckedUpdateWithoutPoolInput>
    create: XOR<NotificationCreateWithoutPoolInput, NotificationUncheckedCreateWithoutPoolInput>
  }

  export type NotificationUpdateWithWhereUniqueWithoutPoolInput = {
    where: NotificationWhereUniqueInput
    data: XOR<NotificationUpdateWithoutPoolInput, NotificationUncheckedUpdateWithoutPoolInput>
  }

  export type NotificationUpdateManyWithWhereWithoutPoolInput = {
    where: NotificationScalarWhereInput
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyWithoutPoolInput>
  }

  export type HonorVoteUpsertWithWhereUniqueWithoutPoolInput = {
    where: HonorVoteWhereUniqueInput
    update: XOR<HonorVoteUpdateWithoutPoolInput, HonorVoteUncheckedUpdateWithoutPoolInput>
    create: XOR<HonorVoteCreateWithoutPoolInput, HonorVoteUncheckedCreateWithoutPoolInput>
  }

  export type HonorVoteUpdateWithWhereUniqueWithoutPoolInput = {
    where: HonorVoteWhereUniqueInput
    data: XOR<HonorVoteUpdateWithoutPoolInput, HonorVoteUncheckedUpdateWithoutPoolInput>
  }

  export type HonorVoteUpdateManyWithWhereWithoutPoolInput = {
    where: HonorVoteScalarWhereInput
    data: XOR<HonorVoteUpdateManyMutationInput, HonorVoteUncheckedUpdateManyWithoutPoolInput>
  }

  export type PoolCreateWithoutOptionsInput = {
    id?: string
    contractId?: bigint | number | null
    title: string
    description?: string | null
    image?: string | null
    arbiterAddress: string
    arbiterAccepted?: boolean
    arbiterFee: number
    collateral: string
    minJoustAmount: bigint | number
    totalAmountJousted?: bigint | number
    supportedJoustTypes?: number
    winningJoustType?: number
    state?: $Enums.PoolState
    endTime: Date | string
    contractEndTime?: number
    deployedAt?: Date | string | null
    closedAt?: Date | string | null
    settledAt?: Date | string | null
    refundedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    creator: UserCreateNestedOneWithoutCreatedPoolsInput
    arbiter?: UserCreateNestedOneWithoutArbitratedPoolsInput
    jousts?: JoustCreateNestedManyWithoutPoolInput
    notifications?: NotificationCreateNestedManyWithoutPoolInput
    honorVotes?: HonorVoteCreateNestedManyWithoutPoolInput
  }

  export type PoolUncheckedCreateWithoutOptionsInput = {
    id?: string
    contractId?: bigint | number | null
    title: string
    description?: string | null
    image?: string | null
    creatorId: number
    arbiterId?: number | null
    arbiterAddress: string
    arbiterAccepted?: boolean
    arbiterFee: number
    collateral: string
    minJoustAmount: bigint | number
    totalAmountJousted?: bigint | number
    supportedJoustTypes?: number
    winningJoustType?: number
    state?: $Enums.PoolState
    endTime: Date | string
    contractEndTime?: number
    deployedAt?: Date | string | null
    closedAt?: Date | string | null
    settledAt?: Date | string | null
    refundedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    jousts?: JoustUncheckedCreateNestedManyWithoutPoolInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutPoolInput
    honorVotes?: HonorVoteUncheckedCreateNestedManyWithoutPoolInput
  }

  export type PoolCreateOrConnectWithoutOptionsInput = {
    where: PoolWhereUniqueInput
    create: XOR<PoolCreateWithoutOptionsInput, PoolUncheckedCreateWithoutOptionsInput>
  }

  export type PoolUpsertWithoutOptionsInput = {
    update: XOR<PoolUpdateWithoutOptionsInput, PoolUncheckedUpdateWithoutOptionsInput>
    create: XOR<PoolCreateWithoutOptionsInput, PoolUncheckedCreateWithoutOptionsInput>
    where?: PoolWhereInput
  }

  export type PoolUpdateToOneWithWhereWithoutOptionsInput = {
    where?: PoolWhereInput
    data: XOR<PoolUpdateWithoutOptionsInput, PoolUncheckedUpdateWithoutOptionsInput>
  }

  export type PoolUpdateWithoutOptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    contractId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    arbiterAddress?: StringFieldUpdateOperationsInput | string
    arbiterAccepted?: BoolFieldUpdateOperationsInput | boolean
    arbiterFee?: IntFieldUpdateOperationsInput | number
    collateral?: StringFieldUpdateOperationsInput | string
    minJoustAmount?: BigIntFieldUpdateOperationsInput | bigint | number
    totalAmountJousted?: BigIntFieldUpdateOperationsInput | bigint | number
    supportedJoustTypes?: IntFieldUpdateOperationsInput | number
    winningJoustType?: IntFieldUpdateOperationsInput | number
    state?: EnumPoolStateFieldUpdateOperationsInput | $Enums.PoolState
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    contractEndTime?: IntFieldUpdateOperationsInput | number
    deployedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    settledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refundedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creator?: UserUpdateOneRequiredWithoutCreatedPoolsNestedInput
    arbiter?: UserUpdateOneWithoutArbitratedPoolsNestedInput
    jousts?: JoustUpdateManyWithoutPoolNestedInput
    notifications?: NotificationUpdateManyWithoutPoolNestedInput
    honorVotes?: HonorVoteUpdateManyWithoutPoolNestedInput
  }

  export type PoolUncheckedUpdateWithoutOptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    contractId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    creatorId?: IntFieldUpdateOperationsInput | number
    arbiterId?: NullableIntFieldUpdateOperationsInput | number | null
    arbiterAddress?: StringFieldUpdateOperationsInput | string
    arbiterAccepted?: BoolFieldUpdateOperationsInput | boolean
    arbiterFee?: IntFieldUpdateOperationsInput | number
    collateral?: StringFieldUpdateOperationsInput | string
    minJoustAmount?: BigIntFieldUpdateOperationsInput | bigint | number
    totalAmountJousted?: BigIntFieldUpdateOperationsInput | bigint | number
    supportedJoustTypes?: IntFieldUpdateOperationsInput | number
    winningJoustType?: IntFieldUpdateOperationsInput | number
    state?: EnumPoolStateFieldUpdateOperationsInput | $Enums.PoolState
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    contractEndTime?: IntFieldUpdateOperationsInput | number
    deployedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    settledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refundedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    jousts?: JoustUncheckedUpdateManyWithoutPoolNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutPoolNestedInput
    honorVotes?: HonorVoteUncheckedUpdateManyWithoutPoolNestedInput
  }

  export type UserCreateWithoutJoustsInput = {
    username: string
    address: string
    pfp?: string | null
    worldIdVerified?: boolean
    worldIdLevel?: string | null
    totalPoints?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    createdPools?: PoolCreateNestedManyWithoutCreatorInput
    arbitratedPools?: PoolCreateNestedManyWithoutArbiterInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    votesCast?: HonorVoteCreateNestedManyWithoutVoterInput
    votesReceived?: HonorVoteCreateNestedManyWithoutArbiterInput
    honorScore?: HonorScoreCreateNestedOneWithoutArbiterInput
    worldIdVerifications?: WorldIdVerificationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutJoustsInput = {
    id?: number
    username: string
    address: string
    pfp?: string | null
    worldIdVerified?: boolean
    worldIdLevel?: string | null
    totalPoints?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    createdPools?: PoolUncheckedCreateNestedManyWithoutCreatorInput
    arbitratedPools?: PoolUncheckedCreateNestedManyWithoutArbiterInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    votesCast?: HonorVoteUncheckedCreateNestedManyWithoutVoterInput
    votesReceived?: HonorVoteUncheckedCreateNestedManyWithoutArbiterInput
    honorScore?: HonorScoreUncheckedCreateNestedOneWithoutArbiterInput
    worldIdVerifications?: WorldIdVerificationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutJoustsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutJoustsInput, UserUncheckedCreateWithoutJoustsInput>
  }

  export type PoolCreateWithoutJoustsInput = {
    id?: string
    contractId?: bigint | number | null
    title: string
    description?: string | null
    image?: string | null
    arbiterAddress: string
    arbiterAccepted?: boolean
    arbiterFee: number
    collateral: string
    minJoustAmount: bigint | number
    totalAmountJousted?: bigint | number
    supportedJoustTypes?: number
    winningJoustType?: number
    state?: $Enums.PoolState
    endTime: Date | string
    contractEndTime?: number
    deployedAt?: Date | string | null
    closedAt?: Date | string | null
    settledAt?: Date | string | null
    refundedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    creator: UserCreateNestedOneWithoutCreatedPoolsInput
    arbiter?: UserCreateNestedOneWithoutArbitratedPoolsInput
    options?: PoolOptionCreateNestedManyWithoutPoolInput
    notifications?: NotificationCreateNestedManyWithoutPoolInput
    honorVotes?: HonorVoteCreateNestedManyWithoutPoolInput
  }

  export type PoolUncheckedCreateWithoutJoustsInput = {
    id?: string
    contractId?: bigint | number | null
    title: string
    description?: string | null
    image?: string | null
    creatorId: number
    arbiterId?: number | null
    arbiterAddress: string
    arbiterAccepted?: boolean
    arbiterFee: number
    collateral: string
    minJoustAmount: bigint | number
    totalAmountJousted?: bigint | number
    supportedJoustTypes?: number
    winningJoustType?: number
    state?: $Enums.PoolState
    endTime: Date | string
    contractEndTime?: number
    deployedAt?: Date | string | null
    closedAt?: Date | string | null
    settledAt?: Date | string | null
    refundedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    options?: PoolOptionUncheckedCreateNestedManyWithoutPoolInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutPoolInput
    honorVotes?: HonorVoteUncheckedCreateNestedManyWithoutPoolInput
  }

  export type PoolCreateOrConnectWithoutJoustsInput = {
    where: PoolWhereUniqueInput
    create: XOR<PoolCreateWithoutJoustsInput, PoolUncheckedCreateWithoutJoustsInput>
  }

  export type UserUpsertWithoutJoustsInput = {
    update: XOR<UserUpdateWithoutJoustsInput, UserUncheckedUpdateWithoutJoustsInput>
    create: XOR<UserCreateWithoutJoustsInput, UserUncheckedCreateWithoutJoustsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutJoustsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutJoustsInput, UserUncheckedUpdateWithoutJoustsInput>
  }

  export type UserUpdateWithoutJoustsInput = {
    username?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    pfp?: NullableStringFieldUpdateOperationsInput | string | null
    worldIdVerified?: BoolFieldUpdateOperationsInput | boolean
    worldIdLevel?: NullableStringFieldUpdateOperationsInput | string | null
    totalPoints?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdPools?: PoolUpdateManyWithoutCreatorNestedInput
    arbitratedPools?: PoolUpdateManyWithoutArbiterNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    votesCast?: HonorVoteUpdateManyWithoutVoterNestedInput
    votesReceived?: HonorVoteUpdateManyWithoutArbiterNestedInput
    honorScore?: HonorScoreUpdateOneWithoutArbiterNestedInput
    worldIdVerifications?: WorldIdVerificationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutJoustsInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    pfp?: NullableStringFieldUpdateOperationsInput | string | null
    worldIdVerified?: BoolFieldUpdateOperationsInput | boolean
    worldIdLevel?: NullableStringFieldUpdateOperationsInput | string | null
    totalPoints?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdPools?: PoolUncheckedUpdateManyWithoutCreatorNestedInput
    arbitratedPools?: PoolUncheckedUpdateManyWithoutArbiterNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    votesCast?: HonorVoteUncheckedUpdateManyWithoutVoterNestedInput
    votesReceived?: HonorVoteUncheckedUpdateManyWithoutArbiterNestedInput
    honorScore?: HonorScoreUncheckedUpdateOneWithoutArbiterNestedInput
    worldIdVerifications?: WorldIdVerificationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type PoolUpsertWithoutJoustsInput = {
    update: XOR<PoolUpdateWithoutJoustsInput, PoolUncheckedUpdateWithoutJoustsInput>
    create: XOR<PoolCreateWithoutJoustsInput, PoolUncheckedCreateWithoutJoustsInput>
    where?: PoolWhereInput
  }

  export type PoolUpdateToOneWithWhereWithoutJoustsInput = {
    where?: PoolWhereInput
    data: XOR<PoolUpdateWithoutJoustsInput, PoolUncheckedUpdateWithoutJoustsInput>
  }

  export type PoolUpdateWithoutJoustsInput = {
    id?: StringFieldUpdateOperationsInput | string
    contractId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    arbiterAddress?: StringFieldUpdateOperationsInput | string
    arbiterAccepted?: BoolFieldUpdateOperationsInput | boolean
    arbiterFee?: IntFieldUpdateOperationsInput | number
    collateral?: StringFieldUpdateOperationsInput | string
    minJoustAmount?: BigIntFieldUpdateOperationsInput | bigint | number
    totalAmountJousted?: BigIntFieldUpdateOperationsInput | bigint | number
    supportedJoustTypes?: IntFieldUpdateOperationsInput | number
    winningJoustType?: IntFieldUpdateOperationsInput | number
    state?: EnumPoolStateFieldUpdateOperationsInput | $Enums.PoolState
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    contractEndTime?: IntFieldUpdateOperationsInput | number
    deployedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    settledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refundedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creator?: UserUpdateOneRequiredWithoutCreatedPoolsNestedInput
    arbiter?: UserUpdateOneWithoutArbitratedPoolsNestedInput
    options?: PoolOptionUpdateManyWithoutPoolNestedInput
    notifications?: NotificationUpdateManyWithoutPoolNestedInput
    honorVotes?: HonorVoteUpdateManyWithoutPoolNestedInput
  }

  export type PoolUncheckedUpdateWithoutJoustsInput = {
    id?: StringFieldUpdateOperationsInput | string
    contractId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    creatorId?: IntFieldUpdateOperationsInput | number
    arbiterId?: NullableIntFieldUpdateOperationsInput | number | null
    arbiterAddress?: StringFieldUpdateOperationsInput | string
    arbiterAccepted?: BoolFieldUpdateOperationsInput | boolean
    arbiterFee?: IntFieldUpdateOperationsInput | number
    collateral?: StringFieldUpdateOperationsInput | string
    minJoustAmount?: BigIntFieldUpdateOperationsInput | bigint | number
    totalAmountJousted?: BigIntFieldUpdateOperationsInput | bigint | number
    supportedJoustTypes?: IntFieldUpdateOperationsInput | number
    winningJoustType?: IntFieldUpdateOperationsInput | number
    state?: EnumPoolStateFieldUpdateOperationsInput | $Enums.PoolState
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    contractEndTime?: IntFieldUpdateOperationsInput | number
    deployedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    settledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refundedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    options?: PoolOptionUncheckedUpdateManyWithoutPoolNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutPoolNestedInput
    honorVotes?: HonorVoteUncheckedUpdateManyWithoutPoolNestedInput
  }

  export type UserCreateWithoutNotificationsInput = {
    username: string
    address: string
    pfp?: string | null
    worldIdVerified?: boolean
    worldIdLevel?: string | null
    totalPoints?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    createdPools?: PoolCreateNestedManyWithoutCreatorInput
    arbitratedPools?: PoolCreateNestedManyWithoutArbiterInput
    jousts?: JoustCreateNestedManyWithoutUserInput
    votesCast?: HonorVoteCreateNestedManyWithoutVoterInput
    votesReceived?: HonorVoteCreateNestedManyWithoutArbiterInput
    honorScore?: HonorScoreCreateNestedOneWithoutArbiterInput
    worldIdVerifications?: WorldIdVerificationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutNotificationsInput = {
    id?: number
    username: string
    address: string
    pfp?: string | null
    worldIdVerified?: boolean
    worldIdLevel?: string | null
    totalPoints?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    createdPools?: PoolUncheckedCreateNestedManyWithoutCreatorInput
    arbitratedPools?: PoolUncheckedCreateNestedManyWithoutArbiterInput
    jousts?: JoustUncheckedCreateNestedManyWithoutUserInput
    votesCast?: HonorVoteUncheckedCreateNestedManyWithoutVoterInput
    votesReceived?: HonorVoteUncheckedCreateNestedManyWithoutArbiterInput
    honorScore?: HonorScoreUncheckedCreateNestedOneWithoutArbiterInput
    worldIdVerifications?: WorldIdVerificationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutNotificationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
  }

  export type PoolCreateWithoutNotificationsInput = {
    id?: string
    contractId?: bigint | number | null
    title: string
    description?: string | null
    image?: string | null
    arbiterAddress: string
    arbiterAccepted?: boolean
    arbiterFee: number
    collateral: string
    minJoustAmount: bigint | number
    totalAmountJousted?: bigint | number
    supportedJoustTypes?: number
    winningJoustType?: number
    state?: $Enums.PoolState
    endTime: Date | string
    contractEndTime?: number
    deployedAt?: Date | string | null
    closedAt?: Date | string | null
    settledAt?: Date | string | null
    refundedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    creator: UserCreateNestedOneWithoutCreatedPoolsInput
    arbiter?: UserCreateNestedOneWithoutArbitratedPoolsInput
    jousts?: JoustCreateNestedManyWithoutPoolInput
    options?: PoolOptionCreateNestedManyWithoutPoolInput
    honorVotes?: HonorVoteCreateNestedManyWithoutPoolInput
  }

  export type PoolUncheckedCreateWithoutNotificationsInput = {
    id?: string
    contractId?: bigint | number | null
    title: string
    description?: string | null
    image?: string | null
    creatorId: number
    arbiterId?: number | null
    arbiterAddress: string
    arbiterAccepted?: boolean
    arbiterFee: number
    collateral: string
    minJoustAmount: bigint | number
    totalAmountJousted?: bigint | number
    supportedJoustTypes?: number
    winningJoustType?: number
    state?: $Enums.PoolState
    endTime: Date | string
    contractEndTime?: number
    deployedAt?: Date | string | null
    closedAt?: Date | string | null
    settledAt?: Date | string | null
    refundedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    jousts?: JoustUncheckedCreateNestedManyWithoutPoolInput
    options?: PoolOptionUncheckedCreateNestedManyWithoutPoolInput
    honorVotes?: HonorVoteUncheckedCreateNestedManyWithoutPoolInput
  }

  export type PoolCreateOrConnectWithoutNotificationsInput = {
    where: PoolWhereUniqueInput
    create: XOR<PoolCreateWithoutNotificationsInput, PoolUncheckedCreateWithoutNotificationsInput>
  }

  export type UserUpsertWithoutNotificationsInput = {
    update: XOR<UserUpdateWithoutNotificationsInput, UserUncheckedUpdateWithoutNotificationsInput>
    create: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutNotificationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutNotificationsInput, UserUncheckedUpdateWithoutNotificationsInput>
  }

  export type UserUpdateWithoutNotificationsInput = {
    username?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    pfp?: NullableStringFieldUpdateOperationsInput | string | null
    worldIdVerified?: BoolFieldUpdateOperationsInput | boolean
    worldIdLevel?: NullableStringFieldUpdateOperationsInput | string | null
    totalPoints?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdPools?: PoolUpdateManyWithoutCreatorNestedInput
    arbitratedPools?: PoolUpdateManyWithoutArbiterNestedInput
    jousts?: JoustUpdateManyWithoutUserNestedInput
    votesCast?: HonorVoteUpdateManyWithoutVoterNestedInput
    votesReceived?: HonorVoteUpdateManyWithoutArbiterNestedInput
    honorScore?: HonorScoreUpdateOneWithoutArbiterNestedInput
    worldIdVerifications?: WorldIdVerificationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutNotificationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    pfp?: NullableStringFieldUpdateOperationsInput | string | null
    worldIdVerified?: BoolFieldUpdateOperationsInput | boolean
    worldIdLevel?: NullableStringFieldUpdateOperationsInput | string | null
    totalPoints?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdPools?: PoolUncheckedUpdateManyWithoutCreatorNestedInput
    arbitratedPools?: PoolUncheckedUpdateManyWithoutArbiterNestedInput
    jousts?: JoustUncheckedUpdateManyWithoutUserNestedInput
    votesCast?: HonorVoteUncheckedUpdateManyWithoutVoterNestedInput
    votesReceived?: HonorVoteUncheckedUpdateManyWithoutArbiterNestedInput
    honorScore?: HonorScoreUncheckedUpdateOneWithoutArbiterNestedInput
    worldIdVerifications?: WorldIdVerificationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type PoolUpsertWithoutNotificationsInput = {
    update: XOR<PoolUpdateWithoutNotificationsInput, PoolUncheckedUpdateWithoutNotificationsInput>
    create: XOR<PoolCreateWithoutNotificationsInput, PoolUncheckedCreateWithoutNotificationsInput>
    where?: PoolWhereInput
  }

  export type PoolUpdateToOneWithWhereWithoutNotificationsInput = {
    where?: PoolWhereInput
    data: XOR<PoolUpdateWithoutNotificationsInput, PoolUncheckedUpdateWithoutNotificationsInput>
  }

  export type PoolUpdateWithoutNotificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    contractId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    arbiterAddress?: StringFieldUpdateOperationsInput | string
    arbiterAccepted?: BoolFieldUpdateOperationsInput | boolean
    arbiterFee?: IntFieldUpdateOperationsInput | number
    collateral?: StringFieldUpdateOperationsInput | string
    minJoustAmount?: BigIntFieldUpdateOperationsInput | bigint | number
    totalAmountJousted?: BigIntFieldUpdateOperationsInput | bigint | number
    supportedJoustTypes?: IntFieldUpdateOperationsInput | number
    winningJoustType?: IntFieldUpdateOperationsInput | number
    state?: EnumPoolStateFieldUpdateOperationsInput | $Enums.PoolState
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    contractEndTime?: IntFieldUpdateOperationsInput | number
    deployedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    settledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refundedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creator?: UserUpdateOneRequiredWithoutCreatedPoolsNestedInput
    arbiter?: UserUpdateOneWithoutArbitratedPoolsNestedInput
    jousts?: JoustUpdateManyWithoutPoolNestedInput
    options?: PoolOptionUpdateManyWithoutPoolNestedInput
    honorVotes?: HonorVoteUpdateManyWithoutPoolNestedInput
  }

  export type PoolUncheckedUpdateWithoutNotificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    contractId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    creatorId?: IntFieldUpdateOperationsInput | number
    arbiterId?: NullableIntFieldUpdateOperationsInput | number | null
    arbiterAddress?: StringFieldUpdateOperationsInput | string
    arbiterAccepted?: BoolFieldUpdateOperationsInput | boolean
    arbiterFee?: IntFieldUpdateOperationsInput | number
    collateral?: StringFieldUpdateOperationsInput | string
    minJoustAmount?: BigIntFieldUpdateOperationsInput | bigint | number
    totalAmountJousted?: BigIntFieldUpdateOperationsInput | bigint | number
    supportedJoustTypes?: IntFieldUpdateOperationsInput | number
    winningJoustType?: IntFieldUpdateOperationsInput | number
    state?: EnumPoolStateFieldUpdateOperationsInput | $Enums.PoolState
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    contractEndTime?: IntFieldUpdateOperationsInput | number
    deployedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    settledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refundedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    jousts?: JoustUncheckedUpdateManyWithoutPoolNestedInput
    options?: PoolOptionUncheckedUpdateManyWithoutPoolNestedInput
    honorVotes?: HonorVoteUncheckedUpdateManyWithoutPoolNestedInput
  }

  export type UserCreateWithoutVotesCastInput = {
    username: string
    address: string
    pfp?: string | null
    worldIdVerified?: boolean
    worldIdLevel?: string | null
    totalPoints?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    createdPools?: PoolCreateNestedManyWithoutCreatorInput
    arbitratedPools?: PoolCreateNestedManyWithoutArbiterInput
    jousts?: JoustCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    votesReceived?: HonorVoteCreateNestedManyWithoutArbiterInput
    honorScore?: HonorScoreCreateNestedOneWithoutArbiterInput
    worldIdVerifications?: WorldIdVerificationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutVotesCastInput = {
    id?: number
    username: string
    address: string
    pfp?: string | null
    worldIdVerified?: boolean
    worldIdLevel?: string | null
    totalPoints?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    createdPools?: PoolUncheckedCreateNestedManyWithoutCreatorInput
    arbitratedPools?: PoolUncheckedCreateNestedManyWithoutArbiterInput
    jousts?: JoustUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    votesReceived?: HonorVoteUncheckedCreateNestedManyWithoutArbiterInput
    honorScore?: HonorScoreUncheckedCreateNestedOneWithoutArbiterInput
    worldIdVerifications?: WorldIdVerificationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutVotesCastInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutVotesCastInput, UserUncheckedCreateWithoutVotesCastInput>
  }

  export type UserCreateWithoutVotesReceivedInput = {
    username: string
    address: string
    pfp?: string | null
    worldIdVerified?: boolean
    worldIdLevel?: string | null
    totalPoints?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    createdPools?: PoolCreateNestedManyWithoutCreatorInput
    arbitratedPools?: PoolCreateNestedManyWithoutArbiterInput
    jousts?: JoustCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    votesCast?: HonorVoteCreateNestedManyWithoutVoterInput
    honorScore?: HonorScoreCreateNestedOneWithoutArbiterInput
    worldIdVerifications?: WorldIdVerificationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutVotesReceivedInput = {
    id?: number
    username: string
    address: string
    pfp?: string | null
    worldIdVerified?: boolean
    worldIdLevel?: string | null
    totalPoints?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    createdPools?: PoolUncheckedCreateNestedManyWithoutCreatorInput
    arbitratedPools?: PoolUncheckedCreateNestedManyWithoutArbiterInput
    jousts?: JoustUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    votesCast?: HonorVoteUncheckedCreateNestedManyWithoutVoterInput
    honorScore?: HonorScoreUncheckedCreateNestedOneWithoutArbiterInput
    worldIdVerifications?: WorldIdVerificationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutVotesReceivedInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutVotesReceivedInput, UserUncheckedCreateWithoutVotesReceivedInput>
  }

  export type PoolCreateWithoutHonorVotesInput = {
    id?: string
    contractId?: bigint | number | null
    title: string
    description?: string | null
    image?: string | null
    arbiterAddress: string
    arbiterAccepted?: boolean
    arbiterFee: number
    collateral: string
    minJoustAmount: bigint | number
    totalAmountJousted?: bigint | number
    supportedJoustTypes?: number
    winningJoustType?: number
    state?: $Enums.PoolState
    endTime: Date | string
    contractEndTime?: number
    deployedAt?: Date | string | null
    closedAt?: Date | string | null
    settledAt?: Date | string | null
    refundedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    creator: UserCreateNestedOneWithoutCreatedPoolsInput
    arbiter?: UserCreateNestedOneWithoutArbitratedPoolsInput
    jousts?: JoustCreateNestedManyWithoutPoolInput
    options?: PoolOptionCreateNestedManyWithoutPoolInput
    notifications?: NotificationCreateNestedManyWithoutPoolInput
  }

  export type PoolUncheckedCreateWithoutHonorVotesInput = {
    id?: string
    contractId?: bigint | number | null
    title: string
    description?: string | null
    image?: string | null
    creatorId: number
    arbiterId?: number | null
    arbiterAddress: string
    arbiterAccepted?: boolean
    arbiterFee: number
    collateral: string
    minJoustAmount: bigint | number
    totalAmountJousted?: bigint | number
    supportedJoustTypes?: number
    winningJoustType?: number
    state?: $Enums.PoolState
    endTime: Date | string
    contractEndTime?: number
    deployedAt?: Date | string | null
    closedAt?: Date | string | null
    settledAt?: Date | string | null
    refundedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    jousts?: JoustUncheckedCreateNestedManyWithoutPoolInput
    options?: PoolOptionUncheckedCreateNestedManyWithoutPoolInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutPoolInput
  }

  export type PoolCreateOrConnectWithoutHonorVotesInput = {
    where: PoolWhereUniqueInput
    create: XOR<PoolCreateWithoutHonorVotesInput, PoolUncheckedCreateWithoutHonorVotesInput>
  }

  export type UserUpsertWithoutVotesCastInput = {
    update: XOR<UserUpdateWithoutVotesCastInput, UserUncheckedUpdateWithoutVotesCastInput>
    create: XOR<UserCreateWithoutVotesCastInput, UserUncheckedCreateWithoutVotesCastInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutVotesCastInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutVotesCastInput, UserUncheckedUpdateWithoutVotesCastInput>
  }

  export type UserUpdateWithoutVotesCastInput = {
    username?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    pfp?: NullableStringFieldUpdateOperationsInput | string | null
    worldIdVerified?: BoolFieldUpdateOperationsInput | boolean
    worldIdLevel?: NullableStringFieldUpdateOperationsInput | string | null
    totalPoints?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdPools?: PoolUpdateManyWithoutCreatorNestedInput
    arbitratedPools?: PoolUpdateManyWithoutArbiterNestedInput
    jousts?: JoustUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    votesReceived?: HonorVoteUpdateManyWithoutArbiterNestedInput
    honorScore?: HonorScoreUpdateOneWithoutArbiterNestedInput
    worldIdVerifications?: WorldIdVerificationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutVotesCastInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    pfp?: NullableStringFieldUpdateOperationsInput | string | null
    worldIdVerified?: BoolFieldUpdateOperationsInput | boolean
    worldIdLevel?: NullableStringFieldUpdateOperationsInput | string | null
    totalPoints?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdPools?: PoolUncheckedUpdateManyWithoutCreatorNestedInput
    arbitratedPools?: PoolUncheckedUpdateManyWithoutArbiterNestedInput
    jousts?: JoustUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    votesReceived?: HonorVoteUncheckedUpdateManyWithoutArbiterNestedInput
    honorScore?: HonorScoreUncheckedUpdateOneWithoutArbiterNestedInput
    worldIdVerifications?: WorldIdVerificationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUpsertWithoutVotesReceivedInput = {
    update: XOR<UserUpdateWithoutVotesReceivedInput, UserUncheckedUpdateWithoutVotesReceivedInput>
    create: XOR<UserCreateWithoutVotesReceivedInput, UserUncheckedCreateWithoutVotesReceivedInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutVotesReceivedInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutVotesReceivedInput, UserUncheckedUpdateWithoutVotesReceivedInput>
  }

  export type UserUpdateWithoutVotesReceivedInput = {
    username?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    pfp?: NullableStringFieldUpdateOperationsInput | string | null
    worldIdVerified?: BoolFieldUpdateOperationsInput | boolean
    worldIdLevel?: NullableStringFieldUpdateOperationsInput | string | null
    totalPoints?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdPools?: PoolUpdateManyWithoutCreatorNestedInput
    arbitratedPools?: PoolUpdateManyWithoutArbiterNestedInput
    jousts?: JoustUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    votesCast?: HonorVoteUpdateManyWithoutVoterNestedInput
    honorScore?: HonorScoreUpdateOneWithoutArbiterNestedInput
    worldIdVerifications?: WorldIdVerificationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutVotesReceivedInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    pfp?: NullableStringFieldUpdateOperationsInput | string | null
    worldIdVerified?: BoolFieldUpdateOperationsInput | boolean
    worldIdLevel?: NullableStringFieldUpdateOperationsInput | string | null
    totalPoints?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdPools?: PoolUncheckedUpdateManyWithoutCreatorNestedInput
    arbitratedPools?: PoolUncheckedUpdateManyWithoutArbiterNestedInput
    jousts?: JoustUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    votesCast?: HonorVoteUncheckedUpdateManyWithoutVoterNestedInput
    honorScore?: HonorScoreUncheckedUpdateOneWithoutArbiterNestedInput
    worldIdVerifications?: WorldIdVerificationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type PoolUpsertWithoutHonorVotesInput = {
    update: XOR<PoolUpdateWithoutHonorVotesInput, PoolUncheckedUpdateWithoutHonorVotesInput>
    create: XOR<PoolCreateWithoutHonorVotesInput, PoolUncheckedCreateWithoutHonorVotesInput>
    where?: PoolWhereInput
  }

  export type PoolUpdateToOneWithWhereWithoutHonorVotesInput = {
    where?: PoolWhereInput
    data: XOR<PoolUpdateWithoutHonorVotesInput, PoolUncheckedUpdateWithoutHonorVotesInput>
  }

  export type PoolUpdateWithoutHonorVotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    contractId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    arbiterAddress?: StringFieldUpdateOperationsInput | string
    arbiterAccepted?: BoolFieldUpdateOperationsInput | boolean
    arbiterFee?: IntFieldUpdateOperationsInput | number
    collateral?: StringFieldUpdateOperationsInput | string
    minJoustAmount?: BigIntFieldUpdateOperationsInput | bigint | number
    totalAmountJousted?: BigIntFieldUpdateOperationsInput | bigint | number
    supportedJoustTypes?: IntFieldUpdateOperationsInput | number
    winningJoustType?: IntFieldUpdateOperationsInput | number
    state?: EnumPoolStateFieldUpdateOperationsInput | $Enums.PoolState
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    contractEndTime?: IntFieldUpdateOperationsInput | number
    deployedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    settledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refundedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creator?: UserUpdateOneRequiredWithoutCreatedPoolsNestedInput
    arbiter?: UserUpdateOneWithoutArbitratedPoolsNestedInput
    jousts?: JoustUpdateManyWithoutPoolNestedInput
    options?: PoolOptionUpdateManyWithoutPoolNestedInput
    notifications?: NotificationUpdateManyWithoutPoolNestedInput
  }

  export type PoolUncheckedUpdateWithoutHonorVotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    contractId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    creatorId?: IntFieldUpdateOperationsInput | number
    arbiterId?: NullableIntFieldUpdateOperationsInput | number | null
    arbiterAddress?: StringFieldUpdateOperationsInput | string
    arbiterAccepted?: BoolFieldUpdateOperationsInput | boolean
    arbiterFee?: IntFieldUpdateOperationsInput | number
    collateral?: StringFieldUpdateOperationsInput | string
    minJoustAmount?: BigIntFieldUpdateOperationsInput | bigint | number
    totalAmountJousted?: BigIntFieldUpdateOperationsInput | bigint | number
    supportedJoustTypes?: IntFieldUpdateOperationsInput | number
    winningJoustType?: IntFieldUpdateOperationsInput | number
    state?: EnumPoolStateFieldUpdateOperationsInput | $Enums.PoolState
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    contractEndTime?: IntFieldUpdateOperationsInput | number
    deployedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    settledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refundedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    jousts?: JoustUncheckedUpdateManyWithoutPoolNestedInput
    options?: PoolOptionUncheckedUpdateManyWithoutPoolNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutPoolNestedInput
  }

  export type UserCreateWithoutHonorScoreInput = {
    username: string
    address: string
    pfp?: string | null
    worldIdVerified?: boolean
    worldIdLevel?: string | null
    totalPoints?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    createdPools?: PoolCreateNestedManyWithoutCreatorInput
    arbitratedPools?: PoolCreateNestedManyWithoutArbiterInput
    jousts?: JoustCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    votesCast?: HonorVoteCreateNestedManyWithoutVoterInput
    votesReceived?: HonorVoteCreateNestedManyWithoutArbiterInput
    worldIdVerifications?: WorldIdVerificationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutHonorScoreInput = {
    id?: number
    username: string
    address: string
    pfp?: string | null
    worldIdVerified?: boolean
    worldIdLevel?: string | null
    totalPoints?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    createdPools?: PoolUncheckedCreateNestedManyWithoutCreatorInput
    arbitratedPools?: PoolUncheckedCreateNestedManyWithoutArbiterInput
    jousts?: JoustUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    votesCast?: HonorVoteUncheckedCreateNestedManyWithoutVoterInput
    votesReceived?: HonorVoteUncheckedCreateNestedManyWithoutArbiterInput
    worldIdVerifications?: WorldIdVerificationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutHonorScoreInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutHonorScoreInput, UserUncheckedCreateWithoutHonorScoreInput>
  }

  export type UserUpsertWithoutHonorScoreInput = {
    update: XOR<UserUpdateWithoutHonorScoreInput, UserUncheckedUpdateWithoutHonorScoreInput>
    create: XOR<UserCreateWithoutHonorScoreInput, UserUncheckedCreateWithoutHonorScoreInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutHonorScoreInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutHonorScoreInput, UserUncheckedUpdateWithoutHonorScoreInput>
  }

  export type UserUpdateWithoutHonorScoreInput = {
    username?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    pfp?: NullableStringFieldUpdateOperationsInput | string | null
    worldIdVerified?: BoolFieldUpdateOperationsInput | boolean
    worldIdLevel?: NullableStringFieldUpdateOperationsInput | string | null
    totalPoints?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdPools?: PoolUpdateManyWithoutCreatorNestedInput
    arbitratedPools?: PoolUpdateManyWithoutArbiterNestedInput
    jousts?: JoustUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    votesCast?: HonorVoteUpdateManyWithoutVoterNestedInput
    votesReceived?: HonorVoteUpdateManyWithoutArbiterNestedInput
    worldIdVerifications?: WorldIdVerificationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutHonorScoreInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    pfp?: NullableStringFieldUpdateOperationsInput | string | null
    worldIdVerified?: BoolFieldUpdateOperationsInput | boolean
    worldIdLevel?: NullableStringFieldUpdateOperationsInput | string | null
    totalPoints?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdPools?: PoolUncheckedUpdateManyWithoutCreatorNestedInput
    arbitratedPools?: PoolUncheckedUpdateManyWithoutArbiterNestedInput
    jousts?: JoustUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    votesCast?: HonorVoteUncheckedUpdateManyWithoutVoterNestedInput
    votesReceived?: HonorVoteUncheckedUpdateManyWithoutArbiterNestedInput
    worldIdVerifications?: WorldIdVerificationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutWorldIdVerificationsInput = {
    username: string
    address: string
    pfp?: string | null
    worldIdVerified?: boolean
    worldIdLevel?: string | null
    totalPoints?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    createdPools?: PoolCreateNestedManyWithoutCreatorInput
    arbitratedPools?: PoolCreateNestedManyWithoutArbiterInput
    jousts?: JoustCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    votesCast?: HonorVoteCreateNestedManyWithoutVoterInput
    votesReceived?: HonorVoteCreateNestedManyWithoutArbiterInput
    honorScore?: HonorScoreCreateNestedOneWithoutArbiterInput
  }

  export type UserUncheckedCreateWithoutWorldIdVerificationsInput = {
    id?: number
    username: string
    address: string
    pfp?: string | null
    worldIdVerified?: boolean
    worldIdLevel?: string | null
    totalPoints?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    createdPools?: PoolUncheckedCreateNestedManyWithoutCreatorInput
    arbitratedPools?: PoolUncheckedCreateNestedManyWithoutArbiterInput
    jousts?: JoustUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    votesCast?: HonorVoteUncheckedCreateNestedManyWithoutVoterInput
    votesReceived?: HonorVoteUncheckedCreateNestedManyWithoutArbiterInput
    honorScore?: HonorScoreUncheckedCreateNestedOneWithoutArbiterInput
  }

  export type UserCreateOrConnectWithoutWorldIdVerificationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutWorldIdVerificationsInput, UserUncheckedCreateWithoutWorldIdVerificationsInput>
  }

  export type UserUpsertWithoutWorldIdVerificationsInput = {
    update: XOR<UserUpdateWithoutWorldIdVerificationsInput, UserUncheckedUpdateWithoutWorldIdVerificationsInput>
    create: XOR<UserCreateWithoutWorldIdVerificationsInput, UserUncheckedCreateWithoutWorldIdVerificationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutWorldIdVerificationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutWorldIdVerificationsInput, UserUncheckedUpdateWithoutWorldIdVerificationsInput>
  }

  export type UserUpdateWithoutWorldIdVerificationsInput = {
    username?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    pfp?: NullableStringFieldUpdateOperationsInput | string | null
    worldIdVerified?: BoolFieldUpdateOperationsInput | boolean
    worldIdLevel?: NullableStringFieldUpdateOperationsInput | string | null
    totalPoints?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdPools?: PoolUpdateManyWithoutCreatorNestedInput
    arbitratedPools?: PoolUpdateManyWithoutArbiterNestedInput
    jousts?: JoustUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    votesCast?: HonorVoteUpdateManyWithoutVoterNestedInput
    votesReceived?: HonorVoteUpdateManyWithoutArbiterNestedInput
    honorScore?: HonorScoreUpdateOneWithoutArbiterNestedInput
  }

  export type UserUncheckedUpdateWithoutWorldIdVerificationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    pfp?: NullableStringFieldUpdateOperationsInput | string | null
    worldIdVerified?: BoolFieldUpdateOperationsInput | boolean
    worldIdLevel?: NullableStringFieldUpdateOperationsInput | string | null
    totalPoints?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdPools?: PoolUncheckedUpdateManyWithoutCreatorNestedInput
    arbitratedPools?: PoolUncheckedUpdateManyWithoutArbiterNestedInput
    jousts?: JoustUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    votesCast?: HonorVoteUncheckedUpdateManyWithoutVoterNestedInput
    votesReceived?: HonorVoteUncheckedUpdateManyWithoutArbiterNestedInput
    honorScore?: HonorScoreUncheckedUpdateOneWithoutArbiterNestedInput
  }

  export type PoolCreateManyCreatorInput = {
    id?: string
    contractId?: bigint | number | null
    title: string
    description?: string | null
    image?: string | null
    arbiterId?: number | null
    arbiterAddress: string
    arbiterAccepted?: boolean
    arbiterFee: number
    collateral: string
    minJoustAmount: bigint | number
    totalAmountJousted?: bigint | number
    supportedJoustTypes?: number
    winningJoustType?: number
    state?: $Enums.PoolState
    endTime: Date | string
    contractEndTime?: number
    deployedAt?: Date | string | null
    closedAt?: Date | string | null
    settledAt?: Date | string | null
    refundedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PoolCreateManyArbiterInput = {
    id?: string
    contractId?: bigint | number | null
    title: string
    description?: string | null
    image?: string | null
    creatorId: number
    arbiterAddress: string
    arbiterAccepted?: boolean
    arbiterFee: number
    collateral: string
    minJoustAmount: bigint | number
    totalAmountJousted?: bigint | number
    supportedJoustTypes?: number
    winningJoustType?: number
    state?: $Enums.PoolState
    endTime: Date | string
    contractEndTime?: number
    deployedAt?: Date | string | null
    closedAt?: Date | string | null
    settledAt?: Date | string | null
    refundedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type JoustCreateManyUserInput = {
    id?: number
    poolId: string
    joustType: number
    amount: bigint | number
    isWinner?: boolean
    txHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NotificationCreateManyUserInput = {
    id?: number
    type: $Enums.NotificationType
    title: string
    body?: string | null
    poolId?: string | null
    read?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HonorVoteCreateManyVoterInput = {
    id?: number
    arbiterId: number
    poolId: string
    voteType: $Enums.HonorVoteType
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HonorVoteCreateManyArbiterInput = {
    id?: number
    voterId: number
    poolId: string
    voteType: $Enums.HonorVoteType
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WorldIdVerificationCreateManyUserInput = {
    id?: number
    action: string
    nullifierHash: string
    verificationLevel: string
    createdAt?: Date | string
  }

  export type PoolUpdateWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    contractId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    arbiterAddress?: StringFieldUpdateOperationsInput | string
    arbiterAccepted?: BoolFieldUpdateOperationsInput | boolean
    arbiterFee?: IntFieldUpdateOperationsInput | number
    collateral?: StringFieldUpdateOperationsInput | string
    minJoustAmount?: BigIntFieldUpdateOperationsInput | bigint | number
    totalAmountJousted?: BigIntFieldUpdateOperationsInput | bigint | number
    supportedJoustTypes?: IntFieldUpdateOperationsInput | number
    winningJoustType?: IntFieldUpdateOperationsInput | number
    state?: EnumPoolStateFieldUpdateOperationsInput | $Enums.PoolState
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    contractEndTime?: IntFieldUpdateOperationsInput | number
    deployedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    settledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refundedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    arbiter?: UserUpdateOneWithoutArbitratedPoolsNestedInput
    jousts?: JoustUpdateManyWithoutPoolNestedInput
    options?: PoolOptionUpdateManyWithoutPoolNestedInput
    notifications?: NotificationUpdateManyWithoutPoolNestedInput
    honorVotes?: HonorVoteUpdateManyWithoutPoolNestedInput
  }

  export type PoolUncheckedUpdateWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    contractId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    arbiterId?: NullableIntFieldUpdateOperationsInput | number | null
    arbiterAddress?: StringFieldUpdateOperationsInput | string
    arbiterAccepted?: BoolFieldUpdateOperationsInput | boolean
    arbiterFee?: IntFieldUpdateOperationsInput | number
    collateral?: StringFieldUpdateOperationsInput | string
    minJoustAmount?: BigIntFieldUpdateOperationsInput | bigint | number
    totalAmountJousted?: BigIntFieldUpdateOperationsInput | bigint | number
    supportedJoustTypes?: IntFieldUpdateOperationsInput | number
    winningJoustType?: IntFieldUpdateOperationsInput | number
    state?: EnumPoolStateFieldUpdateOperationsInput | $Enums.PoolState
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    contractEndTime?: IntFieldUpdateOperationsInput | number
    deployedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    settledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refundedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    jousts?: JoustUncheckedUpdateManyWithoutPoolNestedInput
    options?: PoolOptionUncheckedUpdateManyWithoutPoolNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutPoolNestedInput
    honorVotes?: HonorVoteUncheckedUpdateManyWithoutPoolNestedInput
  }

  export type PoolUncheckedUpdateManyWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    contractId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    arbiterId?: NullableIntFieldUpdateOperationsInput | number | null
    arbiterAddress?: StringFieldUpdateOperationsInput | string
    arbiterAccepted?: BoolFieldUpdateOperationsInput | boolean
    arbiterFee?: IntFieldUpdateOperationsInput | number
    collateral?: StringFieldUpdateOperationsInput | string
    minJoustAmount?: BigIntFieldUpdateOperationsInput | bigint | number
    totalAmountJousted?: BigIntFieldUpdateOperationsInput | bigint | number
    supportedJoustTypes?: IntFieldUpdateOperationsInput | number
    winningJoustType?: IntFieldUpdateOperationsInput | number
    state?: EnumPoolStateFieldUpdateOperationsInput | $Enums.PoolState
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    contractEndTime?: IntFieldUpdateOperationsInput | number
    deployedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    settledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refundedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PoolUpdateWithoutArbiterInput = {
    id?: StringFieldUpdateOperationsInput | string
    contractId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    arbiterAddress?: StringFieldUpdateOperationsInput | string
    arbiterAccepted?: BoolFieldUpdateOperationsInput | boolean
    arbiterFee?: IntFieldUpdateOperationsInput | number
    collateral?: StringFieldUpdateOperationsInput | string
    minJoustAmount?: BigIntFieldUpdateOperationsInput | bigint | number
    totalAmountJousted?: BigIntFieldUpdateOperationsInput | bigint | number
    supportedJoustTypes?: IntFieldUpdateOperationsInput | number
    winningJoustType?: IntFieldUpdateOperationsInput | number
    state?: EnumPoolStateFieldUpdateOperationsInput | $Enums.PoolState
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    contractEndTime?: IntFieldUpdateOperationsInput | number
    deployedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    settledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refundedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creator?: UserUpdateOneRequiredWithoutCreatedPoolsNestedInput
    jousts?: JoustUpdateManyWithoutPoolNestedInput
    options?: PoolOptionUpdateManyWithoutPoolNestedInput
    notifications?: NotificationUpdateManyWithoutPoolNestedInput
    honorVotes?: HonorVoteUpdateManyWithoutPoolNestedInput
  }

  export type PoolUncheckedUpdateWithoutArbiterInput = {
    id?: StringFieldUpdateOperationsInput | string
    contractId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    creatorId?: IntFieldUpdateOperationsInput | number
    arbiterAddress?: StringFieldUpdateOperationsInput | string
    arbiterAccepted?: BoolFieldUpdateOperationsInput | boolean
    arbiterFee?: IntFieldUpdateOperationsInput | number
    collateral?: StringFieldUpdateOperationsInput | string
    minJoustAmount?: BigIntFieldUpdateOperationsInput | bigint | number
    totalAmountJousted?: BigIntFieldUpdateOperationsInput | bigint | number
    supportedJoustTypes?: IntFieldUpdateOperationsInput | number
    winningJoustType?: IntFieldUpdateOperationsInput | number
    state?: EnumPoolStateFieldUpdateOperationsInput | $Enums.PoolState
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    contractEndTime?: IntFieldUpdateOperationsInput | number
    deployedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    settledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refundedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    jousts?: JoustUncheckedUpdateManyWithoutPoolNestedInput
    options?: PoolOptionUncheckedUpdateManyWithoutPoolNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutPoolNestedInput
    honorVotes?: HonorVoteUncheckedUpdateManyWithoutPoolNestedInput
  }

  export type PoolUncheckedUpdateManyWithoutArbiterInput = {
    id?: StringFieldUpdateOperationsInput | string
    contractId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    creatorId?: IntFieldUpdateOperationsInput | number
    arbiterAddress?: StringFieldUpdateOperationsInput | string
    arbiterAccepted?: BoolFieldUpdateOperationsInput | boolean
    arbiterFee?: IntFieldUpdateOperationsInput | number
    collateral?: StringFieldUpdateOperationsInput | string
    minJoustAmount?: BigIntFieldUpdateOperationsInput | bigint | number
    totalAmountJousted?: BigIntFieldUpdateOperationsInput | bigint | number
    supportedJoustTypes?: IntFieldUpdateOperationsInput | number
    winningJoustType?: IntFieldUpdateOperationsInput | number
    state?: EnumPoolStateFieldUpdateOperationsInput | $Enums.PoolState
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    contractEndTime?: IntFieldUpdateOperationsInput | number
    deployedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    settledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refundedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JoustUpdateWithoutUserInput = {
    joustType?: IntFieldUpdateOperationsInput | number
    amount?: BigIntFieldUpdateOperationsInput | bigint | number
    isWinner?: BoolFieldUpdateOperationsInput | boolean
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pool?: PoolUpdateOneRequiredWithoutJoustsNestedInput
  }

  export type JoustUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    poolId?: StringFieldUpdateOperationsInput | string
    joustType?: IntFieldUpdateOperationsInput | number
    amount?: BigIntFieldUpdateOperationsInput | bigint | number
    isWinner?: BoolFieldUpdateOperationsInput | boolean
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JoustUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    poolId?: StringFieldUpdateOperationsInput | string
    joustType?: IntFieldUpdateOperationsInput | number
    amount?: BigIntFieldUpdateOperationsInput | bigint | number
    isWinner?: BoolFieldUpdateOperationsInput | boolean
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUpdateWithoutUserInput = {
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    title?: StringFieldUpdateOperationsInput | string
    body?: NullableStringFieldUpdateOperationsInput | string | null
    read?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pool?: PoolUpdateOneWithoutNotificationsNestedInput
  }

  export type NotificationUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    title?: StringFieldUpdateOperationsInput | string
    body?: NullableStringFieldUpdateOperationsInput | string | null
    poolId?: NullableStringFieldUpdateOperationsInput | string | null
    read?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    title?: StringFieldUpdateOperationsInput | string
    body?: NullableStringFieldUpdateOperationsInput | string | null
    poolId?: NullableStringFieldUpdateOperationsInput | string | null
    read?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HonorVoteUpdateWithoutVoterInput = {
    voteType?: EnumHonorVoteTypeFieldUpdateOperationsInput | $Enums.HonorVoteType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    arbiter?: UserUpdateOneRequiredWithoutVotesReceivedNestedInput
    pool?: PoolUpdateOneRequiredWithoutHonorVotesNestedInput
  }

  export type HonorVoteUncheckedUpdateWithoutVoterInput = {
    id?: IntFieldUpdateOperationsInput | number
    arbiterId?: IntFieldUpdateOperationsInput | number
    poolId?: StringFieldUpdateOperationsInput | string
    voteType?: EnumHonorVoteTypeFieldUpdateOperationsInput | $Enums.HonorVoteType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HonorVoteUncheckedUpdateManyWithoutVoterInput = {
    id?: IntFieldUpdateOperationsInput | number
    arbiterId?: IntFieldUpdateOperationsInput | number
    poolId?: StringFieldUpdateOperationsInput | string
    voteType?: EnumHonorVoteTypeFieldUpdateOperationsInput | $Enums.HonorVoteType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HonorVoteUpdateWithoutArbiterInput = {
    voteType?: EnumHonorVoteTypeFieldUpdateOperationsInput | $Enums.HonorVoteType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    voter?: UserUpdateOneRequiredWithoutVotesCastNestedInput
    pool?: PoolUpdateOneRequiredWithoutHonorVotesNestedInput
  }

  export type HonorVoteUncheckedUpdateWithoutArbiterInput = {
    id?: IntFieldUpdateOperationsInput | number
    voterId?: IntFieldUpdateOperationsInput | number
    poolId?: StringFieldUpdateOperationsInput | string
    voteType?: EnumHonorVoteTypeFieldUpdateOperationsInput | $Enums.HonorVoteType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HonorVoteUncheckedUpdateManyWithoutArbiterInput = {
    id?: IntFieldUpdateOperationsInput | number
    voterId?: IntFieldUpdateOperationsInput | number
    poolId?: StringFieldUpdateOperationsInput | string
    voteType?: EnumHonorVoteTypeFieldUpdateOperationsInput | $Enums.HonorVoteType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorldIdVerificationUpdateWithoutUserInput = {
    action?: StringFieldUpdateOperationsInput | string
    nullifierHash?: StringFieldUpdateOperationsInput | string
    verificationLevel?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorldIdVerificationUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    action?: StringFieldUpdateOperationsInput | string
    nullifierHash?: StringFieldUpdateOperationsInput | string
    verificationLevel?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorldIdVerificationUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    action?: StringFieldUpdateOperationsInput | string
    nullifierHash?: StringFieldUpdateOperationsInput | string
    verificationLevel?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JoustCreateManyPoolInput = {
    id?: number
    userId: number
    joustType: number
    amount: bigint | number
    isWinner?: boolean
    txHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PoolOptionCreateManyPoolInput = {
    id?: number
    joustType: number
    label: string
    orderIndex: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NotificationCreateManyPoolInput = {
    id?: number
    userId: number
    type: $Enums.NotificationType
    title: string
    body?: string | null
    read?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HonorVoteCreateManyPoolInput = {
    id?: number
    voterId: number
    arbiterId: number
    voteType: $Enums.HonorVoteType
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type JoustUpdateWithoutPoolInput = {
    joustType?: IntFieldUpdateOperationsInput | number
    amount?: BigIntFieldUpdateOperationsInput | bigint | number
    isWinner?: BoolFieldUpdateOperationsInput | boolean
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutJoustsNestedInput
  }

  export type JoustUncheckedUpdateWithoutPoolInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    joustType?: IntFieldUpdateOperationsInput | number
    amount?: BigIntFieldUpdateOperationsInput | bigint | number
    isWinner?: BoolFieldUpdateOperationsInput | boolean
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JoustUncheckedUpdateManyWithoutPoolInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    joustType?: IntFieldUpdateOperationsInput | number
    amount?: BigIntFieldUpdateOperationsInput | bigint | number
    isWinner?: BoolFieldUpdateOperationsInput | boolean
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PoolOptionUpdateWithoutPoolInput = {
    joustType?: IntFieldUpdateOperationsInput | number
    label?: StringFieldUpdateOperationsInput | string
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PoolOptionUncheckedUpdateWithoutPoolInput = {
    id?: IntFieldUpdateOperationsInput | number
    joustType?: IntFieldUpdateOperationsInput | number
    label?: StringFieldUpdateOperationsInput | string
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PoolOptionUncheckedUpdateManyWithoutPoolInput = {
    id?: IntFieldUpdateOperationsInput | number
    joustType?: IntFieldUpdateOperationsInput | number
    label?: StringFieldUpdateOperationsInput | string
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUpdateWithoutPoolInput = {
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    title?: StringFieldUpdateOperationsInput | string
    body?: NullableStringFieldUpdateOperationsInput | string | null
    read?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutNotificationsNestedInput
  }

  export type NotificationUncheckedUpdateWithoutPoolInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    title?: StringFieldUpdateOperationsInput | string
    body?: NullableStringFieldUpdateOperationsInput | string | null
    read?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyWithoutPoolInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    title?: StringFieldUpdateOperationsInput | string
    body?: NullableStringFieldUpdateOperationsInput | string | null
    read?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HonorVoteUpdateWithoutPoolInput = {
    voteType?: EnumHonorVoteTypeFieldUpdateOperationsInput | $Enums.HonorVoteType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    voter?: UserUpdateOneRequiredWithoutVotesCastNestedInput
    arbiter?: UserUpdateOneRequiredWithoutVotesReceivedNestedInput
  }

  export type HonorVoteUncheckedUpdateWithoutPoolInput = {
    id?: IntFieldUpdateOperationsInput | number
    voterId?: IntFieldUpdateOperationsInput | number
    arbiterId?: IntFieldUpdateOperationsInput | number
    voteType?: EnumHonorVoteTypeFieldUpdateOperationsInput | $Enums.HonorVoteType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HonorVoteUncheckedUpdateManyWithoutPoolInput = {
    id?: IntFieldUpdateOperationsInput | number
    voterId?: IntFieldUpdateOperationsInput | number
    arbiterId?: IntFieldUpdateOperationsInput | number
    voteType?: EnumHonorVoteTypeFieldUpdateOperationsInput | $Enums.HonorVoteType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



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