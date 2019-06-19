# f572d396fae9206628714fb2ce00f72e94f2258f

## **INTRODUCTION**
This project has the objective of relating users and items. The items can be entirely managed without
any kind of authentication. The rest of the system requires authentication, you can create an account
by `POST`-ing to `/user` with `login` and `password` for simple account creation and can login the account
by the same way to `/user/login` to generate an authentication token.  
The user can put a registered item for sale specifying the quantity it has in stock and the price.


## **SUMMARY**
-   [Requirements](#requirements)
-   [Database Model](#database-model)
    -   [Auth Table](#auth-table)
    -   [Item Table](#item-table)
    -   [Sale Table](#sale-table)
    -   [User Table](#user-table)
    -   [Forest Admin Usage](#forest-admin-usage)
-   [API Routes](#api-docs)
-   [Execution](#execution)
    -   [Development Environment](#development-environment)
    -   [Production Environment](#production-environment)
-   [Environment Variables](#environment-variables)
-   [Project Quirks and Tips](#project-quirks-and-tips)
-   [Trivia](#trivia)


## **REQUIREMENTS**
-   `GNU/Linux` environment (only tested on kernel 5.1.11 on ArchLinux distribution)
-   `Systemd` service and module manager v242.29 (production environment only)
-   `PostgreSQL` database cluster v11.2
-   `NodeJS` v11.15.0 runtime (should not run on versions lower than v10.4 due to `BigInt` native type usage)
-   `NPM` v6.9.0


## **DATABASE MODEL**

### Auth Table

### Item Table

### Sale Table

### User Table

### Forest Admin Usage


## **API ROUTES**
Read the API usage docs. [API Docs](API.md)


## **EXECUTION**

### Development Environment

### Production Environment

## **ENVIRONMENT VARIABLES**
The environment variables are like the remote control of the API service. The variables here are the ones that are
supposed to be changed from environment to environment and some are sensitive information, like access keys.  
They include database access variables, database pool management, number of workers (threads), service API port
and the famous Node environment variable.

-   **DATABASE ACCESS AND MANAGEMENT**
    -   **DB_HOST**: Database host address. Defaults to `localhost`
    -   **DB_PORT**: Database access port. Defaults to `5432`
    -   **DB_NAME**: Database name to access in the host address. Defaults to `77f12a`.
    -   **DB_USERNAME**: Database user to authenticate. Defaults to `admin`
    -   **DB_PASSWORD**: Database user password to authenticate. Defaults to `admin`
    -   **DB_TIMEZONE**: Database timezone for parsing DateTime values correctly. Can be any valid entry in IANA
Timezone Database, moment.js or `+/-HH:MM` format. Defaults to `Etc/UTC`
    -   **DB_MIN_CONNECTIONS**: Minimum open connections to database. Defaults to `1`
    -   **DB_MAX_CONNECTIONS**: Maximum open connections to database, any exceeding connection will queue up and
wait for a connection to be freed. Defaults to `25`
    -   **DB_IDLE_TIME**: Time (in milliseconds) to consider a database connection idle and allow it to be closed.
Defalts to `10000`
    -   **DB_ACQUIRE_TIME**: Maximum time (in milliseconds) to try to acquire a database connection and throw an
error. Defaults to `60000`
    -   **DB_CHECK_INTERVAL_CONNECTIONS**: Interval time (in milliseconds) to check and close idle database
connections. Defaults to `10000`
-   **API SERVICE CONFIGURATION**
    -   **SERVER_API_PORT**: Server API port to listen. Defaults to `4424`
    -   **API_HEADER_NAME**: Server API header name for identifying the Server API version. Defaults
to `X-Custom-Header-Version`
    -   **API_HEADER_VALUE**: Server API header value for identifying the Server API version. This value should
follow SemVer. Defaults to `1.0.0`
    -   **DEFAULT_LIMIT**: Default value for `limit` when requesting lists of items. Defaults to `10`
    -   **DEFAULT_MAX_LIMIT**: Default maximum value for `limit` when requesting lists of items. Defaults
to `1000`
-   **FOREST ADMIN INTEGRATION**
    -   **FOREST_ENV_SECRET**: Forest Admin environment secret to allow the panel to access this Sequelize
database. Defaults to `4c9e6128105940f576404cca3b7e3e47d2203aa2263029d4b1c0cd6710f08d82`
    -   **FOREST_AUTH_SECRET**: Forest Admin auth secret to generate JWT tokens. Defaults
to `eea33ef8a4e47916dff8572b7d9d8470b5ce03432da04bda`
-   **PROCESS AND CLUSTER CONFIGURATION**
    -   **PROCESS_WORKERS_COUNT**: Number of worker processes to use in cluster, not including the master
process with is only a worker manager. Setting this to a non-zero integer number `n` will force the the master
process to create `n` processes independently of the number of CPU threads available. Using the prefix `upto-`
will consider the number of CPU threads and will not create more than the number of CPU threads available.
Setting this value to `all` will create a number of worker processes to match the number of CPU threads available.
Examples: `4`, `8`, `12`, `upto-4`, `upto-12`, `all`. Defaults to `upto-4`
    -   **NODE_ENV**: Conventional environment variable to check if application is running in production
environment. Set to `production` so external modules can run with better performance. Unset by default
    -   **NODE_CLUSTER_SCHED_POLICY**: Cluster scheduling policy. Valid values are `rr` (round-robin policy
managed by Node) and `none` (let the operating system decide). If it is unset, Node will use the `rr` in
Linux operating system. Unset by default
    -   **CLUSTER_LOG**: Will print console logs with _info level_ which worker of the cluster is taking care
of the request whether the value is set to `true` or `false`. Defaults to `true`


## **PROJECT QUIRKS AND TIPS**
-   **Number of database connections**: The number of database connections is for each worker process of the
cluster. So, having a maximum number of connections of `100` and having `4` worker processes means that the
database might use up to `400` connections, then it needs to support this number. Be sure to check the
settings in `/var/lib/postgres/data/postgresql.conf` to allow the correct number of connections (usually
the default is `100` max connections)
-   **Cluster Master process**: The cluster process has a master process and it doesn't listen to connections
nor access the database. It only manages the other worker processes
-   **Cluster Worker processes**: The cluster process must have at least 1 worker process in order to listen
to connections and access database as the master process isn't designed for this


## **TRIVIA**
-   The name comes from the SHA1-digested `hello` string. You can get it using `Bash` with the following code
```shell
echo "hello" | sha1sum
```
-   The default database name `77f12a` is a hexadecimal value that means nothing at all. It's just a
hexadecimal value where every digit was generated truly randomly by `San Mônico`
