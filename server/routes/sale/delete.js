const Sale = require("../../db/models/sale");

module.exports = async (req, res, next) => {
    let [{params: {itemId}}, {locals: {userId}}] = [req, res];
        
    try {
        // using the number of destroyed ("deleted", on SQL) rows to check its success
        // this avoids using a SELECT statement to check if it exists and then DELETE to remove it
        let destroyed = await Sale.destroy({where: {itemId, userId}});
        if (!destroyed) return res.status(404).send({message: "No item on sale found"});
        return res.send({message: "Item on sale removed successfully"});
    } catch(e) {
        return next(e);
    }
};