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
-   `GNU/Linux` or `Android/Termux` environment (only tested on kernel 5.1.11 on ArchLinux and Android 9.0)
-   `Systemd` service and module manager v242.29 (production environment only)
-   `PostgreSQL` database cluster v11.2 (if running the database in the same API host)
-   `NodeJS` v11.15.0 runtime (should not run on versions lower than v10.4 due to `BigInt` native type usage)
-   `NPM` v6.9.0


## **DATABASE MODEL**
The modelling was created for a marketplace-ish plan where users can put a set of items for sale. The users
can register any price and stock quantity they want. As the users can not change someone else's items for
sale, an authentication table was created to store users access tokens.

### Auth Table
Table that contains the access tokens for the users and a foreign key referencing the user it belongs to.  
Besides the standard indexing, the table is also indexed by `user_id` to increase performance when joining
to [**user table**](#user-table)

### Item Table
Table that contains the items that the marketplace allows users to sell.  
The `description` column is totally optional as it allows `NULL` values. Even though the `alias` column is
does not allow `NULL`s, the value is optional as there are **Sequelize** hooks to auto-generate an alias
based on the value of the column `name` (a lowercase dasherized version of the name).

### Sale Table
Container table of the items for sale by the users. Basically it must contain the reference to the
[user](#user-table) which put it for sale and the [item](#item-table) which (s)he is trying to sell. Also,
there must be a quantity the user has of this item in stock and the price he wants per unit.

### User Table
The table that has the users. The column `login` has the unique login identification of the user and
the `password` column has the `SHA3-512` encrypted for authentication.  
The password is stored encrypted for security and moral purposes. Security because it is a sensible and
private data of the user, and the [digestion algorithm](https://en.wikipedia.org/wiki/Cryptographic_hash_function)
makes it, practically, impossible to convert it back. It also contains `NULL`-able (optional)
fields: `first_name` and `last_name` that can be used to customize the user experiece.

### Forest Admin Usage
[Forest Admin](https://forestadmin.com) is a CMS (Content Management Software) to manage databases. With
this CMS it is easier to do **CRUD** operations without using literal SQL. The interface should be pretty
much straight-forward and require no help in usage due to its auto-explainatory UI.

## **API ROUTES**
Read the API usage docs. [API Docs](API.md)


## **EXECUTION**
To execute in any support environment, please check if the requirements are met.

### Development Environment
_This tutorial considers that you will use the default configuration options. If you want to change_
_the configuration, read the [Environment Variables](#environment-variables) session_

First of all, check if the database service is running and if the user `admin` is created with
password `admin`. Also, the database `77f12a` must exists before starting the server, otherwise the
**Sequelize** library will not be able to connect to it using these values.  
To execute it:
```shell
node server/index.js
```
It will open a HTTP server and listen to communications in the port `4424`


### Production Environment
This tutorial considers you:
-   Have an user named `f572d` with no `sudo` privileges and member of the group `f572d`
-   Have this project working and located in `/var/srv/f572d` with permissions set to `600` and owned
by user `f572d`
-   Have a copy of the Systemd service daemon (provided in `./systemd/f572d.service`) in the Systemd correct path
(in ArchLinux, it should be in `/usr/lib/systemd/system/f572d.service`, but in other distros it may vary) and
owned by `root` user
-   Have your environment configuration file with the [environment variables](#environment-variables) correctly
set in the path `/etc/f572d/env.conf` with permissions set to `600` and owned by user `f572d`

Use the Systemd commands to control the Systemd module. To start it:
```shell
systemctl start f572d.service

## Enable it, so it automatically starts after system reboots
systemctl enable f572d.service
```

To stop it:
```shell
systemctl stop f572d.service

## If you have enabled it, disable it
## Otherwise it will automatically start after system reboots
systemctl disable f572d.service
```

For more information about systemd modules and how to use it, RTFM.


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
    -   **TRUST_PROXY**: Whether or not to trust the proxy server. Set to `true` or `false`. Defaults to `false`
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
