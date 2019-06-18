// This middleware logs which worker (aka thread) is responding
// this way you can analyze the task distribution between workers

const {worker} = require("cluster");
const {CLUSTER_LOG} = require("../../util/env");

module.exports = (req, res, next) => {
    if (CLUSTER_LOG) console.info(`cluster ${worker.id} (pid: ${process.pid}) responding to '${req.originalUrl}'`);
    return next();
};