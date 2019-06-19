const Item = require("../../db/models/item");
const Sale = require("../../db/models/sale");
const User = require("../../db/models/user");

module.exports = async (req, res, next) => {
    let [{params: {itemId}}, {locals: {userId}}] = [req, res];
        
    try {
        let itemOnSale = await Sale.findOne({
            attributes: ["quantity", "price"],
            where: {itemId, userId},
            include: [{
                model: User,
                attributes: ["id", "firstName", "lastName"],
                required: true
            }, {
                model: Item,
                attributes: ["id", "name", "alias"],
                required: true
            }]
        });
        if (!itemOnSale) return res.status(404).send({message: "No item on sale found"});
        return res.send(itemOnSale);
    } catch(e) {
        return next(e);
    }
};