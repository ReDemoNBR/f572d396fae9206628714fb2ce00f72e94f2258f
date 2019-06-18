// This middleware is called only when one of the previous middlewares
// calls "next()" function passing an error parameter
// This will log the URL with the URL parameters and the query used for debugging purposes
// Also, this will attach the HTTP 500 code, which means "Internal Error"

module.exports = (error, req, res, next) => {
    console.warn(`Error happened on ${req.originalUrl}`, "params", req.params, "query", req.query);
    console.warn(error);
    if (!res.statusCode || res.statusCode===200) res.status(500);
    return res.send(typeof error==="object" && error || {error});
};