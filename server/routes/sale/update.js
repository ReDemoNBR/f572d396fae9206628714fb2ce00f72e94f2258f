const Item = require("../../db/models/item");
const Sale = require("../../db/models/sale");

module.exports = async (req, res, next) => {
    let [{params: {itemId}, body: {quantity, price}}, {locals: {userId}}] = [req, res];
    if (!quantity || !parseInt(quantity) || BigInt(quantity)<1n) return res.status(400).send({message: "Invalid 'quantity' in POST body"});
    if (!price || isNaN(price)) return res.status(400).send({message: "Invalid 'price' in POST body"});
        
    try {
        let exists = Boolean(await Sale.findOne({
            attributes: ["quantity"],
            where: {itemId, userId},
            raw: true
        }));
        if (!exists) return res.status(404).send({message: "No item on sale found"});
        await Sale.update({quantity, price}, {where: {itemId, userId}});
        return res.send({message: "Item on sale updated successfully"});
    } catch(e) {
        return next(e);
    }
};