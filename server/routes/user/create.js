const User = require("../../db/models/user");
const hash = require("../../util/hash");

module.exports = async (req, res, next) => {
    let {body: {login, password, firstName, lastName}} = req;
    if (!login || !password) return res.status(400).send({message: "'login' and 'password' is required in request body"});
    try {
        let exists = Boolean(await User.findOne({
            attributes: ["id"],
            where: {login},
            raw: true // added to increase performance as there is no need to parse to model type as it is going to be converted to boolean
        }));
        if (exists) return res.status(401).send({message: "User already exists"});
        let user = await User.create({login, password: hash(password), firstName, lastName});
        user = user.toJSON();
        delete user.password;
        return res.status(201).send(user);
    } catch(e) {
        return next(e);
    }
};