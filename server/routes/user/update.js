const User = require("../../db/models/user");
const db = require("../../db");

module.exports = async (req, res, next) => {
    // sending an empty body property, means it will be emtpied in database too
    // only firstName and lastName can be updated
    let [{params: {id}, body: {firstName="", lastName=""}}, {locals: {userId}}] = [req, res];
    // tests if the access token really refers to the user with the given ID
    // otherwise, any logged in user could update the information of any other user in the database
    if (id!=userId) return res.status(403).send({message: "You can not update anyone else but you"});
    
    try {
        let user;
        // create a transaction to guarantee that only 1 row will be affected
        await db.transaction(async transaction => {
            let update = await User.update({firstName, lastName}, {where: {id: userId}, transaction});
            if (update!=1) throw Error("More than one row updated");
            user = await User.findByPk(userId, {attributes: {exclude: ["password"]}, transaction});
        });
        return res.send(user);
    } catch(e) {
        return next(e);
    }
};