const Item = require("../../db/models/item");
const Sale = require("../../db/models/sale");
const {col} = require("sequelize");

module.exports = async (req, res, next) => {
    let {query: {order, limit, offset}} = req;
    
    try {
        let items = await Item.findAll({
            order: [[col(order), "ASC"], [col("id"), "ASC"]],
            limit, offset
        });
        if (!items || !items.length) return res.status(404).send({message: "No item found"});
        return res.send(items);
    } catch(e) {
        return next(e);
    }
};