const Item = require("../../db/models/item");
const Sale = require("../../db/models/sale");
const {col} = require("sequelize");

module.exports = async (req, res, next) => {
    let [{query: {limit, offset, order}}, {locals: {userId}}] = [req, res];
        
    try {
        let itemsOnSale = await Sale.findAll({
            attributes: ["quantity", "price", col("item.id"), col("item.name"), col("item.alias")],
            where: {userId},
            include: [{
                model: Item,
                attributes: [],
                required: true
            }],
            order: [[col(`item.${order}`), "ASC"], [col("item.id"), "ASC"]]
        });
        if (!itemsOnSale) return res.status(404).send({message: "No items on sale found"});
        return res.send(itemsOnSale);
    } catch(e) {
        return next(e);
    }
};