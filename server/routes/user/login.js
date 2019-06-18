const Auth = require("../../db/models/auth");
const User = require("../../db/models/user");
const hash = require("../../util/hash");

module.exports = async (req, res, next) => {
    let {body: {login, password}} = req;
    if (!login || !password) return res.status(400).send({message: "'login' and 'password' are required in POST body"});
    
    try {
        let user = await User.findOne({
            attributes: ["id"],
            where: {login, password: hash(password)}
        });
        if (!user) return res.status(404).send({message: "User not found"});
        let auth = await Auth.create({userId: user.id});
        let {token} = auth;
        res.set("Authorization", token);
        return res.status(201).send({token});
    } catch(e) {
        return next(e);
    }
};