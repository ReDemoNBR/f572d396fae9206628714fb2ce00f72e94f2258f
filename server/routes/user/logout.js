const Auth = require("../../db/models/auth");

module.exports = async (req, res, next) => {
    let {locals: {userId}} = res;
    try {
        await Auth.destroy({where: {userId}});
        return res.send({message: "Logged out of all devices successfully"});
    } catch(e) {
        return next(e);
    }
};