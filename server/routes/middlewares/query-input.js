// This middleware treat the query input used for entity listing requests (ex.: list all items -> GET /items)

const {DEFAULT_LIMIT, DEFAULT_MAX_LIMIT} = require("../../util/env");
const [{abs, min}, {assign}] = [Math, Object];
const orderOptions = ["id", "name", "alias"];
const userOrderOptions = ["id", "login", "firstName", "lastName"];

module.exports = (req, res, next) => {
    if (req.method!=="GET") return next();
    let {query: {limit=DEFAULT_LIMIT, offset=0, order="name"}} = req;
    [limit, offset, order] = [abs(limit), abs(offset), String(order).toLowerCase()];
    if (isNaN(limit)) return res.status(400).send({message: "invalid 'limit' in query"});
    if (isNaN(offset)) return res.status(400).send({message: "invalid 'offset' in query"});
    if (req.path.endsWith("/user") && !userOrderOptions.includes(order) || !orderOptions.includes(order))
        return res.status(400).send({message: "invalid 'order' in query"});
    limit = min(limit, DEFAULT_MAX_LIMIT);
    assign(req.query, {limit, offset, order});
    return next();
};