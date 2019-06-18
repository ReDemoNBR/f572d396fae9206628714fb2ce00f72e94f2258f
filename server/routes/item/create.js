const Item = require("../../db/models/item");

module.exports = async (req, res, next) => {
    let {body: {name, alias, description}} = req;
    if (!name) return res.status(400).send({message: "'name' is required in POST body"});
    try {
        let item = await Item.create({name, alias, description});
        return res.status(201).send(item);
    } catch(e) {
        return next(e);
    }
};