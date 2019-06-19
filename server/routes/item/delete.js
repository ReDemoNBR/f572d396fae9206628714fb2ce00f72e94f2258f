const Item = require("../../db/models/item");
const Sale = require("../../db/models/sale");
const db = require("../../db");

module.exports = async (req, res, next) => {
    let {params: {id}} = req;
    
    try {
        let exists = Boolean(await Item.findByPk(id, {attributes: ["id"], raw: true})); // using raw: true for performance
        if (!exists) return res.status(404).send({message: "Item not found"});
        
        // I could simply delete the Item with CASCADE on, but decided to do a transaction destroying the items in this order
        await db.transaction(async transaction=>{
            await Sale.destroy({where: {itemId: id}, transaction});
            await Item.destroy({where: {id}, transaction});
        });
        return res.send({message: "Deleted item successfully"});
    } catch(e) {
        return next(e);
    }
};