const User = require("../../db/models/user");
const {col} = require("sequelize");
const {DEFAULT_LIMIT, DEFAULT_MAX_LIMIT} = require("../../util/env");
const {abs, floor} = Math;

const sortOptions = ["id", "login", "firstName", "lastName"];

module.exports = async (req, res, next) => {
    let {query: {limit=DEFAULT_LIMIT, offset=0, sort="id"}} = req;
    limit = abs(floor(limit));
    offset = abs(floor(offset));
    if (isNaN(limit)) return res.status(400).send({message: "invalid 'limit' in query"});
    if (isNaN(offset)) return res.status(400).send({message: "invalid 'offset' in query"});
    if (!sortOptions.includes(sort)) return res.status(400).send({message: "invalid 'sort' in query"});
    try {
        let users = await User.findAll({
            attributes: {exclude: ["password"]},
            order: [[col(sort), "ASC"], [col("id"), "ASC"]], // id column is used as second order param
            limit, offset
        });
        if (!users || !users.length) return res.status(404).send({message: "No users found"});
        return res.send(users);
    } catch(e) {
        return next(e);
    }
};