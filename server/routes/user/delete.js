const Auth = require("../../db/models/auth");
const User = require("../../db/models/user");
const db = require("../../db");

module.exports = async (req, res, next) => {
    let [{params: {id}}, {locals: {userId}}] = [req, res];
    
    // tests if the access token really refers to the user with the given ID
    // otherwise, any logged in user could update the information of any other user in the database
    if (id!=userId) return res.status(403).send({message: "You can not delete anyone else but you"});
    
    try {
        // I could simply delete the user with CASCADE
        // but decided to first remove the Auth entries and second remove the User entry
        await db.transaction(async transaction => {
            await Auth.destroy({where: {userId}, transaction});
            await User.destroy({where: {id: userId}, transaction});
        });
        return res.send({message: "User removed successfully"});
    } catch(e) {
        return next(e);
    }
};