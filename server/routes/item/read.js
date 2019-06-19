const Item = require("../../db/models/item");
const Sale = require("../../db/models/sale");
const {fn, col} = require("sequelize");

const keysToNumber = ["averagePrice", "averageQuantity", "maxPrice", "maxQuantity", "minPrice", "minQuantity"];

module.exports = async (req, res, next) => {
    let {params: {id}} = req;
    
    try {
        let item = await Item.findOne({
            attributes: {include: [
                [fn("AVG", col("sales.price")), "averagePrice"],
                [fn("AVG", col("sales.quantity")), "averageQuantity"],
                [fn("MAX", col("sales.price")), "maxPrice"],
                [fn("MAX", col("sales.quantity")), "maxQuantity"],
                [fn("MIN", col("sales.price")), "minPrice"],
                [fn("MIN", col("sales.quantity")), "minQuantity"]
            ]},
            where: {id},
            include: [{
                model: Sale,
                attributes: []
            }],
            group: ["item.id", "item.name", "item.alias", "item.description", "item.created", "item.updated"].map(col)
        });
        if (!item) return res.status(404).send({message: "No item found"});
        item = item.toJSON();
        keysToNumber.forEach(key=>item[key] = Number(item[key]));
        return res.send(item);
    } catch(e) {
        return next(e);
    }
};