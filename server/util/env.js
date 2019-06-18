const {abs, min} = Math;
const {env} = process;
let processCount = env.PROCESS_WORKERS_COUNT || "upto-4";
processCount = abs(parseInt(processCount)) || processCount;
if (processCount && typeof processCount==="string") {
    processCount = processCount.toLowerCase();
    let threads = require("os").cpus().length || 1; //added at least one thread because some android phones CPUs are not detected and cpus().length = 0
    if (processCount==="all") processCount = threads;
    else if (processCount.startsWith("upto-")) {
        processCount = abs(parseInt(processCount.replace("upto-", ""))) || 4;
        processCount = min(processCount, threads);
    } else processCount = min(threads, 4);
}

module.exports = Object.freeze({
    // DATABASE
    DB_HOST: env.DB_HOST || "localhost",
    DB_PORT: parseInt(env.DB_PORT) || 5432,
    DB_NAME: env.DB_NAME || "77f12a",
    DB_USERNAME: env.DB_USERNAME || "admin",
    DB_PASSWORD: env.DB_PASSWORD || "admin",
    DB_TIMEZONE: env.DB_TIMEZONE || "Etc/UTC",
    DB_MIN_CONNECTIONS: abs(parseInt(env.DB_MIN_CONNECTIONS)) || 1,
    DB_MAX_CONNECTIONS: abs(parseInt(env.DB_MAX_CONNECTIONS)) || 25,
    DB_IDLE_TIME: abs(parseInt(env.DB_IDLE_TIME)) || 10000,
    DB_ACQUIRE_TIME: abs(parseInt(env.DB_ACQUIRE_TIME)) || 60000,
    DB_CHECK_INTERVAL_CONNECTIONS: abs(parseInt(env.DB_CHECK_INTERVAL_CONNECTIONS)) || 10000,
    // API SERVICE
    SERVER_API_PORT: abs(parseInt(env.SERVER_API_PORT)) || 4424,
    API_HEADER_NAME: env.API_HEADER_NAME || "X-Custom-Header-Version",
    API_HEADER_VALUE: env.API_HEADER_VALUE || "1.0.0",
    UPDATE_TAGS_DAYS_OFFSET: abs(parseInt(env.UPDATE_TAGS_DAYS_OFFSET)) || 1,
    DEFAULT_LIMIT: abs(parseInt(env.DEFAULT_LIMIT)) || 10,
    DEFAULT_MAX_LIMIT: abs(parseInt(env.DEFAULT_MAX_LIMIT)) || 1000,
    // FOREST ADMIN
    FOREST_ENV_SECRET: env.FOREST_ENV_SECRET || "03b1e75a91fff344174a450eef592fc7ec1d0696d4fcc07a18df4b2b9f99ca3c",
    FOREST_AUTH_SECRET: env.FOREST_AUTH_SECRET || "0fdf26b96dfc63abac0136a9aa4f2c1bb9a5c26a68376731",
    // PROCESS
    PROCESS_WORKERS_COUNT: processCount,
    NODE_ENV: env.NODE_ENV,
    NODE_CLUSTER_SCHED_POLICY: env.NODE_CLUSTER_SCHED_POLICY,
    PROD: env.NODE_ENV==="production",
    CLUSTER_LOG: (env.CLUSTER_LOG || "true").trim().toLowerCase()==="true"
});