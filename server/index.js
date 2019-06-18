const Cluster = require("cluster");
const {SERVER_API_PORT, PROCESS_WORKERS_COUNT, PROD, TRUST_PROXY} = require("./util/env");

if (Cluster.isMaster) {
    Cluster.on("exit", require("./cluster/exit"));
    Cluster.on("fork", require("./cluster/fork"));
    Cluster.on("online", require("./cluster/online"));
    for (let i=0; i<PROCESS_WORKERS_COUNT; i++) Cluster.fork();
} else {
    const Express = require("express");
    const app = Express();
    app.listen = require("util").promisify(app.listen);
    
    app.use(Express.json());
    app.use(require("compression")());
    app.use(require("helmet")());
    
    if (TRUST_PROXY) app.enable("trust proxy");
    if (!PROD) app.set("json spaces", "\t");
    
    // I make a lot of use of the BigInt native type (starts from NodeJS v10.4.0)
    // this replacer below converts the BigInt type to string when converting to JSON
    // because there is no native serialization of BigInt to JSON
    app.set("json replacer", (key, value)=>typeof value==="bigint" && value.toString() || value);
    
    app.use(require("./routes"));
    
    require("./db").sync({logging: PROD?false:undefined}).then(async ()=>{
        await app.listen(SERVER_API_PORT);
        console.info(`Server open on port ${SERVER_API_PORT}`);
    }).catch(e=>{
        console.error(`Error opening server on prot ${SERVER_API_PORT}`);
        console.error(e);
        process.exit(1);
    });
}