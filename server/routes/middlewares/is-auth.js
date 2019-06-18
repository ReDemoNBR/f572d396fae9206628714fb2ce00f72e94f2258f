const Auth = require("../../db/models/auth");
const User = require("../../db/models/user");

module.exports = async (req, res, next) => {
    const authorization = req.get("authorization");
    if (!authorization) return res.status(401).send({message: "Unauthorized"});
    try {
        let auth = await Auth.findByPk(authorization, {
            attributes: ["token"],
            include: [{
                model: User,
                attributes: {exclude: ["password"]},
                required: true //for INNER JOIN
            }]
        });
        if (!auth) return res.status(401).send({message: "Unauthorized"});
        res.locals.authorization = authorization;
        res.locals.userId = auth.user.id;
        res.locals.user = auth.user;
        return next();
    } catch(e) {
        return next(e);
    }
};