const Item = require("../../db/models/item");
const User = require("../../db/models/user");
const Sale = require("../../db/models/sale");

module.exports = async (req, res, next) => {
    let {params: {id}} = req;
    try {
        let user = await User.findOne({
            attributes: {exclude: ["password"]},
            where: {id},
            include: [{
                model: Sale,
                attributes: ["price", "quantity"],
                include: [{
                    model: Item,
                    required: true
                }]
            }]
        });
        if (!user) return res.status(404).send({message: "No user found"});
        return res.send(user);
    } catch(e) {
        return next(e);
    }
};