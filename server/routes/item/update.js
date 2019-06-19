const Item = require("../../db/models/item");

module.exports = async (req, res, next) => {
    let {params: {id}, body: {name, alias, description}} = req;
    if (!name) return res.status(400).send({message: "Property 'name' is required in body"});
    alias = alias || ""; // if it is null or undefined, then empties it so it will autogenerates an alias with the hooks
    
    try {
        let exists = Boolean(await Item.findByPk(id, {attributes: ["id"], raw: true})); //using raw: true for performance
        if (!exists) return res.status(404).send({message: "No item found"});
        await Item.update({name, alias, description}, {where: {id}});
        return res.send({message: "Item updated successfully"});
    } catch(e) {
        return next(e);
    }
};