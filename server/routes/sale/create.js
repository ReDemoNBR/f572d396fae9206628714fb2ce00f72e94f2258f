const Item = require("../../db/models/item");
const Sale = require("../../db/models/sale");
const User = require("../../db/models/user");

module.exports = async (req, res, next) => {
    let [{body: {itemId, quantity, price}}, {locals: {userId}}] = [req, res];
    if (!itemId || !parseInt(itemId) || BigInt(itemId)<1n) return res.status(400).send({message: "Invalid 'itemId' in POST body"});
    if (!quantity || !parseInt(quantity) || BigInt(quantity)<1n) return res.status(400).send({message: "Invalid 'quantity' in POST body"});
    if (!price || isNaN(price)) return res.status(400).send({message: "Invalid 'price' in POST body"});
    
    try {
        let exists = Boolean(await Sale.findOne({where: {itemId, userId}, raw: true})); // using raw=true for performance
        if (exists) return res.status(403).send({message: "Item already exists, can not create a new one"});
        let sale = await Sale.create({itemId, userId, quantity, price});
        return res.status(201).send(sale);
    } catch(e) {
        return next(e);
    }
};